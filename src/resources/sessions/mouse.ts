// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Mouse extends APIResource {
  /**
   * Performs a mouse click at the specified coordinates
   */
  click(sessionID: string, body: MouseClickParams, options?: RequestOptions): APIPromise<MouseClickResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/mouse/click`, { body, ...options });
  }

  /**
   * Performs a double click at the specified coordinates
   */
  doubleClick(
    sessionID: string,
    body: MouseDoubleClickParams,
    options?: RequestOptions,
  ): APIPromise<MouseDoubleClickResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/mouse/doubleClick`, { body, ...options });
  }

  /**
   * Performs a mouse button down action at the specified coordinates
   */
  down(sessionID: string, body: MouseDownParams, options?: RequestOptions): APIPromise<MouseDownResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/mouse/down`, { body, ...options });
  }

  /**
   * Moves the mouse cursor to the specified coordinates
   */
  move(sessionID: string, body: MouseMoveParams, options?: RequestOptions): APIPromise<MouseMoveResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/mouse/move`, { body, ...options });
  }

  /**
   * Performs a mouse button up action at the specified coordinates
   */
  up(sessionID: string, body: MouseUpParams, options?: RequestOptions): APIPromise<MouseUpResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/mouse/up`, { body, ...options });
  }
}

export interface MouseClickResponse {
  status?: string;
}

export interface MouseDoubleClickResponse {
  status?: string;
}

export interface MouseDownResponse {
  status?: string;
}

export interface MouseMoveResponse {
  status?: string;
}

export interface MouseUpResponse {
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

export interface MouseDownParams {
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

export interface MouseUpParams {
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

export declare namespace Mouse {
  export {
    type MouseClickResponse as MouseClickResponse,
    type MouseDoubleClickResponse as MouseDoubleClickResponse,
    type MouseDownResponse as MouseDownResponse,
    type MouseMoveResponse as MouseMoveResponse,
    type MouseUpResponse as MouseUpResponse,
    type MouseClickParams as MouseClickParams,
    type MouseDoubleClickParams as MouseDoubleClickParams,
    type MouseDownParams as MouseDownParams,
    type MouseMoveParams as MouseMoveParams,
    type MouseUpParams as MouseUpParams,
  };
}
