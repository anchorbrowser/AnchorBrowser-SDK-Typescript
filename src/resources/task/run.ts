// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Run extends APIResource {
  /**
   * Executes a task in a browser session. The task can be run with a specific
   * version or the latest version. Optionally, you can provide an existing session
   * ID or let the system create a new one.
   *
   * @example
   * ```ts
   * const response = await client.task.run.execute({
   *   taskId: '550e8400-e29b-41d4-a716-446655440000',
   *   inputs: {
   *     ANCHOR_TARGET_URL: 'https://example.com',
   *     ANCHOR_MAX_PAGES: '10',
   *   },
   *   version: '1',
   * });
   * ```
   */
  execute(body: RunExecuteParams, options?: RequestOptions): APIPromise<RunExecuteResponse> {
    return this._client.post('/v1/task/run', { body, ...options });
  }
}

export interface RunExecuteResponse {
  data?: RunExecuteResponse.Data;
}

export namespace RunExecuteResponse {
  export interface Data {
    /**
     * Execution result message
     */
    message: string;

    /**
     * Whether the task executed successfully
     */
    success: boolean;

    /**
     * Task identifier
     */
    taskId: string;

    /**
     * Error message if execution failed
     */
    error?: string;

    /**
     * Execution duration in milliseconds
     */
    executionTime?: number;

    /**
     * Task execution output
     */
    output?: string;
  }
}

export interface RunExecuteParams {
  /**
   * Task identifier
   */
  taskId: string;

  /**
   * Whether to run the task asynchronously.
   */
  async?: boolean;

  /**
   * Environment variables for task execution (keys must start with ANCHOR\_)
   */
  inputs?: { [key: string]: string };

  /**
   * Override browser configuration for this execution
   */
  overrideBrowserConfiguration?: RunExecuteParams.OverrideBrowserConfiguration;

  /**
   * Optional existing session ID to use
   */
  sessionId?: string;

  /**
   * Optional task-specific session ID
   */
  taskSessionId?: string;

  /**
   * Version to run (draft, latest, or version number)
   */
  version?: string;
}

export namespace RunExecuteParams {
  /**
   * Override browser configuration for this execution
   */
  export interface OverrideBrowserConfiguration {
    /**
     * The URL to navigate to when the browser session starts. If not provided, the
     * browser will load an empty page.
     */
    initial_url?: string;

    /**
     * Configuration for live viewing the browser session.
     */
    live_view?: OverrideBrowserConfiguration.LiveView;

    /**
     * Proxy Documentation available at [Proxy Documentation](/advanced/proxy)
     */
    proxy?: OverrideBrowserConfiguration.AnchorProxy | OverrideBrowserConfiguration.CustomProxy;

    /**
     * Configuration for session recording.
     */
    recording?: OverrideBrowserConfiguration.Recording;

    /**
     * Timeout configurations for the browser session.
     */
    timeout?: OverrideBrowserConfiguration.Timeout;
  }

  export namespace OverrideBrowserConfiguration {
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

export declare namespace Run {
  export { type RunExecuteResponse as RunExecuteResponse, type RunExecuteParams as RunExecuteParams };
}
