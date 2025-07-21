import { BrowserContext, chromium, Worker } from 'playwright';

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
    .replace('api.', 'connect.')}?apiKey=${apiKey}&sessionId=${sessionId}`;
};

export const getAgentWsUrl = (apiBaseURL: string, sessionId: string, apiKey: string) => {
  return `${apiBaseURL.replace('https://', 'wss://').replace('api.', 'connect.')}/ws?sessionId=${sessionId}`;
};

export const getAiServiceWorker = (browserContext: BrowserContext): Worker | undefined => {
  const ai = browserContext
    .serviceWorkers()
    .find((sw) => sw.url().includes('chrome-extension://bppehibnhionalpjigdjdilknbljaeai/background.js'));
  return ai;
};
