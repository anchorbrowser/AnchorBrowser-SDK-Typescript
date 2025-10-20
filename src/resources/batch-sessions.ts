// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class BatchSessions extends APIResource {
  /**
   * Creates multiple browser sessions in a single batch operation. This endpoint
   * allows you to create up to 5,000 browser sessions simultaneously with the same
   * configuration.
   *
   * The batch will be processed asynchronously, and you can monitor progress using
   * the batch status endpoint.
   *
   * @example
   * ```ts
   * const batchSession = await client.batchSessions.create({
   *   count: 10,
   *   configuration: {
   *     browser: {
   *       headless: { active: true },
   *       viewport: { width: 1440, height: 900 },
   *     },
   *     session: {
   *       timeout: { idle_timeout: 10, max_duration: 300 },
   *     },
   *   },
   *   metadata: {
   *     project: 'web-scraping',
   *     environment: 'production',
   *   },
   * });
   * ```
   */
  create(body: BatchSessionCreateParams, options?: RequestOptions): APIPromise<BatchSessionCreateResponse> {
    return this._client.post('/v1/batch-sessions', { body, ...options });
  }

  /**
   * Retrieves detailed status information for a specific batch, including progress,
   * individual session details, and any errors that occurred.
   *
   * @example
   * ```ts
   * const batchSession = await client.batchSessions.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(batchID: string, options?: RequestOptions): APIPromise<BatchSessionRetrieveResponse> {
    return this._client.get(path`/v1/batch-sessions/${batchID}`, options);
  }
}

export interface BatchSessionCreateResponse {
  data?: BatchSessionCreateResponse.Data;
}

export namespace BatchSessionCreateResponse {
  export interface Data {
    /**
     * Unique identifier for the batch
     */
    batch_id?: string;

    /**
     * Timestamp when the batch was created
     */
    created_at?: string;

    /**
     * Current status of the batch
     */
    status?: 'pending' | 'processing' | 'completed' | 'failed';

    /**
     * Total number of sessions requested in the batch
     */
    total_requests?: number;
  }
}

export interface BatchSessionRetrieveResponse {
  data?: BatchSessionRetrieveResponse.Data;
}

export namespace BatchSessionRetrieveResponse {
  export interface Data {
    /**
     * Timestamp when the batch completed (if completed)
     */
    actual_completion_time?: string;

    /**
     * Unique identifier for the batch
     */
    batch_id?: string;

    /**
     * Number of sessions successfully created
     */
    completed_requests?: number;

    /**
     * Timestamp when the batch was created
     */
    created_at?: string;

    /**
     * Error message if batch failed
     */
    error?: string;

    /**
     * Number of sessions that failed to create
     */
    failed_requests?: number;

    /**
     * Number of sessions waiting to be processed
     */
    pending_requests?: number;

    /**
     * Number of sessions currently being processed
     */
    processing_requests?: number;

    progress?: Data.Progress;

    /**
     * Array of individual session details
     */
    sessions?: Array<Data.Session>;

    /**
     * Current status of the batch
     */
    status?: 'pending' | 'processing' | 'completed' | 'failed';

    /**
     * Total number of sessions requested
     */
    total_requests?: number;
  }

  export namespace Data {
    export interface Progress {
      /**
       * Current processing phase
       */
      current_phase?: 'queued' | 'provisioning' | 'configuring' | 'ready';

      /**
       * Completion percentage (0-100)
       */
      percentage?: number;
    }

    export interface Session {
      /**
       * CDP websocket connection URL (if session is ready)
       */
      cdp_url?: string;

      /**
       * Timestamp when session creation completed
       */
      completed_at?: string;

      /**
       * Error message if session creation failed
       */
      error?: string;

      /**
       * Index of this session within the batch (0-based)
       */
      item_index?: number;

      /**
       * Live view URL for the session (if session is ready)
       */
      live_view_url?: string;

      /**
       * Session-specific metadata
       */
      metadata?: { [key: string]: unknown };

      /**
       * Number of times this session creation has been retried
       */
      retry_count?: number;

      /**
       * Unique identifier for the browser session (if created successfully)
       */
      session_id?: string;

      /**
       * Timestamp when session creation started
       */
      started_at?: string;

      /**
       * Current status of this individual session
       */
      status?: 'pending' | 'processing' | 'completed' | 'failed';
    }
  }
}

export interface BatchSessionCreateParams {
  /**
   * Number of sessions to create in the batch (1-1000)
   */
  count: number;

  /**
   * Configuration that applies to all sessions in the batch
   */
  configuration?: BatchSessionCreateParams.Configuration;

  /**
   * Optional batch-level metadata for identification and organization
   */
  metadata?: { [key: string]: unknown };
}

export namespace BatchSessionCreateParams {
  /**
   * Configuration that applies to all sessions in the batch
   */
  export interface Configuration {
    /**
     * Browser-specific configurations.
     */
    browser?: Configuration.Browser;

    /**
     * Array of integrations to load in the browser session. Integrations must be
     * previously created using the Integrations API.
     */
    integrations?: Array<Configuration.Integration>;

    /**
     * Session-related configurations.
     */
    session?: Configuration.Session;
  }

  export namespace Configuration {
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
         *
         * **On change make sure to update the Proxy type.**
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
          | 'ye'
          | 'bd'
          | 'bw'
          | 'bn'
          | 'bi'
          | 'kh'
          | 'cn'
          | 'dj'
          | 'gq'
          | 'sz'
          | 'fj'
          | 'hk'
          | 'id'
          | 'ke'
          | 'la'
          | 'ls'
          | 'lr'
          | 'mg'
          | 'mw'
          | 'my'
          | 'mv'
          | 'mn'
          | 'mz'
          | 'mm'
          | 'na'
          | 'np'
          | 'nc'
          | 'ne'
          | 'om'
          | 'pg'
          | 'ru'
          | 'rw'
          | 'ws'
          | 'sg'
          | 'ss'
          | 'lk'
          | 'sd'
          | 'tz'
          | 'th'
          | 'tl'
          | 'tm'
          | 'ug'
          | 'gb'
          | 'vu'
          | 'vn'
          | 'zm'
          | 'zw'
          | 'bt'
          | 'mu';

        /**
         * Region code for more specific geographic targeting. The city parameter can only
         * be used when region is also provided.
         */
        region?: string;

        /**
         * **On change make sure to update the country_code.**
         */
        type?: 'anchor_proxy' | 'anchor_residential' | 'anchor_mobile' | 'anchor_gov';
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
}

export declare namespace BatchSessions {
  export {
    type BatchSessionCreateResponse as BatchSessionCreateResponse,
    type BatchSessionRetrieveResponse as BatchSessionRetrieveResponse,
    type BatchSessionCreateParams as BatchSessionCreateParams,
  };
}
