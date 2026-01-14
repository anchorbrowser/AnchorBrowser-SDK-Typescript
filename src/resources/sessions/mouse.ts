// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Mouse extends APIResource {
  /**
   * Performs a mouse click at the specified coordinates
   *
   * @example
   * ```ts
   * const response = await client.sessions.mouse.click(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  click(sessionID: string, body: MouseClickParams, options?: RequestOptions): APIPromise<MouseClickResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/mouse/click`, { body, ...options });
  }

  /**
   * Moves the mouse cursor to the specified coordinates
   *
   * @example
   * ```ts
   * const response = await client.sessions.mouse.move(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { x: 0, y: 0 },
   * );
   * ```
   */
  move(sessionID: string, body: MouseMoveParams, options?: RequestOptions): APIPromise<MouseMoveResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/mouse/move`, { body, ...options });
  }
}

export interface MouseClickResponse {
  status?: string;
}

export interface MouseMoveResponse {
  status?: string;
}

export interface MouseClickParams {
  /**
   * Mouse button to use
   */
  button?: 'left' | 'middle' | 'right';

  /**
   * If a selector was passed and multiple elements match the selector, the index of
   * the element in the list (0-based). Defaults to 0.
   */
  index?: number;

  /**
   * A valid CSS selector for the requested element
   */
  selector?: string;

  /**
   * If a selector was passed, timeout in ms for waiting for the DOM element to be
   * selected. Defaults to 5000 (5 seconds).
   */
  selectorTimeoutMs?: number;

  /**
   * X coordinate
   */
  x?: number;

  /**
   * Y coordinate
   */
  y?: number;
}

export interface MouseMoveParams {
  /**
   * X coordinate
   */
  x: number;

  /**
   * Y coordinate
   */
  y: number;
}

export declare namespace Mouse {
  export {
    type MouseClickResponse as MouseClickResponse,
    type MouseMoveResponse as MouseMoveResponse,
    type MouseClickParams as MouseClickParams,
    type MouseMoveParams as MouseMoveParams,
  };
}
