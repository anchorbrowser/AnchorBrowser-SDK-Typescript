import Anchorbrowser from 'anchorbrowser';
import { CaptureServer, CapturedRequest } from './capture-server';
import { parityCalls } from './calls';

/**
 * Wire-parity suite: every SDK method is invoked with fixed parameters
 * against a local capture server, and the exact request (method, path,
 * query, auth/content headers, body) is snapshot-tested.
 *
 * These snapshots are the 1:1 behavioral baseline frozen from the last
 * Stainless-generated build. Any change to what the SDK puts on the wire
 * fails this suite; if a change is intentional, update snapshots with
 * `yarn test tests/parity -u` and call it out in review.
 */

// Headers whose values are stable and meaningful to API behavior. Everything
// else (user-agent, x-stainless-* telemetry, host, content-length, ...) is
// snapshotted by name only, so presence changes are caught without version
// churn.
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
      body = body.split(boundary).join('<boundary>');
    } else if (contentType?.includes('application/json')) {
      body = JSON.parse(body);
    }
  }

  return {
    method: req.method,
    path: req.path,
    query: req.query,
    headers,
    headerNames,
    body,
  };
}

describe('wire parity', () => {
  const server = new CaptureServer();
  let client: Anchorbrowser;

  beforeAll(async () => {
    const baseURL = await server.start();
    client = new Anchorbrowser({ apiKey: 'test-api-key', baseURL, maxRetries: 0 });
  });

  afterAll(async () => {
    await server.stop();
  });

  it('covers every method exactly once', () => {
    const names = parityCalls.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
    expect(names.length).toMatchSnapshot('parity call count');
  });

  for (const call of parityCalls) {
    it(call.name, async () => {
      server.reset();
      await call.invoke(client);
      expect(server.requests).toHaveLength(1);
      expect(normalize(server.requests[0]!)).toMatchSnapshot(call.name);
    });
  }
});
