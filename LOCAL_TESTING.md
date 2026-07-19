# Building & testing the SDK locally

How to build, verify, and try the SDK on your machine before anything is
released to npm.

## One-time setup

```sh
yarn install
```

## The full local quality gate

This is the same gate CI and the Release workflow run:

```sh
yarn lint              # eslint + prettier + type checks
yarn generate:check    # generated/ types are in sync with spec/openapi.yaml
yarn build             # publishable output into dist/
yarn api:check         # public API surface matches etc/ baselines
yarn test              # unit + spec-coverage + wire-parity suites
```

What each safety net covers:

| Check                    | Fails when                                                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn api:check`         | the public type surface (every exported type in the built d.ts) differs from `etc/api-surface.d.ts.snapshot` / `etc/anchorbrowser.api.md` |
| `yarn test tests/parity` | any SDK method sends a different HTTP request (method, path, query, headers, body) than the frozen baseline snapshots                     |
| `yarn test tests/spec`   | spec, `spec/sdk-manifest.yaml`, client methods, and parity calls disagree (e.g. a spec operation nobody mapped or excluded)               |
| `yarn generate:check`    | `generated/` reference types don't match `spec/openapi.yaml`                                                                              |

## Trying the SDK in another project

### Option A — local tarball (closest to a real npm install)

```sh
./scripts/pack-local
# ==> Local tarball ready: .../anchorbrowser-1.0.0-dev.4.tgz
```

Then in any test project:

```sh
mkdir sdk-test && cd sdk-test && npm init -y
npm install /path/to/AnchorBrowser-SDK-Typescript/anchorbrowser-<version>.tgz
```

```ts
import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({ apiKey: process.env['ANCHORBROWSER_API_KEY']! });
const session = await client.sessions.create();
console.log(session.data?.id);
```

This exercises the exact artifact that `bin/publish-npm` would upload —
package.json export maps, CJS/ESM builds, and type declarations included.

### Option B — link the repo (fast iteration)

```sh
# in this repo
yarn link
# in your test project
yarn link anchorbrowser
```

Note: linking points at the repo root, not the built `dist/` — run
`yarn build` after changes, and prefer Option A for release validation.

## Testing against a real environment

The client reads `ANCHORBROWSER_API_KEY` from the environment; pass
`baseURL` to target something other than production:

```ts
const client = new Anchorbrowser({
  baseURL: 'https://api.dev.anchorbrowser.io', // staging
});
```

The monorepo's `scripts/` sanity scripts (e.g. `sanity_simple_session.js`)
are a good end-to-end smoke suite: install the tarball there and run them
against staging.

## Updating baselines intentionally

When you _intend_ to change the public surface or wire behavior (e.g. adding
an endpoint):

```sh
yarn build && yarn api:update          # refresh etc/ surface baselines
yarn test tests/parity -u              # refresh wire snapshots
```

Both diffs are committed and reviewable — they are the record of the change.

## Release rehearsal

Everything the Release workflow does can be rehearsed locally without
publishing:

```sh
npm version 1.2.3 --no-git-tag-version   # bump (revert afterwards)
node scripts/utils/check-version.cjs      # sync src/version.ts
./scripts/pack-local                      # build + pack the exact artifact
git checkout package.json src/version.ts  # undo the rehearsal bump
```

The real release is cut from the Actions tab: **Release** workflow → enter
the version. It runs the full gate above, bumps/tags/creates the GitHub
release, and dispatches `publish-npm.yml` (npm OIDC trusted publishing).
