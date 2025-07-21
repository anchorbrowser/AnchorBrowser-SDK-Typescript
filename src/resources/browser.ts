import { getPlaywrightChromiumFromCdpUrl } from '../lib/browser';
import { APIResource } from '../core/resource';
import { SessionCreateParams } from './sessions';

export class Browser extends APIResource {
  connect(sessionId: string) {
    return getPlaywrightChromiumFromCdpUrl(this._client.baseURL, sessionId, this._client.apiKey);
  }

  async create({ sessionOptions }: { sessionOptions?: SessionCreateParams } = {}) {
    const session = await this._client.sessions.create(sessionOptions);
    if (!session.data?.id) {
      throw new Error('Failed to create session: No session ID returned');
    }
    const playwrightBrowser = await getPlaywrightChromiumFromCdpUrl(
      this._client.baseURL,
      session.data?.id,
      this._client.apiKey,
    );
    return playwrightBrowser;
  }
}
