// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PrimaryAPI from './primary';
import { Primary } from './primary';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Recordings extends APIResource {
  primary: PrimaryAPI.Primary = new PrimaryAPI.Primary(this._client);

  /**
   * Retrieves the URLs of the browser session's video recordings. Requires a valid
   * API key for authentication.
   *
   * @example
   * ```ts
   * const recordings = await client.sessions.recordings.list(
   *   'session_id',
   * );
   * ```
   */
  list(sessionID: string, options?: RequestOptions): APIPromise<RecordingListResponse> {
    return this._client.get(path`/v1/sessions/${sessionID}/recordings`, options);
  }
}

export interface RecordingListResponse {
  data?: RecordingListResponse.Data;
}

export namespace RecordingListResponse {
  export interface Data {
    /**
     * Total number of video recordings
     */
    count?: number;

    items?: Array<Data.Item>;
  }

  export namespace Data {
    export interface Item {
      /**
       * Unique identifier for the recording
       */
      id?: string;

      /**
       * Timestamp when the recording was created
       */
      created_at?: string;

      /**
       * Duration of the recording
       */
      duration?: string;

      /**
       * URL to access the recording file
       */
      file_link?: string;

      /**
       * Indicates if this is the primary recording
       */
      is_primary?: boolean;

      /**
       * Size of the recording file in bytes
       */
      size?: number;

      /**
       * Suggested filename for the recording
       */
      suggested_file_name?: string;
    }
  }
}

Recordings.Primary = Primary;

export declare namespace Recordings {
  export { type RecordingListResponse as RecordingListResponse };

  export { Primary as Primary };
}
