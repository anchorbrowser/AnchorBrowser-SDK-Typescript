// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ExtensionsAPI from './extensions';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Extensions extends APIResource {
  /**
   * Get all extensions for the authenticated user
   */
  list(options?: RequestOptions): APIPromise<ExtensionListResponse> {
    return this._client.get('/v1/extensions', options);
  }
}

export interface ExtensionManifest {
  description?: string;

  manifest_version?: number;

  name?: string;

  permissions?: Array<string>;

  version?: string;

  [k: string]: unknown;
}

export interface ExtensionListResponse {
  data?: Array<ExtensionListResponse.Data>;
}

export namespace ExtensionListResponse {
  export interface Data {
    /**
     * Unique identifier for the extension
     */
    id?: string;

    /**
     * Timestamp when the extension was created
     */
    createdAt?: string;

    manifest?: ExtensionsAPI.ExtensionManifest;

    /**
     * Extension name
     */
    name?: string;

    /**
     * Timestamp when the extension was last updated
     */
    updatedAt?: string;
  }
}

export declare namespace Extensions {
  export { type ExtensionManifest as ExtensionManifest, type ExtensionListResponse as ExtensionListResponse };
}
