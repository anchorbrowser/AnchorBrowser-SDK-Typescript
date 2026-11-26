import { createClientConfig } from '../../src/hey-api';

const resolveKey = () => (createClientConfig({}).auth as () => unknown)();

describe('API key from the environment', () => {
  const saved = { ...process.env };

  beforeEach(() => {
    delete process.env['ANCHORBROWSER_API_KEY'];
    delete process.env['ANCHOR_API_KEY'];
  });

  afterAll(() => {
    process.env = saved;
  });

  it('reads ANCHORBROWSER_API_KEY', () => {
    process.env['ANCHORBROWSER_API_KEY'] = 'primary';
    expect(resolveKey()).toBe('primary');
  });

  it('falls back to ANCHOR_API_KEY', () => {
    process.env['ANCHOR_API_KEY'] = 'fallback';
    expect(resolveKey()).toBe('fallback');
  });

  it('prefers ANCHORBROWSER_API_KEY when both are set', () => {
    process.env['ANCHORBROWSER_API_KEY'] = 'primary';
    process.env['ANCHOR_API_KEY'] = 'fallback';
    expect(resolveKey()).toBe('primary');
  });

  it('returns undefined when neither is set', () => {
    expect(resolveKey()).toBeUndefined();
  });
});
