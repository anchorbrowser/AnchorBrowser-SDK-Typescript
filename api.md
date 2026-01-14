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
- <code><a href="./src/resources/sessions/sessions.ts">SessionDragAndDropResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionGotoResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionRetrieveDownloadsResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionScrollResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionUploadFileResponse</a></code>

Methods:

- <code title="post /v1/sessions">client.sessions.<a href="./src/resources/sessions/sessions.ts">create</a>({ ...params }) -> SessionCreateResponse</code>
- <code title="get /v1/sessions/{session_id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">retrieve</a>(sessionID) -> SessionRetrieveResponse</code>
- <code title="delete /v1/sessions/{session_id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">delete</a>(sessionID) -> SuccessResponse</code>
- <code title="post /v1/sessions/{sessionId}/drag-and-drop">client.sessions.<a href="./src/resources/sessions/sessions.ts">dragAndDrop</a>(sessionID, { ...params }) -> SessionDragAndDropResponse</code>
- <code title="post /v1/sessions/{sessionId}/goto">client.sessions.<a href="./src/resources/sessions/sessions.ts">goto</a>(sessionID, { ...params }) -> SessionGotoResponse</code>
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

Methods:

- <code title="get /v1/sessions/{session_id}/recordings">client.sessions.recordings.<a href="./src/resources/sessions/recordings/recordings.ts">list</a>(sessionID) -> RecordingListResponse</code>

### Primary

Methods:

- <code title="get /v1/sessions/{session_id}/recordings/primary/fetch">client.sessions.recordings.primary.<a href="./src/resources/sessions/recordings/primary.ts">get</a>(sessionID) -> Response</code>

## Mouse

Types:

- <code><a href="./src/resources/sessions/mouse.ts">MouseClickResponse</a></code>
- <code><a href="./src/resources/sessions/mouse.ts">MouseMoveResponse</a></code>

Methods:

- <code title="post /v1/sessions/{sessionId}/mouse/click">client.sessions.mouse.<a href="./src/resources/sessions/mouse.ts">click</a>(sessionID, { ...params }) -> MouseClickResponse</code>
- <code title="post /v1/sessions/{sessionId}/mouse/move">client.sessions.mouse.<a href="./src/resources/sessions/mouse.ts">move</a>(sessionID, { ...params }) -> MouseMoveResponse</code>

## Keyboard

Types:

- <code><a href="./src/resources/sessions/keyboard.ts">KeyboardShortcutResponse</a></code>
- <code><a href="./src/resources/sessions/keyboard.ts">KeyboardTypeResponse</a></code>

Methods:

- <code title="post /v1/sessions/{sessionId}/keyboard/shortcut">client.sessions.keyboard.<a href="./src/resources/sessions/keyboard.ts">shortcut</a>(sessionID, { ...params }) -> KeyboardShortcutResponse</code>
- <code title="post /v1/sessions/{sessionId}/keyboard/type">client.sessions.keyboard.<a href="./src/resources/sessions/keyboard.ts">type</a>(sessionID, { ...params }) -> KeyboardTypeResponse</code>

## Clipboard

Types:

- <code><a href="./src/resources/sessions/clipboard.ts">ClipboardSetResponse</a></code>

Methods:

- <code title="post /v1/sessions/{sessionId}/clipboard">client.sessions.clipboard.<a href="./src/resources/sessions/clipboard.ts">set</a>(sessionID, { ...params }) -> ClipboardSetResponse</code>

## Agent

Methods:

- <code title="post /v1/sessions/{session_id}/agent/pause">client.sessions.agent.<a href="./src/resources/sessions/agent/agent.ts">pause</a>(sessionID) -> SuccessResponse</code>
- <code title="post /v1/sessions/{session_id}/agent/resume">client.sessions.agent.<a href="./src/resources/sessions/agent/agent.ts">resume</a>(sessionID) -> SuccessResponse</code>

### Files

Types:

- <code><a href="./src/resources/sessions/agent/files.ts">FileUploadResponse</a></code>

Methods:

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
- <code><a href="./src/resources/extensions.ts">ExtensionListResponse</a></code>

Methods:

- <code title="get /v1/extensions">client.extensions.<a href="./src/resources/extensions.ts">list</a>() -> ExtensionListResponse</code>

# Events

Types:

- <code><a href="./src/resources/events.ts">EventWaitForResponse</a></code>

Methods:

- <code title="post /v1/events/{event_name}">client.events.<a href="./src/resources/events.ts">signal</a>(eventName, { ...params }) -> SuccessResponse</code>
- <code title="post /v1/events/{event_name}/wait">client.events.<a href="./src/resources/events.ts">waitFor</a>(eventName, { ...params }) -> EventWaitForResponse</code>

# Task

Types:

- <code><a href="./src/resources/task.ts">TaskCreateResponse</a></code>
- <code><a href="./src/resources/task.ts">TaskListResponse</a></code>
- <code><a href="./src/resources/task.ts">TaskRunResponse</a></code>

Methods:

