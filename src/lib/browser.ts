import type { Browser, Page } from 'playwright';
import { BrowserContext, chromium } from 'playwright';
import { client as defaultClient } from '../generated/client.gen';
import type { Client } from '../generated/client';
import { Sessions } from '../generated/sdk.gen';
import type { SessionCreateRequestSchema, SessionCreateResponseSchema } from '../generated/types.gen';

export interface BrowserSetup {
  session: SessionCreateResponseSchema;
  browser: Browser;
  context: BrowserContext;
  page: Page | undefined;
}

/** Resolve the configured base URL of a client (defaults to the shared client). */
export function getBaseUrl(client: Client = defaultClient): string {
  return (client.getConfig().baseUrl as string) ?? 'https://api.anchorbrowser.io';
}

/** Resolve the configured API key of a client (auth callback or ANCHORBROWSER_API_KEY). */
export async function getApiKey(client: Client = defaultClient): Promise<string> {
  const auth = client.getConfig().auth;
  const key = typeof auth === 'function' ? await auth({ name: 'anchor-api-key', type: 'apiKey' }) : auth;
  if (!key) {
    throw new Error(
      'No API key configured — set the ANCHORBROWSER_API_KEY environment variable or call client.setConfig({ auth: () => "..." })',
    );
  }
  return key as string;
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

/** Connect Playwright Chromium to an existing browser session over CDP. */
export async function connectBrowser(sessionId: string, client: Client = defaultClient): Promise<Browser> {
  const cdpUrl = getCdpUrl(getBaseUrl(client), sessionId, await getApiKey(client));
  return chromium.connectOverCDP(cdpUrl);
}

/**
 * Create a new browser session and connect Playwright Chromium to it.
 * Returns both the Playwright browser and the created session, so the
 * session id stays available for other SDK calls.
 */
export async function createBrowser({
  sessionOptions,
  client = defaultClient,
}: {
  sessionOptions?: SessionCreateRequestSchema;
  client?: Client;
} = {}): Promise<{ browser: Browser; session: SessionCreateResponseSchema }> {
  const session = await Sessions.createSession({ body: sessionOptions ?? {}, client });
  if (!session.data?.id) {
    throw new Error('Failed to create session: No session ID returned');
  }
  const browser = await connectBrowser(session.data.id, client);
  return { browser, session };
}
