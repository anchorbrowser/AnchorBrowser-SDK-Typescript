# Shared

Types:

- <code><a href="./src/resources/shared.ts">SuccessResponse</a></code>

# Profiles

Types:

- <code><a href="./src/resources/profiles.ts">ProfileRetrieveResponse</a></code>
- <code><a href="./src/resources/profiles.ts">ProfileListResponse</a></code>

Methods:

- <code title="post /v1/profiles">client.profiles.<a href="./src/resources/profiles.ts">create</a>({ ...params }) -> SuccessResponse</code>
- <code title="get /v1/profiles/{name}">client.profiles.<a href="./src/resources/profiles.ts">retrieve</a>(name) -> ProfileRetrieveResponse</code>
- <code title="put /v1/profiles/{name}">client.profiles.<a href="./src/resources/profiles.ts">update</a>(name, { ...params }) -> SuccessResponse</code>
- <code title="get /v1/profiles">client.profiles.<a href="./src/resources/profiles.ts">list</a>() -> ProfileListResponse</code>
- <code title="delete /v1/profiles/{name}">client.profiles.<a href="./src/resources/profiles.ts">delete</a>(name) -> SuccessResponse</code>

# Sessions

Types:

- <code><a href="./src/resources/sessions/sessions.ts">SessionCreateResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionCopyResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionDragAndDropResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionGotoResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionPasteResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionRetrieveDownloadsResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionScrollResponse</a></code>

Methods:

- <code title="post /v1/sessions">client.sessions.<a href="./src/resources/sessions/sessions.ts">create</a>({ ...params }) -> SessionCreateResponse</code>
- <code title="delete /v1/sessions/{session_id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">delete</a>(sessionID) -> SuccessResponse</code>
- <code title="post /v1/sessions/{sessionId}/copy">client.sessions.<a href="./src/resources/sessions/sessions.ts">copy</a>(sessionID) -> SessionCopyResponse</code>
- <code title="post /v1/sessions/{sessionId}/drag-and-drop">client.sessions.<a href="./src/resources/sessions/sessions.ts">dragAndDrop</a>(sessionID, { ...params }) -> SessionDragAndDropResponse</code>
- <code title="post /v1/sessions/{sessionId}/goto">client.sessions.<a href="./src/resources/sessions/sessions.ts">goto</a>(sessionID, { ...params }) -> SessionGotoResponse</code>
- <code title="post /v1/sessions/{sessionId}/paste">client.sessions.<a href="./src/resources/sessions/sessions.ts">paste</a>(sessionID, { ...params }) -> SessionPasteResponse</code>
- <code title="get /v1/sessions/{session_id}/downloads">client.sessions.<a href="./src/resources/sessions/sessions.ts">retrieveDownloads</a>(sessionID) -> SessionRetrieveDownloadsResponse</code>
- <code title="get /v1/sessions/{sessionId}/screenshot">client.sessions.<a href="./src/resources/sessions/sessions.ts">retrieveScreenshot</a>(sessionID) -> Response</code>
- <code title="post /v1/sessions/{sessionId}/scroll">client.sessions.<a href="./src/resources/sessions/sessions.ts">scroll</a>(sessionID, { ...params }) -> SessionScrollResponse</code>

## All

Types:

- <code><a href="./src/resources/sessions/all.ts">AllRetrieveStatusResponse</a></code>

Methods:

- <code title="delete /v1/sessions/all">client.sessions.all.<a href="./src/resources/sessions/all.ts">deleteAll</a>() -> SuccessResponse</code>
- <code title="get /v1/sessions/all/status">client.sessions.all.<a href="./src/resources/sessions/all.ts">retrieveStatus</a>() -> AllRetrieveStatusResponse</code>

## Recordings

Types:

- <code><a href="./src/resources/sessions/recordings/recordings.ts">RecordingListResponse</a></code>
- <code><a href="./src/resources/sessions/recordings/recordings.ts">RecordingPauseResponse</a></code>
- <code><a href="./src/resources/sessions/recordings/recordings.ts">RecordingResumeResponse</a></code>

Methods:

- <code title="get /v1/sessions/{session_id}/recordings">client.sessions.recordings.<a href="./src/resources/sessions/recordings/recordings.ts">list</a>(sessionID) -> RecordingListResponse</code>
- <code title="post /v1/sessions/{session_id}/recordings/pause">client.sessions.recordings.<a href="./src/resources/sessions/recordings/recordings.ts">pause</a>(sessionID) -> RecordingPauseResponse</code>
- <code title="post /v1/sessions/{session_id}/recordings/resume">client.sessions.recordings.<a href="./src/resources/sessions/recordings/recordings.ts">resume</a>(sessionID) -> RecordingResumeResponse</code>

### Primary

Methods:

- <code title="get /v1/sessions/{session_id}/recordings/primary/fetch">client.sessions.recordings.primary.<a href="./src/resources/sessions/recordings/primary.ts">retrieveFetch</a>(sessionID) -> Response</code>

