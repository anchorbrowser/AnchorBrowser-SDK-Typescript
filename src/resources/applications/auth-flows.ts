// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class AuthFlows extends APIResource {
  /**
   * Creates a new authentication flow for an application.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const authFlow = await client.applications.authFlows.create(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     methods: ['username_password'],
   *     name: 'Standard Login',
   *     custom_fields: [],
   *     description: 'Username and password authentication',
   *     is_recommended: true,
   *   },
   * );
   * ```
   */
  create(
    applicationID: string,
    body: AuthFlowCreateParams,
    options?: RequestOptions,
  ): APIPromise<AuthFlowCreateResponse> {
    return this._client.post(path`/v1/applications/${applicationID}/auth-flows`, { body, ...options });
  }

  /**
   * Updates an existing authentication flow.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const authFlow = await client.applications.authFlows.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     application_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     methods: ['username_password', 'authenticator'],
   *     name: 'Updated Login Flow',
   *   },
   * );
   * ```
   */
  update(
    authFlowID: string,
    params: AuthFlowUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AuthFlowUpdateResponse> {
    const { application_id, ...body } = params;
    return this._client.patch(path`/v1/applications/${application_id}/auth-flows/${authFlowID}`, {
      body,
      ...options,
    });
  }

  /**
   * Retrieves all authentication flows for a specific application.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const authFlows = await client.applications.authFlows.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  list(applicationID: string, options?: RequestOptions): APIPromise<AuthFlowListResponse> {
    return this._client.get(path`/v1/applications/${applicationID}/auth-flows`, options);
  }

  /**
   * Deletes an existing authentication flow.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const authFlow = await client.applications.authFlows.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     application_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   },
   * );
   * ```
   */
  delete(
    authFlowID: string,
    params: AuthFlowDeleteParams,
    options?: RequestOptions,
  ): APIPromise<AuthFlowDeleteResponse> {
    const { application_id } = params;
    return this._client.delete(path`/v1/applications/${application_id}/auth-flows/${authFlowID}`, options);
  }
}

export interface AuthFlowCreateResponse {
  /**
   * Unique identifier for the authentication flow
   */
  id?: string;

  /**
   * Timestamp when the authentication flow was created
   */
  created_at?: string;

  /**
   * Custom fields for this authentication flow
   */
  custom_fields?: Array<AuthFlowCreateResponse.CustomField>;

  /**
   * Description of the authentication flow
   */
  description?: string | null;

  /**
   * Whether this is the recommended authentication flow
   */
  is_recommended?: boolean;

  /**
   * Authentication methods in this flow
   */
  methods?: Array<string>;

  /**
   * Name of the authentication flow
   */
  name?: string;

  /**
   * Timestamp when the authentication flow was last updated
   */
  updated_at?: string;
}

export namespace AuthFlowCreateResponse {
  export interface CustomField {
    /**
     * Name of the custom field
     */
    name: string;
  }
}

export interface AuthFlowUpdateResponse {
  /**
   * Unique identifier for the authentication flow
   */
  id?: string;

  /**
   * Timestamp when the authentication flow was created
   */
  created_at?: string;

  /**
   * Custom fields for this authentication flow
   */
  custom_fields?: Array<AuthFlowUpdateResponse.CustomField>;

  /**
   * Description of the authentication flow
   */
  description?: string | null;

  /**
   * Whether this is the recommended authentication flow
   */
  is_recommended?: boolean;

  /**
   * Authentication methods in this flow
   */
  methods?: Array<string>;

  /**
   * Name of the authentication flow
   */
  name?: string;

  /**
   * Timestamp when the authentication flow was last updated
   */
  updated_at?: string;
}

export namespace AuthFlowUpdateResponse {
  export interface CustomField {
    /**
     * Name of the custom field
     */
    name: string;
  }
}

export interface AuthFlowListResponse {
  auth_flows?: Array<AuthFlowListResponse.AuthFlow>;
}

export namespace AuthFlowListResponse {
  export interface AuthFlow {
    /**
     * Unique identifier for the authentication flow
     */
    id?: string;

    /**
     * Timestamp when the authentication flow was created
     */
    created_at?: string;

    /**
     * Custom fields for this authentication flow
     */
    custom_fields?: Array<AuthFlow.CustomField>;

    /**
     * Description of the authentication flow
     */
    description?: string | null;

    /**
     * Whether this is the recommended authentication flow
     */
    is_recommended?: boolean;

    /**
     * Authentication methods in this flow
     */
    methods?: Array<string>;

    /**
     * Name of the authentication flow
     */
    name?: string;

    /**
     * Timestamp when the authentication flow was last updated
     */
    updated_at?: string;
  }

  export namespace AuthFlow {
    export interface CustomField {
      /**
       * Name of the custom field
       */
      name: string;
    }
  }
}

export interface AuthFlowDeleteResponse {
  /**
   * Whether the deletion was successful
   */
  success?: boolean;
}

export interface AuthFlowCreateParams {
  /**
   * Authentication methods in this flow
   */
  methods: Array<'username_password' | 'authenticator' | 'custom'>;

  /**
   * Name of the authentication flow
   */
  name: string;

  /**
   * Custom fields for this authentication flow
   */
  custom_fields?: Array<AuthFlowCreateParams.CustomField>;

  /**
   * Description of the authentication flow
   */
  description?: string;

  /**
   * Whether this is the recommended authentication flow
   */
  is_recommended?: boolean;
}

export namespace AuthFlowCreateParams {
  export interface CustomField {
    /**
     * Name of the custom field
     */
    name: string;
  }
}

export interface AuthFlowUpdateParams {
  /**
   * Path param: The ID of the application
   */
  application_id: string;

  /**
   * Body param: Custom fields for this authentication flow
   */
  custom_fields?: Array<AuthFlowUpdateParams.CustomField>;

  /**
   * Body param: Description of the authentication flow
   */
  description?: string;

  /**
   * Body param: Whether this is the recommended authentication flow
   */
  is_recommended?: boolean;

  /**
   * Body param: Authentication methods in this flow
   */
  methods?: Array<'username_password' | 'authenticator' | 'custom'>;

  /**
   * Body param: Name of the authentication flow
   */
  name?: string;
}

export namespace AuthFlowUpdateParams {
  export interface CustomField {
    /**
     * Name of the custom field
     */
    name: string;
  }
}

export interface AuthFlowDeleteParams {
  /**
   * The ID of the application
   */
  application_id: string;
}

export declare namespace AuthFlows {
  export {
    type AuthFlowCreateResponse as AuthFlowCreateResponse,
    type AuthFlowUpdateResponse as AuthFlowUpdateResponse,
    type AuthFlowListResponse as AuthFlowListResponse,
    type AuthFlowDeleteResponse as AuthFlowDeleteResponse,
    type AuthFlowCreateParams as AuthFlowCreateParams,
    type AuthFlowUpdateParams as AuthFlowUpdateParams,
    type AuthFlowDeleteParams as AuthFlowDeleteParams,
  };
}
