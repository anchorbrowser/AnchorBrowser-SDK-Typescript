// Spec-derived file. Keep in sync with spec/openapi.yaml — see CONTRIBUTING.md.

import type { Anchorbrowser } from '../client';

export abstract class APIResource {
  protected _client: Anchorbrowser;

  constructor(client: Anchorbrowser) {
    this._client = client;
  }
}
