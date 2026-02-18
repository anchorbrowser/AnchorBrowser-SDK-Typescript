// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Runs extends APIResource {
  /**
   * Retrieves the current status and result of a task run in the V2 tasks API.
   *
   * @example
   * ```ts
   * const response = await client.task.runs.retrieveStatus(
   *   'runId',
   * );
   * ```
   */
  retrieveStatus(runID: string, options?: RequestOptions): APIPromise<RunRetrieveStatusResponse> {
    return this._client.get(path`/v2/tasks/runs/${runID}/status`, options);
  }
}

export interface RunRetrieveStatusResponse {
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

export declare namespace Runs {
  export { type RunRetrieveStatusResponse as RunRetrieveStatusResponse };
}
