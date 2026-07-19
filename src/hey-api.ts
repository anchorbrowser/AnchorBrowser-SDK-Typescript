import type { CreateClientConfig } from './generated/client.gen';

/**
 * Default runtime configuration for the generated client.
 *
 * - base URL defaults to production; override with `client.setConfig({ baseUrl })`
 * - the API key is read from ANCHORBROWSER_API_KEY unless set explicitly via
 *   `client.setConfig({ auth: () => '...' })` or the `apiKey` header
 * - errors throw (like the v1 SDK) instead of returning `{ error }` envelopes
 */
export const createClientConfig: CreateClientConfig = (config) => ({
  baseUrl: 'https://api.anchorbrowser.io',
  auth: () => (globalThis as any).process?.env?.['ANCHORBROWSER_API_KEY'],
  throwOnError: true,
  ...config,
});
