/**
 * Frozen snapshot of every operation the v1 (Stainless-generated) SDK
 * exposed, extracted from `api.md` at the `stainless-baseline` git tag —
 * the last commit before the v2 rewrite (full history:
 * `git show stainless-baseline:api.md`).
 *
 * This file must NEVER be regenerated or edited to match the current spec —
 * that would defeat its purpose. It exists so tests/spec/v1-regression.test.ts
 * can catch a real endpoint silently disappearing from spec/openapi.yaml
 * during a future spec sync (exactly what happened when the SDK's
 * generation source moved from the SDK-only spec to the public docs spec:
 * three live production endpoints — /v1/tools/fetch-webpage (path typo),
 * /v1/identities/{identityId}/credentials, /v2/tasks/generate, and
 * /v2/tasks/{taskId}/generation-status — were absent from the new source
 * spec and so silently dropped from the generated v2 SDK).
 *
 * Format: 'METHOD /path' (method lowercase, exactly as the OpenAPI spec
 * would key it). Path parameter names don't need to match the current
 * spec's naming — the regression test normalizes `{anything}` to `{}`
 * before comparing.
 */
export const V1_BASELINE_OPERATIONS: readonly string[] = [
  'delete /v1/applications/{application_id}',
  'delete /v1/applications/{application_id}/auth-flows/{auth_flow_id}',
  'delete /v1/identities/{identity_id}',
  'delete /v1/profiles/{name}',
  'delete /v1/sessions/all',
  'delete /v1/sessions/{session_id}',
  'get /v1/applications',
  'get /v1/applications/{application_id}',
  'get /v1/applications/{application_id}/auth-flows',
  'get /v1/applications/{application_id}/identities',
  'get /v1/extensions',
  'get /v1/identities/{identity_id}',
  'get /v1/identities/{identity_id}/credentials',
  'get /v1/profiles',
  'get /v1/profiles/{name}',
  'get /v1/sessions/all/status',
  'get /v1/sessions/{sessionId}/clipboard',
  'get /v1/sessions/{sessionId}/screenshot',
  'get /v1/sessions/{session_id}',
  'get /v1/sessions/{session_id}/downloads',
  'get /v1/sessions/{session_id}/recordings',
  'get /v1/sessions/{session_id}/recordings/primary/fetch',
  'get /v1/tools/perform-web-task/{workflowId}/status',
  'get /v2/tasks/runs/{runId}/status',
  'get /v2/tasks/{taskId}/generation-status',
  'post /v1/applications',
  'post /v1/applications/{application_id}/auth-flows',
  'post /v1/applications/{application_id}/tokens',
  'post /v1/events/{event_name}',
  'post /v1/events/{event_name}/wait',
  'post /v1/identities',
  'post /v1/profiles',
  'post /v1/sessions',
  'post /v1/sessions/{sessionId}/agent/files',
  'post /v1/sessions/{sessionId}/clipboard',
  'post /v1/sessions/{sessionId}/drag-and-drop',
  'post /v1/sessions/{sessionId}/goto',
  'post /v1/sessions/{sessionId}/keyboard/shortcut',
  'post /v1/sessions/{sessionId}/keyboard/type',
  'post /v1/sessions/{sessionId}/mouse/click',
  'post /v1/sessions/{sessionId}/mouse/doubleClick',
  'post /v1/sessions/{sessionId}/mouse/move',
  'post /v1/sessions/{sessionId}/scroll',
  'post /v1/sessions/{sessionId}/uploads',
  'post /v1/tools/fetch-webpage',
  'post /v1/tools/perform-web-task',
  'post /v1/tools/screenshot',
  'post /v2/tasks/generate',
  'post /v2/tasks/{taskId}/run',
  'put /v1/identities/{identity_id}',
];
