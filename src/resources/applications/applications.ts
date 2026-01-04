// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AuthFlowsAPI from './auth-flows';
import {
  AuthFlowCreateParams,
  AuthFlowCreateResponse,
  AuthFlowDeleteParams,
  AuthFlowDeleteResponse,
  AuthFlowListResponse,
  AuthFlowUpdateParams,
  AuthFlowUpdateResponse,
  AuthFlows,
} from './auth-flows';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Applications extends APIResource {
  authFlows: AuthFlowsAPI.AuthFlows = new AuthFlowsAPI.AuthFlows(this._client);

  /**
   * Creates a new application for identity management.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const application = await client.applications.create({
   *   source: 'https://example.com',
   *   description: 'An example application',
   *   name: 'Example App',
   * });
   * ```
   */
  create(body: ApplicationCreateParams, options?: RequestOptions): APIPromise<ApplicationCreateResponse> {
    return this._client.post('/v1/applications', { body, ...options });
  }

  /**
   * Retrieves details of a specific application by its ID.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const application = await client.applications.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(applicationID: string, options?: RequestOptions): APIPromise<ApplicationRetrieveResponse> {
    return this._client.get(path`/v1/applications/${applicationID}`, options);
  }

  /**
   * Retrieves all applications for the authenticated team.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const applications = await client.applications.list();
   * ```
   */
  list(
    query: ApplicationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ApplicationListResponse> {
    return this._client.get('/v1/applications', { query, ...options });
  }

  /**
   * Deletes an existing application.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const application = await client.applications.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(applicationID: string, options?: RequestOptions): APIPromise<ApplicationDeleteResponse> {
    return this._client.delete(path`/v1/applications/${applicationID}`, options);
  }

  /**
   * Creates an identity token for a specific application. This token is used to
   * initiate an authentication flow for linking user identities to the application.
   *
   * The callback URL must use HTTPS and is where the user will be redirected after
   * authentication.
   *
   * @example
   * ```ts
   * const response =
   *   await client.applications.createIdentityToken(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { callbackUrl: 'https://example.com/auth/callback' },
   *   );
   * ```
   */
  createIdentityToken(
    applicationID: string,
    body: ApplicationCreateIdentityTokenParams,
    options?: RequestOptions,
  ): APIPromise<ApplicationCreateIdentityTokenResponse> {
    return this._client.post(path`/v1/applications/${applicationID}/tokens`, { body, ...options });
  }

  /**
   * Retrieves all identities associated with a specific application.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const response = await client.applications.listIdentities(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  listIdentities(
    applicationID: string,
    query: ApplicationListIdentitiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ApplicationListIdentitiesResponse> {
    return this._client.get(path`/v1/applications/${applicationID}/identities`, { query, ...options });
  }
}

export interface ApplicationCreateResponse {
  /**
   * Unique identifier for the application
   */
  id?: string;

  /**
   * Timestamp when the application was created
   */
  created_at?: string;

  /**
   * Description of the application
   */
  description?: string | null;

  /**
   * Name of the application
   */
  name?: string;

  /**
   * URL of the application
   */
  url?: string | null;
}

export interface ApplicationRetrieveResponse {
  /**
   * Unique identifier for the application
   */
  id?: string;

  /**
   * List of allowed domains for this application
   */
  allowed_domains?: Array<string>;

  /**
   * Authentication methods available for this application
   */
  auth_methods?: Array<string>;

  /**
   * Timestamp when the application was created
   */
  created_at?: string;

  /**
   * Description of the application
   */
  description?: string | null;

  /**
   * Number of identities associated with this application
   */
  identity_count?: number;

  /**
   * Name of the application
   */
  name?: string;

  /**
   * Timestamp when the application was last updated
   */
  updated_at?: string;

  /**
   * URL of the application
   */
  url?: string | null;
}

export interface ApplicationListResponse {
  applications?: Array<ApplicationListResponse.Application>;
}

export namespace ApplicationListResponse {
  export interface Application {
    /**
     * Unique identifier for the application
     */
    id?: string;

    /**
     * List of allowed domains for this application
     */
    allowed_domains?: Array<string>;

    /**
     * Authentication methods available for this application
     */
    auth_methods?: Array<string>;

    /**
     * Timestamp when the application was created
     */
    created_at?: string;

    /**
     * Description of the application
     */
    description?: string | null;

    /**
     * Number of identities associated with this application
     */
    identity_count?: number;

    /**
     * Name of the application
     */
    name?: string;

    /**
     * Timestamp when the application was last updated
     */
    updated_at?: string;

    /**
     * URL of the application
     */
    url?: string | null;
  }
}

export interface ApplicationDeleteResponse {
  /**
   * Whether the deletion was successful
   */
  success?: boolean;
}

export interface ApplicationCreateIdentityTokenResponse {
  data?: ApplicationCreateIdentityTokenResponse.Data;
}

export namespace ApplicationCreateIdentityTokenResponse {
  export interface Data {
    /**
     * The generated identity token for authentication
     */
    token?: string;

    /**
     * The timestamp when the token expires
     */
    expires_at?: string;

    /**
     * A hash of the token for verification purposes
     */
    token_hash?: string;
  }
}

export interface ApplicationListIdentitiesResponse {
  identities?: Array<ApplicationListIdentitiesResponse.Identity>;
}

export namespace ApplicationListIdentitiesResponse {
  export interface Identity {
    /**
     * Unique identifier for the identity
     */
    id?: string;

    /**
     * Authentication flow associated with this identity
     */
    auth_flow?: string | null;

    /**
     * Timestamp when the identity was created
     */
    created_at?: string;

    /**
     * Name of the identity
     */
    name?: string;

    /**
     * Status of the identity
     */
    status?: 'pending' | 'validated' | 'failed';

    /**
     * Timestamp when the identity was last updated
     */
    updated_at?: string;
  }
}

export interface ApplicationCreateParams {
  /**
   * The source URL of the application
   */
  source: string;

  /**
   * Description of the application
   */
  description?: string;

  /**
   * Name of the application
   */
  name?: string;
}

export interface ApplicationListParams {
  /**
   * Search query to filter applications by name
   */
  search?: string;
}

export interface ApplicationCreateIdentityTokenParams {
  /**
   * The HTTPS URL where the user will be redirected after authentication. Must use
   * HTTPS protocol.
   */
  callbackUrl: string;
}

export interface ApplicationListIdentitiesParams {
  /**
   * Search query to filter identities by name
   */
  search?: string;
}

Applications.AuthFlows = AuthFlows;

export declare namespace Applications {
  export {
    type ApplicationCreateResponse as ApplicationCreateResponse,
    type ApplicationRetrieveResponse as ApplicationRetrieveResponse,
    type ApplicationListResponse as ApplicationListResponse,
    type ApplicationDeleteResponse as ApplicationDeleteResponse,
    type ApplicationCreateIdentityTokenResponse as ApplicationCreateIdentityTokenResponse,
    type ApplicationListIdentitiesResponse as ApplicationListIdentitiesResponse,
    type ApplicationCreateParams as ApplicationCreateParams,
    type ApplicationListParams as ApplicationListParams,
    type ApplicationCreateIdentityTokenParams as ApplicationCreateIdentityTokenParams,
    type ApplicationListIdentitiesParams as ApplicationListIdentitiesParams,
  };

  export {
    AuthFlows as AuthFlows,
    type AuthFlowCreateResponse as AuthFlowCreateResponse,
    type AuthFlowUpdateResponse as AuthFlowUpdateResponse,
    type AuthFlowListResponse as AuthFlowListResponse,
    type AuthFlowDeleteResponse as AuthFlowDeleteResponse,
    type AuthFlowCreateParams as AuthFlowCreateParams,
    type AuthFlowUpdateParams as AuthFlowUpdateParams,
    type AuthFlowDeleteParams as AuthFlowDeleteParams,
  };
}
