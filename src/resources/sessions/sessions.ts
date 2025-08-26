// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as AllAPI from './all';
import { All, AllStatusResponse } from './all';
import * as ClipboardAPI from './clipboard';
import { Clipboard, ClipboardGetResponse, ClipboardSetParams, ClipboardSetResponse } from './clipboard';
import * as KeyboardAPI from './keyboard';
import {
  Keyboard,
  KeyboardShortcutParams,
  KeyboardShortcutResponse,
  KeyboardTypeParams,
  KeyboardTypeResponse,
} from './keyboard';
import * as MouseAPI from './mouse';
import {
  Mouse,
  MouseClickParams,
  MouseClickResponse,
  MouseDoubleClickParams,
  MouseDoubleClickResponse,
  MouseDownParams,
  MouseDownResponse,
  MouseMoveParams,
  MouseMoveResponse,
  MouseUpParams,
  MouseUpResponse,
} from './mouse';
import * as AgentAPI from './agent/agent';
import { Agent } from './agent/agent';
import * as RecordingsAPI from './recordings/recordings';
import {
  RecordingListResponse,
  RecordingPauseResponse,
  RecordingResumeResponse,
  Recordings,
} from './recordings/recordings';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Sessions extends APIResource {
  all: AllAPI.All = new AllAPI.All(this._client);
  recordings: RecordingsAPI.Recordings = new RecordingsAPI.Recordings(this._client);
  mouse: MouseAPI.Mouse = new MouseAPI.Mouse(this._client);
  keyboard: KeyboardAPI.Keyboard = new KeyboardAPI.Keyboard(this._client);
  clipboard: ClipboardAPI.Clipboard = new ClipboardAPI.Clipboard(this._client);
  agent: AgentAPI.Agent = new AgentAPI.Agent(this._client);

  /**
   * Allocates a new browser session for the user, with optional configurations for
   * ad-blocking, captcha solving, proxy usage, and idle timeout.
   *
   * @example
   * ```ts
   * const session = await client.sessions.create();
   * ```
   */
  create(
    body: SessionCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SessionCreateResponse> {
    return this._client.post('/v1/sessions', { body, ...options });
  }

  /**
   * Deletes the browser session associated with the provided browser session ID.
   * Requires a valid API key for authentication.
   *
   * @example
   * ```ts
   * const successResponse = await client.sessions.delete(
   *   'session_id',
   * );
   * ```
   */
  delete(sessionID: string, options?: RequestOptions): APIPromise<Shared.SuccessResponse> {
    return this._client.delete(path`/v1/sessions/${sessionID}`, options);
  }

  /**
   * Copies the currently selected text to the clipboard
   *
   * @example
   * ```ts
   * const response = await client.sessions.copy(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  copy(sessionID: string, options?: RequestOptions): APIPromise<SessionCopyResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/copy`, options);
  }

  /**
   * Performs a drag and drop operation from start coordinates to end coordinates
   *
   * @example
   * ```ts
   * const response = await client.sessions.dragAndDrop(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { endX: 500, endY: 300, startX: 400, startY: 200 },
   * );
   * ```
   */
  dragAndDrop(
    sessionID: string,
    body: SessionDragAndDropParams,
    options?: RequestOptions,
  ): APIPromise<SessionDragAndDropResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/drag-and-drop`, { body, ...options });
  }

  /**
   * Navigates the browser session to the specified URL
   *
   * @example
   * ```ts
   * const response = await client.sessions.goto(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { url: 'https://www.google.com' },
   * );
   * ```
   */
  goto(
    sessionID: string,
    body: SessionGotoParams,
    options?: RequestOptions,
  ): APIPromise<SessionGotoResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/goto`, { body, ...options });
  }

  /**
   * Pastes text at the current cursor position
   *
   * @example
   * ```ts
   * const response = await client.sessions.paste(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { text: 'Text pasted via API' },
   * );
   * ```
   */
  paste(
    sessionID: string,
    body: SessionPasteParams,
    options?: RequestOptions,
  ): APIPromise<SessionPasteResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/paste`, { body, ...options });
  }

  /**
   * Retrieves metadata of files downloaded during a browser session. Requires a
   * valid API key for authentication.
   *
   * @example
   * ```ts
   * const response = await client.sessions.retrieveDownloads(
   *   'session_id',
   * );
   * ```
   */
  retrieveDownloads(
    sessionID: string,
    options?: RequestOptions,
  ): APIPromise<SessionRetrieveDownloadsResponse> {
    return this._client.get(path`/v1/sessions/${sessionID}/downloads`, options);
  }

  /**
   * Takes a screenshot of the current browser session and returns it as an image.
   *
   * @example
   * ```ts
   * const response = await client.sessions.retrieveScreenshot(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  retrieveScreenshot(sessionID: string, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/v1/sessions/${sessionID}/screenshot`, {
      ...options,
      headers: buildHeaders([{ Accept: 'image/png' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  /**
   * Performs a scroll action at the specified coordinates
   *
   * @example
   * ```ts
   * const response = await client.sessions.scroll(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { deltaY: 100, x: 0, y: 0 },
   * );
   * ```
   */
  scroll(
    sessionID: string,
    body: SessionScrollParams,
    options?: RequestOptions,
  ): APIPromise<SessionScrollResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/scroll`, { body, ...options });
  }
}

