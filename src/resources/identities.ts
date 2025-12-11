// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Identities extends APIResource {
  /**
   * Retrieves the credentials for a specific identity.
   */
  retrieveCredentials(
    identityID: string,
    options?: RequestOptions,
  ): APIPromise<IdentityRetrieveCredentialsResponse> {
    return this._client.get(path`/v1/identities/${identityID}/credentials`, options);
  }
}

export interface IdentityRetrieveCredentialsResponse {
  /**
   * The ID of the identity
   */
  id: string;

  credentials: Array<
    | IdentityRetrieveCredentialsResponse.UsernamePasswordCredentialSchema
    | IdentityRetrieveCredentialsResponse.AuthenticatorCredentialSchema
    | IdentityRetrieveCredentialsResponse.CustomCredentialSchema
  >;

  /**
   * The name of the identity
   */
  name: string;

  /**
   * The url related to the identity
   */
  source: string;
}

export namespace IdentityRetrieveCredentialsResponse {
  export interface UsernamePasswordCredentialSchema {
    /**
     * The password of the credential
     */
    password: string;

    /**
     * The type of credential
     */
    type: 'username_password';

    /**
     * The username of the credential
     */
    username: string;
  }

  export interface AuthenticatorCredentialSchema {
    /**
     * The OTP of the credential
     */
    otp: string;

    /**
     * The secret of the credential
     */
    secret: string;

    /**
     * The type of credential
     */
    type: 'authenticator';
  }

  export interface CustomCredentialSchema {
    fields: Array<CustomCredentialSchema.Field>;

    /**
     * The type of credential
     */
    type: 'custom';
  }

  export namespace CustomCredentialSchema {
    export interface Field {
      /**
       * The name of the field
       */
      name: string;

      /**
       * The value of the field
       */
      value: string;
    }
  }
}

export declare namespace Identities {
  export { type IdentityRetrieveCredentialsResponse as IdentityRetrieveCredentialsResponse };
}
