
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
 * Get static bitcoin asset functions
 */
export function getBitcoinAsset(): any {
  return BitcoinAsset;
}
