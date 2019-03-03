
import { Client } from './client';
import { BitcoinAsset } from './models/bitcoin-asset';

/**
 * Create a client to access network
 * @param options Options
 */
export function getClient(options: any): Client {
  return new Client(options);
}

/**
 * Decode a b:// or bitcoinasset:// URL to a hosting provider
 * @param url The url to decode. Correctly decodes b:// and bitcoinasset:// URLs and replaces it with the provided fileHostBase
 * @param fileHostBase Default: 'https://media.bitcoinfiles.org/'
 */
export function decodeBitcoinDataUrl(url: string, fileHostBase = 'https://media.bitcoinfiles.org/'): string {
  const bRegex = /^(bitcoinasset|b):\/\/(.+)?#?/i;
  const match = bRegex.exec(url);
  if (match) {
    return `${fileHostBase}${match[2]}`;
  }
  // Else return if there was no match
  return url;
}

/**
 * Get static bitcoin asset functions
 */
export function getBitcoinAsset(): any {
  return BitcoinAsset;
}
