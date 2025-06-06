// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class All extends APIResource {
  /**
   * Terminates all active browser sessions associated with the provided API key.
   *
   * @example
   * ```ts
   * const response = await client.sessions.all.deleteAll();
   * ```
   */
  deleteAll(options?: RequestOptions): APIPromise<AllDeleteAllResponse> {
    return this._client.delete('/v1/sessions/all', options);
  }

  /**
   * Retrieves status information for all browser sessions associated with the API
   * key.
   *
   * @example
   * ```ts
   * const response = await client.sessions.all.retrieveStatus();
   * ```
   */
  retrieveStatus(options?: RequestOptions): APIPromise<AllRetrieveStatusResponse> {
    return this._client.get('/v1/sessions/all/status', options);
  }
}

export interface AllDeleteAllResponse {
  data?: AllDeleteAllResponse.Data;
}

export namespace AllDeleteAllResponse {
  export interface Data {
    status?: string;
  }
}

export interface AllRetrieveStatusResponse {
  data?: AllRetrieveStatusResponse.Data;
}

export namespace AllRetrieveStatusResponse {
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
  export {
    type AllDeleteAllResponse as AllDeleteAllResponse,
    type AllRetrieveStatusResponse as AllRetrieveStatusResponse,
  };
}
