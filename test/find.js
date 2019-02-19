'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('find function test', () => {
    it('should return false no txid', async () => {
        var result = await index.getClient().find();
        expect(result).to.eql({
            success: false,
            message: "txid required"
        });
    });

    it('should return false txid not found', async () => {
        var result = await index.getClient().find('0000276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c');
        expect(result).to.eql({
            success: false,
            message: "tx not found"
        });
    });

    it('should return latest state of txid with only created once', async () => {
        var result = await index.getClient().find('84c43f14d73122f29a949a426c22997bc0064d67fab1cb505f194c916628a1fc');
        expect(result).to.eql({
            success: true,
            data: {
                "txid": "84c43f14d73122f29a949a426c22997bc0064d67fab1cb505f194c916628a1fc",
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
                    "blockHeight": 570164,
                    "createdTime": 1550468060,
                    "txid": "84c43f14d73122f29a949a426c22997bc0064d67fab1cb505f194c916628a1fc",
                },
                "blockInfoOriginal": {
                    "blockHeight": 570164,
                    "createdTime": 1550468060,
                    "txid": "84c43f14d73122f29a949a426c22997bc0064d67fab1cb505f194c916628a1fc",
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

    it('should return latest state of txid updated', async () => {
        var result = await index.getClient().find('364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa');
        expect(result).to.eql({
            success: true,
            data: {
                "txid": "364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa",
                "assetDataCurrent": {
                    dataUrl: 'b://updated',
                    dataSchemaUrl: 'b://updateddescription',
                    dataSchemaType: 'b://dataDescriptionValidationScheme',
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
                    "blockHeight": 570160,
                    "createdTime": 1550465608,
                    "txid": "ebd0cdd5c8279fd362fd948229b696244e65ca7351f5e271e0a63e9cf7bfa9e4",
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

    it('should return latest state of txid updated and validation', async () => {
        var result = await index.getClient().find('4b541e091d6af2f60d256dfca2685f95bf2d3a9b7995595115183d37b7c5bf90', true);
        expect(result).to.eql({
            success: true,
            data: {
                "txid": "4b541e091d6af2f60d256dfca2685f95bf2d3a9b7995595115183d37b7c5bf90",
                "assetDataCurrent": {
                    dataUrl: 'b://9a201f03464ef345ae7d8fd49bdf09eddc52a96345358438af4f13af7f4b56fa',
                    dataSchemaUrl: 'b://d3df63599f8e1d02d98f263f1a0427de01c95f077758c58f2d7a6bd94ea6da70',
                    dataSchemaType: 'http://json-schema.org/draft-07/schema#',
                    "metadataSchemaUrl": undefined,
                    "metadataSchemaType": undefined,
                    "metadataUrl": undefined,
                },
                "assetDataOriginal": {
                    dataUrl: 'b://9a201f03464ef345ae7d8fd49bdf09eddc52a96345358438af4f13af7f4b56fa',
                    dataSchemaUrl: 'b://d3df63599f8e1d02d98f263f1a0427de01c95f077758c58f2d7a6bd94ea6da70',
                    dataSchemaType: 'http://json-schema.org/draft-07/schema#',
                    "metadataSchemaUrl": undefined,
                    "metadataSchemaType": undefined,
                    "metadataUrl": undefined,
                },
                "blockInfoCurrent": {
                    "blockHeight": 570305,
                    "createdTime": 1550546281,
                    "txid": "4b541e091d6af2f60d256dfca2685f95bf2d3a9b7995595115183d37b7c5bf90",
                },
                "blockInfoOriginal": {
                    "blockHeight": 570305,
                    "createdTime": 1550546281,
                    "txid": "4b541e091d6af2f60d256dfca2685f95bf2d3a9b7995595115183d37b7c5bf90",
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