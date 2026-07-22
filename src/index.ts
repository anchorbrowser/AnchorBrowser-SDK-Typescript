/**
 * Anchorbrowser TypeScript SDK — generated from the public OpenAPI spec.
 *
 * Usage:
 * ```ts
 * import { client, Sessions } from 'anchorbrowser';
 *
 * client.setConfig({ auth: () => process.env['ANCHORBROWSER_API_KEY'] });
 * const session = await Sessions.createSession({ body: {} });
 * ```
 *
 * The resource classes, request/response types and HTTP client under
 * ./generated are fully regenerated from spec/openapi-sdk.yaml by
 * `yarn generate` — see CONTRIBUTING.md.
 */

// Generated resource classes and every request/response type
export * from './generated';

// The shared, configurable HTTP client (auth, baseUrl, interceptors, ...)
export { client } from './generated/client.gen';
export type { CreateClientConfig } from './generated/client.gen';
export { createClientConfig } from './hey-api';
export { VERSION } from './version';
export { createClient, createConfig } from './generated/client';
export type { Client, Config, ClientOptions as ClientConfigOptions } from './generated/client';

// Hand-written Playwright and AI-agent helpers
export * from './lib/browser';
export * from './lib/agent';
