export interface BrowserSetup {
  session: { data?: { id?: string } };
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

export const getCdpUrl = (apiBaseURL: string, sessionId: string, apiKey: string) => {
  return `${apiBaseURL
    .replace('https://', 'wss://')
    .replace('http://', 'ws://')}/connect/?apiKey=${apiKey}&sessionId=${sessionId}`;
};

export const getAgentWsUrl = (apiBaseURL: string, sessionId: string) => {
  return `${apiBaseURL.replace('https://', 'wss://').replace('http://', 'ws://')}/ws?sessionId=${sessionId}`;
};
