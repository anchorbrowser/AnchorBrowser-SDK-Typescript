import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { createClient, createConfig } from '../../src/generated/client';
import { createClientConfig } from '../../src/hey-api';
import * as sdk from '../../src/generated/sdk.gen';
import { CaptureServer, CapturedRequest, RouteSpec } from './capture-server';
import { Synthesizer } from './synthesize';

/**
 * Wire-parity suite, spec-driven: every operation in spec/openapi-sdk.yaml is
 * invoked through its generated class method with deterministic synthesized
 * arguments, and the exact HTTP request (method, path, query, auth/content
 * headers, body) is snapshot-tested.
 *
 * The snapshots are the SDK's behavioral baseline. Any change to what goes
 * on the wire fails this suite; if intentional, update with
 * `yarn test tests/parity -u` and review the snapshot diff.
 */

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete']);

const specPath = path.resolve(__dirname, '..', '..', 'spec', 'openapi-sdk.yaml');
const spec = YAML.parse(fs.readFileSync(specPath, 'utf8'));
const synth = new Synthesizer(spec);

interface Op {
  name: string; // Class.method
  className: string;
  methodName: string;
  method: string;
  template: string;
}

const ops: Op[] = [];
for (const [template, pathItem] of Object.entries<any>(spec.paths ?? {})) {
  for (const [method, op] of Object.entries<any>(pathItem)) {
    if (!HTTP_METHODS.has(method)) continue;
    const className = op.tags?.[0];
    const methodName = op.operationId;
    ops.push({ name: `${className}.${methodName}`, className, methodName, method, template });
  }
}

const routes: RouteSpec[] = ops.map((op) => ({
  method: op.method,
  template: op.template,
  contentType: synth.successContentType(op.template, op.method),
}));

const VALUE_HEADERS = new Set(['anchor-api-key', 'accept', 'content-type']);
const IGNORED_HEADERS = new Set(['host', 'connection', 'content-length', 'accept-encoding']);

function normalize(req: CapturedRequest) {
  const headers: Record<string, string> = {};
  const headerNames: string[] = [];

  let boundary: string | null = null;
  const contentType = req.headers['content-type'];
  const boundaryMatch = contentType?.match(/boundary=(\S+)/);
  if (boundaryMatch) boundary = boundaryMatch[1]!;

  for (const name of Object.keys(req.headers).sort()) {
    if (IGNORED_HEADERS.has(name)) continue;
    headerNames.push(name);
    if (VALUE_HEADERS.has(name)) {
      let value = req.headers[name]!;
      if (boundary) value = value.split(boundary).join('<boundary>');
      headers[name] = value;
    }
  }

  let body: unknown = req.body;
  if (typeof body === 'string') {
    if (boundary) {
      body = body.split(boundary).join('<boundary>').replace(/\r\n/g, '\n');
    } else if (contentType?.includes('application/json')) {
      body = JSON.parse(body);
    }
  }

  return { method: req.method, path: req.path, query: req.query, headers, headerNames, body };
}

describe('wire parity', () => {
  const server = new CaptureServer(routes);
  let client: ReturnType<typeof createClient>;

  beforeAll(async () => {
    const baseUrl = await server.start();
    client = createClient(
      createClientConfig(
        createConfig({ baseUrl, auth: () => 'test-api-key', throwOnError: true, responseStyle: 'data' }),
      ),
    );
  });

  afterAll(async () => {
    await server.stop();
  });

  it('covers every operation exactly once', () => {
    const names = ops.map((o) => o.name);
    expect(new Set(names).size).toBe(names.length);
    expect(names.length).toMatchSnapshot('operation count');
  });

  for (const op of ops) {
    it(op.name, async () => {
      const cls = (sdk as Record<string, any>)[op.className];
      expect(typeof cls?.[op.methodName]).toBe('function');

      const options = synth.buildOptions(op.template, op.method);
      server.reset();
      await cls[op.methodName]({ ...options, client });

      expect(server.requests).toHaveLength(1);
      // every SDK request must be identifiable in access logs / Datadog
      expect(server.requests[0]!.headers['user-agent']).toMatch(/^Anchorbrowser\/JS /);
      expect(server.requests[0]!.headers['x-anchor-sdk']).toMatch(/^typescript\//);
      expect(normalize(server.requests[0]!)).toMatchSnapshot(op.name);
    });
  }
});
