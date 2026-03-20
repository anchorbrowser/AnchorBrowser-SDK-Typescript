// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Generations extends APIResource {
  /**
   * Returns the current status of asynchronous task generation. Poll this endpoint
   * after generating a task until status is ready or failed.
   *
   * @example
   * ```ts
   * const response = await client.tasks.generations.getStatus(
   *   'taskId',
   * );
   * ```
   */
  getStatus(taskID: string, options?: RequestOptions): APIPromise<GenerationGetStatusResponse> {
    return this._client.get(path`/v2/tasks/${taskID}/generation-status`, options);
  }
}

/**
 * Current status of asynchronous task generation.
 */
export interface GenerationGetStatusResponse {
  /**
   * The task ID
   */
  id: string;

  /**
   * Whether the task is still generating, ready to run, or failed.
   */
  status: 'generating' | 'ready' | 'failed';

  /**
   * Error message when status is failed
   */
  error?: string;

  /**
   * Optional internal project state
   */
  project_state?: string;
}

export declare namespace Generations {
  export { type GenerationGetStatusResponse as GenerationGetStatusResponse };
}
