// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Anchorbrowser } from '../client';

export abstract class APIResource {
  protected _client: Anchorbrowser;

  constructor(client: Anchorbrowser) {
    this._client = client;
  }
}