export interface SessionCreateResponse {
  data?: SessionCreateResponse.Data;
}

export namespace SessionCreateResponse {
  export interface Data {
    /**
     * Unique identifier for the browser session
     */
    id?: string;

    /**
     * The CDP websocket connection string
     */
    cdp_url?: string;

    /**
     * The browser session live view url
     */
    live_view_url?: string;
  }
}

export interface SessionCopyResponse {
  /**
   * The text that was copied
   */
  text?: string;
}

export interface SessionDragAndDropResponse {
  status?: string;
}

export interface SessionGotoResponse {
  status?: string;
}

export interface SessionPasteResponse {
  status?: string;
}

export interface SessionRetrieveDownloadsResponse {
  data?: SessionRetrieveDownloadsResponse.Data;
}

export namespace SessionRetrieveDownloadsResponse {
  export interface Data {
    /**
     * Total number of downloads
     */
    count?: number;

    items?: Array<Data.Item>;
  }

  export namespace Data {
    export interface Item {
      /**
       * The unique ID of the download record.
       */
      id?: string;

      /**
       * The timestamp when the file record was created.
       */
      created_at?: string;

      /**
       * The time it took to process or download the file, in milliseconds.
       */
      duration?: number;

      /**
       * The URL to download the file from anchorbrowser servers. Requires api key
       * authentication.
       */
      file_link?: string;

      /**
       * The original URL where the file was found.
       */
      origin_url?: string;

      /**
       * The URL used to download the file.
       */
      original_download_url?: string;

      /**
       * The original file name before any modification.
       */
      original_file_name?: string;

      /**
       * The size of the file in bytes.
       */
      size?: number;

      /**
       * The suggested file name for saving the file.
       */
      suggested_file_name?: string;
    }
  }
}

export interface SessionScrollResponse {
  status?: string;
}

export interface SessionCreateParams {
  /**
   * Browser-specific configurations.
   */
  browser?: SessionCreateParams.Browser;

  /**
   * Session-related configurations.
   */
  session?: SessionCreateParams.Session;
}

export namespace SessionCreateParams {
  /**
   * Browser-specific configurations.
   */
  export interface Browser {
    /**
     * Configuration for ad-blocking.
     */
    adblock?: Browser.Adblock;

    /**
     * Configuration for captcha-solving.
     */
    captcha_solver?: Browser.CaptchaSolver;

    /**
     * Configuration for disabling web security features.
     */
    disable_web_security?: Browser.DisableWebSecurity;

    /**
     * Array of extension IDs to load in the browser session. Extensions must be
     * previously uploaded using the Extensions API.
     */
    extensions?: Array<string>;

    /**
     * Configuration for fullscreen mode.
     */
    fullscreen?: Browser.Fullscreen;

    /**
     * Configuration for headless mode.
     */
    headless?: Browser.Headless;

    /**
     * Configuration for peer-to-peer download capture functionality.
     */
    p2p_download?: Browser.P2pDownload;

