'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

const privateKey = 'wifkeyhere';

describe('create function test', () => {
    it('should return false no key', async () => {
        var createRequest = {
            asset: {

            },
            pay: {
                key: ""
            }
        };

        var result = await index.getClient().create(createRequest);
        expect(result).to.eql({
            success: false,
            message: "key required"
        });

        createRequest = {
            asset: {

            },
            pay: {
                key: undefined
            }
        };

        var result = await index.getClient().create(createRequest);
        expect(result).to.eql({
            success: false,
            message: "key required"
        });
    });

    it('should return false missing asset', async () => {
        var createRequest = {
            pay: {
                key: "key1"
            }
        };

        var result = await index.getClient().create(createRequest);
        expect(result).to.eql({
            success: false,
            message: "asset required"
        });

    });

    it('should return false missing asset callback', async () => {
        var createRequest = {
            pay: {
                key: "key1"
            }
        };

        await index.getClient().create(createRequest, (result) => {
            expect(result).to.eql({
                success: false,
                message: "asset required"
            });
        });
    });

    it('should return false missing asset dataUrl', async () => {
        var createRequest = {
            asset: {

            },
            pay: {
                key: "key1"
            }
        };

        var result = await index.getClient().create(createRequest);
        expect(result).to.eql({
            success: false,
            message: "dataUrl required"
        });

    });

    it('should return false missing asset updateAddress', async () => {
        var createRequest = {
            asset: {
                dataUrl: 'b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c'
            },
            pay: {
                key: "key1"
            }
        };

        var result = await index.getClient().create(createRequest);
        expect(result).to.eql({
            success: false,
            message: "updateAddress required"
        });
    });

/*
    it('should return true all required and optional properties are set', async () => {
        var createRequest = {
            asset: {
                dataUrl: 'b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c',
                dataSchemaType: 'http://json-schema.org/draft-07/schema#',
                dataSchemaUrl: 'b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c#matter/schema/post/draft-01',
                updateAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz'
            },
            pay: {
                key: privateKey
            }
        };

        var result = await index.getClient().create(createRequest);
        console.log('new asset', result);
        expect(result.success).to.equal(true);
        expect(result.data.txid).to.not.be.null;
    });*/
/*
    it('should return true all required and optional properties are set for a real schema', async () => {
        var createRequest = {
            asset: {
                dataUrl: 'b://9a201f03464ef345ae7d8fd49bdf09eddc52a96345358438af4f13af7f4b56fa',
                dataSchemaUrl: 'b://d3df63599f8e1d02d98f263f1a0427de01c95f077758c58f2d7a6bd94ea6da70',
                dataSchemaType: 'http://json-schema.org/draft-07/schema#',
                updateAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz'
            },
            pay: {
                key: privateKey
            }
        };

        var result = await index.getClient().create(createRequest);
        console.log('new asset', result);
        expect(result.success).to.equal(true);
        expect(result.data.txid).to.not.be.null;
    });*/

});