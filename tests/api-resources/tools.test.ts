// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'Your API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tools', () => {
  // Prism tests are disabled
  test.skip('fetchWebpage', async () => {
    const responsePromise = client.tools.fetchWebpage({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('performWebTask: only required params', async () => {
    const responsePromise = client.tools.performWebTask({ prompt: 'prompt' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('performWebTask: required and optional params', async () => {
    const response = await client.tools.performWebTask({
      prompt: 'prompt',
      sessionId: 'sessionId',
      agent: 'browser-use',
      detect_elements: true,
      highlight_elements: true,
      human_intervention: true,
      max_steps: 0,
      model: 'model',
      output_schema: {},
      provider: 'openai',
      secret_values: { foo: 'string' },
      url: 'url',
    });
  });
});
