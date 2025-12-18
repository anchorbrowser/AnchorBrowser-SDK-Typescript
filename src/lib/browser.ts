import type { Browser, Page } from 'playwright';
import { BrowserContext, chromium, Worker } from 'playwright';

export interface BrowserSetup {
  session: { data?: { id?: string } };
  browser: Browser;
  context: BrowserContext;
  page: Page | undefined;
  ai: Worker;
}

export type AgentTaskResult =
  | string
  | {
      result: Record<string, unknown>;
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

export const getPlaywrightChromiumFromCdpUrl = async (
  apiBaseURL: string,
  sessionId: string,
  apiKey: string,
) => {
  return await chromium.connectOverCDP(getCdpUrl(apiBaseURL, sessionId, apiKey));
};

export const getCdpUrl = (apiBaseURL: string, sessionId: string, apiKey: string) => {
  return `${apiBaseURL
    .replace('https://', 'wss://')
    .replace('http://', 'ws://')
    .replace('api.', 'connect.')}?apiKey=${apiKey}&sessionId=${sessionId}`;
};

export const getAgentWsUrl = (apiBaseURL: string, sessionId: string) => {
  return `${apiBaseURL.replace('https://', 'wss://').replace('http://', 'ws://')}/ws?sessionId=${sessionId}`;
};

export const getAiServiceWorker = (browserContext: BrowserContext): Worker | undefined => {
  const ai = browserContext
    .serviceWorkers()
    .find((sw) => sw.url().includes('chrome-extension://bppehibnhionalpjigdjdilknbljaeai/background.js'));
  return ai;
};
