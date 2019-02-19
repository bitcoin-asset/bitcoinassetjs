'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('buildUpdateAction function test', () => {
    it('should buildUpdateAction asset success', async () => {
        var args = index.getClient().buildUpdateAction({
            txid: '364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa',
            update: {
                dataUrl: 'b://hello',
                dataSchemaUrl: undefined,
                dataSchemaType: undefined
            }
        });
        expect(args).to.eql([
            "1CLcHRfBvtMVB2VNFjNXq7VfamY9FXfw7K",
            "0x01",
            "0x33363461656361303465323531333238343730626365626237643361383737393434633663333962353235306631376362656563653838616634353966646661",
            "0x623a2f2f68656c6c6f",
            "0x00",
            "0x00",
            "0x00",
            "0x00",
            "0x00",
        ]);

        var args = index.getClient().buildUpdateAction({
            txid: '364aeca04e251328470bcebb7d3a877944c6c39b5250f17cbeece88af459fdfa',
            update: {
                dataUrl: 'b://hello',
                dataSchemaUrl: 'b://hello123',
                dataSchemaType: 'b://hello456',
            }
        });
        expect(args).to.eql([
            "1CLcHRfBvtMVB2VNFjNXq7VfamY9FXfw7K",
            "0x01",
            "0x33363461656361303465323531333238343730626365626237643361383737393434633663333962353235306631376362656563653838616634353966646661",
            "0x623a2f2f68656c6c6f",
            "0x623a2f2f68656c6c6f313233",
            "0x623a2f2f68656c6c6f343536",
            "0x00",
            "0x00",
            "0x00",

        ]);
    });
});