// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'Your API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource events', () => {
  // Prism tests are disabled
  test.skip('signal: only required params', async () => {
    const responsePromise = client.events.signal('event_name', {
      data: {
        message: 'bar',
        result: 'bar',
        timestamp: 'bar',
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('signal: required and optional params', async () => {
    const response = await client.events.signal('event_name', {
      data: {
        message: 'bar',
        result: 'bar',
        timestamp: 'bar',
      },
    });
  });

  // Prism tests are disabled
  test.skip('waitFor', async () => {
    const responsePromise = client.events.waitFor('event_name');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('waitFor: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.events.waitFor('event_name', { timeoutMs: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Anchorbrowser.NotFoundError);
  });
});
