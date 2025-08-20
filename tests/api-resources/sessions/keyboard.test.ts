// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource keyboard', () => {
  // Prism tests are disabled
  test.skip('shortcut: only required params', async () => {
    const responsePromise = client.sessions.keyboard.shortcut('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      keys: ['Ctrl', 'a'],
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
  test.skip('shortcut: required and optional params', async () => {
    const response = await client.sessions.keyboard.shortcut('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      keys: ['Ctrl', 'a'],
      holdTime: 100,
    });
  });

  // Prism tests are disabled
  test.skip('type: only required params', async () => {
    const responsePromise = client.sessions.keyboard.type('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      text: 'Hello from Session Manager VNC API test!',
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
  test.skip('type: required and optional params', async () => {
    const response = await client.sessions.keyboard.type('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      text: 'Hello from Session Manager VNC API test!',
      delay: 30,
    });
  });
});
