import type { Browser, Page } from 'playwright';
import { BrowserContext, chromium } from 'playwright';

export interface BrowserSetup {
  session: { data?: { id?: string } };
  browser: Browser;
  context: BrowserContext;
  page: Page | undefined;
}

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

export const getCdpUrl = (apiBaseURL: string, sessionId: string, apiKey: string) => {
  return `${apiBaseURL
    .replace('https://', 'wss://')
    .replace('http://', 'ws://')
    .replace('api.', 'connect.')}?apiKey=${apiKey}&sessionId=${sessionId}`;
};

export const getAgentWsUrl = (apiBaseURL: string, sessionId: string) => {
  return `${apiBaseURL.replace('https://', 'wss://').replace('http://', 'ws://')}/ws?sessionId=${sessionId}`;
};

export const getPlaywrightChromiumFromCdpUrl = async (
  apiBaseURL: string,
  sessionId: string,
  apiKey: string,
) => {
  return await chromium.connectOverCDP(getCdpUrl(apiBaseURL, sessionId, apiKey));
};
