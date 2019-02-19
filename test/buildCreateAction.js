'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('buildCreateAction function test', () => {
    it('should buildCreateAction asset success', async () => {
        var args = index.getClient().buildCreateAction({
            txid: '364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa',
            asset: {
                dataUrl: 'b://hello',
                dataSchemaUrl: undefined,
                dataSchemaType: undefined,
                updateAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz'
            }
        });
        expect(args).to.eql([
            "1CLcHRfBvtMVB2VNFjNXq7VfamY9FXfw7K",
            "0x00", // action create
            "0x009467df677dc153a88243465d09ca5fe8f7ba8cf9e10c8319", // update delegate address
            "0x623a2f2f68656c6c6f", // dataUrl
            "0x00",                 // dataSchemaUrl
            "0x00",                 // dataSchemaType
            "0x00",                 // metadataUrl
            "0x00",                 // metadataSchemaUrl
            "0x00",                 // metadataSchemaType
            "0x00",                 // immutableUrl
            "0x00",                 // immutableSchemaUrl
            "0x00"                  // immutableSchemaType
        ]);

        var args = index.getClient().buildCreateAction({
            txid: '364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa',
            asset: {
                dataUrl: 'b://hello',
                dataSchemaUrl: 'b://hello123',
                dataSchemaType: 'b://hello456',
                metadataUrl: 'b://metadata',
                metadataSchemaUrl: 'b://metadataDesc',
                metadataSchemaType: 'b://metadataDescSchema',
                immutableUrl: 'b://immutable',
                immutableSchemaUrl: 'b://immutabledesc',
                immutableSchemaType: 'b://immutableschema',
                updateAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz'
            }
        });
        expect(args).to.eql([
            "1CLcHRfBvtMVB2VNFjNXq7VfamY9FXfw7K",
            "0x00",
            "0x009467df677dc153a88243465d09ca5fe8f7ba8cf9e10c8319",
            "0x623a2f2f68656c6c6f",
            "0x623a2f2f68656c6c6f313233",
            "0x623a2f2f68656c6c6f343536",
            '0x623a2f2f6d65746164617461',
            "0x623a2f2f6d6574616461746144657363",
            "0x623a2f2f6d6574616461746144657363536368656d61",
            "0x623a2f2f696d6d757461626c65",
            "0x623a2f2f696d6d757461626c6564657363",
            "0x623a2f2f696d6d757461626c65736368656d61"
        ]);
    });
});