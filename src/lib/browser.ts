import { chromium } from 'playwright';

export const getPlaywrightChromiumFromCdpUrl = async (cdpUrl: string) => {
  return await chromium.connectOverCDP(cdpUrl);
};
