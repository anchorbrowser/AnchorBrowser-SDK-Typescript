import { createServer, Server } from 'http';
import { AddressInfo } from 'net';
import {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  APIUserAbortError,
  AuthenticationError,
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
  PermissionDeniedError,
  RateLimitError,
  UnprocessableEntityError,
  installErrorInterceptor,
} from '../../src/lib/errors';
import { createClient, createConfig } from '../../src/generated/client';

describe('APIError.generate', () => {
  it.each([
    [400, BadRequestError],
    [401, AuthenticationError],
    [403, PermissionDeniedError],
    [404, NotFoundError],
    [409, ConflictError],
    [422, UnprocessableEntityError],
    [429, RateLimitError],
    [500, InternalServerError],
    [502, InternalServerError],
    [418, APIError],
  ])('maps status %d to %p', (status, ExpectedClass) => {
    const err = APIError.generate(status, { error: { message: 'boom' } }, undefined, undefined);
    expect(err).toBeInstanceOf(ExpectedClass);
    expect(err).toBeInstanceOf(APIError);
    expect(err).toBeInstanceOf(Error);
    expect((err as APIError).status).toBe(status);
  });

  it('returns an APIConnectionError when there is no status', () => {
    const err = APIError.generate(undefined, new Error('ECONNREFUSED'), undefined, undefined);
    expect(err).toBeInstanceOf(APIConnectionError);
    expect(err).not.toBeInstanceOf(APIError);
  });

  it.each([
    [{ error: { message: 'nested' } }, '404 nested'],
    [{ message: 'flat' }, '404 flat'],
    ['plain string body', '404 plain string body'],
    [{}, '404 status code (no body)'],
    [null, '404 status code (no body)'],
  ])('extracts the message from %p', (body, expected) => {
    const err = APIError.generate(404, body, undefined, undefined);
    expect(err.message).toBe(expected);
  });

  it('prefers an explicitly passed message over the body', () => {
    const err = APIError.generate(404, { error: { message: 'from body' } }, 'explicit message', undefined);
    expect(err.message).toBe('explicit message');
  });
});

describe('installErrorInterceptor wired into a real client', () => {
  let server: Server;
  let client: ReturnType<typeof createClient>;

  beforeAll(async () => {
    server = createServer((_req, res) => {
      res.writeHead(404, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: { message: 'not found' } }));
    });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address() as AddressInfo;

    client = createClient(
      createConfig({ baseUrl: `http://127.0.0.1:${port}`, auth: () => 'k', throwOnError: true }),
    );
    installErrorInterceptor(client);
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('throws a typed NotFoundError for a 404 response', async () => {
    await expect(client.get({ url: '/v1/does-not-exist' })).rejects.toBeInstanceOf(NotFoundError);
  });

  it('throws a typed APIConnectionError when the server is unreachable', async () => {
    const deadClient = createClient(createConfig({ baseUrl: 'http://127.0.0.1:1', throwOnError: true }));
    installErrorInterceptor(deadClient);
    await expect(deadClient.get({ url: '/v1/x' })).rejects.toBeInstanceOf(APIConnectionError);
  });
});

describe('error classes are plain, constructible Error subclasses', () => {
  it('APIConnectionTimeoutError', () => {
    const err = new APIConnectionTimeoutError();
    expect(err).toBeInstanceOf(APIConnectionError);
    expect(err.message).toBe('Request timed out.');
  });

  it('APIUserAbortError', () => {
    const err = new APIUserAbortError();
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('Request was aborted.');
  });
});
