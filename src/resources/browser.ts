import { getPlaywrightChromiumFromCdpUrl } from '../lib/browser';
import { APIResource } from '../core/resource';
import { SessionCreateParams } from './sessions';

export class Browser extends APIResource {
  connect(sessionId: string) {
    const cdpBaseUrl = this._client.baseURL.replace('https://', 'wss://').replace('api.', 'connect.');
    return getPlaywrightChromiumFromCdpUrl(
      `${cdpBaseUrl}?apiKey=${this._client.apiKey}&sessionId=${sessionId}`,
    );
  }

  async create({ sessionOptions }: { sessionOptions?: SessionCreateParams } = {}) {
    const session = await this._client.sessions.create(sessionOptions);
    const cdpBaseUrl = this._client.baseURL.replace('https://', 'wss://').replace('api.', 'connect.');
    const playwrightBrowser = await getPlaywrightChromiumFromCdpUrl(
      `${cdpBaseUrl}?apiKey=${this._client.apiKey}&sessionId=${session.data?.id}`,
    );
    return playwrightBrowser;
  }
}
