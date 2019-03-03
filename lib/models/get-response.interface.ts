import { BitcoinAsset } from "./bitcoin-asset";

export interface GetResponse {
    success: boolean;
    message?: string;
    data?: BitcoinAsset;
}