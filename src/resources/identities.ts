// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Identities extends APIResource {
  /**
   * Creates a new identity with credentials for authentication.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const identity = await client.identities.create({
   *   credentials: [
   *     {
   *       type: 'username_password',
   *       username: 'user@example.com',
   *       password: 'securepassword123',
   *     },
   *   ],
   *   source: 'https://example.com/login',
   *   metadata: { department: 'Engineering' },
   *   name: 'My Work Account',
   * });
   * ```
   */
  create(params: IdentityCreateParams, options?: RequestOptions): APIPromise<IdentityCreateResponse> {
    const { validateAsync, ...body } = params;
    return this._client.post('/v1/identities', { query: { validateAsync }, body, ...options });
  }

  /**
   * Retrieves details of a specific identity by its ID.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const identity = await client.identities.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(identityID: string, options?: RequestOptions): APIPromise<IdentityRetrieveResponse> {
    return this._client.get(path`/v1/identities/${identityID}`, options);
  }

  /**
   * Updates an existing identity's name, metadata, or credentials.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const identity = await client.identities.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { name: 'Updated Account Name' },
   * );
   * ```
   */
  update(
    identityID: string,
    body: IdentityUpdateParams,
    options?: RequestOptions,
  ): APIPromise<IdentityUpdateResponse> {
    return this._client.put(path`/v1/identities/${identityID}`, { body, ...options });
  }

  /**
   * Deletes an existing identity.
   *
   * **Beta** Capability. [Contact support](mailto:support@anchorbrowser.io) to
   * enable.
   *
   * @example
   * ```ts
   * const identity = await client.identities.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(identityID: string, options?: RequestOptions): APIPromise<IdentityDeleteResponse> {
    return this._client.delete(path`/v1/identities/${identityID}`, options);
  }

  /**
   * Retrieves the credentials for a specific identity.
   *
   * @example
   * ```ts
   * const response =
   *   await client.identities.retrieveCredentials(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieveCredentials(
    identityID: string,
    options?: RequestOptions,
  ): APIPromise<IdentityRetrieveCredentialsResponse> {
    return this._client.get(path`/v1/identities/${identityID}/credentials`, options);
  }
}

export interface IdentityCreateResponse {
  /**
   * Unique identifier for the identity
   */
  id?: string;

  /**
   * Timestamp when the identity was created
   */
  created_at?: string;

  /**
   * Metadata associated with the identity
   */
  metadata?: { [key: string]: unknown };

  /**
   * Name of the identity
   */
  name?: string;

  /**
   * Status of the identity
   */
  status?: 'pending' | 'validated' | 'failed';
}

export interface IdentityRetrieveResponse {
  /**
   * Unique identifier for the identity
   */
  id?: string;

  /**
   * Timestamp when the identity was created
   */
  created_at?: string;

  /**
   * Metadata associated with the identity
   */
  metadata?: { [key: string]: unknown };

  /**
   * Name of the identity
   */
  name?: string;

  /**
   * Source URL for the identity
   */
  source?: string;

  /**
   * Status of the identity
   */
  status?: 'pending' | 'validated' | 'failed';

  /**
   * Timestamp when the identity was last updated
   */
  updated_at?: string;
}

export interface IdentityUpdateResponse {
  /**
   * Unique identifier for the identity
   */
  id?: string;

  /**
   * Metadata associated with the identity
   */
  metadata?: { [key: string]: unknown };

  /**
   * Name of the identity
   */
  name?: string;

  /**
   * Timestamp when the identity was last updated
   */
  updated_at?: string;
}

export interface IdentityDeleteResponse {
  /**
   * Deletion result message
   */
  message?: string;
}

export interface IdentityRetrieveCredentialsResponse {
  /**
   * The ID of the identity
   */
  id?: string;

  credentials?: Array<
    | IdentityRetrieveCredentialsResponse.UsernamePasswordCredentialSchema
    | IdentityRetrieveCredentialsResponse.AuthenticatorCredentialSchema
    | IdentityRetrieveCredentialsResponse.CustomCredentialSchema
  >;

  /**
   * The name of the identity
   */
  name?: string;

  /**
   * The url related to the identity
   */
  source?: string;
}

export namespace IdentityRetrieveCredentialsResponse {
  export interface UsernamePasswordCredentialSchema {
    /**
     * The password of the credential
     */
    password?: string;

    /**
     * The type of credential
     */
    type?: 'username_password';

