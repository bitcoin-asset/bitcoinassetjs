'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('getAssetMintedVersion function test', () => {
    it('should return false no txid', async () => {
        var result = await index.getClient().getAssetMintedVersion();
        expect(result).to.eql({
            success: false,
            message: "txid required"
        });
    });

    it('should return false txid not found', async () => {
        var result = await index.getClient().getAssetMintedVersion('0000276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c');
        expect(result).to.eql({
            success: false,
            message: "tx not found"
        });
    });

    it('should return true txid found', async () => {
        var result = await index.getClient().getAssetMintedVersion('364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa');
        expect(result).to.eql({
            success: true,
            data: {
                "txid": "364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa",
                "assetDataCurrent": {
                    "dataSchemaUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c#matter/schema/post/draft-01",
                    "dataSchemaType": "http://json-schema.org/draft-07/schema#",
                    "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c",
                    "metadataSchemaUrl": undefined,
                    "metadataSchemaType": undefined,
                    "metadataUrl": undefined,
                },
                "assetDataOriginal": {
                    "dataSchemaUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c#matter/schema/post/draft-01",
                    "dataSchemaType": "http://json-schema.org/draft-07/schema#",
                    "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c",
                    "metadataSchemaUrl": undefined,
                    "metadataSchemaType": undefined,
                    "metadataUrl": undefined,
                },
                "blockInfoCurrent": {
                    "blockHeight": 570023,
                    "createdTime": 1550383020,
                    "txid": "364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa",
                },
                "blockInfoOriginal": {
                    "blockHeight": 570023,
                    "createdTime": 1550383020,
                    "txid": "364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa",
                },
                "assetImmutableData": {
                    "immutableSchemaUrl": undefined,
                    "immutableSchemaType": undefined,
                    "immutableUrl": undefined
                },
                "updateAddress": "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
                "assetOwnership": {
                    originalOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                    currentOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                    ownershipHistoryRecords: []
                }
            }
        });
    });
});