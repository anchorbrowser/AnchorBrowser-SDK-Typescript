// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class All extends APIResource {
  /**
   * Terminates all active browser sessions associated with the provided API key.
   *
   * @example
   * ```ts
   * const successResponse = await client.sessions.all.delete();
   * ```
   */
  delete(options?: RequestOptions): APIPromise<Shared.SuccessResponse> {
    return this._client.delete('/v1/sessions/all', options);
  }

  /**
   * Retrieves status information for all browser sessions associated with the API
   * key.
   *
   * @example
   * ```ts
   * const response = await client.sessions.all.status();
   * ```
   */
  status(options?: RequestOptions): APIPromise<AllStatusResponse> {
    return this._client.get('/v1/sessions/all/status', options);
  }
}

export interface AllStatusResponse {
  data?: AllStatusResponse.Data;
}

export namespace AllStatusResponse {
  export interface Data {
    /**
     * Total number of browser sessions
     */
    count?: number;

    items?: Array<Data.Item>;
  }

  export namespace Data {
    export interface Item {
      /**
       * Timestamp when the browser session was created
       */
      created_at: string;

      /**
       * Unique identifier for the browser session
       */
      session_id: string;

      /**
       * Current status of the browser session
       */
      status: string;
    }
  }
}

export declare namespace All {
  export { type AllStatusResponse as AllStatusResponse };
}