    /**
     * Configuration for popup blocking.
     */
    popup_blocker?: Browser.PopupBlocker;

    /**
     * Options for managing and persisting browser session profiles.
     */
    profile?: Browser.Profile;

    /**
     * Configuration for the browser's viewport size.
     */
    viewport?: Browser.Viewport;
  }

  export namespace Browser {
    /**
     * Configuration for ad-blocking.
     */
    export interface Adblock {
      /**
       * Enable or disable ad-blocking. Defaults to `true`.
       */
      active?: boolean;
    }

    /**
     * Configuration for captcha-solving.
     */
    export interface CaptchaSolver {
      /**
       * Enable or disable captcha-solving. Requires proxy to be active. Defaults to
       * `false`.
       */
      active?: boolean;
    }

    /**
     * Configuration for disabling web security features.
     */
    export interface DisableWebSecurity {
      /**
       * Whether to disable web security features (CORS, same-origin policy, etc.).
       * Allows accessing iframes and resources from different origins. Defaults to
       * `false`.
       */
      active?: boolean;
    }

    /**
     * Configuration for fullscreen mode.
     */
    export interface Fullscreen {
      /**
       * Enable or disable fullscreen mode. When enabled, the browser will start in
       * fullscreen mode. Defaults to `false`.
       */
      active?: boolean;
    }

    /**
     * Configuration for headless mode.
     */
    export interface Headless {
      /**
       * Whether browser should be headless or headful. Defaults to `false`.
       */
      active?: boolean;
    }

    /**
     * Configuration for peer-to-peer download capture functionality.
     */
    export interface P2pDownload {
      /**
       * Enable or disable P2P downloads. When enabled, the browser will capture
       * downloads for direct data extraction, instead of uploading them on Anchor's
       * storage. Defaults to `false`.
       */
      active?: boolean;
    }

    /**
     * Configuration for popup blocking.
     */
    export interface PopupBlocker {
      /**
       * Blocks popups, including ads and CAPTCHA consent banners. Requires adblock to be
       * active. Defaults to `true`.
       */
      active?: boolean;
    }

    /**
     * Options for managing and persisting browser session profiles.
     */
    export interface Profile {
      /**
       * The name of the profile to be used during the browser session.
       */
      name?: string;

      /**
       * Indicates whether the browser session profile data should be saved when the
       * browser session ends. Defaults to `false`.
       */
      persist?: boolean;

      /**
       * When enabled, resets the profile's preferences on session creation. Defaults to
       * `false`.
       */
      reset_preferences?: boolean;
    }

    /**
     * Configuration for the browser's viewport size.
     */
    export interface Viewport {
      /**
       * Height of the viewport in pixels. Defaults to `900`.
       */
      height?: number;

      /**
       * Width of the viewport in pixels. Defaults to `1440`.
       */
      width?: number;
    }
  }

  /**
   * Session-related configurations.
   */
  export interface Session {
    /**
     * The URL to navigate to when the browser session starts. If not provided, the
     * browser will load an empty page.
     */
    initial_url?: string;

    /**
     * Configuration for live viewing the browser session.
     */
    live_view?: Session.LiveView;

    /**
     * Proxy Documentation available at [Proxy Documentation](/advanced/proxy)
     */
    proxy?: Session.AnchorProxy | Session.CustomProxy;

    /**
     * Configuration for session recording.
     */
    recording?: Session.Recording;

    /**
     * Timeout configurations for the browser session.
     */
    timeout?: Session.Timeout;
  }

  export namespace Session {
    /**
     * Configuration for live viewing the browser session.
     */
    export interface LiveView {
      /**
       * Enable or disable read-only mode for live viewing. Defaults to `false`.
       */
      read_only?: boolean;
    }

    export interface AnchorProxy {
      active: boolean;