    /**
     * The username of the credential
     */
    username?: string;
  }

  export interface AuthenticatorCredentialSchema {
    /**
     * The OTP of the credential
     */
    otp?: string;

    /**
     * The secret of the credential
     */
    secret?: string;

    /**
     * The type of credential
     */
    type?: 'authenticator';
  }

  export interface CustomCredentialSchema {
    fields?: Array<CustomCredentialSchema.Field>;

    /**
     * The type of credential
     */
    type?: 'custom';
  }

  export namespace CustomCredentialSchema {
    export interface Field {
      /**
       * The name of the field
       */
      name?: string;

      /**
       * The value of the field
       */
      value?: string;
    }
  }
}

export interface IdentityCreateParams {
  /**
   * Body param: Array of credentials for authentication
   */
  credentials: Array<
    | IdentityCreateParams.UsernamePasswordCredentialSchema
    | IdentityCreateParams.AuthenticatorCredentialSchema
    | IdentityCreateParams.CustomCredentialSchema
  >;

  /**
   * Body param: The source URL for the identity (e.g., login page URL)
   */
  source: string;

  /**
   * Query param: Whether to validate the identity asynchronously. Defaults to true.
   */
  validateAsync?: boolean;

  /**
   * Body param: Optional application description
   */
  applicationDescription?: string;

  /**
   * Body param: Optional application name to associate with the identity
   */
  applicationName?: string;

  /**
   * Body param: Optional metadata for the identity
   */
  metadata?: { [key: string]: unknown };

  /**
   * Body param: Name of the identity. Defaults to "Unnamed Identity" if not
   * provided.
   */
  name?: string;
}

export namespace IdentityCreateParams {
  export interface UsernamePasswordCredentialSchema {
    /**
     * The password of the credential
     */
    password?: string;

    /**
     * The type of credential
     */
    type?: 'username_password';

    /**
     * The username of the credential
     */
    username?: string;
  }

  export interface AuthenticatorCredentialSchema {
    /**
     * The OTP of the credential
     */
    otp?: string;

    /**
     * The secret of the credential
     */
    secret?: string;

    /**
     * The type of credential
     */
    type?: 'authenticator';
  }

  export interface CustomCredentialSchema {
    fields?: Array<CustomCredentialSchema.Field>;

    /**
     * The type of credential
     */
    type?: 'custom';
  }

  export namespace CustomCredentialSchema {
    export interface Field {
      /**
       * The name of the field
       */
      name?: string;

      /**
       * The value of the field
       */
      value?: string;
    }
  }
}

export interface IdentityUpdateParams {
  /**
   * Array of credentials for authentication
   */
  credentials?: Array<
    | IdentityUpdateParams.UsernamePasswordCredentialSchema
    | IdentityUpdateParams.AuthenticatorCredentialSchema
    | IdentityUpdateParams.CustomCredentialSchema
  >;

  /**
   * Metadata for the identity
   */
  metadata?: { [key: string]: unknown };

  /**
   * Name of the identity
   */
  name?: string;
}

export namespace IdentityUpdateParams {
  export interface UsernamePasswordCredentialSchema {
    /**
     * The password of the credential
     */
    password?: string;

    /**
     * The type of credential
     */
    type?: 'username_password';

    /**
     * The username of the credential
     */
    username?: string;
  }

  export interface AuthenticatorCredentialSchema {
    /**
     * The OTP of the credential
     */
    otp?: string;

    /**
     * The secret of the credential
     */
    secret?: string;

    /**
     * The type of credential
     */
    type?: 'authenticator';
  }

  export interface CustomCredentialSchema {
    fields?: Array<CustomCredentialSchema.Field>;

    /**
     * The type of credential
     */
    type?: 'custom';
  }

  export namespace CustomCredentialSchema {
    export interface Field {
      /**
       * The name of the field
       */
      name?: string;

      /**
       * The value of the field
       */
      value?: string;
    }
  }
}

export declare namespace Identities {
  export {
    type IdentityCreateResponse as IdentityCreateResponse,
    type IdentityRetrieveResponse as IdentityRetrieveResponse,
    type IdentityUpdateResponse as IdentityUpdateResponse,
    type IdentityDeleteResponse as IdentityDeleteResponse,
    type IdentityRetrieveCredentialsResponse as IdentityRetrieveCredentialsResponse,
    type IdentityCreateParams as IdentityCreateParams,
    type IdentityUpdateParams as IdentityUpdateParams,
  };
}
