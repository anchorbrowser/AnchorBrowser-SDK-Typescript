// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Events extends APIResource {
  /**
   * Signals an event with associated data, unblocking any clients waiting for this
   * event. This enables coordination between different browser sessions, workflows,
   * or external processes.
   *
   * @example
   * ```ts
   * const successResponse = await client.events.signal(
   *   'workflow_completed',
   *   {
   *     data: {
   *       message: 'bar',
   *       result: 'bar',
   *       timestamp: 'bar',
   *     },
   *   },
   * );
   * ```
   */
  signal(
    eventName: string,
    body: EventSignalParams,
    options?: RequestOptions,
  ): APIPromise<Shared.SuccessResponse> {
    return this._client.post(path`/v1/events/${eventName}`, { body, ...options });
  }

  /**
   * Waits for a specific event to be signaled by another process, workflow, or
   * session. This endpoint blocks until the event is signaled or the timeout is
   * reached. Useful for coordinating between multiple browser sessions or workflows.
   *
   * @example
   * ```ts
   * const response = await client.events.waitFor(
   *   'workflow_completed',
   * );
   * ```
   */
  waitFor(
    eventName: string,
    body: EventWaitForParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EventWaitForResponse> {
    return this._client.post(path`/v1/events/${eventName}/wait`, { body, ...options });
  }
}

export interface EventWaitForResponse {
  /**
   * The event data that was signaled
   */
  data?: { [key: string]: unknown };
}

export interface EventSignalParams {
  /**
   * Event data to be passed to waiting clients
   */
  data: { [key: string]: unknown };
}

export interface EventWaitForParams {
  /**
   * Timeout in milliseconds to wait for the event. Defaults to 60000ms (1 minute).
   */
  timeoutMs?: number;
}

export declare namespace Events {
  export {
    type EventWaitForResponse as EventWaitForResponse,
    type EventSignalParams as EventSignalParams,
    type EventWaitForParams as EventWaitForParams,
  };
}
