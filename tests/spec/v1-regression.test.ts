import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { V1_BASELINE_OPERATIONS } from './v1-baseline-operations';

/**
 * v1-to-v2 regression guard.
 *
 * tests/spec/coverage.test.ts only cross-checks the CURRENT spec, manifest,
 * and generated SDK against each other — it can't detect an operation that
 * existed in the v1 (Stainless) SDK quietly disappearing from the spec
 * during a future sync (which is exactly what happened once already: see
 * v1-baseline-operations.ts for the incident this test exists to prevent).
 *
 * Every v1 operation must either:
 *  - still exist in the current spec/openapi.yaml, or
 *  - be explicitly listed under sdk-manifest.yaml's `v1_removed` with a reason
 *
 * This does NOT require the operation to still be *exposed by the SDK* —
 * that's `excluded` in coverage.test.ts's domain (e.g. TasksLegacy could be
 * excluded from generation while its spec operations remain, and this test
 * would still pass). This test only guards against the underlying API
 * capability vanishing from the spec unnoticed.
 */

const specDir = path.resolve(__dirname, '..', '..', 'spec');
const spec = YAML.parse(fs.readFileSync(path.join(specDir, 'openapi.yaml'), 'utf8'));
const manifest = YAML.parse(fs.readFileSync(path.join(specDir, 'sdk-manifest.yaml'), 'utf8'));

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options']);
const normalizeOp = (op: string) =>
  op
    .trim()
    .toLowerCase()
    .replace(/\{[^}]+\}/g, '{}');

const currentOps = new Set<string>();
for (const [p, pathItem] of Object.entries<any>(spec.paths ?? {})) {
  for (const method of Object.keys(pathItem)) {
    if (HTTP_METHODS.has(method)) currentOps.add(normalizeOp(`${method} ${p}`));
  }
}

const v1Removed: Array<{ path?: string; reason?: string } | string> = manifest.v1_removed ?? [];
const removedPaths = new Set(
  v1Removed.map((entry) => normalizeOp(typeof entry === 'string' ? entry : entry.path ?? '')),
);

describe('v1 -> v2 operation regression', () => {
  it('every v1 operation still exists in the spec, or is a declared v1_removed entry', () => {
    const gone = V1_BASELINE_OPERATIONS.filter(
      (op) => !currentOps.has(normalizeOp(op)) && !removedPaths.has(normalizeOp(op)),
    );
    if (gone.length > 0) {
      throw new Error(
        `${gone.length} operation(s) the v1 SDK exposed are missing from the current spec/openapi.yaml ` +
          `and are NOT declared as an intentional removal in spec/sdk-manifest.yaml's 'v1_removed' list:\n` +
          gone.map((op) => `  - ${op}`).join('\n') +
          `\n\nEither restore the operation in openapi.yaml (it's likely still live in production — verify ` +
          `against the real backend route before assuming it's gone), or add it to 'v1_removed' with a reason ` +
          `if this is a deliberate, reviewed removal.`,
      );
    }
  });

  it('every v1_removed entry actually names a real v1 baseline operation', () => {
    const baselineNormalized = new Set(V1_BASELINE_OPERATIONS.map(normalizeOp));
    const stale = v1Removed
      .map((entry) => (typeof entry === 'string' ? entry : entry.path))
      .filter((op): op is string => !!op && !baselineNormalized.has(normalizeOp(op)));
    expect(stale).toEqual([]);
  });

  it('every v1_removed entry has a reason', () => {
    const noReason = v1Removed.filter((entry) => typeof entry === 'string' || !entry.reason);
    expect(noReason).toEqual([]);
  });
});
