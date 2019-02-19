import * as datapay from 'datapay';
import * as Base58 from 'base-58';
import axios from 'axios';
import { CreateRequest } from './models/create-request.interface';
import { CreateResponse } from './models/create-response.interface';
import { GetResponse } from './models/get-response.interface';
import { BitcoinAsset } from './models/bitcoin-asset';
import { UpdateResponse } from './models/update-response.interface';
import { UpdateRequest } from './models/update-request.interface';
import * as jsonschema from 'jsonschema';

declare var Buffer: any;

function buf2hex(buffer: any) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
}

const defaultOptions = {
    // bitdb.network is used to query for the asset
    bitdb_api_base: 'https://babel.bitdb.network/q/1DHDifPvtPgKFPZMRSxmVHhiPvFmxZwbfh/',
    bitdb_api_key: '12cHytySdrQGRtuvvkVde2j3e74rmEn5TM',
    // bitcoinfiles.org is used to retrieve b:// protocol assets
    b_api_base: 'https://media.bitcoinfiles.org',
}

export class Client {
    options = defaultOptions;
    constructor(options: any) {
        this.options = Object.assign({}, this.options, options);
    }

    callbackAndResolve(resolveOrReject: Function, data: any, callback?: Function) {
        if (callback) {
            callback(data);
        }
        return resolveOrReject(data);
    }

