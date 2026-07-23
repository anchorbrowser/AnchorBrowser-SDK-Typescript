import { createClient, createConfig, type Client, type ClientOptions, type Config } from './generated/client';
import type { CreateClientConfig } from './generated/client.gen';
import { installErrorInterceptor } from './lib/errors';
import { VERSION } from './version';

/**
 * Default runtime configuration for the generated client.
 *
 * - base URL defaults to production; override with `client.setConfig({ baseUrl })`
 * - the API key is read from ANCHORBROWSER_API_KEY unless set explicitly via
 *   `client.setConfig({ auth: () => '...' })` or the `apiKey` header
 * - errors throw (like the v1 SDK) instead of returning `{ error }` envelopes
 *
 * Note: this only builds the *config* — it can't attach the typed-error
 * interceptor (that requires the constructed `Client`). The shared default
 * `client` gets it via `installErrorInterceptor` in `src/index.ts`; use
 * `createAnchorbrowserClient` below for any additional client.
 */
export const createClientConfig: CreateClientConfig = (config) => ({
  baseUrl: 'https://api.anchorbrowser.io',
  auth: () => (globalThis as any).process?.env?.['ANCHORBROWSER_API_KEY'],
  throwOnError: true,
  ...config,
  headers: {
    'User-Agent': `Anchorbrowser/JS ${VERSION}`,
    'X-Anchor-Sdk': `typescript/${VERSION}`,
    ...(config?.headers as Record<string, unknown> | undefined),
  },
});

export function createAnchorbrowserClient(config?: Config<ClientOptions>): Client {
  const baseConfig = createConfig<ClientOptions>(config);
  const client = createClient(createClientConfig(baseConfig as Parameters<typeof createClientConfig>[0]));
  installErrorInterceptor(client);
  return client;
}
