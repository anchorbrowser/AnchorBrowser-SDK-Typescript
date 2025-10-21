// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Task extends APIResource {
  /**
   * Creates a new task or updates an existing task with the same name. Tasks are
   * reusable code snippets that can be executed in browser sessions. Tasks support
   * versioning with draft and published versions.
   *
   * @example
   * ```ts
   * const task = await client.task.create({
   *   language: 'typescript',
   *   name: 'web-scraper',
   *   code: 'Y29uc3QgYW5jaG9yID0gcmVxdWlyZSgnYW5jaG9yYnJvd3NlcicpOwoKYXN5bmMgZnVuY3Rpb24gcnVuKCkgewogIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhbmNob3IuY3JlYXRlU2Vzc2lvbigpOwogIGF3YWl0IHNlc3Npb24uZ29UbygnaHR0cHM6Ly9leGFtcGxlLmNvbScpOwogIGNvbnN0IHRpdGxlID0gYXdhaXQgc2Vzc2lvbi5nZXRUaXRsZSgpOwogIGNvbnNvbGUubG9nKHRpdGxlKTsKICBhd2FpdCBzZXNzaW9uLmNsb3NlKCk7Cn0KcnVuKCk7',
   *   description:
   *     'A task to scrape product information from e-commerce sites',
   * });
   * ```
   */
  create(body: TaskCreateParams, options?: RequestOptions): APIPromise<TaskCreateResponse> {
    return this._client.post('/v1/task', { body, ...options });
  }

  /**
   * Retrieves a paginated list of all tasks for the authenticated team. Tasks are
   * returned with their latest version information and metadata.
   *
   * @example
   * ```ts
   * const tasks = await client.task.list();
   * ```
   */
  list(
    query: TaskListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TaskListResponse> {
    return this._client.get('/v1/task', { query, ...options });
  }

  /**
   * Executes a task in a browser session. The task can be run with a specific
   * version or the latest version. Optionally, you can provide an existing session
   * ID or let the system create a new one.
   *
   * @example
   * ```ts
   * const response = await client.task.run({
   *   taskId: '550e8400-e29b-41d4-a716-446655440000',
   *   inputs: {
   *     ANCHOR_TARGET_URL: 'https://example.com',
   *     ANCHOR_MAX_PAGES: '10',
   *   },
   *   version: '1',
   * });
   * ```
   */
  run(body: RunExecuteParams, options?: RequestOptions): APIPromise<RunExecuteResponse> {
    return this._client.post('/v1/task/run', { body, ...options });
  }
}

export interface TaskCreateResponse {
  data?: TaskCreateResponse.Data;
}

export namespace TaskCreateResponse {
  export interface Data {
    /**
     * Unique identifier for the task
     */
    id: string;

    /**
     * Base64 encoded task code
     */
    code: string;

    /**
     * Task creation timestamp
     */
    createdAt: string;

    /**
     * Whether the task is soft deleted
     */
    deleted: boolean;

    /**
     * Programming language for the task
     */
    language: 'typescript';

    /**
     * Latest version identifier (draft, latest, or version number)
     */
    latestVersion: string;

    /**
     * Task name (letters, numbers, hyphens, and underscores only)
     */
    name: string;

    /**
     * Team identifier that owns this task
     */
    teamId: string;

    /**
     * Task last update timestamp
     */
    updatedAt: string;

    /**
     * Browser configuration for task execution
     */
    browserConfiguration?: Data.BrowserConfiguration;

    /**
     * Optional description of the task
     */
    description?: string;
  }

  export namespace Data {
    /**
     * Browser configuration for task execution
     */
    export interface BrowserConfiguration {
      /**
       * The URL to navigate to when the browser session starts. If not provided, the
       * browser will load an empty page.
       */
      initial_url?: string;

      /**
       * Configuration for live viewing the browser session.
       */
      live_view?: BrowserConfiguration.LiveView;

      /**
       * Proxy Documentation available at [Proxy Documentation](/advanced/proxy)
       */
      proxy?: BrowserConfiguration.AnchorProxy | BrowserConfiguration.CustomProxy;

