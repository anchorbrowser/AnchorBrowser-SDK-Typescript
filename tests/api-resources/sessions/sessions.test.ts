// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sessions', () => {
  // skipped: tests are disabled for the time being
  test.skip('create', async () => {
    const responsePromise = client.sessions.create();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sessions.create(
        {
          browser: {
            adblock: { active: false },
            captcha_solver: { active: false },
            extensions: ['550e8400-e29b-41d4-a716-446655440000', '6ba7b810-9dad-11d1-80b4-00c04fd430c8'],
            fullscreen: { active: false },
            headless: { active: true },
            p2p_download: { active: false },
            popup_blocker: { active: false },
            profile: { name: 'my-profile', persist: true },
            viewport: { height: 900, width: 1440 },
          },
          session: {
            initial_url: 'https://anchorbrowser.io',
            live_view: { read_only: false },
            proxy: { active: true, country_code: 'af', type: 'anchor_residential' },
            recording: { active: false },
            timeout: { idle_timeout: 3, max_duration: 10 },
          },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Anchorbrowser.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('delete', async () => {
    const responsePromise = client.sessions.delete('session_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('copy', async () => {
    const responsePromise = client.sessions.copy('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('dragAndDrop: only required params', async () => {
    const responsePromise = client.sessions.dragAndDrop('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      endX: 500,
      endY: 300,
      startX: 400,
      startY: 200,
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
  test.skip('dragAndDrop: required and optional params', async () => {
    const response = await client.sessions.dragAndDrop('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      endX: 500,
      endY: 300,
      startX: 400,
      startY: 200,
      button: 'left',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('goto: only required params', async () => {
    const responsePromise = client.sessions.goto('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      url: 'https://www.google.com',
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
  test.skip('goto: required and optional params', async () => {
    const response = await client.sessions.goto('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      url: 'https://www.google.com',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('paste: only required params', async () => {
    const responsePromise = client.sessions.paste('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      text: 'Text pasted via API',
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
  test.skip('paste: required and optional params', async () => {
    const response = await client.sessions.paste('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      text: 'Text pasted via API',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieveDownloads', async () => {
    const responsePromise = client.sessions.retrieveDownloads('session_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('scroll: only required params', async () => {
    const responsePromise = client.sessions.scroll('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      deltaY: 100,
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
  test.skip('scroll: required and optional params', async () => {
    const response = await client.sessions.scroll('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      deltaY: 100,
      x: 0,
      y: 0,
      deltaX: 0,
      steps: 10,
    });
  });
});
