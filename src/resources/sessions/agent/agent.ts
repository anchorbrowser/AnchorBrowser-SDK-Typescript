// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FilesAPI from './files';
import { FileListResponse, FileUploadParams, FileUploadResponse, Files } from './files';

export class Agent extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);
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
