// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'Your API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource batchSessions', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.batchSessions.create({ count: 10 });
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
    const response = await client.batchSessions.create({
      count: 10,
      configuration: {
        browser: {
          adblock: { active: true },
          captcha_solver: { active: true },
          disable_web_security: { active: true },
          extensions: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
          fullscreen: { active: true },
          headless: { active: true },
          p2p_download: { active: true },
          popup_blocker: { active: true },
          profile: { name: 'name', persist: true },
          viewport: { height: 900, width: 1440 },
        },
        session: {
          initial_url: 'https://example.com',
          live_view: { read_only: true },
          proxy: { active: true, city: 'city', country_code: 'af', region: 'region', type: 'anchor_proxy' },
          recording: { active: true },
          timeout: { idle_timeout: 10, max_duration: 300 },
        },
      },
      metadata: { project: 'bar', environment: 'bar' },
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.batchSessions.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
