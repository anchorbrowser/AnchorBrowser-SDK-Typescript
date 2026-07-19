import Anchorbrowser, { toFile } from 'anchorbrowser';

const SESSION_ID = '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e';
const APP_ID = '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e';
const IDENTITY_ID = '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e';

export interface ParityCall {
  /** `<resource path>.<method>` — mirrors spec/sdk-manifest.yaml */
  name: string;
  invoke: (client: Anchorbrowser) => Promise<unknown>;
}

/**
 * One entry per SDK method mapped in spec/sdk-manifest.yaml, with fixed
 * parameters (taken from the required-params examples in tests/api-resources).
 * The wire-parity suite runs each against a capture server and snapshots the
 * exact request. tests/spec/coverage.test.ts asserts this list stays complete.
 */
export const parityCalls: ParityCall[] = [
  // profiles
  { name: 'profiles.create', invoke: (c) => c.profiles.create({ name: 'name' }) },
  { name: 'profiles.list', invoke: (c) => c.profiles.list() },
  { name: 'profiles.retrieve', invoke: (c) => c.profiles.retrieve('name') },
  { name: 'profiles.delete', invoke: (c) => c.profiles.delete('name') },

  // sessions
  { name: 'sessions.create', invoke: (c) => c.sessions.create() },
  { name: 'sessions.retrieve', invoke: (c) => c.sessions.retrieve(SESSION_ID) },
  { name: 'sessions.delete', invoke: (c) => c.sessions.delete(SESSION_ID) },
  {
    name: 'sessions.drag_and_drop',
    invoke: (c) => c.sessions.dragAndDrop(SESSION_ID, { endX: 0, endY: 0, startX: 0, startY: 0 }),
  },
  { name: 'sessions.goto', invoke: (c) => c.sessions.goto(SESSION_ID, { url: 'https://example.com' }) },
  { name: 'sessions.retrieve_downloads', invoke: (c) => c.sessions.retrieveDownloads(SESSION_ID) },
  {
    name: 'sessions.retrieve_screenshot',
    invoke: async (c) => {
      const res = await c.sessions.retrieveScreenshot(SESSION_ID);
      await res.arrayBuffer();
      return res;
    },
  },
  { name: 'sessions.scroll', invoke: (c) => c.sessions.scroll(SESSION_ID, { deltaY: 0, x: 0, y: 0 }) },
  {
    name: 'sessions.upload_file',
    invoke: async (c) =>
      c.sessions.uploadFile(SESSION_ID, { file: await toFile(Buffer.from('Example data'), 'README.md') }),
  },

  // sessions.all
  { name: 'sessions.all.delete', invoke: (c) => c.sessions.all.delete() },
  { name: 'sessions.all.status', invoke: (c) => c.sessions.all.status() },

  // sessions.recordings
  { name: 'sessions.recordings.list', invoke: (c) => c.sessions.recordings.list(SESSION_ID) },
  {
    name: 'sessions.recordings.primary.get',
    invoke: async (c) => {
      const res = await c.sessions.recordings.primary.get(SESSION_ID);
      await res.arrayBuffer();
      return res;
    },
  },

  // sessions.mouse
  { name: 'sessions.mouse.click', invoke: (c) => c.sessions.mouse.click(SESSION_ID, { x: 0, y: 0 }) },
  {
    name: 'sessions.mouse.double_click',
    invoke: (c) => c.sessions.mouse.doubleClick(SESSION_ID, { x: 0, y: 0 }),
  },
  { name: 'sessions.mouse.move', invoke: (c) => c.sessions.mouse.move(SESSION_ID, { x: 0, y: 0 }) },

  // sessions.keyboard
  {
    name: 'sessions.keyboard.shortcut',
    invoke: (c) => c.sessions.keyboard.shortcut(SESSION_ID, { keys: ['a'] }),
  },
  { name: 'sessions.keyboard.type', invoke: (c) => c.sessions.keyboard.type(SESSION_ID, { text: 'text' }) },

  // sessions.clipboard
  { name: 'sessions.clipboard.get', invoke: (c) => c.sessions.clipboard.get(SESSION_ID) },
  { name: 'sessions.clipboard.set', invoke: (c) => c.sessions.clipboard.set(SESSION_ID, { text: 'text' }) },

  // sessions.agent.files
  {
    name: 'sessions.agent.files.upload',
    invoke: async (c) =>
      c.sessions.agent.files.upload(SESSION_ID, {
        file: await toFile(Buffer.from('Example data'), 'README.md'),
      }),
  },

  // tools
  { name: 'tools.fetch_webpage', invoke: (c) => c.tools.fetchWebpage({ url: 'https://example.com' }) },
  { name: 'tools.perform_web_task', invoke: (c) => c.tools.performWebTask({ prompt: 'prompt' }) },
  {
    name: 'tools.screenshot_webpage',
    invoke: async (c) => {
      const res = await c.tools.screenshotWebpage({ url: 'https://example.com' });
      await res.arrayBuffer();
      return res;
    },
  },
  {
    name: 'tools.get_perform_web_task_status',
    invoke: (c) => c.tools.getPerformWebTaskStatus('workflowId'),
  },

  // extensions
  { name: 'extensions.list', invoke: (c) => c.extensions.list() },

  // events
  { name: 'events.signal', invoke: (c) => c.events.signal('event_name', { data: { message: 'bar' } }) },
  { name: 'events.wait_for', invoke: (c) => c.events.waitFor('event_name') },

  // tasks
  {
    name: 'tasks.generate',
    invoke: (c) =>
      c.tasks.generate({
        description: 'Download a specific file from a URL',
        name: 'file-downloader',
        user_task: 'Create a task that downloads a specific file from a given URL.',
      }),
  },
  {
    name: 'tasks.run',
    invoke: (c) => c.tasks.run('taskId', { input_params: { 'File Name': 'invoice-2026-02.pdf' } }),
  },
  { name: 'tasks.runs.get_status', invoke: (c) => c.tasks.runs.getStatus('runId') },
  { name: 'tasks.generations.get_status', invoke: (c) => c.tasks.generations.getStatus('taskId') },

  // identities
  {
    name: 'identities.create',
    invoke: (c) =>
      c.identities.create({
        credentials: [{ type: 'username_password', username: 'user', password: 'pass' }],
        source: 'https://example.com/login',
      }),
  },
  { name: 'identities.retrieve', invoke: (c) => c.identities.retrieve(IDENTITY_ID) },
  { name: 'identities.update', invoke: (c) => c.identities.update(IDENTITY_ID, { name: 'name' }) },
  { name: 'identities.delete', invoke: (c) => c.identities.delete(IDENTITY_ID) },
  {
    name: 'identities.retrieve_credentials',
    invoke: (c) => c.identities.retrieveCredentials(IDENTITY_ID),
  },

  // applications
  {
    name: 'applications.create',
    invoke: (c) => c.applications.create({ source: 'https://example.com' }),
  },
  { name: 'applications.list', invoke: (c) => c.applications.list() },
  { name: 'applications.retrieve', invoke: (c) => c.applications.retrieve(APP_ID) },
  { name: 'applications.delete', invoke: (c) => c.applications.delete(APP_ID) },
  {
    name: 'applications.create_identity_token',
    invoke: (c) =>
      c.applications.createIdentityToken(APP_ID, { callbackUrl: 'https://example.com/auth/callback' }),
  },
  { name: 'applications.list_identities', invoke: (c) => c.applications.listIdentities(APP_ID) },

  // applications.auth_flows
  {
    name: 'applications.auth_flows.create',
    invoke: (c) =>
      c.applications.authFlows.create(APP_ID, { methods: ['username_password'], name: 'Standard Login' }),
  },
  { name: 'applications.auth_flows.list', invoke: (c) => c.applications.authFlows.list(APP_ID) },
  {
    name: 'applications.auth_flows.delete',
    invoke: (c) => c.applications.authFlows.delete(APP_ID, { application_id: APP_ID }),
  },
];
