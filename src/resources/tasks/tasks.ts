// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GenerationsAPI from './generations';
import { GenerationGetStatusResponse, Generations } from './generations';
import * as RunsAPI from './runs';
import { RunGetStatusResponse, Runs } from './runs';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Tasks extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);
  generations: GenerationsAPI.Generations = new GenerationsAPI.Generations(this._client);

  /**
   * Initiates asynchronous task generation. Use the returned task ID to poll for
   * completion, then execute the task.
   *
   * @example
   * ```ts
   * const response = await client.tasks.generate({
   *   description: 'Download a specific file from a URL',
   *   name: 'file-downloader',
   *   user_task: 'Create a task that downloads a specific file from a given URL.',
   *   input_schema: [
   *     {
   *       display_name: 'URL',
   *       type: 'string',
   *       required: true,
   *       description: 'URL of the file to download',
   *     },
   *     {
   *       display_name: 'File Name',
   *       type: 'string',
   *       required: true,
   *       description: 'Name of the file to download',
   *     },
   *   ],
   *   output_schema: [
   *     {
   *       display_name: 'Success',
   *       type: 'boolean',
   *       description: 'Whether the download succeeded',
   *     },
   *     {
   *       display_name: 'Message',
   *       type: 'string',
   *       description: 'Status or error message',
   *     },
   *   ],
   * });
   * ```
   */
  generate(body: TaskGenerateParams, options?: RequestOptions): APIPromise<TaskGenerateResponse> {
    return this._client.post('/v2/tasks/generate', { body, ...options });
  }

  /**
   * Triggers execution of a task by ID using the V2 tasks API.
   *
   * @example
   * ```ts
   * const response = await client.tasks.run('taskId', {
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

/**
 * Response when task generation has been started (generation is asynchronous).
 */
export interface TaskGenerateResponse {
  /**
   * The ID of the created task (use with generation-status and run endpoints)
   */
  id: string;

  /**
   * Whether the task is still generating, ready to run, or failed.
   */
  status: 'generating';
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

export interface TaskGenerateParams {
  /**
   * Description of the task
   */
  description: string;

  /**
   * Name of the task
   */
  name: string;

  /**
   * Natural language description of what the task should do (used for AI generation)
   */
  user_task: string;

  /**
   * Optional application (connection) ID to associate with the task
   */
  application_id?: string;

  /**
   * Optional list of input parameters for the task. Defaults to empty array.
   */
  input_schema?: Array<TaskGenerateParams.InputSchema>;

  /**
   * Optional list of output parameters for the task. Defaults to empty array.
   */
  output_schema?: Array<TaskGenerateParams.OutputSchema>;

  /**
   * Optional default browser/session configuration when running this task
   */
  task_browser_default_configuration?: TaskGenerateParams.TaskBrowserDefaultConfiguration;
}

export namespace TaskGenerateParams {
  /**
   * A single input or output parameter for a generated task.
   */
  export interface InputSchema {
    /**
     * Human-readable name for the parameter
     */
    display_name: string;

    /**
     * Data type of the parameter
     */
    type: 'string' | 'number' | 'boolean' | 'date';

    /**
     * Optional default value as a string
     */
    default_value?: string;

    /**
     * Optional description of the parameter
     */
    description?: string;

    /**
     * Whether the parameter is required
     */
    required?: boolean;
  }

  /**
   * A single input or output parameter for a generated task.
   */
  export interface OutputSchema {
    /**
     * Human-readable name for the parameter
     */
    display_name: string;

    /**
     * Data type of the parameter
     */
    type: 'string' | 'number' | 'boolean' | 'date';

    /**
     * Optional default value as a string
     */
    default_value?: string;

    /**
     * Optional description of the parameter
     */
    description?: string;

    /**
     * Whether the parameter is required
     */
    required?: boolean;
  }

  /**
   * Optional default browser/session configuration when running this task
   */
  export interface TaskBrowserDefaultConfiguration {
    /**
     * The URL to navigate to when the browser session starts. If not provided, the
     * browser will load an empty page.
     */
    initial_url?: string;

    /**
     * Configuration for live viewing the browser session.
     */
    live_view?: TaskBrowserDefaultConfiguration.LiveView;

    /**
     * Proxy Documentation available at [Proxy Documentation](/advanced/proxy)
     */
    proxy?: TaskBrowserDefaultConfiguration.AnchorProxy | TaskBrowserDefaultConfiguration.CustomProxy;

    /**
     * Configuration for session recording.
     */
    recording?: TaskBrowserDefaultConfiguration.Recording;

    /**
     * Timeout configurations for the browser session.
     */
    timeout?: TaskBrowserDefaultConfiguration.Timeout;
  }

  export namespace TaskBrowserDefaultConfiguration {
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

export interface TaskRunParams {
  /**
   * Key-value pairs of input parameters for the task
   */
  input_params: { [key: string]: string };

  /**
   * Whether to clean up sessions after execution (default: true)
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

Tasks.Runs = Runs;
Tasks.Generations = Generations;

export declare namespace Tasks {
  export {
    type TaskGenerateResponse as TaskGenerateResponse,
    type TaskRunResponse as TaskRunResponse,
    type TaskGenerateParams as TaskGenerateParams,
    type TaskRunParams as TaskRunParams,
  };

  export { Runs as Runs, type RunGetStatusResponse as RunGetStatusResponse };

  export { Generations as Generations, type GenerationGetStatusResponse as GenerationGetStatusResponse };
}
