// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as AllAPI from './all';
import { All, AllStatusResponse } from './all';
import * as ClipboardAPI from './clipboard';
import { Clipboard, ClipboardSetParams, ClipboardSetResponse } from './clipboard';
import * as KeyboardAPI from './keyboard';
import {
  Keyboard,
  KeyboardShortcutParams,
  KeyboardShortcutResponse,
  KeyboardTypeParams,
  KeyboardTypeResponse,
} from './keyboard';
import * as MouseAPI from './mouse';
import { Mouse, MouseClickParams, MouseClickResponse, MouseMoveParams, MouseMoveResponse } from './mouse';
import * as AgentAPI from './agent/agent';
import { Agent } from './agent/agent';
import * as RecordingsAPI from './recordings/recordings';
import { RecordingListResponse, Recordings } from './recordings/recordings';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
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
   * Retrieves detailed information about a specific browser session.
   *
   * @example
   * ```ts
   * const session = await client.sessions.retrieve(
   *   'session_id',
   * );
   * ```
   */
  retrieve(sessionID: string, options?: RequestOptions): APIPromise<SessionRetrieveResponse> {
    return this._client.get(path`/v1/sessions/${sessionID}`, options);
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
   * Performs a drag and drop operation from start coordinates to end coordinates
   *
   * @example
   * ```ts
   * const response = await client.sessions.dragAndDrop(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     endX: 0,
   *     endY: 0,
   *     startX: 0,
   *     startY: 0,
   *   },
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
   *   { url: 'url' },
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
   *   {
   *     deltaY: 0,
   *     x: 0,
   *     y: 0,
   *   },
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

  /**
   * Upload files directly to a browser session for use with web forms and file
   * inputs.
   *
   * Files are saved to the session's uploads directory and can be referenced in CDP
   * commands.
   *
   * @example
   * ```ts
   * const response = await client.sessions.uploadFile(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { file: fs.createReadStream('path/to/file') },
   * );
   * ```
   */
  uploadFile(
    sessionID: string,
    body: SessionUploadFileParams,
    options?: RequestOptions,
  ): APIPromise<SessionUploadFileResponse> {
    return this._client.post(
      path`/v1/sessions/${sessionID}/uploads`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
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

export interface SessionRetrieveResponse {
  /**
   * The configuration settings for the session.
   */
  configuration?: unknown;

  /**
   * The timestamp when the session was created.
   */
  created_at?: string;

  /**
   * The number of credits consumed by the session.
   */
  credits_used?: number;

  /**
   * The duration of the session in seconds.
   */
  duration?: number;

  /**
   * Whether this is a playground session.
   */
  playground?: boolean;

  /**
   * The number of bytes transferred through the proxy.
   */
  proxy_bytes?: number;

  /**
   * The unique identifier of the session.
   */
  session_id?: string;

  /**
   * The current status of the session.
   */
  status?: string;

  /**
   * Array of steps executed in the session.
   */
  steps?: Array<unknown>;

  /**
   * Tags associated with the session.
   */
  tags?: unknown;

  /**
   * The team ID associated with the session.
   */
  team_id?: string;

  /**
   * Token usage information.
   */
  tokens?: unknown;
}

export interface SessionDragAndDropResponse {
  status?: string;
}

export interface SessionGotoResponse {
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

export interface SessionUploadFileResponse {
  data?: SessionUploadFileResponse.Data;
}

export namespace SessionUploadFileResponse {
  export interface Data {
    message?: string;

    status?: string;
  }
}

export interface SessionCreateParams {
  /**
   * Browser-specific configurations.
   */
  browser?: SessionCreateParams.Browser;

  /**
   * Activates an authenticated session.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   */
  identities?: Array<SessionCreateParams.Identity>;

  /**
   * Array of integrations to load in the browser session. Integrations must be
   * previously created using the Integrations API.
   */
  integrations?: Array<SessionCreateParams.Integration>;

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
     * Configuration for extra stealth mode to enhance browser fingerprinting
     * protection.
     */
    extra_stealth?: Browser.ExtraStealth;

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
     * Configuration for extra stealth mode to enhance browser fingerprinting
     * protection.
     */
    export interface ExtraStealth {
      /**
       * Enable or disable extra stealth mode.
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
   * Previously configured identity to be used for the authenticated session.
   */
  export interface Identity {
    /**
     * The identity ID to use for the browser session.
     */
    id?: string;
  }

  export interface Integration {
    /**
     * Unique integration ID
     */
    id: string;

    configuration: Integration.OnePasswordAllSecretsConfig | Integration.OnePasswordSpecificSecretsConfig;

    /**
     * Integration type
     */
    type: '1PASSWORD';
  }

  export namespace Integration {
    export interface OnePasswordAllSecretsConfig {
      /**
       * Load all secrets from 1Password
       */
      load_mode: 'all';
    }

    export interface OnePasswordSpecificSecretsConfig {
      /**
       * Load specific secrets from 1Password
       */
      load_mode: 'specific';

      /**
       * Array of secret references to load
       */
      secrets: Array<string>;
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
       * City name for precise geographic targeting. Supported for anchor_proxy only. Can
       * only be used when region is also provided.
       */
      city?: string;

      /**
       * Supported country codes ISO 2 lowercase
       */
      country_code?:
        | 'af'
        | 'al'
        | 'dz'
        | 'ad'
        | 'ao'
        | 'as'
        | 'ag'
        | 'ar'
        | 'am'
        | 'aw'
        | 'au'
        | 'at'
        | 'az'
        | 'bs'
        | 'bh'
        | 'bb'
        | 'by'
        | 'be'
        | 'bz'
        | 'bj'
        | 'bm'
        | 'bo'
        | 'ba'
        | 'br'
        | 'bg'
        | 'bf'
        | 'cm'
        | 'ca'
        | 'cv'
        | 'td'
        | 'cl'
        | 'co'
        | 'cg'
        | 'cr'
        | 'ci'
        | 'hr'
        | 'cu'
        | 'cy'
        | 'cz'
        | 'dk'
        | 'dm'
        | 'do'
        | 'ec'
        | 'eg'
        | 'sv'
        | 'ee'
        | 'et'
        | 'fo'
        | 'fi'
        | 'fr'
        | 'gf'
        | 'pf'
        | 'ga'
        | 'gm'
        | 'ge'
        | 'de'
        | 'gh'
        | 'gi'
        | 'gr'
        | 'gd'
        | 'gp'
        | 'gt'
        | 'gg'
        | 'gn'
        | 'gw'
        | 'gy'
        | 'ht'
        | 'hn'
        | 'hu'
        | 'is'
        | 'in'
        | 'ir'
        | 'iq'
        | 'ie'
        | 'il'
        | 'it'
        | 'jm'
        | 'jp'
        | 'jo'
        | 'kz'
        | 'kw'
        | 'kg'
        | 'lv'
        | 'lb'
        | 'ly'
        | 'li'
        | 'lt'
        | 'lu'
        | 'mk'
        | 'ml'
        | 'mt'
        | 'mq'
        | 'mr'
        | 'mx'
        | 'md'
        | 'mc'
        | 'me'
        | 'ma'
        | 'nl'
        | 'nz'
        | 'ni'
        | 'ng'
        | 'no'
        | 'pk'
        | 'pa'
        | 'py'
        | 'pe'
        | 'ph'
        | 'pl'
        | 'pt'
        | 'pr'
        | 'qa'
        | 'ro'
        | 'lc'
        | 'sm'
        | 'sa'
        | 'sn'
        | 'rs'
        | 'sc'
        | 'sl'
        | 'sk'
        | 'si'
        | 'so'
        | 'za'
        | 'kr'
        | 'es'
        | 'sr'
        | 'se'
        | 'ch'
        | 'sy'
        | 'st'
        | 'tw'
        | 'tj'
        | 'tg'
        | 'tt'
        | 'tn'
        | 'tr'
        | 'tc'
        | 'ua'
        | 'ae'
        | 'us'
        | 'uy'
        | 'uz'
        | 've'
        | 'ye';

      /**
       * Region code for more specific geographic targeting. The city parameter can only
       * be used when region is also provided.
       */
      region?: string;

      /**
       * Create a session with a proxy to access websites as if you're browsing from a
       * computer in that country.
       */
      type?: 'anchor_proxy';
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

export interface SessionUploadFileParams {
  /**
   * File to upload to the browser session
   */
  file: Uploadable;
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
    type SessionRetrieveResponse as SessionRetrieveResponse,
    type SessionDragAndDropResponse as SessionDragAndDropResponse,
    type SessionGotoResponse as SessionGotoResponse,
    type SessionRetrieveDownloadsResponse as SessionRetrieveDownloadsResponse,
    type SessionScrollResponse as SessionScrollResponse,
    type SessionUploadFileResponse as SessionUploadFileResponse,
    type SessionCreateParams as SessionCreateParams,
    type SessionDragAndDropParams as SessionDragAndDropParams,
    type SessionGotoParams as SessionGotoParams,
    type SessionScrollParams as SessionScrollParams,
    type SessionUploadFileParams as SessionUploadFileParams,
  };

  export { All as All, type AllStatusResponse as AllStatusResponse };

  export { Recordings as Recordings, type RecordingListResponse as RecordingListResponse };

  export {
    Mouse as Mouse,
    type MouseClickResponse as MouseClickResponse,
    type MouseMoveResponse as MouseMoveResponse,
    type MouseClickParams as MouseClickParams,
    type MouseMoveParams as MouseMoveParams,
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
    type ClipboardSetResponse as ClipboardSetResponse,
    type ClipboardSetParams as ClipboardSetParams,
  };

  export { Agent as Agent };
}
