// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser, { toFile } from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'Your API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sessions', () => {
  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sessions.create(
        {
          browser: {
            adblock: { active: true },
            captcha_solver: { active: true },
            disable_web_security: { active: true },
            extensions: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
            extra_stealth: { active: true },
            fullscreen: { active: true },
            headless: { active: true },
            p2p_download: { active: true },
            popup_blocker: { active: true },
            profile: { name: 'name', persist: true },
            viewport: { height: 0, width: 0 },
          },
          identities: [{ id: '123e4567-e89b-12d3-a456-426614174000' }],
          integrations: [
            {
              id: '550e8400-e29b-41d4-a716-446655440000',
              configuration: { load_mode: 'all' },
              type: '1PASSWORD',
            },
          ],
          session: {
            initial_url: 'https://example.com',
            live_view: { read_only: true },
            proxy: { active: true, city: 'city', country_code: 'af', region: 'region', type: 'anchor_proxy' },
            recording: { active: true },
            timeout: { idle_timeout: 0, max_duration: 0 },
          },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Anchorbrowser.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.sessions.retrieve('session_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('dragAndDrop: only required params', async () => {
    const responsePromise = client.sessions.dragAndDrop('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      endX: 0,
      endY: 0,
      startX: 0,
      startY: 0,
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
  test.skip('dragAndDrop: required and optional params', async () => {
    const response = await client.sessions.dragAndDrop('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      endX: 0,
      endY: 0,
      startX: 0,
      startY: 0,
      button: 'left',
    });
  });

  // Prism tests are disabled
  test.skip('goto: only required params', async () => {
    const responsePromise = client.sessions.goto('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { url: 'url' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('goto: required and optional params', async () => {
    const response = await client.sessions.goto('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { url: 'url' });
  });

  // Prism tests are disabled
  test.skip('listPages', async () => {
    const responsePromise = client.sessions.listPages('session_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('paste: only required params', async () => {
    const responsePromise = client.sessions.paste('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { text: 'text' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('paste: required and optional params', async () => {
    const response = await client.sessions.paste('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { text: 'text' });
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('scroll: only required params', async () => {
    const responsePromise = client.sessions.scroll('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      deltaY: 0,
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
  test.skip('scroll: required and optional params', async () => {
    const response = await client.sessions.scroll('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      deltaY: 0,
      x: 0,
      y: 0,
      deltaX: 0,
      steps: 0,
      useOs: true,
    });
  });

  // Prism tests are disabled
  test.skip('uploadFile: only required params', async () => {
    const responsePromise = client.sessions.uploadFile('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
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
  test.skip('uploadFile: required and optional params', async () => {
    const response = await client.sessions.uploadFile('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
    });
  });
});
