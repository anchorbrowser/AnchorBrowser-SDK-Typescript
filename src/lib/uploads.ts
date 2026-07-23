/**
 * Helper for building a `File` for multipart/form-data endpoints (session
 * uploads, extension uploads, agent file uploads, certificate uploads).
 *
 * `File` is a native global on Node.js 20+ and in browsers — pass one
 * directly (`new File([data], 'name.txt')`) if you're on Node 20+. This
 * helper additionally accepts Buffers/ArrayBuffers/streams/async iterables
 * and infers a filename where possible, mirroring the v1 SDK's `toFile()`.
 *
 * A real `File` (not a plain `Blob`) is required: the generated client's
 * FormData serializer relies on the platform's `File` handling to carry the
 * filename — a `Blob` with a bolted-on `.name` property uploads as "blob".
 */

export type ToFileInput =
  | Blob
  | File
  | ArrayBuffer
  | ArrayBufferView
  | Iterable<Uint8Array>
  | AsyncIterable<Uint8Array>
  | ReadableStream<Uint8Array>;

interface ToFileOptions {
  type?: string;
}

async function getFileConstructor(): Promise<typeof File> {
  if (typeof File !== 'undefined') return File;
  try {
    // Available on Node's `node:buffer` module even in versions where it
    // isn't (yet) registered as a global. Dynamic import works from both the
    // CJS and ESM builds (unlike a bare `require`, which ESM output can't use).
    const bufferModule = (await import('node:buffer')) as unknown as { File?: typeof File };
    if (bufferModule.File) return bufferModule.File;
  } catch {
    // not running in Node, or node:buffer has no File export
  }
  throw new Error(
    'toFile() requires a global File implementation, available natively on Node.js 20+ and in ' +
      'browsers. On Node 18, either upgrade to Node 20+, or construct a File yourself with a ' +
      'polyfill (e.g. the "formdata-node" package) and pass it directly instead of using toFile().',
  );
}

async function toBlobParts(value: unknown): Promise<BlobPart[]> {
  if (value instanceof Blob) return [value];
  if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) return [value as BlobPart];

  if (value && typeof (value as ReadableStream).getReader === 'function') {
    const chunks: Uint8Array[] = [];
    const reader = (value as ReadableStream<Uint8Array>).getReader();
    for (;;) {
      const { done, value: chunk } = await reader.read();
      if (done) break;
      if (chunk) chunks.push(chunk);
    }
    return chunks;
  }

  if (value && (Symbol.asyncIterator in Object(value) || Symbol.iterator in Object(value))) {
    const chunks: Uint8Array[] = [];
    for await (const chunk of value as AsyncIterable<Uint8Array>) chunks.push(chunk);
    return chunks;
  }

  throw new TypeError(`toFile: unsupported input type: ${Object.prototype.toString.call(value)}`);
}

function inferName(value: unknown): string | undefined {
  if (value && typeof value === 'object') {
    const name = (value as { name?: unknown }).name;
    if (typeof name === 'string') return name.split(/[/\\]/).pop();
    const path = (value as { path?: unknown }).path;
    if (typeof path === 'string') return path.split(/[/\\]/).pop();
  }
  return undefined;
}

/**
 * Build a `File` from a Blob/Buffer/ArrayBuffer/stream/async-iterable of
 * bytes. Requires Node.js 20+ (or a browser) — see the module doc above.
 */
export async function toFile(
  value: ToFileInput | Promise<ToFileInput>,
  name?: string | null,
  options?: ToFileOptions,
): Promise<File> {
  const resolved = await value;

  if (typeof File !== 'undefined' && resolved instanceof File && !name && !options?.type) {
    return resolved;
  }

  const FileCtor = await getFileConstructor();
  const parts = await toBlobParts(resolved);
  const fileName = name ?? inferName(resolved) ?? 'file';
  return new FileCtor(parts, fileName, options?.type ? { type: options.type } : undefined);
}
