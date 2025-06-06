// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tools', () => {
  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('performWebTask: only required params', async () => {
    const responsePromise = client.tools.performWebTask({
      prompt: 'Collect the node names and their CPU average %',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('performWebTask: required and optional params', async () => {
    const response = await client.tools.performWebTask({
      prompt: 'Collect the node names and their CPU average %',
      sessionId: 'sessionId',
      output_schema: {
        type: 'object',
        properties: {
          nodes_cpu_usage: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                node: { type: 'string' },
                cluster: { type: 'string' },
                cpu_avg_percentage: { type: 'number' },
              },
              required: ['node', 'cluster', 'cpu_avg_percentage'],
            },
          },
        },
        required: ['nodes_cpu_usage'],
      },
      url: 'https://anchorbrowser.io',
    });
  });
});
