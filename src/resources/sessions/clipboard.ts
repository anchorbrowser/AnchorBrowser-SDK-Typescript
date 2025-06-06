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
   * const clipboard = await client.sessions.clipboard.create(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { text: 'Text from clipboard API' },
   * );
   * ```
   */
  create(
    sessionID: string,
    body: ClipboardCreateParams,
    options?: RequestOptions,
  ): APIPromise<ClipboardCreateResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/clipboard`, { body, ...options });
  }

  /**
   * Retrieves the current content of the clipboard
   *
   * @example
   * ```ts
   * const clipboards = await client.sessions.clipboard.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  list(sessionID: string, options?: RequestOptions): APIPromise<ClipboardListResponse> {
    return this._client.get(path`/v1/sessions/${sessionID}/clipboard`, options);
  }
}

export interface ClipboardCreateResponse {
  status?: string;
}

export interface ClipboardListResponse {
  /**
   * Text content of the clipboard
   */
  text?: string;
}

export interface ClipboardCreateParams {
  /**
   * Text to set in the clipboard
   */
  text: string;
}

export declare namespace Clipboard {
  export {
    type ClipboardCreateResponse as ClipboardCreateResponse,
    type ClipboardListResponse as ClipboardListResponse,
    type ClipboardCreateParams as ClipboardCreateParams,
  };
}
