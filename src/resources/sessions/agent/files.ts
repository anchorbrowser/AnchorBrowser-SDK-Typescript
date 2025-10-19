// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { type Uploadable } from '../../../core/uploads';
import { RequestOptions } from '../../../internal/request-options';
import { multipartFormRequestOptions } from '../../../internal/uploads';
import { path } from '../../../internal/utils/path';

export class Files extends APIResource {
  /**
   * List all resources that have been uploaded to the browser session for agent use.
   * Returns resource metadata including name, size, type, and last modified
   * timestamp.
   *
   * @example
   * ```ts
   * const files = await client.sessions.agent.files.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  list(sessionID: string, options?: RequestOptions): APIPromise<FileListResponse> {
    return this._client.get(path`/v1/sessions/${sessionID}/agent/files`, options);
  }

  /**
   * Upload files as agent resources to a browser session using multipart/form-data.
   * If you upload a ZIP file, it will be automatically extracted and the files will
   * be made available as agent resources. If you upload a single file, it will be
   * saved directly as an agent resource. Resources are then accessible to AI agents
   * for task completion and automation.
   *
   * @example
   * ```ts
   * const response = await client.sessions.agent.files.upload(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { file: fs.createReadStream('path/to/file') },
   * );
   * ```
   */
  upload(
    sessionID: string,
    body: FileUploadParams,
    options?: RequestOptions,
  ): APIPromise<FileUploadResponse> {
    return this._client.post(
      path`/v1/sessions/${sessionID}/agent/files`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface FileListResponse {
  data?: FileListResponse.Data;
}

export namespace FileListResponse {
  export interface Data {
    files?: Array<Data.File>;
  }

  export namespace Data {
    export interface File {
      /**
       * When the resource was last modified
       */
      lastModified?: string;

      /**
       * The resource name
       */
      name?: string;

      /**
       * Resource size in bytes
       */
      size?: number;

      /**
       * Resource extension/type
       */
      type?: string;
    }
  }
}

export interface FileUploadResponse {
  data?: FileUploadResponse.Data;
}

export namespace FileUploadResponse {
  export interface Data {
    message?: string;

    status?: string;
  }
}

export interface FileUploadParams {
  /**
   * File to upload as agent resource (ZIP files will be extracted automatically)
   */
  file: Uploadable;
}

export declare namespace Files {
  export {
    type FileListResponse as FileListResponse,
    type FileUploadResponse as FileUploadResponse,
    type FileUploadParams as FileUploadParams,
  };
}
