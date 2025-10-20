// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'Your API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource mouse', () => {
  // Prism tests are disabled
  test.skip('click: only required params', async () => {
    const responsePromise = client.sessions.mouse.click('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      x: 0,
      y: 0,
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
  test.skip('click: required and optional params', async () => {
    const response = await client.sessions.mouse.click('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      x: 0,
      y: 0,
      button: 'left',
    });
  });

  // Prism tests are disabled
  test.skip('doubleClick: only required params', async () => {
    const responsePromise = client.sessions.mouse.doubleClick('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      x: 0,
      y: 0,
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
  test.skip('doubleClick: required and optional params', async () => {
    const response = await client.sessions.mouse.doubleClick('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      x: 0,
      y: 0,
      button: 'left',
    });
  });

  // Prism tests are disabled
  test.skip('move: only required params', async () => {
    const responsePromise = client.sessions.mouse.move('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      x: 0,
      y: 0,
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
  test.skip('move: required and optional params', async () => {
    const response = await client.sessions.mouse.move('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { x: 0, y: 0 });
  });
});
