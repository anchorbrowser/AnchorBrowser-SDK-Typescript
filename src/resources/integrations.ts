// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Integrations extends APIResource {
  /**
   * Creates a new integration with a third-party service like 1Password. The
   * integration can then be used in browser sessions to automatically load secrets
   * and credentials.
   *
   * @example
   * ```ts
   * const integration = await client.integrations.create({
   *   credentials: {
   *     type: 'serviceAccount',
   *     data: {
   *       serviceAccount: 'ops_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
   *     },
   *   },
   *   name: 'My 1Password Integration',
   *   type: '1PASSWORD',
   * });
   * ```
   */
  create(body: IntegrationCreateParams, options?: RequestOptions): APIPromise<IntegrationCreateResponse> {
    return this._client.post('/v1/integrations', { body, ...options });
  }

  /**
   * Retrieves all integrations for the authenticated team.
   *
   * @example
   * ```ts
   * const integrations = await client.integrations.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<IntegrationListResponse> {
    return this._client.get('/v1/integrations', options);
  }

  /**
   * Deletes an existing integration and removes its stored credentials.
   *
   * @example
   * ```ts
   * const integration = await client.integrations.delete(
   *   '550e8400-e29b-41d4-a716-446655440000',
   * );
   * ```
   */
  delete(integrationID: string, options?: RequestOptions): APIPromise<IntegrationDeleteResponse> {
    return this._client.delete(path`/v1/integrations/${integrationID}`, options);
  }
}

export interface IntegrationCreateResponse {
  data?: IntegrationCreateResponse.Data;
}

export namespace IntegrationCreateResponse {
  export interface Data {
    integration?: Data.Integration;
  }

  export namespace Data {
    export interface Integration {
      /**
       * Unique integration ID
       */
      id?: string;

      /**
       * Timestamp when the integration was created
       */
      createdAt?: string;

      /**
       * Integration name
       */
      name?: string;

      /**
       * Storage path for the integration
       */
      path?: string;

      /**
       * The type of integration
       */
      type?: '1PASSWORD';
    }
  }
}

export interface IntegrationListResponse {
  data?: IntegrationListResponse.Data;
}

export namespace IntegrationListResponse {
  export interface Data {
    integrations?: Array<Data.Integration>;
  }

  export namespace Data {
    export interface Integration {
      /**
       * Unique integration ID
       */
      id?: string;

      /**
       * Timestamp when the integration was created
       */
      createdAt?: string;

      /**
       * Integration name
       */
      name?: string;

      /**
       * Storage path for the integration
       */
      path?: string;

      /**
       * The type of integration
       */
      type?: '1PASSWORD';
    }
  }
}

export interface IntegrationDeleteResponse {
  data?: IntegrationDeleteResponse.Data;
}

export namespace IntegrationDeleteResponse {
  export interface Data {
    integration?: Data.Integration;
  }

  export namespace Data {
    export interface Integration {
      id?: string;

      deleted?: boolean;

      path?: string;
    }
  }
}

export interface IntegrationCreateParams {
  credentials: IntegrationCreateParams.Credentials;

  /**
   * Name for the integration
   */
  name: string;

  /**
   * The type of integration
   */
  type: '1PASSWORD';
}

export namespace IntegrationCreateParams {
  export interface Credentials {
    data: Credentials.Data;

    /**
     * Credential type
     */
    type: 'serviceAccount';
  }

  export namespace Credentials {
    export interface Data {
      /**
       * Service account token
       */
      serviceAccount: string;
    }
  }
}

export declare namespace Integrations {
  export {
    type IntegrationCreateResponse as IntegrationCreateResponse,
    type IntegrationListResponse as IntegrationListResponse,
    type IntegrationDeleteResponse as IntegrationDeleteResponse,
    type IntegrationCreateParams as IntegrationCreateParams,
  };
}
