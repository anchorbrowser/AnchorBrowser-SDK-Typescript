// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Executions extends APIResource {
  /**
   * Retrieves a single execution result by its ID. This endpoint is useful for
   * polling execution status in async mode or retrieving detailed execution
   * information.
   *
   * @example
   * ```ts
   * const execution = await client.task.executions.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { taskId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  retrieve(
    executionID: string,
    params: ExecutionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { taskId } = params;
    return this._client.get(path`/v1/task/${taskId}/executions/${executionID}`, options);
  }
}

export type ExecutionRetrieveResponse = unknown;

export interface ExecutionRetrieveParams {
  /**
   * The ID of the task
   */
  taskId: string;
}

export declare namespace Executions {
  export {
    type ExecutionRetrieveResponse as ExecutionRetrieveResponse,
    type ExecutionRetrieveParams as ExecutionRetrieveParams,
  };
}
