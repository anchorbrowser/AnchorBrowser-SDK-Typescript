import { WebSocket } from 'ws';
import type { Anchorbrowser } from '../client';
import { APIResource } from '../core/resource';
import {
  AgentTaskResult,
  BrowserSetup,
  getAgentWsUrl,
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
      if (taskOptions?.url && setup.session.data?.id) {
        await this._client.sessions.goto(setup.session.data.id, {
          url: taskOptions.url,
        });
      }

      // Setup WebSocket for step notifications
      if (taskOptions?.onAgentStep) {
        webSocket = this.setupWebSocket(setup.session.data?.id, taskOptions.onAgentStep);
      }

      // Execute the task
      const taskResult = await this.executeTaskSessionClient(
        this._client,
        setup.session.data?.id!,
        prompt,
        taskOptions ?? {},
      );

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
      playwrightBrowser?: BrowserSetup;
    } = {},
  ) {
    const setup = await this.setupBrowser(sessionOptions);

    try {
      // Navigate to URL if provided
      if (taskOptions?.url && setup.session.data?.id) {
        await this._client.sessions.goto(setup.session.data?.id!, {
          url: taskOptions.url,
        });
      }

      // Create task promise without executing it
      const taskPayload = this.createTaskPayload(prompt, taskOptions);
      const taskResultPromise = this.executeTaskSessionClient(
        this._client,
        setup.session.data?.id!,
        prompt,
        taskPayload,
      );

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
    if (sessionId && sessionOptions) {
      throw new Error('sessionId and sessionOptions cannot be provided together');
    }

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
      throw new Error('No browser context available');
    }
    const page = context.pages()[0];

    return { session, browser, context, page };
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
   * Create task payload JSON for AI execution
   */
  private createTaskPayloadJSON(prompt: string, taskOptions?: TaskOptions): string {
    if (!prompt || prompt.trim().length === 0) {
      throw new Error('Prompt cannot be empty');
    }

    const payload: Record<string, any> = {
      prompt,
      output_schema: taskOptions?.outputSchema,
      model: taskOptions?.model,
      provider: taskOptions?.provider,
    };

    if (taskOptions?.agent !== undefined) {
      payload['agent'] = taskOptions.agent;
    }
    if (taskOptions?.highlightElements !== undefined) {
      payload['highlight_elements'] = taskOptions.highlightElements;
    }
    if (taskOptions?.detectElements !== undefined) {
      payload['detect_elements'] = taskOptions.detectElements;
    }
    if (taskOptions?.extendedSystemMessage !== undefined) {
      payload['extended_system_message'] = taskOptions.extendedSystemMessage;
    }
    if (taskOptions?.humanIntervention !== undefined) {
      payload['human_intervention'] = taskOptions.humanIntervention;
    }
    if (taskOptions?.maxSteps !== undefined) {
      payload['max_steps'] = taskOptions.maxSteps;
    }
    if (taskOptions?.secretValues !== undefined) {
      payload['secret_values'] = taskOptions.secretValues;
    }
    if (taskOptions?.directlyOpenUrl !== undefined) {
      payload['directly_open_url'] = taskOptions.directlyOpenUrl;
    }

    return JSON.stringify(payload);
  }

  /**
   * Create task payload for AI execution
   */
  private createTaskPayload(prompt: string, taskOptions?: TaskOptions): Record<string, any> {
    if (!prompt || prompt.trim().length === 0) {
      throw new Error('Prompt cannot be empty');
    }

    const payload: Record<string, any> = {
      prompt,
      output_schema: taskOptions?.outputSchema,
      model: taskOptions?.model,
      provider: taskOptions?.provider,
    };

    if (taskOptions?.agent !== undefined) {
      payload['agent'] = taskOptions.agent;
    }
    if (taskOptions?.highlightElements !== undefined) {
      payload['highlight_elements'] = taskOptions.highlightElements;
    }
    if (taskOptions?.detectElements !== undefined) {
      payload['detect_elements'] = taskOptions.detectElements;
    }
    if (taskOptions?.extendedSystemMessage !== undefined) {
      payload['extended_system_message'] = taskOptions.extendedSystemMessage;
    }
    if (taskOptions?.humanIntervention !== undefined) {
      payload['human_intervention'] = taskOptions.humanIntervention;
    }
    if (taskOptions?.maxSteps !== undefined) {
      payload['max_steps'] = taskOptions.maxSteps;
    }
    if (taskOptions?.secretValues !== undefined) {
      payload['secret_values'] = taskOptions.secretValues;
    }
    if (taskOptions?.directlyOpenUrl !== undefined) {
      payload['directly_open_url'] = taskOptions.directlyOpenUrl;
    }

    return payload;
  }

  /**
   * Execute task on session client
   */
  private async executeTaskSessionClient(
    anchorbrowserClient: Anchorbrowser,
    sessionId: string,
    prompt: string,
    taskOptions?: any,
  ): Promise<AgentTaskResult> {
    const taskPayload = this.createTaskPayload(prompt, taskOptions);
    const result = await anchorbrowserClient.tools.performWebTask({
      prompt: prompt,
      sessionId,
      ...taskPayload,
    });
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
