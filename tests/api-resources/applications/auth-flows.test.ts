// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anchorbrowser from 'anchorbrowser';

const client = new Anchorbrowser({
  apiKey: 'Your API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource authFlows', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.applications.authFlows.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      methods: ['username_password'],
      name: 'Standard Login',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.applications.authFlows.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      methods: ['username_password'],
      name: 'Standard Login',
      custom_fields: [{ name: 'name' }],
      description: 'Username and password authentication',
      is_recommended: true,
    });
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.applications.authFlows.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      application_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('update: required and optional params', async () => {
    const response = await client.applications.authFlows.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      application_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      custom_fields: [{ name: 'name' }],
      description: 'description',
      is_recommended: true,
      methods: ['username_password', 'authenticator'],
      name: 'Updated Login Flow',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.applications.authFlows.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.applications.authFlows.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      application_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('delete: required and optional params', async () => {
    const response = await client.applications.authFlows.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      application_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
