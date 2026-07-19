// Spec-derived file. Keep in sync with spec/openapi.yaml — see CONTRIBUTING.md.

import { APIResource } from '../../../core/resource';
import * as FilesAPI from './files';
import { FileUploadParams, FileUploadResponse, Files } from './files';

export class Agent extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);
}

Agent.Files = Files;

export declare namespace Agent {
  export {
    Files as Files,
    type FileUploadResponse as FileUploadResponse,
    type FileUploadParams as FileUploadParams,
  };
}
