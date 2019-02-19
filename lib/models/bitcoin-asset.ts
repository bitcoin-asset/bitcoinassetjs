import * as Base58 from 'base-58';

declare var Buffer;

export interface BlockInfo {
    createdTime?: number;
    blockHeight?: number;
    txid: string;
};

export interface BitcoinAssetDataImmutablePayload {
    immutableUrl?: string;
    immutableSchemaUrl?: string;
    immutableSchemaType?: string;
}

export interface BitcoinAssetDataPayload {
    dataUrl: string;
    dataSchemaUrl?: string;
    dataSchemaType?: string;
    metadataUrl?: string;
    metadataSchemaUrl?: string;
    metadataSchemaType?: string;
}

export interface BitcoinAssetOwnership {
    originalOwnerAddress: string;
    currentOwnerAddress: string;
    ownershipHistoryRecords: Array<any>; // todo
}
export class BitcoinAsset {

    public txid: string;
    private assetImmutableData?: BitcoinAssetDataImmutablePayload = undefined;
    private assetDataOriginal?: BitcoinAssetDataPayload = undefined;
    private assetDataCurrent?: BitcoinAssetDataPayload = undefined;
    private blockInfoOriginal?: BlockInfo = undefined;
    private blockInfoCurrent?: BlockInfo = undefined;
    private assetOwnership?: BitcoinAssetOwnership = undefined;
    private updateAddress?: string = undefined;

    constructor(
        txid: string,
        assetDataOriginal: BitcoinAssetDataPayload,
        assetDataCurrent: BitcoinAssetDataPayload,
        blockInfoOriginal: BlockInfo,
        blockInfoCurrent: BlockInfo,
        assetOwnership: BitcoinAssetOwnership,
        updateAddress: string,
        assetImmutableData?: BitcoinAssetDataImmutablePayload
    ) {
        this.txid = txid;
        this.assetDataOriginal = assetDataOriginal;
        this.assetDataCurrent = assetDataCurrent;
        this.blockInfoOriginal = blockInfoOriginal;
        this.blockInfoCurrent = blockInfoCurrent;
        this.assetOwnership = assetOwnership;
        this.updateAddress = updateAddress;
        this.assetImmutableData = assetImmutableData;

        if (
            !this.txid ||
            !this.assetDataOriginal ||
            !this.assetDataCurrent ||
            !this.blockInfoOriginal ||
            !this.blockInfoCurrent ||
            !this.assetOwnership ||
            !this.updateAddress
        ) {
            throw new Error('initialize asset error');
        }
    }

    static buildBitcoinAssetFromBitDbTxResult(tx: any): BitcoinAsset {
        return new BitcoinAsset(
            tx.txid,
            {
                dataUrl: tx.out[0].s4 === '\u0000' ? undefined : tx.out[0].s4,
                dataSchemaUrl: tx.out[0].s5 === '\u0000' ? undefined : tx.out[0].s5,
                dataSchemaType: tx.out[0].s6 === '\u0000' ? undefined : tx.out[0].s6,
                metadataUrl: tx.out[0].s7 === '\u0000' ? undefined : tx.out[0].s7,
                metadataSchemaUrl: tx.out[0].s8 === '\u0000' ? undefined : tx.out[0].s8,
                metadataSchemaType: tx.out[0].s9 === '\u0000' ? undefined : tx.out[0].s9,
            },
            {
                dataUrl: tx.out[0].s4 === '\u0000' ? undefined : tx.out[0].s4,
                dataSchemaUrl: tx.out[0].s5 === '\u0000' ? undefined : tx.out[0].s5,
                dataSchemaType: tx.out[0].s6 === '\u0000' ? undefined : tx.out[0].s6,
                metadataUrl: tx.out[0].s7 === '\u0000' ? undefined : tx.out[0].s7,
                metadataSchemaUrl: tx.out[0].s8 === '\u0000' ? undefined : tx.out[0].s8,
                metadataSchemaType: tx.out[0].s9 === '\u0000' ? undefined : tx.out[0].s9,
            },
            {
                createdTime: tx.blockInfo ? tx.blockInfo.blockTime : undefined,
                blockHeight: tx.blockInfo ? tx.blockInfo.blockIndex : undefined,
                txid: tx.txid,
            },
            {
                createdTime: tx.blockInfo ? tx.blockInfo.blockTime : undefined,
                blockHeight: tx.blockInfo ? tx.blockInfo.blockIndex : undefined,
                txid: tx.txid,
            },
            {
                originalOwnerAddress: tx.inputInfo.in[0].e.a,
                currentOwnerAddress: tx.inputInfo.in[0].e.a,
                ownershipHistoryRecords: []
            },
            Base58.encode(Buffer.from(tx.out[0].h3, 'hex')),
            {
                immutableUrl: tx.out[0].s10 === '\u0000' ? undefined : tx.out[0].s10,
                immutableSchemaUrl: tx.out[0].s11 === '\u0000' ? undefined : tx.out[0].s11,
                immutableSchemaType: tx.out[0].s12 === '\u0000' ? undefined : tx.out[0].s12,
            }
        );
    }

