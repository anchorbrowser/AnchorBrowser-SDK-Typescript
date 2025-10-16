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
- <code title="get /v1/profiles">client.profiles.<a href="./src/resources/profiles.ts">list</a>() -> ProfileListResponse</code>
- <code title="delete /v1/profiles/{name}">client.profiles.<a href="./src/resources/profiles.ts">delete</a>(name) -> SuccessResponse</code>

# Sessions

Types:

- <code><a href="./src/resources/sessions/sessions.ts">SessionCreateResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionRetrieveResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionCopyResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionDragAndDropResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionGotoResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionListPagesResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionPasteResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionRetrieveDownloadsResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionScrollResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionUploadFileResponse</a></code>

Methods:

- <code title="post /v1/sessions">client.sessions.<a href="./src/resources/sessions/sessions.ts">create</a>({ ...params }) -> SessionCreateResponse</code>
- <code title="get /v1/sessions/{session_id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">retrieve</a>(sessionID) -> SessionRetrieveResponse</code>
- <code title="delete /v1/sessions/{session_id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">delete</a>(sessionID) -> SuccessResponse</code>
- <code title="post /v1/sessions/{sessionId}/copy">client.sessions.<a href="./src/resources/sessions/sessions.ts">copy</a>(sessionID) -> SessionCopyResponse</code>
- <code title="post /v1/sessions/{sessionId}/drag-and-drop">client.sessions.<a href="./src/resources/sessions/sessions.ts">dragAndDrop</a>(sessionID, { ...params }) -> SessionDragAndDropResponse</code>
- <code title="post /v1/sessions/{sessionId}/goto">client.sessions.<a href="./src/resources/sessions/sessions.ts">goto</a>(sessionID, { ...params }) -> SessionGotoResponse</code>
- <code title="get /v1/sessions/{session_id}/pages">client.sessions.<a href="./src/resources/sessions/sessions.ts">listPages</a>(sessionID) -> SessionListPagesResponse</code>
- <code title="post /v1/sessions/{sessionId}/paste">client.sessions.<a href="./src/resources/sessions/sessions.ts">paste</a>(sessionID, { ...params }) -> SessionPasteResponse</code>
- <code title="get /v1/sessions/{session_id}/downloads">client.sessions.<a href="./src/resources/sessions/sessions.ts">retrieveDownloads</a>(sessionID) -> SessionRetrieveDownloadsResponse</code>
- <code title="get /v1/sessions/{sessionId}/screenshot">client.sessions.<a href="./src/resources/sessions/sessions.ts">retrieveScreenshot</a>(sessionID) -> Response</code>
- <code title="post /v1/sessions/{sessionId}/scroll">client.sessions.<a href="./src/resources/sessions/sessions.ts">scroll</a>(sessionID, { ...params }) -> SessionScrollResponse</code>
- <code title="post /v1/sessions/{sessionId}/uploads">client.sessions.<a href="./src/resources/sessions/sessions.ts">uploadFile</a>(sessionID, { ...params }) -> SessionUploadFileResponse</code>

## All

Types:

- <code><a href="./src/resources/sessions/all.ts">AllStatusResponse</a></code>

Methods:

- <code title="delete /v1/sessions/all">client.sessions.all.<a href="./src/resources/sessions/all.ts">delete</a>() -> SuccessResponse</code>
- <code title="get /v1/sessions/all/status">client.sessions.all.<a href="./src/resources/sessions/all.ts">status</a>() -> AllStatusResponse</code>

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

- <code title="get /v1/sessions/{session_id}/recordings/primary/fetch">client.sessions.recordings.primary.<a href="./src/resources/sessions/recordings/primary.ts">get</a>(sessionID) -> Response</code>

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

- <code><a href="./src/resources/sessions/clipboard.ts">ClipboardGetResponse</a></code>
- <code><a href="./src/resources/sessions/clipboard.ts">ClipboardSetResponse</a></code>

Methods:

- <code title="get /v1/sessions/{sessionId}/clipboard">client.sessions.clipboard.<a href="./src/resources/sessions/clipboard.ts">get</a>(sessionID) -> ClipboardGetResponse</code>
- <code title="post /v1/sessions/{sessionId}/clipboard">client.sessions.clipboard.<a href="./src/resources/sessions/clipboard.ts">set</a>(sessionID, { ...params }) -> ClipboardSetResponse</code>

## Agent

Methods:

- <code title="post /v1/sessions/{session_id}/agent/pause">client.sessions.agent.<a href="./src/resources/sessions/agent/agent.ts">pause</a>(sessionID) -> SuccessResponse</code>
- <code title="post /v1/sessions/{session_id}/agent/resume">client.sessions.agent.<a href="./src/resources/sessions/agent/agent.ts">resume</a>(sessionID) -> SuccessResponse</code>

### Files

Types:

- <code><a href="./src/resources/sessions/agent/files.ts">FileListResponse</a></code>
- <code><a href="./src/resources/sessions/agent/files.ts">FileUploadResponse</a></code>

Methods:

- <code title="get /v1/sessions/{sessionId}/agent/files">client.sessions.agent.files.<a href="./src/resources/sessions/agent/files.ts">list</a>(sessionID) -> FileListResponse</code>
- <code title="post /v1/sessions/{sessionId}/agent/files">client.sessions.agent.files.<a href="./src/resources/sessions/agent/files.ts">upload</a>(sessionID, { ...params }) -> FileUploadResponse</code>

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

# Events

Types:

- <code><a href="./src/resources/events.ts">EventWaitForResponse</a></code>

Methods:

- <code title="post /v1/events/{event_name}">client.events.<a href="./src/resources/events.ts">signal</a>(eventName, { ...params }) -> SuccessResponse</code>
- <code title="post /v1/events/{event_name}/wait">client.events.<a href="./src/resources/events.ts">waitFor</a>(eventName, { ...params }) -> EventWaitForResponse</code>
