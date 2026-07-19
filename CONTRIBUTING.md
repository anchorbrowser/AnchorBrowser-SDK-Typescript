## Setting up the environment

This repository uses [`yarn@v1`](https://classic.yarnpkg.com/lang/en/docs/install).

```sh
$ yarn
$ yarn build
```

## How this SDK is built

The SDK is **fully generated** from the public OpenAPI spec:

```
spec/openapi.yaml          verbatim copy of the monorepo's docs/openapi.yaml (the source of truth)
spec/sdk-manifest.yaml     operation -> Class.method naming map
spec/openapi-sdk.yaml      generated: openapi.yaml + naming injected (operationId/tags)
src/generated/             generated: resource classes, types, HTTP client — never edit
src/hey-api.ts             hand-written: runtime defaults (baseUrl, env auth, throwOnError)
src/lib/                   hand-written: Playwright + AI-agent helpers
src/index.ts               hand-written: public entry point
```

`yarn generate` runs the whole chain: `prepare-spec.cjs` → `@hey-api/openapi-ts` → prettier.

### Changing the API surface

1. Change `docs/openapi.yaml` in the anchorbrowser monorepo — that's the source of truth.
   The spec-sync pipeline copies it here and opens a regeneration PR automatically
   (or copy it to `spec/openapi.yaml` manually for local work).
2. Add a naming entry for any new operation in `spec/sdk-manifest.yaml`
   (`"post /v1/foo": { class: Foo, method: createFoo }`). Without one, the
   operation still generates with a deterministic auto-derived name — CI's
   coverage test fails until the naming is made explicit.
3. Run `yarn generate`.
4. Run `yarn build && yarn api:update` and `yarn test tests/parity -u` to refresh
   the baselines — their diffs are the reviewable record of the surface change.
5. `yarn lint && yarn test`.

## Running tests & checks

```sh
$ yarn lint              # prettier, eslint, build, tsc, attw, publint
$ yarn generate:check    # generated output matches the spec
$ yarn api:check         # public type surface matches etc/ baselines
$ yarn test              # spec-coverage + wire-parity suites
```

## Using the repository from source

See [LOCAL_TESTING.md](LOCAL_TESTING.md) — `./scripts/pack-local` builds the exact
publishable tarball for installing in another project.

## Publishing and releases

Releases are cut with [the `Release` GitHub action](https://www.github.com/anchorbrowser/AnchorBrowser-SDK-Typescript/actions/workflows/release.yml):
run it with the new semver version as input. It bumps the version, updates the changelog,
tags, creates a GitHub release, and publishes to npm (via OIDC trusted publishing).

To publish manually, run `bin/publish-npm` with an `NPM_TOKEN` set in the environment.
