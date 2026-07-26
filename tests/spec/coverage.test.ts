import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import * as sdk from '../../src/generated/sdk.gen';

/**
 * Spec-coverage suite: keeps the public spec, the naming manifest, and the
 * generated SDK classes in lockstep.
 *
 * - every operation in spec/openapi.yaml must surface as a generated class
 *   method (named via spec/sdk-manifest.yaml or auto-derived)
 * - every manifest naming entry must point at a real spec operation
 * - the transformed spec (openapi-sdk.yaml) must contain exactly the same
 *   operations as the source spec
 */

const specDir = path.resolve(__dirname, '..', '..', 'spec');
const source = YAML.parse(fs.readFileSync(path.join(specDir, 'openapi.yaml'), 'utf8'));
const transformed = YAML.parse(fs.readFileSync(path.join(specDir, 'openapi-sdk.yaml'), 'utf8'));
const manifest = YAML.parse(fs.readFileSync(path.join(specDir, 'sdk-manifest.yaml'), 'utf8'));

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options']);

function listOps(spec: any): Map<string, any> {
  const ops = new Map<string, any>();
  for (const [p, pathItem] of Object.entries<any>(spec.paths ?? {})) {
    for (const [method, op] of Object.entries<any>(pathItem)) {
      if (HTTP_METHODS.has(method)) ops.set(`${method} ${p}`, op);
    }
  }
  return ops;
}

const sourceOps = listOps(source);
const transformedOps = listOps(transformed);

describe('spec transform', () => {
  it('openapi-sdk.yaml contains exactly the operations of openapi.yaml', () => {
    expect([...transformedOps.keys()].sort()).toEqual([...sourceOps.keys()].sort());
  });

  it('every transformed operation has an operationId and a single class tag', () => {
    const broken = [...transformedOps.entries()]
      .filter(([, op]) => !op.operationId || !Array.isArray(op.tags) || op.tags.length !== 1)
      .map(([key]) => key);
    expect(broken).toEqual([]);
  });

  it('operationIds are unique', () => {
    const ids = [...transformedOps.values()].map((op) => op.operationId);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });
});

describe('sdk-manifest', () => {
  it('every naming entry points at a real spec operation', () => {
    const stale = Object.keys(manifest.naming ?? {}).filter((key) => !sourceOps.has(key));
    if (stale.length > 0) {
      throw new Error(
        `sdk-manifest.yaml naming entries with no matching operation in openapi.yaml — remove or fix:\n` +
          stale.map((k) => `  - ${k}`).join('\n'),
      );
    }
  });

  it('every spec operation has a manifest naming entry (no auto-derived names)', () => {
    const unnamed = [...sourceOps.keys()].filter((key) => !(manifest.naming ?? {})[key]);
    if (unnamed.length > 0) {
      throw new Error(
        `Operations without an sdk-manifest.yaml naming entry (would get auto-derived names):\n` +
          unnamed.map((k) => `  - ${k}`).join('\n') +
          `\nAdd naming entries to keep the SDK surface deliberate.`,
      );
    }
  });
});

describe('generated SDK', () => {
  it('every spec operation is exposed as a generated class method', () => {
    const missing: string[] = [];
    for (const [key, op] of transformedOps) {
      const cls = (sdk as Record<string, any>)[op.tags[0]];
      if (typeof cls?.[op.operationId] !== 'function') {
        missing.push(`${key} -> ${op.tags[0]}.${op.operationId}`);
      }
    }
    if (missing.length > 0) {
      throw new Error(
        `Spec operations with no generated SDK method — run \`yarn generate\`:\n` +
          missing.map((m) => `  - ${m}`).join('\n'),
      );
    }
  });

  it('every generated class method corresponds to a spec operation', () => {
    const expected = new Set([...transformedOps.values()].map((op) => `${op.tags[0]}.${op.operationId}`));
    const actual: string[] = [];
    for (const [clsName, cls] of Object.entries(sdk)) {
      if (typeof cls !== 'function') continue;
      for (const methodName of Object.getOwnPropertyNames(cls)) {
        if (
          typeof (cls as any)[methodName] === 'function' &&
          !['prototype', 'length', 'name'].includes(methodName)
        ) {
          actual.push(`${clsName}.${methodName}`);
        }
      }
    }
    const orphans = actual.filter((name) => !expected.has(name));
    expect(orphans).toEqual([]);
  });
});
