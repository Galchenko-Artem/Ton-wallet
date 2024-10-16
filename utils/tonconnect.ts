import { TonConnect } from '@tonconnect/sdk';

export const getTonConnect = (): TonConnect | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return new TonConnect({
    manifestUrl: 'https://your-domain.com/tonconnect-manifest.json',
  });
};
