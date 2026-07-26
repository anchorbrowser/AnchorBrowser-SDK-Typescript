# Anchorbrowser TypeScript API Library

[![NPM version](<https://img.shields.io/npm/v/anchorbrowser.svg?label=npm%20(stable)>)](https://npmjs.org/package/anchorbrowser) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/anchorbrowser)

This library provides convenient access to the Anchorbrowser REST API from server-side TypeScript or JavaScript.

The REST API documentation can be found on [docs.anchorbrowser.io](https://docs.anchorbrowser.io/api-reference). The SDK is generated directly from the public OpenAPI specification — every documented endpoint is available as a typed method.

> **Upgrading from v0.X.X?** See [MIGRATION.md](MIGRATION.md) for every breaking change and its v1 equivalent.

## Installation

```sh
npm install anchorbrowser
```

## Usage

```ts
import { client, Sessions } from 'anchorbrowser';

// The API key is read from the ANCHORBROWSER_API_KEY environment variable
// by default; set it explicitly like this:
client.setConfig({ auth: () => 'your-api-key' });

const session = await Sessions.createSession({
  body: { session: { recording: { active: true } } },
});
console.log(session.data);
```

Every resource is a class of static methods, one per API operation:

| Class                                                         | Operations                                                                                                         |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `Sessions`                                                    | create/list/get/delete sessions, screenshots, uploads, OS-level control (mouse, keyboard, clipboard, goto, scroll) |
| `Tools`                                                       | `performWebTask`, `fetchWebpage`, `screenshotWebpage`, `executeCode`, `createPagePdf`                              |
| `Profiles`, `Identities`, `Applications`                      | profile & identity management                                                                                      |
| `Webhooks`                                                    | webhook CRUD, secret rotation, test events                                                                         |
| `BatchSessions`, `Certificates`, `Integrations`, `Extensions` | platform resources                                                                                                 |
| `Tasks`, `TasksLegacy`                                        | task execution (v2) and the legacy v1 task API                                                                     |
| `Recordings`, `Agent`, `Events`, `Billing`                    | recordings, agent files & interventions, event signaling, billing info                                             |

Methods take a single options object with `path`, `query` and `body` keys matching the OpenAPI operation, and return the parsed response body. Failures (non-2xx, network) throw.

```ts
import { Sessions, Webhooks } from 'anchorbrowser';

const session = await Sessions.createSession({
  body: { session: { recording: { active: true } } },
});

await Sessions.goto({
  path: { sessionId: session.data.id },
  body: { url: 'https://example.com' },
});

const hooks = await Webhooks.listWebhooks();
```

### Playwright helpers

```ts
import { createBrowser, connectBrowser } from 'anchorbrowser';

// create a session and connect Playwright Chromium over CDP
const { browser, session } = await createBrowser({
  sessionOptions: { session: { recording: { active: true } } },
});
const page = browser.contexts()[0].pages()[0];
await page.goto('https://example.com');
await browser.close();
```

### AI agent tasks

```ts
import { agentTask } from 'anchorbrowser';

const result = await agentTask('Find the current weather in Tokyo', {
  taskOptions: {
    url: 'https://weather.com',
    onAgentStep: (step) => console.log(step),
  },
});
console.log(result.data.result);
```

### Error handling

Failures throw a typed error — check `instanceof` to branch on the failure kind, or read `.status`/`.error` for the raw response:

```ts
import { Sessions, NotFoundError, APIError } from 'anchorbrowser';

try {
  await Sessions.getSession({ path: { session_id: 'does-not-exist' } });
} catch (err) {
  if (err instanceof NotFoundError) {
    console.log('no such session');
  } else if (err instanceof APIError) {
    console.log(err.status, err.message, err.error); // err.error is the raw response body
  } else {
    throw err; // network/connection error (APIConnectionError, APIConnectionTimeoutError, ...)
  }
}
```

### File uploads

Pass a `File` (built into Node 20+), or use `toFile()` for a Buffer/Blob/stream/async-iterable — it also works on Node 18, where `File` isn't a global:

```ts
import { Sessions, toFile } from 'anchorbrowser';

const session = await Sessions.createSession({
  body: { session: { recording: { active: true } } },
});

await Sessions.uploadFile({
  path: { sessionId: session.data.id },
  body: { file: await toFile(Buffer.from('data'), 'data.txt') },
});
```

## Types

Request and response types are exported for every operation:

```ts
import type { CreateSessionData, SessionCreateResponseSchema, BrowserConfig } from 'anchorbrowser';
```

## Requirements

TypeScript >= 4.9 and Node.js 18 LTS or later. The Playwright and agent helpers require Node.js.

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. The SDK surface is generated from the public OpenAPI spec; additions ship as minor versions, removals or renames as major versions.

We are keen for your feedback; please open an [issue](https://www.github.com/anchorbrowser/AnchorBrowser-SDK-Typescript/issues) with questions, bugs, or suggestions.
