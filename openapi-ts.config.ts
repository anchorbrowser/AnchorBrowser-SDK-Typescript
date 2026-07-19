import { defineConfig } from '@hey-api/openapi-ts';

/**
 * Full SDK generation from the public OpenAPI spec.
 *
 * Input is spec/openapi-sdk.yaml — produced by scripts/utils/prepare-spec.cjs
 * from spec/openapi.yaml (verbatim copy of the monorepo's docs/openapi.yaml)
 * plus the naming map in spec/sdk-manifest.yaml. Everything under
 * src/generated/ is regenerated wholesale by `yarn generate`; never edit it.
 *
 * Hand-written code lives in src/index.ts, src/hey-api.ts and src/lib/.
 */
export default defineConfig({
  input: './spec/openapi-sdk.yaml',
  output: {
    path: 'src/generated',
    format: false,
    lint: false,
  },
  plugins: [
    '@hey-api/typescript',
    {
      name: '@hey-api/sdk',
      auth: true,
      // one class per resource (classes come from the tags injected by
      // prepare-spec.cjs out of spec/sdk-manifest.yaml)
      operations: { strategy: 'byTags' },
      // return the response data directly and throw on errors — same mental
      // model as the v1 SDK
      responseStyle: 'data',
    },
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './src/hey-api',
      // generated methods default to throwing on error (type-level);
      // src/hey-api.ts sets the matching runtime default
      throwOnError: true,
    },
  ],
});
