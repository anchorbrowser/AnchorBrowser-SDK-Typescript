// Spec-derived file. Keep in sync with spec/openapi.yaml — see CONTRIBUTING.md.

export { Agent } from './agent/index';
export { All, type AllStatusResponse } from './all';
export {
  Clipboard,
  type ClipboardGetResponse,
  type ClipboardSetResponse,
  type ClipboardSetParams,
} from './clipboard';
export {
  Keyboard,
  type KeyboardShortcutResponse,
  type KeyboardTypeResponse,
  type KeyboardShortcutParams,
  type KeyboardTypeParams,
} from './keyboard';
export {
  Mouse,
  type MouseClickResponse,
  type MouseDoubleClickResponse,
  type MouseMoveResponse,
  type MouseClickParams,
  type MouseDoubleClickParams,
  type MouseMoveParams,
} from './mouse';
export { Recordings, type RecordingListResponse } from './recordings/index';
export {
  Sessions,
  type SessionCreateResponse,
  type SessionRetrieveResponse,
  type SessionDragAndDropResponse,
  type SessionGotoResponse,
  type SessionRetrieveDownloadsResponse,
  type SessionScrollResponse,
  type SessionUploadFileResponse,
  type SessionCreateParams,
  type SessionDragAndDropParams,
  type SessionGotoParams,
  type SessionScrollParams,
  type SessionUploadFileParams,
} from './sessions';
