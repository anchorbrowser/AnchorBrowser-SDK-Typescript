// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'Your API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tasks', () => {
  // Mock server tests are disabled
  test.skip('generate: only required params', async () => {
    const responsePromise = client.tasks.generate({
      description: 'Download a specific file from a URL',
      name: 'file-downloader',
      user_task: 'Create a task that downloads a specific file from a given URL.',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('generate: required and optional params', async () => {
    const response = await client.tasks.generate({
      description: 'Download a specific file from a URL',
      name: 'file-downloader',
      user_task: 'Create a task that downloads a specific file from a given URL.',
      application_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      input_schema: [
        {
          display_name: 'URL',
          type: 'string',
          default_value: 'default_value',
          description: 'URL of the file to download',
          required: true,
        },
        {
          display_name: 'File Name',
          type: 'string',
          default_value: 'default_value',
          description: 'Name of the file to download',
          required: true,
        },
      ],
      output_schema: [
        {
          display_name: 'Success',
          type: 'boolean',
          default_value: 'default_value',
          description: 'Whether the download succeeded',
          required: true,
        },
        {
          display_name: 'Message',
          type: 'string',
          default_value: 'default_value',
          description: 'Status or error message',
          required: true,
        },
      ],
      task_browser_default_configuration: {
        initial_url: 'https://example.com',
        live_view: { read_only: true },
        proxy: {
          active: true,
          city: 'city',
          country_code: 'af',
          region: 'region',
          type: 'anchor_proxy',
        },
        recording: { active: true },
        timeout: { idle_timeout: 0, max_duration: 0 },
      },
    });
  });

  // Mock server tests are disabled
  test.skip('run: only required params', async () => {
    const responsePromise = client.tasks.run('taskId', {
      input_params: { 'File Name': 'invoice-2026-02.pdf', Operation: 'extract_text' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('run: required and optional params', async () => {
    const response = await client.tasks.run('taskId', {
      input_params: { 'File Name': 'invoice-2026-02.pdf', Operation: 'extract_text' },
      cleanup_sessions: true,
      identity_id: 'identity_id',
      session_id: 'session_id',
    });
  });
});
