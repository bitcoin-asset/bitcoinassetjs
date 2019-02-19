import { BitcoinAsset, BitcoinAssetDataPayload } from "./bitcoin-asset";

export interface UpdateRequest{
    txid: string;
    update: BitcoinAssetDataPayload,
    pay: {
        key: string;
    }
}
