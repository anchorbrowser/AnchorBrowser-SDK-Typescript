import type { Worker } from 'playwright';
import { WebSocket } from 'ws';
import { APIResource } from '../core/resource';
import {
  AgentTaskResult,
  BrowserSetup,
  getAgentWsUrl,
  getAiServiceWorker,
  getCdpUrl,
  getPlaywrightChromiumFromCdpUrl,
  TaskOptions,
} from '../lib/browser';
import { SessionCreateParams } from './sessions';

export class Agent extends APIResource {
  /**
   * Execute an AI agent task in a browser session
   * @param prompt - The task prompt for the AI agent
   * @param options - Session and task configuration options
   * @returns The result of the task execution
   * @throws Error if browser setup fails or task execution fails
   */
  async task(
    prompt: string,
    {
      sessionOptions,
      taskOptions,
      sessionId,
    }: {
      sessionOptions?: SessionCreateParams;
      taskOptions?: TaskOptions;
      sessionId?: string;
    } = {},
  ): Promise<AgentTaskResult> {
    const setup = await this.setupBrowser(sessionOptions, sessionId);
    let webSocket: WebSocket | null = null;

    try {
      // Navigate to URL if provided
      if (taskOptions?.url && setup.page) {
        await setup.page.goto(taskOptions.url);
      }

      // Setup WebSocket for step notifications
      if (taskOptions?.onAgentStep) {
        webSocket = this.setupWebSocket(setup.session.data?.id, taskOptions.onAgentStep);
      }

      // Execute the task
      const taskResult = await this.executeTask(setup.ai!, prompt, taskOptions);

      return taskResult;
    } finally {
      // Cleanup resources
      this.cleanupWebSocket(webSocket);
      await setup.browser.close();
    }
  }

  /**
   * Create a browser task that returns control to the caller
   * @param prompt - The task prompt for the AI agent
   * @param options - Session and task configuration options
   * @returns Object containing session ID, task promise, and browser instance
   * @throws Error if browser setup fails
   */
  async browserTask(
    prompt: string,
    {
      sessionOptions,
      taskOptions,
    }: {
      sessionOptions?: SessionCreateParams;
      taskOptions?: Omit<TaskOptions, 'onAgentStep'>;
    } = {},
  ) {
    const setup = await this.setupBrowser(sessionOptions);

    try {
      // Navigate to URL if provided
      if (taskOptions?.url && setup.page) {
        await setup.page.goto(taskOptions.url);
      }

      // Create task promise without executing it
      const taskPayload = this.createTaskPayload(prompt, taskOptions);
      const taskResultPromise = setup.ai?.evaluate(taskPayload);

      if (!taskResultPromise) {
        throw new Error('Failed to create task: AI worker not available');
      }

      return {
        sessionId: setup.session.data?.id,
        taskResultPromise,
        playwrightBrowser: setup.browser,
      };
    } catch (error) {
      console.error('Error in browserTask:', error);
      throw error;
    }
  }

  /**
   * Set up browser and session
   */
  private async setupBrowser(
    sessionOptions?: SessionCreateParams,
    sessionId?: string,
  ): Promise<BrowserSetup> {
    const session =
      sessionId ?
        {
          data: {
            id: sessionId,
            cdp_url: getCdpUrl(this._client.baseURL, sessionId, this._client.apiKey),
            live_view_url: this._client.baseURL,
          },
        }
      : await this._client.sessions.create(sessionOptions);

    if (!session.data?.id) {
      throw new Error('Failed to create session: No session ID returned');
    }

    const browser = await getPlaywrightChromiumFromCdpUrl(
      this._client.baseURL,
      session.data.id,
      this._client.apiKey,
    );

    const context = browser.contexts()[0];
    if (!context) {
      await browser.close();
      throw new Error('No browser context available');
    }

    const ai = getAiServiceWorker(context);
    const page = context.pages()[0];

    if (!ai) {
      await browser.close();
      throw new Error('AI service worker not available');
    }

    return { session, browser, context, page, ai };
  }

  /**
   * Set up WebSocket for agent step notifications
   */
  private setupWebSocket(sessionId: string | undefined, onAgentStep: (step: string) => void): WebSocket {
    if (!sessionId) {
      throw new Error('Session ID required for WebSocket connection');
    }

    const webSocket = new WebSocket(getAgentWsUrl(this._client.baseURL, sessionId));
    webSocket.on('message', (data) => {
      try {
        const parsed = JSON.parse(data.toString());
        onAgentStep(parsed);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    });

    webSocket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return webSocket;
  }

  /**
   * Create task payload for AI execution
   */
  private createTaskPayload(prompt: string, taskOptions?: TaskOptions): string {
    if (!prompt || prompt.trim().length === 0) {
      throw new Error('Prompt cannot be empty');
    }

    return JSON.stringify({
      prompt,
      output_schema: taskOptions?.outputSchema,
      model: taskOptions?.model,
      provider: taskOptions?.provider,
    });
  }

  /**
   * Execute task on AI worker
   */
  private async executeTask(ai: Worker, prompt: string, outputSchema?: object): Promise<AgentTaskResult> {
    const taskPayload = this.createTaskPayload(prompt, outputSchema);
    const result = await ai.evaluate(taskPayload);

    return result as AgentTaskResult;
  }

  /**
   * Clean up WebSocket connection
   */
  private cleanupWebSocket(webSocket: WebSocket | null): void {
    if (webSocket) {
      try {
        webSocket.close();
        webSocket.terminate();
      } catch (error) {
        console.error('Error closing WebSocket:', error);
      }
    }
  }
}
