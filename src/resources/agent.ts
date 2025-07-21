import { getPlaywrightChromiumFromCdpUrl } from '../lib/browser';
import { APIResource } from '../core/resource';
import { SessionCreateParams } from './sessions';
import { WebSocket } from 'ws';

export type AgentTaskResult =
  | string
  | {
      result: Record<string, unknown>;
    };

export class Agent extends APIResource {
  async task(
    prompt: string,
    {
      sessionOptions,
      taskOptions,
    }: {
      sessionOptions?: SessionCreateParams;
      taskOptions?: { url?: string; outputSchema?: object; onAgentStep?: (step: string) => void };
    } = {},
  ): Promise<AgentTaskResult> {
    const session = await this._client.sessions.create(sessionOptions);
    const cdpBaseUrl = this._client.baseURL.replace('https://', 'wss://').replace('api.', 'connect.');
    const playwrightBrowser = await getPlaywrightChromiumFromCdpUrl(
      `${cdpBaseUrl}?apiKey=${this._client.apiKey}&sessionId=${session.data?.id}`,
    );
    const playwrightContext = playwrightBrowser.contexts()[0];
    const ai = playwrightContext?.serviceWorkers()[0];
    const page = playwrightContext?.pages()[0];

    if (taskOptions?.url) {
      await page?.goto(taskOptions.url);
    }

    let ws: WebSocket | null = null;
    if (taskOptions?.onAgentStep) {
      ws = new WebSocket(`${cdpBaseUrl}/ws?sessionId=${session.data?.id}`);
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data.toString());
        taskOptions.onAgentStep?.(data);
      };
    }
    const taskPayload = JSON.stringify({
      prompt,
      output_schema: taskOptions?.outputSchema,
    });
    const taskResult = await ai?.evaluate(taskPayload);
    if (ws) {
      ws.close();
      ws.terminate();
    }
    return taskResult as AgentTaskResult;
  }

  async browserTask(
    prompt: string,
    {
      sessionOptions,
      taskOptions,
    }: {
      sessionOptions?: SessionCreateParams;
      taskOptions?: { url?: string; outputSchema?: object };
    } = {},
  ) {
    const session = await this._client.sessions.create(sessionOptions);
    const cdpBaseUrl = this._client.baseURL.replace('https://', 'wss://').replace('api.', 'connect.');
    const playwrightBrowser = await getPlaywrightChromiumFromCdpUrl(
      `${cdpBaseUrl}?apiKey=${this._client.apiKey}&sessionId=${session.data?.id}`,
    );
    const playwrightContext = playwrightBrowser.contexts()[0];
    const ai = playwrightContext?.serviceWorkers()[0];
    const page = playwrightContext?.pages()[0];
    if (taskOptions?.url) {
      await page?.goto(taskOptions.url);
    }
    const taskPayload = JSON.stringify({
      prompt,
      output_schema: taskOptions?.outputSchema,
    });
    const taskResultPromise = ai?.evaluate(taskPayload);
    return {
      sessionId: session.data?.id,
      taskResultPromise,
      playwrightBrowser,
    };
  }
}