      /**
       * Supported country codes ISO 2 lowercase
       *
       * **On change make sure to update the Proxy type.**
       */
      country_code?:
        | 'af'
        | 'al'
        | 'dz'
        | 'ad'
        | 'ao'
        | 'ag'
        | 'ar'
        | 'am'
        | 'aw'
        | 'au'
        | 'at'
        | 'az'
        | 'bs'
        | 'bh'
        | 'bd'
        | 'bb'
        | 'by'
        | 'be'
        | 'bz'
        | 'bj'
        | 'bm'
        | 'bo'
        | 'ba'
        | 'bw'
        | 'br'
        | 'bn'
        | 'bg'
        | 'bf'
        | 'bi'
        | 'kh'
        | 'cm'
        | 'ca'
        | 'cv'
        | 'td'
        | 'cl'
        | 'cn'
        | 'co'
        | 'cg'
        | 'cr'
        | 'ci'
        | 'hr'
        | 'cu'
        | 'cy'
        | 'cz'
        | 'dk'
        | 'dj'
        | 'dm'
        | 'do'
        | 'ec'
        | 'eg'
        | 'sv'
        | 'gq'
        | 'ee'
        | 'sz'
        | 'et'
        | 'fj'
        | 'fi'
        | 'fr'
        | 'pf'
        | 'ga'
        | 'gm'
        | 'ge'
        | 'de'
        | 'gh'
        | 'gr'
        | 'gd'
        | 'gt'
        | 'gn'
        | 'gy'
        | 'ht'
        | 'hn'
        | 'hk'
        | 'hu'
        | 'is'
        | 'in'
        | 'id'
        | 'ir'
        | 'iq'
        | 'ie'
        | 'il'
        | 'it'
        | 'jm'
        | 'jp'
        | 'jo'
        | 'kz'
        | 'ke'
        | 'kw'
        | 'kg'
        | 'la'
        | 'lv'
        | 'lb'
        | 'ls'
        | 'lr'
        | 'ly'
        | 'lt'
        | 'lu'
        | 'mk'
        | 'mg'
        | 'mw'
        | 'my'
        | 'mv'
        | 'ml'
        | 'mt'
        | 'mr'
        | 'mx'
        | 'md'
        | 'mn'
        | 'me'
        | 'ma'
        | 'mz'
        | 'mm'
        | 'na'
        | 'np'
        | 'nl'
        | 'nc'
        | 'nz'
        | 'ni'
        | 'ne'
        | 'ng'
        | 'no'
        | 'om'
        | 'pk'
        | 'pa'
        | 'pg'
        | 'py'
        | 'pe'
        | 'ph'
        | 'pl'
        | 'pt'
        | 'pr'
        | 'qa'
        | 'ro'
        | 'ru'
        | 'rw'
        | 'lc'
        | 'ws'
        | 'sm'
        | 'sa'
        | 'sn'
        | 'rs'
        | 'sl'
        | 'sg'
        | 'sk'
        | 'si'
        | 'so'
        | 'za'
        | 'kr'
        | 'ss'
        | 'es'
        | 'lk'
        | 'sd'
        | 'sr'
        | 'se'
        | 'ch'
        | 'sy'
        | 'st'
        | 'tw'
        | 'tj'
        | 'tz'
        | 'th'
        | 'tl'
        | 'tr'
        | 'tg'
        | 'tt'
        | 'tn'
        | 'tm'
        | 'ug'
        | 'ua'
        | 'gb'
        | 'us'
        | 'uy'
        | 'uz'
        | 'vu'
        | 've'
        | 'vn'
        | 'ye'
        | 'zm'
        | 'zw'
        | 'bt'
        | 'gw'
        | 'mu'
        | 'ae'
        | 'as'
        | 'fo'
        | 'gf'
        | 'gi'
        | 'gp'
        | 'gg'
        | 'li'
        | 'mq'
        | 'mc'
        | 'sc'
        | 'tc';

      /**
       * **On change make sure to update the country_code.**
       */
      type?: 'anchor_residential' | 'anchor_mobile' | 'anchor_gov';
    }

    export interface CustomProxy {
      active: boolean;

      /**
       * Proxy password
       */
      password: string;

      /**
       * Proxy server address
       */
      server: string;

      type: 'custom';

      /**
       * Proxy username
       */
      username: string;
    }

    /**
     * Configuration for session recording.
     */
    export interface Recording {
      /**
       * Enable or disable video recording of the browser session. Defaults to `true`.
       */
      active?: boolean;
    }

