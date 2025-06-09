// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Extensions extends APIResource {
  /**
   * Get details of a specific extension by its ID
   *
   * @example
   * ```ts
   * const extension = await client.extensions.retrieve(
   *   '550e8400-e29b-41d4-a716-446655440000',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ExtensionRetrieveResponse> {
    return this._client.get(path`/v1/extensions/${id}`, options);
  }

  /**
   * Get all extensions for the authenticated user
   *
   * @example
   * ```ts
   * const extensions = await client.extensions.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<ExtensionListResponse> {
    return this._client.get('/v1/extensions', options);
  }

  /**
   * Delete an extension and remove it from storage
   *
   * @example
   * ```ts
   * const extension = await client.extensions.delete(
   *   '550e8400-e29b-41d4-a716-446655440000',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<ExtensionDeleteResponse> {
    return this._client.delete(path`/v1/extensions/${id}`, options);
  }

  /**
   * Upload a new browser extension as a ZIP file. The extension will be validated
   * and stored for use in browser sessions.
   *
   * @example
   * ```ts
   * const response = await client.extensions.upload({
   *   file: fs.createReadStream('path/to/file'),
   *   name: 'My Custom Extension',
   * });
   * ```
   */
  upload(body: ExtensionUploadParams, options?: RequestOptions): APIPromise<ExtensionUploadResponse> {
    return this._client.post(
      '/v1/extensions',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface ExtensionRetrieveResponse {
  /**
   * Unique identifier for the extension
   */
  id?: string;

  /**
   * Timestamp when the extension was created
   */
  createdAt?: string;

  manifest?: ExtensionRetrieveResponse.Manifest;

  /**
   * Extension name
   */
  name?: string;

  /**
   * Timestamp when the extension was last updated
   */
  updatedAt?: string;
}

export namespace ExtensionRetrieveResponse {
  export interface Manifest {
    description?: string;

    manifest_version?: number;

    name?: string;

    permissions?: Array<string>;

    version?: string;

    [k: string]: unknown;
  }
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

    manifest?: Data.Manifest;

    /**
     * Extension name
     */
    name?: string;

    /**
     * Timestamp when the extension was last updated
     */
    updatedAt?: string;
  }

  export namespace Data {
    export interface Manifest {
      description?: string;

      manifest_version?: number;

      name?: string;

      permissions?: Array<string>;

      version?: string;

      [k: string]: unknown;
    }
  }
}

export interface ExtensionDeleteResponse {
  data?: ExtensionDeleteResponse.Data;
}

export namespace ExtensionDeleteResponse {
  export interface Data {
    data?: Data.Data;
  }

  export namespace Data {
    export interface Data {
      status?: string;
    }
  }
}

export interface ExtensionUploadResponse {
  data?: ExtensionUploadResponse.Data;
}

export namespace ExtensionUploadResponse {
  export interface Data {
    /**
     * Unique identifier for the extension
     */
    id?: string;

    /**
     * Timestamp when the extension was created
     */
    createdAt?: string;

    manifest?: Data.Manifest;

    /**
     * Extension name
     */
    name?: string;

    /**
     * Timestamp when the extension was last updated
     */
    updatedAt?: string;
  }

  export namespace Data {
    export interface Manifest {
      description?: string;

      manifest_version?: number;

      name?: string;

      permissions?: Array<string>;

      version?: string;

      [k: string]: unknown;
    }
  }
}

export interface ExtensionUploadParams {
  /**
   * ZIP file containing the browser extension
   */
  file: Uploadable;

  /**
   * User-friendly name for the extension (1-255 characters)
   */
  name: string;
}

export declare namespace Extensions {
  export {
    type ExtensionRetrieveResponse as ExtensionRetrieveResponse,
    type ExtensionListResponse as ExtensionListResponse,
    type ExtensionDeleteResponse as ExtensionDeleteResponse,
    type ExtensionUploadResponse as ExtensionUploadResponse,
    type ExtensionUploadParams as ExtensionUploadParams,
  };
}
