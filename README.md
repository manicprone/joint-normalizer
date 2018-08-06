# Joint Normalizer

Normalization logic for Joint Kit payloads.

<br />

## Table of Contents

* [Introduction][section-introduction]
* [How to Use][section-how-to-use]
* [API][section-api]
* [For Developers][section-for-developers]


## Introduction

[TBC]

## How to Use

### Install

``` sh
$ npm install joint-normalizer --save
```


## API

### Constructor

#### _Constructor Options_

| Name              | Required? | Description |
| ----------------- | --------- | ----------- |
| debugInit         | No        | Set to `true` to log debug messages during instantiation. Defaults to `false`. |
| debugToModel      | No        | Set to `true` to log debug messages during Model object hydration. Defaults to `false`. |
| debug             | No        | Set to `true` to log debug messages during instance utilization. Defaults to `false`. |
| payloadSpec       | No        | The output specification of the Joint payload. Defaults to `json-api`. |
| fieldForModelType | No        | The property name in the payload that identifies the name of the Model type. Defaults to `type`. |
| models | No        | The Model object definitions (shapes) that the normalizer will build and return (if instructed). Provide the model definitions as an Object. |

### Instance

#### _Instance Properties_

| Name        | Type    | Description |
| ----------- | ------- | ----------- |
| ...         | ...     | [TBC - List all properties] |
| Model       | Function | The Model factory that is constructed with the `models` provided at instantiation. If a payload type is handled by the normalizer, and a valid Model definition cannot be determined, the normalizer will simply return the generic normalized shape. |


#### _Instance Functions_

> All functions are synchronous.

| Name         | Parameters | Returns | Description |
| ------------ | ---------- | ------- | ----------- |
| normalizePayload | `payload` - the payload to normalize. `asModel` - whether or not to return a Model object. | The normalized payload (generic object -or- Model object) | Perform the normalization of a provided Joint payload. |


### Errors

[TBC]


## For Developers

### Dev Lint

The plugin uses [ESLint][link-eslint-site] for source code linting. The linting will run automatically on `git commit`.

``` sh
$ npm run lint
```


### Dev Test

The plugin uses [Mocha][link-mocha-site] for the testing framework,
and [Chai][link-chai-site] and [Chai-HTTP][link-chai-http-site] for its assertions.

``` sh
$ npm run test
```

### Dev Build

The plugin is automatically built on `npm publish`. But, you can manually build the plugin using:

``` sh
$ npm run build-plugin
```

[section-introduction]: #introduction
[section-how-to-use]: #how-to-use
[section-api]: #api
[section-for-developers]: #for-developers

[link-eslint-site]: https://eslint.org
[link-mocha-site]: https://mochajs.org
[link-chai-site]: http://chaijs.com
[link-chai-http-site]: http://chaijs.com/plugins/chai-http
