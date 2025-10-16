// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Clipboard extends APIResource {
  /**
   * Retrieves the current content of the clipboard
   */
  get(sessionID: string, options?: RequestOptions): APIPromise<ClipboardGetResponse> {
    return this._client.get(path`/v1/sessions/${sessionID}/clipboard`, options);
  }

  /**
   * Sets the content of the clipboard
   */
  set(
    sessionID: string,
    body: ClipboardSetParams,
    options?: RequestOptions,
  ): APIPromise<ClipboardSetResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/clipboard`, { body, ...options });
  }
}

export interface ClipboardGetResponse {
  data?: ClipboardGetResponse.Data;
}

export namespace ClipboardGetResponse {
  export interface Data {
    /**
     * Text content of the clipboard
     */
    text?: string;
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
  export {
    type ClipboardGetResponse as ClipboardGetResponse,
    type ClipboardSetResponse as ClipboardSetResponse,
    type ClipboardSetParams as ClipboardSetParams,
  };
}