- <code title="post /v1/task">client.task.<a href="./src/resources/task.ts">create</a>({ ...params }) -> TaskCreateResponse</code>
- <code title="get /v1/task">client.task.<a href="./src/resources/task.ts">list</a>({ ...params }) -> TaskListResponse</code>
- <code title="post /v1/task/run">client.task.<a href="./src/resources/task.ts">run</a>({ ...params }) -> TaskRunResponse</code>

# Identities

Types:

- <code><a href="./src/resources/identities.ts">IdentityCreateResponse</a></code>
- <code><a href="./src/resources/identities.ts">IdentityRetrieveResponse</a></code>
- <code><a href="./src/resources/identities.ts">IdentityUpdateResponse</a></code>
- <code><a href="./src/resources/identities.ts">IdentityDeleteResponse</a></code>
- <code><a href="./src/resources/identities.ts">IdentityRetrieveCredentialsResponse</a></code>

Methods:

- <code title="post /v1/identities">client.identities.<a href="./src/resources/identities.ts">create</a>({ ...params }) -> IdentityCreateResponse</code>
- <code title="get /v1/identities/{identity_id}">client.identities.<a href="./src/resources/identities.ts">retrieve</a>(identityID) -> IdentityRetrieveResponse</code>
- <code title="put /v1/identities/{identity_id}">client.identities.<a href="./src/resources/identities.ts">update</a>(identityID, { ...params }) -> IdentityUpdateResponse</code>
- <code title="delete /v1/identities/{identity_id}">client.identities.<a href="./src/resources/identities.ts">delete</a>(identityID) -> IdentityDeleteResponse</code>
- <code title="get /v1/identities/{identity_id}/credentials">client.identities.<a href="./src/resources/identities.ts">retrieveCredentials</a>(identityID) -> IdentityRetrieveCredentialsResponse</code>

# Applications

Types:

- <code><a href="./src/resources/applications/applications.ts">ApplicationCreateResponse</a></code>
- <code><a href="./src/resources/applications/applications.ts">ApplicationRetrieveResponse</a></code>
- <code><a href="./src/resources/applications/applications.ts">ApplicationListResponse</a></code>
- <code><a href="./src/resources/applications/applications.ts">ApplicationDeleteResponse</a></code>
- <code><a href="./src/resources/applications/applications.ts">ApplicationCreateIdentityTokenResponse</a></code>
- <code><a href="./src/resources/applications/applications.ts">ApplicationListIdentitiesResponse</a></code>

Methods:

- <code title="post /v1/applications">client.applications.<a href="./src/resources/applications/applications.ts">create</a>({ ...params }) -> ApplicationCreateResponse</code>
- <code title="get /v1/applications/{application_id}">client.applications.<a href="./src/resources/applications/applications.ts">retrieve</a>(applicationID) -> ApplicationRetrieveResponse</code>
- <code title="get /v1/applications">client.applications.<a href="./src/resources/applications/applications.ts">list</a>({ ...params }) -> ApplicationListResponse</code>
- <code title="delete /v1/applications/{application_id}">client.applications.<a href="./src/resources/applications/applications.ts">delete</a>(applicationID) -> ApplicationDeleteResponse</code>
- <code title="post /v1/applications/{application_id}/tokens">client.applications.<a href="./src/resources/applications/applications.ts">createIdentityToken</a>(applicationID, { ...params }) -> ApplicationCreateIdentityTokenResponse</code>
- <code title="get /v1/applications/{application_id}/identities">client.applications.<a href="./src/resources/applications/applications.ts">listIdentities</a>(applicationID, { ...params }) -> ApplicationListIdentitiesResponse</code>

## AuthFlows

Types:

- <code><a href="./src/resources/applications/auth-flows.ts">AuthFlowCreateResponse</a></code>
- <code><a href="./src/resources/applications/auth-flows.ts">AuthFlowUpdateResponse</a></code>
- <code><a href="./src/resources/applications/auth-flows.ts">AuthFlowListResponse</a></code>
- <code><a href="./src/resources/applications/auth-flows.ts">AuthFlowDeleteResponse</a></code>

Methods:

- <code title="post /v1/applications/{application_id}/auth-flows">client.applications.authFlows.<a href="./src/resources/applications/auth-flows.ts">create</a>(applicationID, { ...params }) -> AuthFlowCreateResponse</code>
- <code title="patch /v1/applications/{application_id}/auth-flows/{auth_flow_id}">client.applications.authFlows.<a href="./src/resources/applications/auth-flows.ts">update</a>(authFlowID, { ...params }) -> AuthFlowUpdateResponse</code>
- <code title="get /v1/applications/{application_id}/auth-flows">client.applications.authFlows.<a href="./src/resources/applications/auth-flows.ts">list</a>(applicationID) -> AuthFlowListResponse</code>
- <code title="delete /v1/applications/{application_id}/auth-flows/{auth_flow_id}">client.applications.authFlows.<a href="./src/resources/applications/auth-flows.ts">delete</a>(authFlowID, { ...params }) -> AuthFlowDeleteResponse</code>
