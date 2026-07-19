import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { AddressInfo } from 'net';

export interface CapturedRequest {
  method: string;
  path: string;
  query: Record<string, string>;
  headers: Record<string, string>;
  body: string | null;
}

/**
 * Minimal HTTP server that records every request the SDK sends and replies
 * with a response the client can parse. Used by the wire-parity snapshot
 * suite: what the SDK puts on the wire must never change unintentionally.
 */
export class CaptureServer {
  private server: Server;
  requests: CapturedRequest[] = [];

  constructor() {
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

      // Reply with something each endpoint's response handling accepts.
      if (url.pathname.endsWith('/screenshot') || url.pathname.includes('/recordings/primary/fetch')) {
        res.writeHead(200, { 'content-type': 'image/png' });
        res.end(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
      } else if (url.pathname === '/v1/tools/screenshot') {
        res.writeHead(200, { 'content-type': 'image/png' });
        res.end(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
      } else if (url.pathname === '/v1/tools/fetch-webpage') {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end('<html></html>');
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ data: {} }));
      }
    });
  }
}
