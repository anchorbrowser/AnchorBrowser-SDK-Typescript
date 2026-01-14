// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Clipboard extends APIResource {
  /**
   * Sets the content of the clipboard
   *
   * @example
   * ```ts
   * const response = await client.sessions.clipboard.set(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { text: 'text' },
   * );
   * ```
   */
  set(
    sessionID: string,
    body: ClipboardSetParams,
    options?: RequestOptions,
  ): APIPromise<ClipboardSetResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/clipboard`, { body, ...options });
  }
}

export interface ClipboardSetResponse {
  status?: string;
}

export interface ClipboardSetParams {
  /**
   * Text to set in the clipboard
   */
  text: string;
}

export declare namespace Clipboard {
  export { type ClipboardSetResponse as ClipboardSetResponse, type ClipboardSetParams as ClipboardSetParams };
}
