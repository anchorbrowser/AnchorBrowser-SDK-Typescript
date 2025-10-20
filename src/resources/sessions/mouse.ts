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
   *   { x: 0, y: 0 },
   * );
   * ```
   */
  click(sessionID: string, body: MouseClickParams, options?: RequestOptions): APIPromise<MouseClickResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/mouse/click`, { body, ...options });
  }

  /**
   * Performs a double click at the specified coordinates
   *
   * @example
   * ```ts
   * const response = await client.sessions.mouse.doubleClick(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { x: 0, y: 0 },
   * );
   * ```
   */
  doubleClick(
    sessionID: string,
    body: MouseDoubleClickParams,
    options?: RequestOptions,
  ): APIPromise<MouseDoubleClickResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/mouse/doubleClick`, { body, ...options });
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

export interface MouseDoubleClickResponse {
  status?: string;
}

export interface MouseMoveResponse {
  status?: string;
}

export interface MouseClickParams {
  /**
   * X coordinate
   */
  x: number;

  /**
   * Y coordinate
   */
  y: number;

  /**
   * Mouse button to use
   */
  button?: 'left' | 'middle' | 'right';
}

export interface MouseDoubleClickParams {
  /**
   * X coordinate
   */
  x: number;

  /**
   * Y coordinate
   */
  y: number;

  /**
   * Mouse button to use
   */
  button?: 'left' | 'middle' | 'right';
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
    type MouseDoubleClickResponse as MouseDoubleClickResponse,
    type MouseMoveResponse as MouseMoveResponse,
    type MouseClickParams as MouseClickParams,
    type MouseDoubleClickParams as MouseDoubleClickParams,
    type MouseMoveParams as MouseMoveParams,
  };
}
