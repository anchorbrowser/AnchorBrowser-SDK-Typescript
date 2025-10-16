// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as Shared from '../../shared';
import * as FilesAPI from './files';
import { FileListResponse, FileUploadParams, FileUploadResponse, Files } from './files';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Agent extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);

  /**
   * Pauses the AI agent for the specified browser session.
   */
  pause(sessionID: string, options?: RequestOptions): APIPromise<Shared.SuccessResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/agent/pause`, options);
  }

  /**
   * Resumes the AI agent for the specified browser session.
   */
  resume(sessionID: string, options?: RequestOptions): APIPromise<Shared.SuccessResponse> {
    return this._client.post(path`/v1/sessions/${sessionID}/agent/resume`, options);
  }
}

Agent.Files = Files;

export declare namespace Agent {
  export {
    Files as Files,
    type FileListResponse as FileListResponse,
    type FileUploadResponse as FileUploadResponse,
    type FileUploadParams as FileUploadParams,
  };
}
