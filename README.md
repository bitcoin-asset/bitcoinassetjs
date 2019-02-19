# BitcoinAssetJS

A Node.js module for creating, updating and tranferring Bitcoin Assets (SV)

## Installation
```sh
npm install bitcoinassetjs --save
yarn add bitcoinassetjs
bower install bitcoinassetjs --save
```
## Usage

### Javascript

```javascript
// Include the library
var bitcoinassetjs = require('bitcoinassetjs');
```

##### Create Asset*:

_Simple Example_

Create minimal viable asset.

dataUrl: Data source. Allowed URLs: http://, https://, b://. Recommended to use b://.

updateAddress: The address that is allowed to update the data

pay.key: The private key you wish to create the asset for

```javascript
bitcoinassetjs.getClient().create({
    asset: {
        dataUrl: 'b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c',
        updateAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz'
    },
    pay: {
        key: 'your private key'
    }
});
```

_Advanced Example_

Use JSON schema to define the type of data and how to validate it.

dataUrl: Data source. Allowed URLs: http://, https://, b://. Recommended to use b://.

dataSchemaType: Supported types: 'http://json-schema.org/draft-07/schema#' (You can implement your own custom types like XML-Schema or anything)

dataSchemaUrl: Data schema definition source. Allowed URLs: http://, https://, b://. Recommended to use b://.

updateAddress: The address that is allowed to update the data

pay.key: The private key you wish to create the asset for

```javascript
bitcoinassetjs.getClient().create({
    asset: {
        dataUrl: 'b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c',
        dataSchemaType: 'http://json-schema.org/draft-07/schema#',
        dataSchemaUrl: 'b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c#some-namespace/schema/some-object-type/draft-01',
        updateAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz'
    },
    pay: {
        key: 'your private key'
    }
});
```

_Comprehensive Example_

Use JSON schema to define the type of data and how to validate it.

dataUrl: Data source. Allowed URLs: http://, https://, b://. Recommended to use b://.

dataSchemaType: Supported types: 'http://json-schema.org/draft-07/schema#' (You can implement your own custom types like XML-Schema or anything)

dataSchemaUrl: Data schema definition source. Allowed URLs: http://, https://, b://. Recommended to use b://.

Extra metadata fields:

metadataUrl: Data source. Allowed URLs: http://, https://, b://. Recommended to use b://.

metadataSchemaType: Supported types: 'http://json-schema.org/draft-07/schema#' (You can implement your own custom types like XML-Schema or anything)

metadataSchemaUrl: Data schema definition source. Allowed URLs: http://, https://, b://. Recommended to use b://.

Immutabale fields (set only on creation, can never be changed):

immutableUrl: Data source. Allowed URLs: http://, https://, b://. Recommended to use b://.

immutableSchemaType: Supported types: 'http://json-schema.org/draft-07/schema#' (You can implement your own custom types like XML-Schema or anything)

immutableSchemaUrl: Data schema definition source. Allowed URLs: http://, https://, b://. Recommended to use b://.

updateAddress: The address that is allowed to update the data

pay.key: The private key you wish to create the asset for

```javascript
bitcoinassetjs.getClient().create({
    asset: {
      dataUrl: 'b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c',
      dataSchemaType: 'http://json-schema.org/draft-07/schema#',
      dataSchemaUrl: 'b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c#some-namespace/schema/some-object-type/draft-01',
      metadataUrl: undefined,
      metadataSchemaUrl: undefined,
      metadataSchemaType: undefined,
      immutableUrl: undefined,
      immutableSchemaUrl: undefined,
      immutableSchemaType: undefined,
      updateAddress: '1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz'
    },
    pay: {
        key: 'your private key'
    }
});
```

#### Find Asset

Find an asset. Optionally validate the JSON schema. Only `http://json-schema.org/draft-07/schema#` is supported for now.
On validation failure an Error exception is thrown. If either the dataUrl or the dataSchemaUrl are invalid or not present, then validation is silently skipped and the request will succeed as if validation was not performed.

```javascript

// First find and retrieve the asset and validate (2nd argument = true)
var found = await bitcoinassetjs.getClient().find('4b541e091d6af2f60d256dfca2685f95bf2d3a9b7995595115183d37b7c5bf90', true);
console.log(found);
/*
{
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
*/

```




##### Update Asset

All the data* and metadata* fields can be updated in the asset by signing a request with the *privateKey* of the `updateAddress`.

The immutable* fields are forever unchangeable.

```javascript

// BEWARE: All the fields that are null/undefined or not present will OVERWRITE original asset
// See below on how to ensure you always have the latest version and do not inadvertantly overwrite the fields you want to keep.
const result = await bitcoinassetjs.getClient().update({
  txid: '172908fd19df177356e369867623bb1f9d90b8d1d55c384ebd468985d7da035e',
  update: {
    dataUrl: 'b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c',
    dataSchemaType: 'http://json-schema.org/draft-07/schema#',
    dataSchemaUrl: 'b://3150276948348c428d2f86596953d503a4e8508b2238201a3b7e281b180d7c4c#some-namespace/schema/some-object-type/draft-01',
    metadataUrl: undefined,
    metadataSchemaUrl: undefined,
    metadataSchemaType: undefined,
    immutableUrl: undefined,
    immutableSchemaUrl: undefined,
    immutableSchemaType: undefined,
  },
  pay: {
    key: 'your private key'
  }
});
```

Updating 1 field, but keeping the existing fields, First retrieve the latest version, and then perform the update.

```javascript

// First find and retrieve the asset
var found = await bitcoinassetjs.getClient().find('172908fd19df177356e369867623bb1f9d90b8d1d55c384ebd468985d7da035e');
// now update the specific field you want, using Object.assign to keep the existing fields
var update = await bitcoinassetjs.getClient().update({
    txid: found.data.txid,
    update: Object.assign({}, found.data.assetDataCurrent,
      {
          metadataSchemaUrl: 'b://updated-metadataSchemaUrl'
      }
    ),
    pay: {
      key: 'your private key'
    }
});

```

## Build  and Test

```
npm run build
npm test
```
