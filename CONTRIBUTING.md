## Setting up the environment

This repository uses [`yarn@v1`](https://classic.yarnpkg.com/lang/en/docs/install).
Other package managers may work but are not officially supported for development.

To set up the repository, run:

```sh
$ yarn
$ yarn build
```

This will install all the required dependencies and build output files to `dist/`.

## Modifying/Adding code

This SDK is hand-maintained. The resource classes under `src/resources/` were originally
generated from our OpenAPI spec and are kept in sync with `spec/openapi.yaml` by hand;
`spec/sdk-manifest.yaml` maps every exposed operation to its resource/method name.

To add or change an endpoint:

1. Update `spec/openapi.yaml` and `spec/sdk-manifest.yaml` (canonical copies live in the
   anchorbrowser monorepo under `docs/` and are synced here by the spec-sync pipeline).
2. Run `yarn generate` to refresh the reference types in `generated/` (not shipped;
   used to see exactly which shapes changed).
3. Add/update the method in the matching `src/resources/` file and the parity call in
   `tests/parity/calls.ts`.
4. Run `yarn test` — the spec-coverage suite fails until manifest, spec, client methods,
   and parity calls all agree.
5. Run `yarn build && yarn api:update` to refresh the public API surface baseline, and
   review the diff of `etc/` — it is the reviewable record of every surface change.

The `src/lib/` and `examples/` directories are free-form hand-written code (Playwright
and agent helpers live in `src/lib/`).

## Adding and running examples

All files in the `examples/` directory are not modified by the generator and can be freely edited or added to.

```ts
// add an example to examples/<your-example>.ts

#!/usr/bin/env -S npm run tsn -T
…
```

```sh
$ chmod +x examples/<your-example>.ts
# run the example against your api
$ yarn tsn -T examples/<your-example>.ts
```

## Using the repository from source

If you’d like to use the repository from source, you can either install from git or link to a cloned repository:

To install via git:

```sh
$ npm install git+ssh://git@github.com:anchorbrowser/AnchorBrowser-SDK-Typescript.git
```

Alternatively, to link a local copy of the repo:

```sh
# Clone
$ git clone https://www.github.com/anchorbrowser/AnchorBrowser-SDK-Typescript
$ cd AnchorBrowser-SDK-Typescript

# With yarn
$ yarn link
$ cd ../my-package
$ yarn link anchorbrowser

# With pnpm
$ pnpm link --global
$ cd ../my-package
$ pnpm link --global anchorbrowser
```

## Running tests

```sh
$ yarn run test
```

## Linting and formatting

This repository uses [prettier](https://www.npmjs.com/package/prettier) and
[eslint](https://www.npmjs.com/package/eslint) to format the code in the repository.

To lint:

```sh
$ yarn lint
```

To format and fix all lint issues automatically:

```sh
$ yarn fix
```

## Publishing and releases

Releases are cut with [the `Release` GitHub action](https://www.github.com/anchorbrowser/AnchorBrowser-SDK-Typescript/actions/workflows/release.yml):
run it with the new semver version as input. It bumps the version, updates the changelog,
tags, creates a GitHub release, and publishes to npm (via OIDC trusted publishing).

To validate a build locally before releasing, see [LOCAL_TESTING.md](LOCAL_TESTING.md).

### Publish manually

If you need to manually publish a package, you can run the `bin/publish-npm` script with an `NPM_TOKEN` set on
the environment.
