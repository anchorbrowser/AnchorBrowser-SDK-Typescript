import { getPlaywrightChromiumFromCdpUrl } from '../lib/browser';
import { APIResource } from '../core/resource';

export class Browser extends APIResource {
  playwright(sessionId: string) {
    const cdpBaseUrl = this._client.baseURL.replace('https://', 'wss://').replace('api.', 'connect.');
    return getPlaywrightChromiumFromCdpUrl(
      `${cdpBaseUrl}?apiKey=${this._client.apiKey}&sessionId=${sessionId}`,
    );
  }
}