    /**
     * Create an asset
     * @param createRequest Creation request
     */
    create(createRequest: CreateRequest, callback?: Function): Promise<CreateResponse>{
        return new Promise((resolve, reject) => {
            if (!createRequest.pay || !createRequest.pay.key || createRequest.pay.key === '') {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'key required'
                }, callback);
            }

            if (!createRequest.asset) {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'asset required'
                }, callback);
            }

            if (!createRequest.asset.dataUrl) {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'dataUrl required'
                }, callback);
            }

            if (!createRequest.asset.updateAddress) {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'updateAddress required'
                }, callback);
            }
            const args = this.buildCreateAction(createRequest);

            datapay.send({
                data: args,
                pay: {
                    key: createRequest.pay.key
                }
            }, async (err: any, transaction: any) => {
                if (err) {
                    console.log('err', err);
                    return this.callbackAndResolve(resolve, {
                        success: false,
                        message: err.message ? err.message : err.toString()
                    }, callback);
                }
                return this.callbackAndResolve(resolve, {
                    success: true,
                    data: {
                        txid: transaction
                    }
                }, callback)
            });
        });
    }
    /**
     *
     * @param txid Asset identifier
     */
    private getAssetMintedVersion(txid: string, callback?: Function): Promise<GetResponse> {
        return new Promise((resolve, reject) => {
            if (!txid || txid === '') {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'txid required'
                }, callback);
            }
            const query =  JSON.stringify({
                "v": 3,
                "q": {
                    "find": {
                        "out.s1": "1CLcHRfBvtMVB2VNFjNXq7VfamY9FXfw7K",
                        "out.h2": "00",
                        "tx.h": txid
                    },
                    "limit": 1,
                },
                "r": {
                    "f": "[.[] | { txid: .tx.h,  inputInfo: . | { in: .in? }, blockInfo: . | { blockIndex: .blk.i?, blockTime: .blk.t?}, out: .out  } ]"
                }
            });

            return axios.get(
                this.options.bitdb_api_base + Buffer.from(query).toString('base64'),
                {
                    headers: { key: this.options.bitdb_api_key }
                }
            ).then((response) => {
                if (!response.data) {
                    return this.callbackAndResolve(resolve, {
                        success: false,
                        message: "no data"
                    }, callback);
                }
                if (!response.data.u.length && !response.data.c.length) {
                    return this.callbackAndResolve(resolve, {
                        success: false,
                        message: "tx not found"
                    }, callback);
                }

                let tx = response.data.c.length ? response.data.c[0] : response.data.u.length ? response.data.u[0] : undefined;

                if (!tx) {
                    console.log('tx', tx);
                    throw new Error('not found tx');
                }

                return this.callbackAndResolve(resolve, {
                    success: true,
                    data: BitcoinAsset.validateAssetStructure(BitcoinAsset.buildBitcoinAssetFromBitDbTxResult(tx))
                }, callback);
            });
        });
    }

    private findUpdate(getResponse: any, txid: string) {
        const query = JSON.stringify({
            "v": 3,
            "q": {
                "find": {
                    "in.e.a": "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
                    "out.s1": "1CLcHRfBvtMVB2VNFjNXq7VfamY9FXfw7K",
                    "out.h2": "01",
                    "out.s3": txid,
                },
                "limit": 1,
                "sort": { "blk.i": -1 }
            },
            "r": {
                "f": "[.[] | { txid: .tx.h,  inputInfo: . | { in: .in? }, blockInfo: . | { blockIndex: .blk.i?, blockTime: .blk.t?}, out: .out  } ]"
            }
        });
        return axios.get(
            this.options.bitdb_api_base + Buffer.from(query).toString('base64'),
            {
                headers: { key: this.options.bitdb_api_key }
            }
        ).then((response) => {
            let tx = response.data.c.length ? response.data.c[0] : response.data.u.length ? response.data.u[0] : undefined;
            if (!tx) {
                return getResponse; // We have the latest version already!
            }
            const originalAsset = getResponse.data;
            originalAsset.updateWithLatestDataFromBitDbQuery(tx);
            const updatedAssetReply = Object.assign({}, getResponse, {
                data: originalAsset
            });
            return updatedAssetReply;
        });
    }

    private downloadAndValidate(getResponse: any): Promise<GetResponse> {
        let dataUrl = getResponse.data.assetDataCurrent.dataUrl;
        let dataSchemaUrl = getResponse.data.assetDataCurrent.dataSchemaUrl;
        const urlRegex = /^(https?|bitcoinasset|b):\/\/(.+)/i;
        const bRegex = /^(bitcoinasset|b):\/\/(.+)?#?/i;

        if (!urlRegex.test(dataUrl) || !urlRegex.test(dataSchemaUrl)) {
            // Not a URL, skip it
            return getResponse;
        }

        const dataUrlMatch = bRegex.exec(dataUrl);
        if (dataUrlMatch) {
            dataUrl = `https://media.bitcoinfiles.org/${dataUrlMatch[2]}`;
        }

        const dataSchemaUrlMatch = bRegex.exec(dataSchemaUrl);
        if (dataSchemaUrlMatch) {
            dataSchemaUrl = `https://media.bitcoinfiles.org/${dataSchemaUrlMatch[2]}`;
        }

        // We now have 2 valid URLs
        return axios.get(dataUrl).then((response) => {
            if (!response.headers['content-type'] ||  !/(text|application)\/(javascript|json)/i.test(response.headers['content-type'])) {
                throw new Error('invalid content type for referenced b:// files in dataUrl');
            }
            return response.data;
        }).then((dataUrlResponseData) => {
            return axios.get(dataSchemaUrl).then((schemaResponse) => {
                if (!schemaResponse.headers['content-type'] ||  !/(text|application)\/(javascript|json)/i.test(schemaResponse.headers['content-type'])) {
                    throw new Error('invalid content type for referenced b:// files in dataSchemaUrl');
                }
                const schemaValidator = new jsonschema.Validator();
                const validationResult = schemaValidator.validate(dataUrlResponseData, schemaResponse.data);
                if (validationResult.errors.length) {
                    throw new Error(`schema validation failed for data ${dataUrl} with schema ${dataSchemaUrl}`);
                }
                return getResponse;
            });
        });
    }

    async find(txid: string, validate: boolean = false): Promise<GetResponse> {
        return await this.getAssetMintedVersion(txid).then((getResponse: any) => {
            if (!getResponse) {
                return {
                    success: false,
                    message: 'undefined'
                }
            }
            if (!getResponse || !getResponse.success || !getResponse.data) {
                return getResponse;
            }

            return this.findUpdate(getResponse, txid).then((updatedResponse) => {
                if (!updatedResponse.success) {
                    return updatedResponse;
                }
                // Perform validation if and only if it's known
                if (validate && /https?\:\/\/json\-schema\.org\/draft\-07\/schema/i.test(updatedResponse.data.assetDataCurrent.dataSchemaType)) {
                    return this.downloadAndValidate(updatedResponse);
                }
                return updatedResponse;
            })
        });
    }

    buildCreateAction(createRequest: CreateRequest): any[] {
        const updateAddressHex = buf2hex(Base58.decode(createRequest.asset.updateAddress));
        const args = [
            '1CLcHRfBvtMVB2VNFjNXq7VfamY9FXfw7K',
            '0x00',
            '0x' + updateAddressHex
        ];
        const fields = [
            'dataUrl',
            'dataSchemaUrl',
            'dataSchemaType',
            'metadataUrl',
            'metadataSchemaUrl',
            'metadataSchemaType',
            'immutableUrl',
            'immutableSchemaUrl',
            'immutableSchemaType',
        ];

        for (const field of fields) {
            if (createRequest.asset[field]) {
                const encodedHex = buf2hex(Buffer.from(createRequest.asset[field], 'utf8'))
                args.push(`0x${encodedHex}`);
            } else {
                args.push(`0x00`);
            }
        }
        return args;
    }

    buildUpdateAction(updateRequest: UpdateRequest): any[] {
        const args = [
            '1CLcHRfBvtMVB2VNFjNXq7VfamY9FXfw7K',
            '0x01',
        ];

        const txIdEncodedHex = buf2hex(Buffer.from(updateRequest.txid, 'utf8'))
        args.push(`0x${txIdEncodedHex}`);

        const fields = [
            'dataUrl',
            'dataSchemaUrl',
            'dataSchemaType',
            'metadataUrl',
            'metadataSchemaUrl',
            'metadataSchemaType'
        ];

        for (const field of fields) {
            if (updateRequest.update[field]) {
                const encodedHex = buf2hex(Buffer.from(updateRequest.update[field], 'utf8'))
                args.push(`0x${encodedHex}`);
            } else {
                args.push(`0x00`);
            }
        }
        return args;
    }

    async update(updateRequest: UpdateRequest, callback?: Function): Promise<UpdateResponse>{
        return new Promise((resolve, reject) => {

            if (!updateRequest || !updateRequest.pay || !updateRequest.pay.key || updateRequest.pay.key === '') {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'key required'
                }, callback);
            }

            if (!updateRequest.update) {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'update required'
                }, callback);
            }

            if (!updateRequest.txid) {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'txid required'
                }, callback);
            }

            if (!updateRequest.update.dataUrl &&
                !updateRequest.update.dataSchemaUrl &&
                !updateRequest.update.dataSchemaType &&
                !updateRequest.update.metadataUrl &&
                !updateRequest.update.metadataSchemaUrl &&
                !updateRequest.update.metadataSchemaType) {
                return this.callbackAndResolve(resolve, {
                    success: false,
                    message: 'update.dataUrl required or update.dataSchemaUrl required or update.dataSchemaType update.metadataUrl required or update.metadataSchemaUrl required or update.metadataSchemaType required'
                }, callback);
            }

            const args = this.buildUpdateAction(updateRequest);

            datapay.send({
                data: args,
                pay: {
                    key: updateRequest.pay.key
                }
            }, (err: any, transaction: any) => {
                if (err) {
                    this.callbackAndResolve(resolve, {
                        success: false,
                        message: err.message ? err.message : err.toString()
                    }, callback);
                }
                this.callbackAndResolve(resolve, {
                    success: true,
                    data: {
                        txid: transaction
                    }
                }, callback);
            });
        });
    }
}