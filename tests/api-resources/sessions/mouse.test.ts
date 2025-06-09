// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource mouse', () => {
  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('click: required and optional params', async () => {
    const response = await client.sessions.mouse.click('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      x: 0,
      y: 0,
      button: 'left',
    });
  });

  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('doubleClick: required and optional params', async () => {
    const response = await client.sessions.mouse.doubleClick('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      x: 0,
      y: 0,
      button: 'left',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('down: only required params', async () => {
    const responsePromise = client.sessions.mouse.down('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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

  // skipped: tests are disabled for the time being
  test.skip('down: required and optional params', async () => {
    const response = await client.sessions.mouse.down('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      x: 0,
      y: 0,
      button: 'left',
    });
  });

  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('move: required and optional params', async () => {
    const response = await client.sessions.mouse.move('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { x: 0, y: 0 });
  });

  // skipped: tests are disabled for the time being
  test.skip('up: only required params', async () => {
    const responsePromise = client.sessions.mouse.up('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { x: 0, y: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('up: required and optional params', async () => {
    const response = await client.sessions.mouse.up('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      x: 0,
      y: 0,
      button: 'left',
    });
  });
});
