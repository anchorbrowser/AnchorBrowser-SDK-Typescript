import { toFile } from '../../src/lib/uploads';

describe('toFile', () => {
  it('builds a File from a Buffer with an explicit name', async () => {
    const file = await toFile(Buffer.from('hello world'), 'greeting.txt');
    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe('greeting.txt');
    expect(file.size).toBe(11);
    expect(await file.text()).toBe('hello world');
  });

  it('builds a File from an ArrayBuffer', async () => {
    const buf = new TextEncoder().encode('data').buffer;
    const file = await toFile(buf, 'data.bin');
    expect(await file.text()).toBe('data');
  });

  it('builds a File from a Blob', async () => {
    const blob = new Blob(['blob content'], { type: 'text/plain' });
    const file = await toFile(blob, 'from-blob.txt');
    expect(file.name).toBe('from-blob.txt');
    expect(await file.text()).toBe('blob content');
  });

  it('returns an existing File unchanged when no name/type override is given', async () => {
    const original = new File(['x'], 'original.txt');
    const file = await toFile(original);
    expect(file).toBe(original);
  });

  it('renames an existing File when a name is given', async () => {
    const original = new File(['x'], 'original.txt');
    const file = await toFile(original, 'renamed.txt');
    expect(file.name).toBe('renamed.txt');
  });

  it('builds a File from an async iterable of chunks', async () => {
    async function* chunks() {
      yield new TextEncoder().encode('foo');
      yield new TextEncoder().encode('bar');
    }
    const file = await toFile(chunks(), 'stream.txt');
    expect(await file.text()).toBe('foobar');
  });

  it('builds a File from a ReadableStream', async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('via-stream'));
        controller.close();
      },
    });
    const file = await toFile(stream, 'stream2.txt');
    expect(await file.text()).toBe('via-stream');
  });

  it('infers a filename from a Blob-like value carrying a .name', async () => {
    const withName = Object.assign(new Blob(['x']), { name: 'inferred.txt' });
    const file = await toFile(withName as unknown as Blob);
    expect(file.name).toBe('inferred.txt');
  });

  it('defaults to "file" when no name is given or inferable', async () => {
    const file = await toFile(Buffer.from('x'));
    expect(file.name).toBe('file');
  });

  it('rejects unsupported input', async () => {
    await expect(toFile(42 as any)).rejects.toThrow(TypeError);
  });
});
