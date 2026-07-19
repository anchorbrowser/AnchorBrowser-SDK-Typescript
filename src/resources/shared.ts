// Spec-derived file. Keep in sync with spec/openapi.yaml — see CONTRIBUTING.md.

export interface SuccessResponse {
  data?: SuccessResponse.Data;
}

export namespace SuccessResponse {
  export interface Data {
    status?: string;
  }
}
