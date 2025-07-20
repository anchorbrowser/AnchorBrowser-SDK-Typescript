// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Tools extends APIResource {
  /**
   * Retrieve the rendered content of a webpage, optionally formatted as Markdown or
   * HTML.
   *
   * @example
   * ```ts
   * const response = await client.tools.fetchWebpage();
   * ```
   */
  fetchWebpage(params: ToolFetchWebpageParams, options?: RequestOptions): APIPromise<string> {
    const { sessionId, ...body } = params;
    return this._client.post('/v1/tools/fetch-webpage', {
      query: { sessionId },
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'text/plain' }, options?.headers]),
    });
  }

  /**
   * Start from a URL and perform the given task.
   *
   * @example
   * ```ts
   * const response = await client.tools.performWebTask({
   *   prompt: 'Collect the node names and their CPU average %',
   * });
   * ```
   */
  performWebTask(
    params: ToolPerformWebTaskParams,
    options?: RequestOptions,
  ): APIPromise<ToolPerformWebTaskResponse> {
    const { sessionId, ...body } = params;
    return this._client.post('/v1/tools/perform-web-task', { query: { sessionId }, body, ...options });
  }

  /**
   * This endpoint captures a screenshot of the specified webpage using Chromium.
   * Users can customize the viewport dimensions and capture options.
   *
   * @example
   * ```ts
   * const response = await client.tools.screenshotWebpage();
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  screenshotWebpage(params: ToolScreenshotWebpageParams, options?: RequestOptions): APIPromise<Response> {
    const { sessionId, ...body } = params;
    return this._client.post('/v1/tools/screenshot', {
      query: { sessionId },
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'image/png' }, options?.headers]),
      __binaryResponse: true,
    });
  }
}

/**
 * The rendered content of the webpage.
 */
export type ToolFetchWebpageResponse = string;

export interface ToolPerformWebTaskResponse {
  data?: ToolPerformWebTaskResponse.Data;
}

export namespace ToolPerformWebTaskResponse {
  export interface Data {
    /**
     * The outcome or answer as a string
     */
    result?: string | { [key: string]: unknown };
  }
}

export interface ToolFetchWebpageParams {
  /**
   * Query param: An optional browser session identifier to reference an existing
   * running browser session. If provided, the tool will execute within that browser
   * session.
   */
  sessionId?: string;

  /**
   * Body param: The output format of the content.
   */
  format?: 'html' | 'markdown';

  /**
   * Body param: The URL of the webpage to fetch content from. When left empty, the
   * current webpage is used.
   */
  url?: string;
}

export interface ToolPerformWebTaskParams {
  /**
   * Body param: The task to be autonomously completed.
   */
  prompt: string;

  /**
   * Query param: An optional browser session identifier to reference an existing
   * running browser sessions. When passed, the tool will be executed on the provided
   * browser session.
   */
  sessionId?: string;

  /**
   * Body param: JSON Schema defining the expected structure of the output data.
   */
  output_schema?: unknown;

  /**
   * Body param: The URL of the webpage. If not provided, the tool will use the
   * current page in the session.
   */
  url?: string;
}

export interface ToolScreenshotWebpageParams {
  /**
   * Query param: An optional browser session identifier to reference an existing
   * running browser sessions. When passed, the tool will be executed on the provided
   * browser session.
   */
  sessionId?: string;

  /**
   * Body param: If true, captures the entire height of the page, ignoring the
   * viewport height.
   */
  capture_full_height?: boolean;

  /**
   * Body param: The height of the browser viewport in pixels.
   */
  height?: number;

  /**
   * Body param: Quality of the output image, on the range 1-100. 100 will not
   * perform any compression.
   */
  image_quality?: number;

  /**
   * Body param: Presigned S3 url target to upload the image to.
   */
  s3_target_address?: string;

  /**
   * Body param: If true, scrolls the page and captures all visible content.
   */
  scroll_all_content?: boolean;

  /**
   * Body param: The URL of the webpage to capture.
   */
  url?: string;

  /**
   * Body param: Duration in milliseconds to wait after page has loaded, mainly used
   * for sites with JS animations.
   */
  wait?: number;

  /**
   * Body param: The width of the browser viewport in pixels.
   */
  width?: number;
}

export declare namespace Tools {
  export {
    type ToolFetchWebpageResponse as ToolFetchWebpageResponse,
    type ToolPerformWebTaskResponse as ToolPerformWebTaskResponse,
    type ToolFetchWebpageParams as ToolFetchWebpageParams,
    type ToolPerformWebTaskParams as ToolPerformWebTaskParams,
    type ToolScreenshotWebpageParams as ToolScreenshotWebpageParams,
  };
}
