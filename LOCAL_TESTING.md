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
yarn generate:check    # src/generated/ matches spec/openapi.yaml + sdk-manifest.yaml
yarn build             # publishable output into dist/
yarn api:check         # public API surface matches etc/ baselines
yarn test              # unit + spec-coverage + wire-parity suites
```

What each safety net covers:

| Check                    | Fails when                                                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn api:check`         | the public type surface (every exported type in the built d.ts) differs from `etc/api-surface.d.ts.snapshot` / `etc/anchorbrowser.api.md` |
| `yarn test tests/parity` | any SDK method sends a different HTTP request (method, path, query, headers, body) than the frozen baseline snapshots                     |
| `yarn test tests/spec`   | spec, `spec/sdk-manifest.yaml`, and generated classes disagree (e.g. a new spec operation without a naming entry)                         |
| `yarn generate:check`    | `src/generated/` doesn't match `spec/openapi.yaml` + `spec/sdk-manifest.yaml`                                                             |

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
import { client, Sessions } from 'anchorbrowser';

// reads ANCHORBROWSER_API_KEY from the environment by default
const session = await Sessions.createSession({ body: {} });
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
npm version 2.0.1 --no-git-tag-version   # bump (revert afterwards)
./scripts/pack-local                     # build + pack the exact artifact
git checkout package.json                # undo the rehearsal bump
```

The real release is cut from the Actions tab: **Release** workflow → enter
the version. It runs the full gate above, bumps/tags/creates the GitHub
release, and dispatches `publish-npm.yml` (npm OIDC trusted publishing).
