## Setting up the environment

This repository uses [`yarn@v1`](https://classic.yarnpkg.com/lang/en/docs/install).

```sh
$ yarn
$ yarn build
```

## How this SDK is built

The SDK is **fully generated** from the public OpenAPI spec.

`yarn generate` runs the whole chain: `prepare-spec.cjs` → `@hey-api/openapi-ts` → prettier.


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