## Mouse

Types:

- <code><a href="./src/resources/sessions/mouse.ts">MouseClickResponse</a></code>
- <code><a href="./src/resources/sessions/mouse.ts">MouseDoubleClickResponse</a></code>
- <code><a href="./src/resources/sessions/mouse.ts">MouseDownResponse</a></code>
- <code><a href="./src/resources/sessions/mouse.ts">MouseMoveResponse</a></code>
- <code><a href="./src/resources/sessions/mouse.ts">MouseUpResponse</a></code>

Methods:

- <code title="post /v1/sessions/{sessionId}/mouse/click">client.sessions.mouse.<a href="./src/resources/sessions/mouse.ts">click</a>(sessionID, { ...params }) -> MouseClickResponse</code>
- <code title="post /v1/sessions/{sessionId}/mouse/doubleClick">client.sessions.mouse.<a href="./src/resources/sessions/mouse.ts">doubleClick</a>(sessionID, { ...params }) -> MouseDoubleClickResponse</code>
- <code title="post /v1/sessions/{sessionId}/mouse/down">client.sessions.mouse.<a href="./src/resources/sessions/mouse.ts">down</a>(sessionID, { ...params }) -> MouseDownResponse</code>
- <code title="post /v1/sessions/{sessionId}/mouse/move">client.sessions.mouse.<a href="./src/resources/sessions/mouse.ts">move</a>(sessionID, { ...params }) -> MouseMoveResponse</code>
- <code title="post /v1/sessions/{sessionId}/mouse/up">client.sessions.mouse.<a href="./src/resources/sessions/mouse.ts">up</a>(sessionID, { ...params }) -> MouseUpResponse</code>

## Keyboard

Types:

- <code><a href="./src/resources/sessions/keyboard.ts">KeyboardShortcutResponse</a></code>
- <code><a href="./src/resources/sessions/keyboard.ts">KeyboardTypeResponse</a></code>

Methods:

- <code title="post /v1/sessions/{sessionId}/keyboard/shortcut">client.sessions.keyboard.<a href="./src/resources/sessions/keyboard.ts">shortcut</a>(sessionID, { ...params }) -> KeyboardShortcutResponse</code>
- <code title="post /v1/sessions/{sessionId}/keyboard/type">client.sessions.keyboard.<a href="./src/resources/sessions/keyboard.ts">type</a>(sessionID, { ...params }) -> KeyboardTypeResponse</code>

## Clipboard

Types:

- <code><a href="./src/resources/sessions/clipboard.ts">ClipboardCreateResponse</a></code>
- <code><a href="./src/resources/sessions/clipboard.ts">ClipboardListResponse</a></code>

Methods:

- <code title="post /v1/sessions/{sessionId}/clipboard">client.sessions.clipboard.<a href="./src/resources/sessions/clipboard.ts">create</a>(sessionID, { ...params }) -> ClipboardCreateResponse</code>
- <code title="get /v1/sessions/{sessionId}/clipboard">client.sessions.clipboard.<a href="./src/resources/sessions/clipboard.ts">list</a>(sessionID) -> ClipboardListResponse</code>

# Tools

Types:

- <code><a href="./src/resources/tools.ts">ToolFetchWebpageResponse</a></code>
- <code><a href="./src/resources/tools.ts">ToolPerformWebTaskResponse</a></code>

Methods:

- <code title="post /v1/tools/fetch-webpage">client.tools.<a href="./src/resources/tools.ts">fetchWebpage</a>({ ...params }) -> string</code>
- <code title="post /v1/tools/perform-web-task">client.tools.<a href="./src/resources/tools.ts">performWebTask</a>({ ...params }) -> ToolPerformWebTaskResponse</code>
- <code title="post /v1/tools/screenshot">client.tools.<a href="./src/resources/tools.ts">screenshotWebpage</a>({ ...params }) -> Response</code>

# Extensions

Types:

- <code><a href="./src/resources/extensions.ts">ExtensionManifest</a></code>
- <code><a href="./src/resources/extensions.ts">ExtensionRetrieveResponse</a></code>
- <code><a href="./src/resources/extensions.ts">ExtensionListResponse</a></code>
- <code><a href="./src/resources/extensions.ts">ExtensionDeleteResponse</a></code>
- <code><a href="./src/resources/extensions.ts">ExtensionUploadResponse</a></code>

Methods:

- <code title="get /v1/extensions/{id}">client.extensions.<a href="./src/resources/extensions.ts">retrieve</a>(id) -> ExtensionRetrieveResponse</code>
- <code title="get /v1/extensions">client.extensions.<a href="./src/resources/extensions.ts">list</a>() -> ExtensionListResponse</code>
- <code title="delete /v1/extensions/{id}">client.extensions.<a href="./src/resources/extensions.ts">delete</a>(id) -> ExtensionDeleteResponse</code>
- <code title="post /v1/extensions">client.extensions.<a href="./src/resources/extensions.ts">upload</a>({ ...params }) -> ExtensionUploadResponse</code>
