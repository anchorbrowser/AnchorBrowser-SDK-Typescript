// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Primary extends APIResource {
  /**
   * Downloads the primary recording file for the specified browser session. Returns
   * the recording as an MP4 file.
   *
   * @example
   * ```ts
   * const response =
   *   await client.sessions.recordings.primary.retrieveFetch(
   *     'session_id',
   *   );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  retrieveFetch(sessionID: string, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/v1/sessions/${sessionID}/recordings/primary/fetch`, {
      ...options,
      headers: buildHeaders([{ Accept: 'video/mp4' }, options?.headers]),
      __binaryResponse: true,
    });
  }
}
