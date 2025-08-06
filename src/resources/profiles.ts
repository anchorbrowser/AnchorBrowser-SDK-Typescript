// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Profiles extends APIResource {
  /**
   * Creates a new profile from a browser session. A Profile stores cookies, local
   * storage, and cache.
   *
   * @example
   * ```ts
   * const successResponse = await client.profiles.create({
   *   name: 'my-profile',
   * });
   * ```
   */
  create(body: ProfileCreateParams, options?: RequestOptions): APIPromise<Shared.SuccessResponse> {
    return this._client.post('/v1/profiles', { body, ...options });
  }

  /**
   * Retrieves details of a specific profile by its name.
   *
   * @example
   * ```ts
   * const profile = await client.profiles.retrieve(
   *   'my-profile',
   * );
   * ```
   */
  retrieve(name: string, options?: RequestOptions): APIPromise<ProfileRetrieveResponse> {
    return this._client.get(path`/v1/profiles/${name}`, options);
  }

  /**
   * Updates the description or data of an existing profile using a browser session.
   *
   * @example
   * ```ts
   * const successResponse = await client.profiles.update(
   *   'my-profile',
   * );
   * ```
   */
  update(
    name: string,
    body: ProfileUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Shared.SuccessResponse> {
    return this._client.put(path`/v1/profiles/${name}`, { body, ...options });
  }

  /**
   * Fetches all stored profiles.
   *
   * @example
   * ```ts
   * const profiles = await client.profiles.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<ProfileListResponse> {
    return this._client.get('/v1/profiles', options);
  }

  /**
   * Deletes an existing profile by its name.
   *
   * @example
   * ```ts
   * const successResponse = await client.profiles.delete(
   *   'my-profile',
   * );
   * ```
   */
  delete(name: string, options?: RequestOptions): APIPromise<Shared.SuccessResponse> {
    return this._client.delete(path`/v1/profiles/${name}`, options);
  }
}

export interface ProfileRetrieveResponse {
  data?: ProfileRetrieveResponse.Data;
}

export namespace ProfileRetrieveResponse {
  export interface Data {
    /**
     * The timestamp when the profile was created.
     */
    created_at?: string;

    /**
     * A description of the profile.
     */
    description?: string;

    /**
     * The name of the profile.
     */
    name?: string;

    /**
     * The browser session ID used to create this profile, if applicable.
     */
    session_id?: string;

    /**
     * The source of the profile data.
     */
    source?: 'session';

    /**
     * The current status of the profile.
     */
    status?: string;
  }
}

export interface ProfileListResponse {
  data?: ProfileListResponse.Data;
}

export namespace ProfileListResponse {
  export interface Data {
    /**
     * Total number of profiles
     */
    count?: number;

    items?: Array<Data.Item>;
  }

  export namespace Data {
    export interface Item {
      /**
       * The timestamp when the profile was created.
       */
      created_at?: string;

      /**
       * A description of the profile.
       */
      description?: string;

      /**
       * The name of the profile.
       */
      name?: string;

      /**
       * The browser session ID used to create this profile, if applicable.
       */
      session_id?: string;

      /**
       * The source of the profile data.
       */
      source?: 'session';

      /**
       * The current status of the profile.
       */
      status?: string;
    }
  }
}

export interface ProfileCreateParams {
  /**
   * The name of the profile.
   */
  name: string;

  /**
   * Whether to use a dedicated sticky IP for this profile. Defaults to false.
   */
  dedicated_sticky_ip?: boolean;

  /**
   * A description of the profile.
   */
  description?: string;

  /**
   * The browser session ID is required if the source is set to `session`. The
   * browser session must be running, and the profile will be stored once the browser
   * session terminates.
   */
  session_id?: string;

  /**
   * The source of the profile data. currently only `session` is supported.
   */
  source?: 'session';
}

export interface ProfileUpdateParams {
  /**
   * The new description for the profile.
   */
  description?: string;

  /**
   * The browser session ID is required if the source is set to `session`. The
   * browser session must belong to the user and be active.
   */
  session_id?: string;

  /**
   * The source of the profile data. Currently, only `session` is supported.
   */
  source?: 'session';
}

export declare namespace Profiles {
  export {
    type ProfileRetrieveResponse as ProfileRetrieveResponse,
    type ProfileListResponse as ProfileListResponse,
    type ProfileCreateParams as ProfileCreateParams,
    type ProfileUpdateParams as ProfileUpdateParams,
  };
}
