import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import Anchorbrowser from 'anchorbrowser';
import { parityCalls } from '../parity/calls';

/**
 * Spec-coverage suite: keeps spec/openapi.yaml, spec/sdk-manifest.yaml, the
 * client's method tree, and the wire-parity call list in lockstep. When the
 * spec adds/removes an operation, this suite fails until the manifest (and,
 * if the operation is exposed, the resource code + parity call) is updated.
 */

const specDir = path.resolve(__dirname, '..', '..', 'spec');
const spec = YAML.parse(fs.readFileSync(path.join(specDir, 'openapi.yaml'), 'utf8'));
const manifest = YAML.parse(fs.readFileSync(path.join(specDir, 'sdk-manifest.yaml'), 'utf8'));

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options']);

/** 'get /v1/foo/{barId}' -> 'get /v1/foo/{}' (param names vary in casing) */
const normalizeOp = (op: string) =>
  op
    .trim()
    .toLowerCase()
    .replace(/\{[^}]+\}/g, '{}');

const camelCase = (s: string) => s.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());

interface MappedMethod {
  /** manifest address, e.g. 'sessions.mouse.double_click' */
  name: string;
  /** endpoint, e.g. 'post /v1/sessions/{sessionId}/mouse/doubleClick' */
  endpoint: string;
  /** resource segments, e.g. ['sessions', 'mouse'] */
  resourcePath: string[];
  /** method key, e.g. 'double_click' */
  method: string;
}

function collectMethods(
  resources: Record<string, any>,
  prefix: string[] = [],
  out: MappedMethod[] = [],
): MappedMethod[] {
  for (const [resourceName, resource] of Object.entries(resources ?? {})) {
    const resourcePath = [...prefix, resourceName];
    for (const [method, endpoint] of Object.entries((resource as any).methods ?? {})) {
      out.push({
        name: [...resourcePath, method].join('.'),
        endpoint: endpoint as string,
        resourcePath,
        method,
      });
    }
    collectMethods((resource as any).subresources ?? {}, resourcePath, out);
  }
  return out;
}

const mappedMethods = collectMethods(manifest.resources);
const excluded: string[] = manifest.excluded ?? [];
const specExceptions: string[] = manifest.spec_exceptions ?? [];

const specOps: string[] = [];
for (const [p, pathItem] of Object.entries<any>(spec.paths ?? {})) {
  for (const m of Object.keys(pathItem)) {
    if (HTTP_METHODS.has(m)) specOps.push(`${m} ${p}`);
  }
}
const specOpsNormalized = new Set(specOps.map(normalizeOp));

describe('sdk-manifest <-> openapi spec', () => {
  it('every spec operation is either mapped or explicitly excluded', () => {
    const accounted = new Set([
      ...mappedMethods.map((m) => normalizeOp(m.endpoint)),
      ...excluded.map(normalizeOp),
    ]);
    const unaccounted = specOps.filter((op) => !accounted.has(normalizeOp(op)));
    if (unaccounted.length > 0) {
      throw new Error(
        `Spec operations not accounted for in spec/sdk-manifest.yaml — map them under 'resources' ` +
          `(and add the SDK method + parity call) or list them under 'excluded':\n` +
          unaccounted.map((op) => `  - ${op}`).join('\n'),
      );
    }
  });

  it('every mapped operation exists in the spec (or is a declared spec exception)', () => {
    const exceptions = new Set(specExceptions.map(normalizeOp));
    const missing = mappedMethods.filter(
      (m) => !specOpsNormalized.has(normalizeOp(m.endpoint)) && !exceptions.has(normalizeOp(m.endpoint)),
    );
    if (missing.length > 0) {
      throw new Error(
        `Manifest methods whose operation is missing from spec/openapi.yaml:\n` +
          missing.map((m) => `  - ${m.name}: ${m.endpoint}`).join('\n'),
      );
    }
  });

  it('declared spec exceptions are actually missing from the spec', () => {
    const stale = specExceptions.filter((op) => specOpsNormalized.has(normalizeOp(op)));
    if (stale.length > 0) {
      throw new Error(
        `spec_exceptions entries that ARE now in the spec — move them back to a mapping:\n` +
          stale.map((op) => `  - ${op}`).join('\n'),
      );
    }
  });

  it('excluded operations do not overlap with mapped ones', () => {
    const mapped = new Set(mappedMethods.map((m) => normalizeOp(m.endpoint)));
    const overlap = excluded.filter((op) => mapped.has(normalizeOp(op)));
    expect(overlap).toEqual([]);
  });
});

describe('sdk-manifest <-> client methods', () => {
  const client = new Anchorbrowser({ apiKey: 'test-api-key', baseURL: 'http://127.0.0.1:1' });

  it('every mapped method exists on the client', () => {
    const missing: string[] = [];
    for (const m of mappedMethods) {
      let target: any = client;
      for (const segment of m.resourcePath) target = target?.[camelCase(segment)];
      if (typeof target?.[camelCase(m.method)] !== 'function') missing.push(m.name);
    }
    if (missing.length > 0) {
      throw new Error(
        `Manifest methods with no matching client method:\n` + missing.map((n) => `  - ${n}`).join('\n'),
      );
    }
  });
});

describe('sdk-manifest <-> wire-parity calls', () => {
  it('every mapped method has exactly one parity call', () => {
    const callNames = parityCalls.map((c) => c.name);
    const mappedNames = mappedMethods.map((m) => m.name);
    expect([...callNames].sort()).toEqual([...mappedNames].sort());
  });
});
