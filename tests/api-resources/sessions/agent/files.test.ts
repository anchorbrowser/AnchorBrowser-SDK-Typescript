// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser, { toFile } from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'sk-1jdfiaj0advpoaskdfpoks',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource files', () => {
  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.sessions.agent.files.list('550e8400-e29b-41d4-a716-446655440000');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('upload: only required params', async () => {
    const responsePromise = client.sessions.agent.files.upload('550e8400-e29b-41d4-a716-446655440000', {
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
  test.skip('upload: required and optional params', async () => {
    const response = await client.sessions.agent.files.upload('550e8400-e29b-41d4-a716-446655440000', {
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
    });
  });
});
