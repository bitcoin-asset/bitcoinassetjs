'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

const privateKey = 'wifkeyhere';

describe('integration test test', () => {

    const sleep = async (timeout = 4000)  => {
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }

    it('should create, update, and retrieve', async () => {
        // console.log('integration_test: starting');
        var createRequest = {
            asset: {
                dataUrl: 'data',
                metadataUrl: 'metadata',
                immutableUrl: 'immutable',
                updateAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz'
            },
            pay: {
                key: privateKey
            }
        };
        var result = await index.getClient().create(createRequest);
        expect(result.success).to.equal(true);
        expect(result.data.txid).to.not.be.null;
        // console.log('integration_test: asset created', result);

        await sleep(4000);

        var found = await index.getClient().find(result.data.txid);
        expect(found.success).to.equal(true);
        expect(found.data.txid).to.not.be.null;
        // console.log('integration_test: asset found', found);

        var update = await index.getClient().update({
            txid: found.data.txid,
            update: Object.assign({}, found.data.assetDataCurrent,
                {
                    metadataSchemaUrl: 'metadataSchemaUrl'
                }
            ),
            pay: {
                key: privateKey
            }
        });
        // console.log('integration_test: asset update', update);
        expect(update.success).to.equal(true);
        expect(update.data.txid).to.not.be.null;

        await sleep(4000);

        var foundUpdated = await index.getClient().find(found.data.txid);
        // console.log('found updated', foundUpdated);
        expect(foundUpdated.success).to.equal(true);
        expect(foundUpdated.data.txid).to.not.be.null;

        expect(foundUpdated.data.assetDataOriginal.dataUrl).to.equal('data');
        expect(foundUpdated.data.assetDataOriginal.metadataUrl).to.equal('metadata');

        expect(foundUpdated.data.assetDataCurrent.dataUrl).to.equal('data');
        expect(foundUpdated.data.assetDataCurrent.metadataUrl).to.equal('metadata');
        expect(foundUpdated.data.assetDataCurrent.metadataSchemaUrl).to.equal('metadataSchemaUrl');

    });

});