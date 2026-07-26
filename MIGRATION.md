# Migrating from v0.x.x to v1

Version 1 regenerates the SDK directly from the public OpenAPI spec
(`docs/openapi.yaml`) instead of a Stainless build. The public
API surface changed shape — every integration needs the updates below. This
guide covers every breaking change; nothing else changed silently.

## Client construction

```diff
- import Anchorbrowser from 'anchorbrowser';
- const client = new Anchorbrowser({ apiKey: process.env.ANCHORBROWSER_API_KEY });
+ import { client } from 'anchorbrowser';
+ client.setConfig({ auth: () => process.env.ANCHORBROWSER_API_KEY });
```

`ANCHORBROWSER_API_KEY` is read from the environment automatically, so
`client.setConfig(...)` is only needed if you set the key explicitly or
override `baseUrl`.

For an additional client (e.g. a second environment), use
`createAnchorbrowserClient` instead of constructing a second
`new Anchorbrowser(...)` — it keeps the same defaults (env auth, typed
errors, User-Agent) as the shared `client`:

```diff
- const secondClient = new Anchorbrowser({ apiKey: '...', baseURL: 'https://api.example.com' });
+ const secondClient = createAnchorbrowserClient({
+   baseUrl: 'https://api.example.com',
+   auth: () => process.env.EXAMPLE_API_KEY,
+ });
```

## Method calls

Every v0.x.x `client.<resource>.<method>(...)` call becomes a static method on a
resource class, taking one options object with `path`/`query`/`body` keys
matching the operation:

```diff
- const session = await client.sessions.create({ session: { recording: { active: false } } });
+ const session = await Sessions.createSession({ body: { session: { recording: { active: false } } } });

- await client.sessions.goto(sessionId, { url: 'https://example.com' });
+ await Sessions.goto({ path: { sessionId }, body: { url: 'https://example.com' } });

- await client.sessions.mouse.click(sessionId, { x: 0, y: 0 });
+ await Sessions.mouseClick({ path: { sessionId }, body: { x: 0, y: 0 } });
```

Import the classes you use from `'anchorbrowser'` (`Sessions`, `Tools`,
`Identities`, `Applications`, `Webhooks`, `Tasks`, `TasksLegacy`,
`BatchSessions`, `Recordings`, `Agent`, `Events`, `Extensions`,
`Certificates`, `Integrations`, `Profiles`, `Billing` — see the
[SDK Reference](https://docs.anchorbrowser.io/sdk-reference/overview) for
every method and its exact shape).

Responses return the parsed body directly (no change to the JSON shape
itself — `session.data.id` still works exactly as before).

### Nested resources flatten to method name prefixes

```diff
- await client.sessions.recordings.list(sessionId);
+ await Recordings.listRecordings({ path: { session_id: sessionId } });

- await client.sessions.all.status();
+ await Sessions.getAllSessionsStatus();

- await client.applications.authFlows.create(applicationId, body);
+ await Applications.createAuthFlow({ path: { applicationId }, body });
```

### Tasks split into two classes

The v1 (non-deprecated) task endpoints and the legacy v0.x.x task-CRUD endpoints
are now on separate classes — both are still fully available:

```diff
- await client.tasks.generate({ taskName, taskPrompt });
- await client.tasks.run(taskId, { input_params });
+ await Tasks.generateTask({ body: { taskName, taskPrompt } });
+ await Tasks.runTask({ path: { taskId }, body: { input_params } });

- await client.task.create({ name, language, code });
+ await TasksLegacy.createTask({ body: { name, language, code } });
```

## Error handling — unchanged

Typed errors are back to full parity with v0.x.x — every class (`APIError`,
`NotFoundError`, `AuthenticationError`, `PermissionDeniedError`,
`ConflictError`, `RateLimitError`, `BadRequestError`,
`UnprocessableEntityError`, `InternalServerError`, `APIConnectionError`,
`APIConnectionTimeoutError`, `APIUserAbortError`, `AnchorbrowserError`) is
exported with the same name and thrown the same way:

```ts
import { Sessions, NotFoundError } from 'anchorbrowser';

try {
  await Sessions.getSession({ path: { session_id: id } });
} catch (err) {
  if (err instanceof NotFoundError) {
    // err.status, err.error (raw response body), err.message all still work
  }
}
```

If you built a custom client with `createClient`/`createConfig` directly
(bypassing the shared `client`), typed errors aren't wired in automatically —
use `createAnchorbrowserClient` instead, or call
`installErrorInterceptor(yourClient)` yourself.

## File uploads

`Uploadable` is gone — pass a `File` directly (native on Node 20+), or use
`toFile()` for a Buffer/Blob/stream/async-iterable (works on Node 18 too):

```diff
- await client.sessions.uploadFile(sessionId, { file: fs.createReadStream('./file.txt') });
+ await Sessions.uploadFile({
+   path: { sessionId },
+   body: { file: await toFile(fs.createReadStream('./file.txt'), 'file.txt') },
+ });
```

## Playwright & agent helpers

Only the import changes — the options and return shapes are the same:

```diff
- const browser = await client.browser.create();
+ const { browser } = await createBrowser(); // now also returns { session }

- await client.browser.connect(sessionId);
+ await connectBrowser(sessionId);

- const result = await client.agent.task(prompt, { taskOptions });
+ const result = await agentTask(prompt, { taskOptions });

- const { sessionId, taskResultPromise, playwrightBrowser } = await client.agent.browserTask(prompt, opts);
+ const { sessionId, taskResultPromise, playwrightBrowser } = await agentBrowserTask(prompt, opts);
```

## New in v2

The SDK is now generated directly from the public spec, so it also gained
operations the previous SDK never had, including `Webhooks`, `BatchSessions`,
`Certificates`, `Integrations`, async sessions
(`Sessions.createSessionAsync`), and human-intervention endpoints (`Agent`).
See the [SDK Reference](https://docs.anchorbrowser.io/sdk-reference/overview)
for the full method list.
