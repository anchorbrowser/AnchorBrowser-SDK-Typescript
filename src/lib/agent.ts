import { WebSocket } from 'ws';
import { client as defaultClient } from '../generated/client.gen';
import type { Client } from '../generated/client';
import { Sessions, Tools } from '../generated/sdk.gen';
import type { SessionCreateRequestSchema } from '../generated/types.gen';
import { BrowserSetup, connectBrowser, getAgentWsUrl, getApiKey, getBaseUrl, getCdpUrl } from './browser';

export type AgentTaskResult = {
  data: { result: Record<string, unknown> };
};

export interface TaskOptions {
  url?: string;
  outputSchema?: object;
  model?: string;
  provider?: string;
  agent?: string;
  highlightElements?: boolean;
  detectElements?: boolean;
  extendedSystemMessage?: string;
  humanIntervention?: boolean;
  maxSteps?: number;
  secretValues?: Record<string, any>;
  directlyOpenUrl?: boolean;
  onAgentStep?: (step: string) => void;
}

interface AgentContext {
  sessionOptions?: SessionCreateRequestSchema;
  taskOptions?: TaskOptions;
  sessionId?: string;
  client?: Client;
}

/**
 * Execute an AI agent task in a browser session and wait for the result.
 * Creates a session (or reuses `sessionId`), optionally streams agent steps
 * over WebSocket, and cleans up when done.
 */
export async function agentTask(
  prompt: string,
  { sessionOptions, taskOptions, sessionId, client = defaultClient }: AgentContext = {},
): Promise<AgentTaskResult> {
  const setup = await setupBrowser(client, sessionOptions, sessionId);
  let webSocket: WebSocket | null = null;

  try {
    if (taskOptions?.url && setup.session.data?.id) {
      await Sessions.goto({
        path: { sessionId: setup.session.data.id },
        body: { url: taskOptions.url },
        client,
      });
    }

    if (taskOptions?.onAgentStep) {
      webSocket = setupWebSocket(client, setup.session.data?.id, taskOptions.onAgentStep);
    }

    return await executeTask(client, setup.session.data?.id!, prompt, taskOptions);
  } finally {
    cleanupWebSocket(webSocket);
    await setup.browser.close();
  }
}

/**
 * Start an AI agent task but return control to the caller immediately:
 * gives back the session id, the pending task promise, and the connected
 * Playwright browser.
 */
export async function agentBrowserTask(
  prompt: string,
  {
    sessionOptions,
    taskOptions,
    client = defaultClient,
  }: {
    sessionOptions?: SessionCreateRequestSchema;
    taskOptions?: Omit<TaskOptions, 'onAgentStep'>;
    client?: Client;
  } = {},
) {
  const setup = await setupBrowser(client, sessionOptions);

  if (taskOptions?.url && setup.session.data?.id) {
    await Sessions.goto({
      path: { sessionId: setup.session.data.id },
      body: { url: taskOptions.url },
      client,
    });
  }

  const taskResultPromise = executeTask(client, setup.session.data?.id!, prompt, taskOptions);

  return {
    sessionId: setup.session.data?.id,
    taskResultPromise,
    playwrightBrowser: setup.browser,
  };
}

async function setupBrowser(
  client: Client,
  sessionOptions?: SessionCreateRequestSchema,
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
          cdp_url: getCdpUrl(getBaseUrl(client), sessionId, await getApiKey(client)),
          live_view_url: getBaseUrl(client),
        },
      }
    : await Sessions.createSession({ body: sessionOptions ?? {}, client });

  if (!session.data?.id) {
    throw new Error('Failed to create session: No session ID returned');
  }

  const browser = await connectBrowser(session.data.id, client);
  const context = browser.contexts()[0];
  if (!context) {
    throw new Error('No browser context available');
  }
  const page = context.pages()[0];

  return { session, browser, context, page };
}

function setupWebSocket(
  client: Client,
  sessionId: string | undefined,
  onAgentStep: (step: string) => void,
): WebSocket {
  if (!sessionId) {
    throw new Error('Session ID required for WebSocket connection');
  }

  const webSocket = new WebSocket(getAgentWsUrl(getBaseUrl(client), sessionId));
  webSocket.on('message', (data) => {
    try {
      onAgentStep(JSON.parse(data.toString()));
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  });
  webSocket.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
  return webSocket;
}

function buildTaskBody(prompt: string, taskOptions?: TaskOptions): Record<string, any> {
  if (!prompt || prompt.trim().length === 0) {
    throw new Error('Prompt cannot be empty');
  }

  const body: Record<string, any> = {
    prompt,
    output_schema: taskOptions?.outputSchema,
    model: taskOptions?.model,
    provider: taskOptions?.provider,
  };

  if (taskOptions?.agent !== undefined) body['agent'] = taskOptions.agent;
  if (taskOptions?.highlightElements !== undefined)
    body['highlight_elements'] = taskOptions.highlightElements;
  if (taskOptions?.detectElements !== undefined) body['detect_elements'] = taskOptions.detectElements;
  if (taskOptions?.extendedSystemMessage !== undefined) {
    body['extended_system_message'] = taskOptions.extendedSystemMessage;
  }
  if (taskOptions?.humanIntervention !== undefined)
    body['human_intervention'] = taskOptions.humanIntervention;
  if (taskOptions?.maxSteps !== undefined) body['max_steps'] = taskOptions.maxSteps;
  if (taskOptions?.secretValues !== undefined) body['secret_values'] = taskOptions.secretValues;
  if (taskOptions?.directlyOpenUrl !== undefined) body['directly_open_url'] = taskOptions.directlyOpenUrl;

  return body;
}

async function executeTask(
  client: Client,
  sessionId: string,
  prompt: string,
  taskOptions?: TaskOptions,
): Promise<AgentTaskResult> {
  const result = await Tools.performWebTask({
    body: buildTaskBody(prompt, taskOptions) as any,
    query: { sessionId },
    client,
  });
  return result as AgentTaskResult;
}

function cleanupWebSocket(webSocket: WebSocket | null): void {
  if (webSocket) {
    try {
      webSocket.close();
      webSocket.terminate();
    } catch (error) {
      console.error('Error closing WebSocket:', error);
    }
  }
}
