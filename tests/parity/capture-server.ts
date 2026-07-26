import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { AddressInfo } from 'net';

export interface CapturedRequest {
  method: string;
  path: string;
  query: Record<string, string>;
  headers: Record<string, string>;
  body: string | null;
}

export interface RouteSpec {
  method: string; // lowercase http method
  template: string; // OpenAPI path template, e.g. /v1/sessions/{session_id}
  contentType: string; // content type to respond with
}

/**
 * Minimal HTTP server that records every request the SDK sends and replies
 * with a response body matching the operation's declared response content
 * type (from the OpenAPI spec). Used by the wire-parity snapshot suite.
 */
export class CaptureServer {
  private server: Server;
  private routes: Array<RouteSpec & { regex: RegExp }> = [];
  requests: CapturedRequest[] = [];

  constructor(routes: RouteSpec[] = []) {
    this.routes = routes.map((r) => ({
      ...r,
      regex: new RegExp('^' + r.template.replace(/\{[^}]+\}/g, '[^/]+') + '$'),
    }));
    this.server = createServer((req, res) => this.handle(req, res));
  }

  async start(): Promise<string> {
    await new Promise<void>((resolve) => this.server.listen(0, '127.0.0.1', resolve));
    const { port } = this.server.address() as AddressInfo;
    return `http://127.0.0.1:${port}`;
  }

  async stop(): Promise<void> {
    await new Promise<void>((resolve, reject) => this.server.close((err) => (err ? reject(err) : resolve())));
  }

  reset(): void {
    this.requests = [];
  }

  private responseFor(method: string, path: string): { contentType: string; body: Buffer | string } {
    const route = this.routes.find((r) => r.method === method.toLowerCase() && r.regex.test(path));
    const contentType = route?.contentType ?? 'application/json';
    if (contentType.includes('json')) return { contentType, body: JSON.stringify({ data: {} }) };
    if (contentType.startsWith('text/')) return { contentType, body: 'ok' };
    // binary responses (image/png, application/pdf, video/mp4, octet-stream, ...)
    return { contentType, body: Buffer.from([0x89, 0x50, 0x4e, 0x47]) };
  }

  private handle(req: IncomingMessage, res: ServerResponse): void {
    const chunks: Buffer[] = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const url = new URL(req.url ?? '/', 'http://localhost');
      const query: Record<string, string> = {};
      url.searchParams.forEach((v, k) => (query[k] = v));

      const headers: Record<string, string> = {};
      for (const [k, v] of Object.entries(req.headers)) {
        if (typeof v === 'string') headers[k.toLowerCase()] = v;
      }

      const raw = Buffer.concat(chunks);
      this.requests.push({
        method: (req.method ?? 'GET').toUpperCase(),
        path: url.pathname,
        query,
        headers,
        body: raw.length > 0 ? raw.toString('utf8') : null,
      });

      const { contentType, body } = this.responseFor(req.method ?? 'GET', url.pathname);
      res.writeHead(200, { 'content-type': contentType });
      res.end(body);
    });
  }
}
