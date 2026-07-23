import type { Client } from '../generated/client';

/**
 * Typed error hierarchy for the generated client, wired in via
 * `client.interceptors.error.use(...)` (see `installErrorInterceptor` below
 * and `src/hey-api.ts`). Without this, `throwOnError: true` throws the raw
 * parsed response body (a plain object/string) with no status code and no
 * `instanceof` discrimination — this restores both.
 */
export class AnchorbrowserError extends Error {}

export class APIConnectionError extends AnchorbrowserError {
  constructor({ message, cause }: { message?: string; cause?: unknown } = {}) {
    super(message ?? 'Connection error.');
    if (cause !== undefined) this.cause = cause;
  }
}

export class APIConnectionTimeoutError extends APIConnectionError {
  constructor({ message }: { message?: string } = {}) {
    super({ message: message ?? 'Request timed out.' });
  }
}

export class APIUserAbortError extends AnchorbrowserError {
  constructor(message?: string) {
    super(message ?? 'Request was aborted.');
  }
}

export class APIError extends AnchorbrowserError {
  /** HTTP status code, when the error came from a response (always set on APIError). */
  readonly status: number;
  /** Response headers, when available. */
  readonly headers?: Headers;
  /** The parsed response body (JSON) or raw response text. */
  readonly error: unknown;

  constructor(status: number, error: unknown, message: string | undefined, headers: Headers | undefined) {
    super(APIError.makeMessage(status, error, message));
    this.status = status;
    this.headers = headers;
    this.error = error;
  }

  private static makeMessage(status: number, error: unknown, message?: string): string {
    if (message) return message;
    const errorMessage = APIError.extractMessage(error);
    return errorMessage ? `${status} ${errorMessage}` : `${status} status code (no body)`;
  }

  /**
   * Anchorbrowser's ErrorResponse schema nests the message as
   * `{ error: { message } }`; some endpoints return a flat `{ message }` or
   * a plain string. Handle all three.
   */
  private static extractMessage(error: unknown): string | undefined {
    if (typeof error === 'string') return error;
    if (!error || typeof error !== 'object') return undefined;

    const obj = error as Record<string, unknown>;
    if (typeof obj['message'] === 'string') return obj['message'];

    const nested = obj['error'];
    if (typeof nested === 'string') return nested;
    if (
      nested &&
      typeof nested === 'object' &&
      typeof (nested as Record<string, unknown>)['message'] === 'string'
    ) {
      return (nested as Record<string, unknown>)['message'] as string;
    }

    return undefined;
  }

  /** Build the right APIError subclass (or APIConnectionError) for a given status/response. */
  static generate(
    status: number | undefined,
    errorBody: unknown,
    message: string | undefined,
    headers: Headers | undefined,
  ): AnchorbrowserError {
    if (status === undefined) {
      return new APIConnectionError({ message, cause: errorBody });
    }

    switch (status) {
      case 400:
        return new BadRequestError(status, errorBody, message, headers);
      case 401:
        return new AuthenticationError(status, errorBody, message, headers);
      case 403:
        return new PermissionDeniedError(status, errorBody, message, headers);
      case 404:
        return new NotFoundError(status, errorBody, message, headers);
      case 409:
        return new ConflictError(status, errorBody, message, headers);
      case 422:
        return new UnprocessableEntityError(status, errorBody, message, headers);
      case 429:
        return new RateLimitError(status, errorBody, message, headers);
    }

    if (status >= 500) return new InternalServerError(status, errorBody, message, headers);
    return new APIError(status, errorBody, message, headers);
  }
}

export class BadRequestError extends APIError {}
export class AuthenticationError extends APIError {}
export class PermissionDeniedError extends APIError {}
export class NotFoundError extends APIError {}
export class ConflictError extends APIError {}
export class UnprocessableEntityError extends APIError {}
export class RateLimitError extends APIError {}
export class InternalServerError extends APIError {}

/**
 * Register the typed-error interceptor on a client. Called once for the
 * shared default `client` (see `src/index.ts`); call it yourself for any
 * additional client you create with `createClient()`.
 */
export function installErrorInterceptor(client: Client): void {
  client.interceptors.error.use((error, response) => {
    if (!response) {
      // No response was produced — a network failure, DNS error, or an
      // aborted request (fetch's AbortError), not an HTTP error status.
      if (error instanceof Error && error.name === 'AbortError') {
        return new APIUserAbortError(error.message);
      }
      if (error instanceof Error && error.name === 'TimeoutError') {
        return new APIConnectionTimeoutError({ message: error.message });
      }
      return new APIConnectionError({ cause: error });
    }

    return APIError.generate(response.status, error, undefined, response.headers);
  });
}
