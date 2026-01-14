// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { type Uploadable } from '../../../core/uploads';
import { RequestOptions } from '../../../internal/request-options';
import { multipartFormRequestOptions } from '../../../internal/uploads';
import { path } from '../../../internal/utils/path';

export class Files extends APIResource {
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
  export { type FileUploadResponse as FileUploadResponse, type FileUploadParams as FileUploadParams };
}