      /**
       * Configuration for session recording.
       */
      recording?: BrowserConfiguration.Recording;

      /**
       * Timeout configurations for the browser session.
       */
      timeout?: BrowserConfiguration.Timeout;
    }

    export namespace BrowserConfiguration {
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

export interface TaskListResponse {
  data?: TaskListResponse.Data;
}

export namespace TaskListResponse {
  export interface Data {
    /**
     * Number of tasks per page
     */
    limit: number;

    /**
     * Current page number
     */
    page: number;

    tasks: Array<Data.Task>;

    /**
     * Total number of tasks
     */
    total: number;
  }

  export namespace Data {
    export interface Task {
      /**
       * Unique identifier for the task
       */
      id: string;

      /**
       * Base64 encoded task code
       */
      code: string;

      /**
       * Task creation timestamp
       */
      createdAt: string;

      /**
       * Whether the task is soft deleted
       */
      deleted: boolean;

      /**
       * Programming language for the task
       */
      language: 'typescript';

      /**
       * Latest version identifier (draft, latest, or version number)
       */
      latestVersion: string;

      /**
       * Task name (letters, numbers, hyphens, and underscores only)
       */
      name: string;

      /**
       * Team identifier that owns this task
       */
      teamId: string;

      /**
       * Task last update timestamp
       */
      updatedAt: string;

      /**
       * Browser configuration for task execution
       */
      browserConfiguration?: Task.BrowserConfiguration;

      /**
       * Optional description of the task
       */
      description?: string;
    }

    export namespace Task {
      /**
       * Browser configuration for task execution
       */
      export interface BrowserConfiguration {
        /**
         * The URL to navigate to when the browser session starts. If not provided, the
         * browser will load an empty page.
         */
        initial_url?: string;

        /**
         * Configuration for live viewing the browser session.
         */
        live_view?: BrowserConfiguration.LiveView;

        /**
         * Proxy Documentation available at [Proxy Documentation](/advanced/proxy)
         */
        proxy?: BrowserConfiguration.AnchorProxy | BrowserConfiguration.CustomProxy;

        /**
         * Configuration for session recording.
         */
        recording?: BrowserConfiguration.Recording;

        /**
         * Timeout configurations for the browser session.
         */
        timeout?: BrowserConfiguration.Timeout;
      }

      export namespace BrowserConfiguration {
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
}

export interface TaskCreateParams {
  /**
   * Programming language for the task
   */
  language: 'typescript';

  /**
   * Task name (letters, numbers, hyphens, and underscores only)
   */
  name: string;

  /**
   * Browser configuration for task execution
   */
  browserConfiguration?: TaskCreateParams.BrowserConfiguration;

  /**
   * Base64 encoded task code (optional)
   */
  code?: string;

  /**
   * Optional description of the task
   */
  description?: string;
}

export namespace TaskCreateParams {
  /**
   * Browser configuration for task execution
   */
  export interface BrowserConfiguration {
    /**
     * The URL to navigate to when the browser session starts. If not provided, the
     * browser will load an empty page.
     */
    initial_url?: string;

    /**
     * Configuration for live viewing the browser session.
     */
    live_view?: BrowserConfiguration.LiveView;

    /**
     * Proxy Documentation available at [Proxy Documentation](/advanced/proxy)
     */
    proxy?: BrowserConfiguration.AnchorProxy | BrowserConfiguration.CustomProxy;

    /**
     * Configuration for session recording.
     */
    recording?: BrowserConfiguration.Recording;

    /**
     * Timeout configurations for the browser session.
     */
    timeout?: BrowserConfiguration.Timeout;
  }

  export namespace BrowserConfiguration {
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

export interface TaskListParams {
  /**
   * Number of tasks per page
   */
  limit?: string;

  /**
   * Page number
   */
  page?: string;
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

export declare namespace Task {
  export {
    type TaskCreateResponse as TaskCreateResponse,
    type TaskListResponse as TaskListResponse,
    type TaskCreateParams as TaskCreateParams,
    type TaskListParams as TaskListParams,
    type RunExecuteResponse as RunExecuteResponse,
    type RunExecuteParams as RunExecuteParams,
  };
}
