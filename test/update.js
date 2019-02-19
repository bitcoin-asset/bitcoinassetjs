'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

const privateKey = 'wifkeyhere';

describe('update function test', () => {
    it('should return false no data', async () => {
        var result = await index.getClient().update();
        expect(result).to.eql({
            success: false,
            message: "key required"
        });
    });

    it('should update asset fail', async () => {
        var result = await index.getClient().update({
            update: {
                dataUrl: undefined,
            },
            pay: {
                key: 'key1'
            }
        });
        expect(result).to.eql({
            success: false,
            message: 'txid required'
        });
    });

    it('should update asset failure', async () => {

        var result = await index.getClient().update({
            txid: '364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa',
            update: {
                dataUrl: undefined,
                dataSchemaUrl: undefined,
                dataSchemaType: undefined
            },
            pay: {
                key: 'key1'
            }
        });
        expect(result).to.eql({
            success: false,
            message: 'update.dataUrl required or update.dataSchemaUrl required or update.dataSchemaType update.metadataUrl required or update.metadataSchemaUrl required or update.metadataSchemaType required'
        });
    });

    /*
    it('should update asset success', async () => {
        const result = await index.getClient().update({
            txid: '172908fd19df177356e369867623bb1f9d90b8d1d55c384ebd468985d7da035e',
            update: {
                dataUrl: 'b://updated',
                dataSchemaUrl: 'b://updateddescription',
                dataSchemaType: 'b://dataSchemaType',
            },
            pay: {
                key: privateKey
            }
        });
        console.log('result', result);
        expect(result.data.txid).to.not.be.null;
    });*/
});