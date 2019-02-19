'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('validateAssetStructure function test', () => {
    it('validate success', async () => {
        var asset = {
            "txid": "364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa",
            "assetDataCurrent": {
                "dataSchemaUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c#matter/schema/post/draft-01",
                "dataSchemaType": "http://json-schema.org/draft-07/schema#",
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c",
            },
            "assetDataOriginal": {
                "dataSchemaUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c#matter/schema/post/draft-01",
                "dataSchemaType": "http://json-schema.org/draft-07/schema#",
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c"
            },
            "blockInfoCurrent": {
                "blockHeight": 570023,
                "createdTime": 1550383020,
            },
            "blockInfoOriginal": {
                "blockHeight": 570023,
                "createdTime": 1550383020,
            },
            assetImmutableData: undefined,
            "updateAddress": "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
            "assetOwnership": {
                originalOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                currentOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                ownershipHistoryRecords: []
            }
        };

        var result = index.getBitcoinAsset().validateAssetStructure(asset);
        expect(result).to.eql(asset);
    });

    it('validate minimal success', async () => {
        var asset = {
            "txid": "364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa",
            "assetDataCurrent": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c",
            },
            "assetDataOriginal": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c"
            },
            "blockInfoCurrent": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            "blockInfoOriginal": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            assetImmutableData: undefined,
            "updateAddress": "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
            "assetOwnership": {
                originalOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                currentOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                ownershipHistoryRecords: []
            }
        };

        var result = index.getBitcoinAsset().validateAssetStructure(asset);
        expect(result).to.eql(asset);
    });

    it('validate less than minimal failure', async () => {
        var asset = {
            "assetDataCurrent": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c",
            },
            "assetDataOriginal": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c"
            },
            "blockInfoCurrent": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            "blockInfoOriginal": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            assetImmutableData: undefined,
            "updateAddress": "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
            "assetOwnership": {
                originalOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                currentOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                ownershipHistoryRecords: []
            }
        };
        expect(function(){
            index.getBitcoinAsset().validateAssetStructure(asset)
        }).to.throw('undefined txid');

        var asset = {
            "txid": "364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa",
            "assetDataCurrent": {
            },
            "assetDataOriginal": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c"
            },
            "blockInfoCurrent": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            "blockInfoOriginal": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            assetImmutableData: undefined,
            "updateAddress": "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
            "assetOwnership": {
                originalOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                currentOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                ownershipHistoryRecords: []
            }
        };
        expect(function(){
            index.getBitcoinAsset().validateAssetStructure(asset)
        }).to.throw('undefined assetDataCurrent.dataUrl');

        var asset = {
            "txid": "364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa",
            "assetDataCurrent": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c",
            },
            "assetDataOriginal": {
            },
            "blockInfoCurrent": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            "blockInfoOriginal": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            assetImmutableData: undefined,
            "updateAddress": "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
            "assetOwnership": {
                originalOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                currentOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                ownershipHistoryRecords: []
            }
        };
        expect(function(){
            index.getBitcoinAsset().validateAssetStructure(asset)
        }).to.throw('undefined assetDataOriginal.dataUrl');

        var asset = {
            "txid": "364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa",
            "assetDataCurrent": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c",
            },
            "assetDataOriginal": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c"
            },
            "blockInfoCurrent": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            "blockInfoOriginal": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            assetImmutableData: undefined,
            "assetOwnership": {
                originalOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                currentOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                ownershipHistoryRecords: []
            }
        };

        expect(function(){
            index.getBitcoinAsset().validateAssetStructure(asset)
        }).to.throw('undefined updateAddress');

        var asset = {
            "txid": "364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa",
            "assetDataCurrent": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c",
            },
            "assetDataOriginal": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c"
            },
            "blockInfoCurrent": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            "blockInfoOriginal": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            assetImmutableData: undefined,
            "updateAddress": "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
            "assetOwnership": {
                currentOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                ownershipHistoryRecords: []
            }
        };

        expect(function(){
            index.getBitcoinAsset().validateAssetStructure(asset)
        }).to.throw('assetOwnership.originalOwnerAddress');

        var asset = {
            "txid": "364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa",
            "assetDataCurrent": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c",
            },
            "assetDataOriginal": {
                "dataUrl": "b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c"
            },
            "blockInfoCurrent": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            "blockInfoOriginal": {
                "blockHeight": undefined,
                "createdTime": undefined,
            },
            assetImmutableData: undefined,
            "updateAddress": "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
            "assetOwnership": {
                originalOwnerAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz',
                ownershipHistoryRecords: []
            }
        };

        expect(function(){
            index.getBitcoinAsset().validateAssetStructure(asset)
        }).to.throw('assetOwnership.currentOwnerAddress');
    });
});