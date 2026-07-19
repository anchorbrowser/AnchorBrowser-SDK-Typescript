import { defineConfig } from '@hey-api/openapi-ts';

/**
 * Generates reference TypeScript types from the vendored OpenAPI spec into
 * generated/. These types are NOT part of the public API surface and are NOT
 * shipped in the package — the hand-maintained resource files under
 * src/resources/ own the public types.
 *
 * generated/ serves two purposes:
 *  1. When the spec changes, `yarn generate` shows exactly which shapes
 *     changed, so the matching hand edit in src/resources/ is mechanical.
 *  2. CI regenerates and fails on a dirty diff, so the committed generated
 *     types can never drift from spec/openapi.yaml.
 */
export default defineConfig({
  input: './spec/openapi.yaml',
  output: {
    path: 'generated',
    // repo prettier config is applied by `yarn generate` afterwards
    format: false,
    lint: false,
  },
  plugins: ['@hey-api/typescript'],
});
