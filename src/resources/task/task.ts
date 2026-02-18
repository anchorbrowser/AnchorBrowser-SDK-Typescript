// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RunsAPI from './runs';
import { RunRetrieveStatusResponse, Runs } from './runs';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Task extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);

  /**
   * Creates a new task or updates an existing task with the same name. Tasks are
   * reusable code snippets that can be executed in browser sessions. Tasks support
   * versioning with draft and published versions.
   *
   * If you are using the new Task Builder, see the Tasks V2 endpoints in this API
   * reference.
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
   * If you are using the new Task Builder, see the Tasks V2 endpoints in this API
   * reference.
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
   * Retrieves a single execution result by its ID. This endpoint is useful for
   * polling execution status in async mode or retrieving detailed execution
   * information.
   *
   * @example
   * ```ts
   * const response = await client.task.retrieveExecutionResult(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { taskId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  retrieveExecutionResult(
    executionID: string,
    params: TaskRetrieveExecutionResultParams,
    options?: RequestOptions,
  ): APIPromise<TaskRetrieveExecutionResultResponse> {
    const { taskId } = params;
    return this._client.get(path`/v1/task/${taskId}/executions/${executionID}`, options);
  }

  /**
   * Triggers execution of a task by ID using the V2 tasks API.
   *
   * @example
   * ```ts
   * const response = await client.task.run('taskId', {
   *   input_params: {
   *     'File Name': 'invoice-2026-02.pdf',
   *     Operation: 'extract_text',
   *   },
   * });
   * ```
   */
  run(taskID: string, body: TaskRunParams, options?: RequestOptions): APIPromise<TaskRunResponse> {
    return this._client.post(path`/v2/tasks/${taskID}/run`, { body, ...options });
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
         * Proxy address in **PROTOCOL://HOST:PORT** format (e.g.,
         * https://proxy.example.com:443). See [proxy page](/advanced/proxy#custom-proxy).
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
           * Proxy address in **PROTOCOL://HOST:PORT** format (e.g.,
           * https://proxy.example.com:443). See [proxy page](/advanced/proxy#custom-proxy).
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

export interface TaskRetrieveExecutionResultResponse {
  data?: TaskRetrieveExecutionResultResponse.Data;
}

export namespace TaskRetrieveExecutionResultResponse {
  export interface Data {
    /**
     * Unique identifier for the execution result
     */
    id: string;

    /**
     * Execution start time
     */
    startTime: string;

    /**
     * Execution status
     */
    status: 'success' | 'failure' | 'timeout' | 'cancelled';

    /**
     * Task version identifier
     */
    taskVersionId: string;

    /**
     * Version that was executed
     */
    version: string;

    /**
     * Error message if execution failed
     */
    errorMessage?: string | null;

    /**
     * Execution duration in milliseconds
     */
    executionTime?: number | null;

    /**
     * Task execution output
     */
    output?: string | null;
  }
}

export interface TaskRunResponse {
  /**
   * The ID of the task run
   */
  run_id: string;

  /**
   * Current task run status
   */
  status: 'queued' | 'running' | 'success' | 'failure' | 'timeout' | 'cancelled';

  /**
   * Error message when the run fails
   */
  error?: string;

  /**
   * Task output when available
   */
  result?: { [key: string]: unknown };

  /**
   * Session ID used for this task run
   */
  session_id?: string;
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
       * Proxy address in **PROTOCOL://HOST:PORT** format (e.g.,
       * https://proxy.example.com:443). See [proxy page](/advanced/proxy#custom-proxy).
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

export interface TaskRetrieveExecutionResultParams {
  /**
   * The ID of the task
   */
  taskId: string;
}

export interface TaskRunParams {
  /**
   * Key-value pairs of input parameters for the task
   */
  input_params: { [key: string]: string };

  /**
   * Whether to clean up sessions after execution
   */
  cleanup_sessions?: boolean;

  /**
   * Optional identity ID to use for the task
   */
  identity_id?: string;

  /**
   * Optional session ID to run the task in
   */
  session_id?: string;
}

Task.Runs = Runs;

export declare namespace Task {
  export {
    type TaskCreateResponse as TaskCreateResponse,
    type TaskListResponse as TaskListResponse,
    type TaskRetrieveExecutionResultResponse as TaskRetrieveExecutionResultResponse,
    type TaskRunResponse as TaskRunResponse,
    type TaskCreateParams as TaskCreateParams,
    type TaskListParams as TaskListParams,
    type TaskRetrieveExecutionResultParams as TaskRetrieveExecutionResultParams,
    type TaskRunParams as TaskRunParams,
  };

  export { Runs as Runs, type RunRetrieveStatusResponse as RunRetrieveStatusResponse };
}
