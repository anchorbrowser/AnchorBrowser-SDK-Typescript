// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'Your API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource run', () => {
  // Prism tests are disabled
  test.skip('execute: only required params', async () => {
    const responsePromise = client.task.run.execute({ taskId: '550e8400-e29b-41d4-a716-446655440000' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('execute: required and optional params', async () => {
    const response = await client.task.run.execute({
      taskId: '550e8400-e29b-41d4-a716-446655440000',
      async: true,
      inputs: { ANCHOR_TARGET_URL: 'https://example.com', ANCHOR_MAX_PAGES: '10' },
      overrideBrowserConfiguration: {
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
      version: '1',
    });
  });
});
