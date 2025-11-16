// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'Your API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource task', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.task.create({ language: 'typescript', name: 'web-scraper' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.task.create({
      language: 'typescript',
      name: 'web-scraper',
      browserConfiguration: {
        initial_url: 'https://example.com',
        live_view: { read_only: true },
        proxy: { active: true, city: 'city', country_code: 'af', region: 'region', type: 'anchor_proxy' },
        recording: { active: true },
        timeout: { idle_timeout: 0, max_duration: 0 },
      },
      code: 'Y29uc3QgYW5jaG9yID0gcmVxdWlyZSgnYW5jaG9yYnJvd3NlcicpOwoKYXN5bmMgZnVuY3Rpb24gcnVuKCkgewogIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhbmNob3IuY3JlYXRlU2Vzc2lvbigpOwogIGF3YWl0IHNlc3Npb24uZ29UbygnaHR0cHM6Ly9leGFtcGxlLmNvbScpOwogIGNvbnN0IHRpdGxlID0gYXdhaXQgc2Vzc2lvbi5nZXRUaXRsZSgpOwogIGNvbnNvbGUubG9nKHRpdGxlKTsKICBhd2FpdCBzZXNzaW9uLmNsb3NlKCk7Cn0KcnVuKCk7',
      description: 'A task to scrape product information from e-commerce sites',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.task.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.task.list({ limit: '469', page: '469' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Anchorbrowser.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('run: only required params', async () => {
    const responsePromise = client.task.run({ taskId: '550e8400-e29b-41d4-a716-446655440000' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('run: required and optional params', async () => {
    const response = await client.task.run({
      taskId: '550e8400-e29b-41d4-a716-446655440000',
      inputs: { ANCHOR_TARGET_URL: 'https://example.com', ANCHOR_MAX_PAGES: '10' },
      overrideBrowserConfiguration: {
        initial_url: 'https://example.com',
        live_view: { read_only: true },
        proxy: { active: true, city: 'city', country_code: 'af', region: 'region', type: 'anchor_proxy' },
        recording: { active: true },
        timeout: { idle_timeout: 0, max_duration: 0 },
      },
      version: '1',
    });
  });

  // Prism tests are disabled
  test.skip('run async: only required params', async () => {
    const responsePromise = client.task.run({ taskId: '550e8400-e29b-41d4-a716-446655440000', async: true });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('run async: required and optional params', async () => {
    const response = await client.task.run({
      taskId: '550e8400-e29b-41d4-a716-446655440000',
      async: true,
      inputs: { ANCHOR_TARGET_URL: 'https://example.com', ANCHOR_MAX_PAGES: '10' },
      overrideBrowserConfiguration: {
        initial_url: 'https://example.com',
        live_view: { read_only: true },
        proxy: { active: true, city: 'city', country_code: 'af', region: 'region', type: 'anchor_proxy' },
        recording: { active: true },
        timeout: { idle_timeout: 0, max_duration: 0 },
      },
      version: '1',
    });
  });
});
