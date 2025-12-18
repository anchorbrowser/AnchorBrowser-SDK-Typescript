// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Tools extends APIResource {
  /**
   * Retrieve the rendered content of a webpage, optionally formatted as Markdown or
   * HTML.
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
     * The outcome or answer produced by the autonomous task.
     */
    result?: string;
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
   * Body param: Whether to create a new page for the content.
   */
  new_page?: boolean;

  /**
   * Body param: The index of the page to fetch content from. **Overides new_page**.
   */
  page_index?: number;

  /**
   * Body param: Whether to return partial content if the content is not loaded
   * within the 20 seconds.
   */
  return_partial_on_timeout?: boolean;

  /**
   * Body param: The URL of the webpage to fetch content from. When left empty, the
   * current webpage is used.
   */
  url?: string;

  /**
   * Body param: The time to wait for **dynamic** content to load in
   * **milliseconds**.
   */
  wait?: number;
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
   * Body param: The AI agent to use for task completion. Defaults to browser-use.
   */
  agent?: 'browser-use' | 'openai-cua';

  /**
   * Body param: Enable element detection for better interaction accuracy. Improves
   * the agent's ability to identify and interact with UI elements.
   */
  detect_elements?: boolean;

  /**
   * Body param: Whether to highlight elements during task execution for better
   * visibility.
   */
  highlight_elements?: boolean;

  /**
   * Body param: Allow human intervention during task execution. When enabled, the
   * agent can request human input for ambiguous situations.
   */
  human_intervention?: boolean;

  /**
   * Body param: Maximum number of steps the agent can take to complete the task.
   * Defaults to 200.
   */
  max_steps?: number;

  /**
   * Body param: The specific model to use for task completion. see our
   * [models](/agentic-browser-control/ai-task-completion#available-models) page for
   * more information.
   */
  model?: string;

  /**
   * Body param: JSON Schema defining the expected structure of the output data.
   */
  output_schema?: unknown;

  /**
   * Body param: The AI provider to use for task completion.
   */
  provider?: 'openai' | 'gemini' | 'groq' | 'azure' | 'xai';

  /**
   * Body param: Secret values to pass to the agent for secure credential handling.
   * Keys and values are passed as environment variables to the agent.
   */
  secret_values?: { [key: string]: string };

  /**
   * Body param: The URL of the webpage. If not provided, the tool will use the
   * current page in the session.
   */
  url?: string;

   /**
   * Body param: If true, the tool will directly open the URL in the browser.
   */
  directlyOpenUrl?: boolean;
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