    /**
     * Timeout configurations for the browser session.
     */
    export interface Timeout {
      /**
       * The amount of time (in minutes) the browser session waits for new connections
       * after all others are closed before stopping. Defaults to `5`.
       */
      idle_timeout?: number;

      /**
       * Maximum amount of time (in minutes) for the browser to run before terminating.
       * Defaults to `20`.
       */
      max_duration?: number;
    }
  }
}

export interface SessionDragAndDropParams {
  /**
   * Ending X coordinate
   */
  endX: number;

  /**
   * Ending Y coordinate
   */
  endY: number;

  /**
   * Starting X coordinate
   */
  startX: number;

  /**
   * Starting Y coordinate
   */
  startY: number;

  /**
   * Mouse button to use
   */
  button?: 'left' | 'middle' | 'right';
}

export interface SessionGotoParams {
  /**
   * The URL to navigate to
   */
  url: string;
}

export interface SessionPasteParams {
  /**
   * Text to paste
   */
  text: string;
}

export interface SessionScrollParams {
  /**
   * Vertical scroll amount (positive is down, negative is up)
   */
  deltaY: number;

  /**
   * X coordinate
   */
  x: number;

  /**
   * Y coordinate
   */
  y: number;

  /**
   * Horizontal scroll amount (positive is right, negative is left)
   */
  deltaX?: number;

  /**
   * Number of steps to break the scroll into for smoother scrolling
   */
  steps?: number;

  /**
   * Whether to use the OS scroll or the Playwright scroll
   */
  useOs?: boolean;
}

Sessions.All = All;
Sessions.Recordings = Recordings;
Sessions.Mouse = Mouse;
Sessions.Keyboard = Keyboard;
Sessions.Clipboard = Clipboard;
Sessions.Agent = Agent;

export declare namespace Sessions {
  export {
    type SessionCreateResponse as SessionCreateResponse,
    type SessionCopyResponse as SessionCopyResponse,
    type SessionDragAndDropResponse as SessionDragAndDropResponse,
    type SessionGotoResponse as SessionGotoResponse,
    type SessionPasteResponse as SessionPasteResponse,
    type SessionRetrieveDownloadsResponse as SessionRetrieveDownloadsResponse,
    type SessionScrollResponse as SessionScrollResponse,
    type SessionCreateParams as SessionCreateParams,
    type SessionDragAndDropParams as SessionDragAndDropParams,
    type SessionGotoParams as SessionGotoParams,
    type SessionPasteParams as SessionPasteParams,
    type SessionScrollParams as SessionScrollParams,
  };

  export { All as All, type AllStatusResponse as AllStatusResponse };

  export {
    Recordings as Recordings,
    type RecordingListResponse as RecordingListResponse,
    type RecordingPauseResponse as RecordingPauseResponse,
    type RecordingResumeResponse as RecordingResumeResponse,
  };

  export {
    Mouse as Mouse,
    type MouseClickResponse as MouseClickResponse,
    type MouseDoubleClickResponse as MouseDoubleClickResponse,
    type MouseDownResponse as MouseDownResponse,
    type MouseMoveResponse as MouseMoveResponse,
    type MouseUpResponse as MouseUpResponse,
    type MouseClickParams as MouseClickParams,
    type MouseDoubleClickParams as MouseDoubleClickParams,
    type MouseDownParams as MouseDownParams,
    type MouseMoveParams as MouseMoveParams,
    type MouseUpParams as MouseUpParams,
  };

  export {
    Keyboard as Keyboard,
    type KeyboardShortcutResponse as KeyboardShortcutResponse,
    type KeyboardTypeResponse as KeyboardTypeResponse,
    type KeyboardShortcutParams as KeyboardShortcutParams,
    type KeyboardTypeParams as KeyboardTypeParams,
  };

  export {
    Clipboard as Clipboard,
    type ClipboardGetResponse as ClipboardGetResponse,
    type ClipboardSetResponse as ClipboardSetResponse,
    type ClipboardSetParams as ClipboardSetParams,
  };

  export { Agent as Agent };
}