    updateWithLatestDataFromBitDbQuery(tx: any) {
        this.assetDataCurrent = Object.assign({}, this.assetDataCurrent, {
            dataUrl: tx.out[0].s4,
            dataSchemaUrl: tx.out[0].s5,
            dataSchemaType: tx.out[0].s6,
            metadataUrl: tx.out[0].s7,
            metadataSchemaUrl: tx.out[0].s8,
            metadataSchemaType: tx.out[0].s9,
        });

        this.blockInfoCurrent = Object.assign({}, this.blockInfoCurrent, {
            blockHeight: tx.blockInfo ? tx.blockInfo.blockIndex : undefined,
            createdTime: tx.blockInfo ? tx.blockInfo.blockTime : undefined,
            txid: tx.txid,
        });
    }

    getId(): string {
        if (!this.txid) {
            throw Error('incomplete id');
        }
        return this.txid;
    }

    getAssetOwnership(): BitcoinAssetOwnership {
        if (!this.assetOwnership) {
            throw Error('incomplete asset');
        }
        return this.assetOwnership;
    }

    getUpdateAddress(): string {
        if (!this.updateAddress) {
            throw Error('incomplete asset');
        }
        return this.updateAddress;
    }

    getAssetDataImmutable(): BitcoinAssetDataImmutablePayload | undefined {
        return this.assetImmutableData;
    }

    getAssetDataOriginal(): BitcoinAssetDataPayload {
        if (!this.assetDataOriginal) {
            throw Error('incomplete asset');
        }
        return this.assetDataOriginal;
    }

    getAssetDataCurrent(): BitcoinAssetDataPayload {
        if (!this.assetDataCurrent) {
            throw Error('incomplete asset');
        }
        return this.assetDataCurrent;
    }

    getMetadataOriginal(): BlockInfo | undefined {
        return this.blockInfoOriginal;
    }

    getAssetMetadataCurrent(): BlockInfo | undefined {
        return this.blockInfoCurrent;
    }

    static validateAssetStructure(raw: any): BitcoinAsset {
        if (!raw) {
            throw new Error('undefined asset');
        }
        if (!raw.assetDataCurrent) {
            throw new Error('undefined assetDataCurrent');
        } else {
            if (!raw.assetDataCurrent.dataUrl) {
                throw new Error('undefined assetDataCurrent.dataUrl');
            }
        }

        if (!raw.assetDataOriginal) {
            throw new Error('undefined assetDataOriginal');
        } else {
            if (!raw.assetDataOriginal.dataUrl) {
                throw new Error('undefined assetDataOriginal.dataUrl');
            }
        }

        if (!raw.blockInfoCurrent) {
            throw new Error('undefined blockInfoCurrent');
        }

        if (!raw.blockInfoOriginal) {
            throw new Error('undefined blockInfoOriginal');
        }

        if (!raw.txid || raw.txid === '') {
            throw new Error('undefined txid');
        }

        if (!raw.updateAddress || raw.updateAddress === '') {
            throw new Error('undefined updateAddress');
        }

        if (!raw.assetOwnership) {
            throw new Error('undefined assetOwnership');
        }

        if (!raw.assetOwnership.originalOwnerAddress) {
            throw new Error('undefined assetOwnership.originalOwnerAddress');
        }

        if (!raw.assetOwnership.currentOwnerAddress) {
            throw new Error('undefined assetOwnership.currentOwnerAddress');
        }

        return new BitcoinAsset(
            raw.txid,
            raw.assetDataOriginal,
            raw.assetDataCurrent,
            raw.blockInfoOriginal,
            raw.blockInfoCurrent,
            raw.assetOwnership,
            raw.updateAddress,
            raw.assetImmutableData
        )
    }
}
/*
BitcoinAsset.find('txid', true)
.then((findResult) => {

}).catch((error) => {
    console.log('error', error.message);
});

BitcoinAsset.findAll(['tx1', 'tx2'], true)
.then((findResult) => {

}).catch((error) => {
    console.log('error', error.message);
});

BitcoinAsset.update('txid', { data: "foo" })
.then((updateResult) => {

}).catch((error) => {
    console.log('error', error.message);
});

BitcoinAsset.getOwner('txid', { data: "foo" })
.then((updateResult) => {

}).catch((error) => {
    console.log('error', error.message);
});

BitcoinAsset.offerTo('txid', "address")
.then((offerResult) => {


    BitcoinAsset.acceptOffer('txid', "address")
    .then((offerResult) => {


    }).catch((error) => {
        console.log('error', error.message);
    });


}).catch((error) => {
    console.log('error', error.message);
});*/