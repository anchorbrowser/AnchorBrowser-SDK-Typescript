// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Keyboard extends APIResource {
  /**
   * Performs a keyboard shortcut using the specified keys
   *
   * @example
   * ```ts
   * const response = await client.sessions.keyboard.shortcut(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { keys: ['string'] },
   * );
   * ```
   */
  shortcut(
    sessionID: string,
    body: KeyboardShortcutParams,
    options?: RequestOptions,
  ): APIPromise<KeyboardShortcutResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/keyboard/shortcut`, { body, ...options });
  }

  /**
   * Types the specified text with optional delay between keystrokes
   *
   * @example
   * ```ts
   * const response = await client.sessions.keyboard.type(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { text: 'text' },
   * );
   * ```
   */
  type(
    sessionID: string,
    body: KeyboardTypeParams,
    options?: RequestOptions,
  ): APIPromise<KeyboardTypeResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/keyboard/type`, { body, ...options });
  }
}

export interface KeyboardShortcutResponse {
  status?: string;
}

export interface KeyboardTypeResponse {
  status?: string;
}

export interface KeyboardShortcutParams {
  /**
   * Array of keys to press simultaneously
   */
  keys: Array<string>;

  /**
   * Time to hold the keys down in milliseconds
   */
  holdTime?: number;
}

export interface KeyboardTypeParams {
  /**
   * Text to type
   */
  text: string;

  /**
   * Delay between keystrokes in milliseconds
   */
  delay?: number;
}

export declare namespace Keyboard {
  export {
    type KeyboardShortcutResponse as KeyboardShortcutResponse,
    type KeyboardTypeResponse as KeyboardTypeResponse,
    type KeyboardShortcutParams as KeyboardShortcutParams,
    type KeyboardTypeParams as KeyboardTypeParams,
  };
}
