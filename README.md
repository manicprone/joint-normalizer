# Joint Normalizer

Normalization logic for common HTTP response payloads.
> Currently supports JSON API Spec only.

<br />

## Table of Contents

* [Introduction][section-introduction]
* [How to Use][section-how-to-use]
* [API][section-api]
* [For Developers][section-for-developers]
* [License][section-license]


## Introduction

[TBC]

## How to Use

### Install

``` sh
$ yarn add joint-normalizer
```


## API

### Constructor

#### _Constructor Options_

| Name              | Required? | Description |
| ----------------- | --------- | ----------- |
| debugInit         | No        | Set to `true` to log debug messages during instantiation. Defaults to `false`. |
| debugToModel      | No        | Set to `true` to log debug messages during Model object hydration. Defaults to `false`. |
| debug             | No        | Set to `true` to log debug messages during instance utilization. Defaults to `false`. |
| payloadSpec       | No        | The output specification of the Joint payload. Defaults to `'json-api'`. |
| fieldForModelType | No        | The property name in the payload that identifies the name of the Model type. Defaults to `'type'`. |
| toFieldFormat     | No        | The target format (case) for normalized fields. Supported formats: `'snake'`, `'kebab'`, `'camel'`. Defaults to `'snake'`. |
| fromFieldFormat   | No        | The source format (case) of the payload\'s fields. This declaration is not necessary for functional correctness, but will merely suppress unnecessary transformations (and loops) when the source and target match. Supported formats: `'snake'`, `'kebab'`, `'camel'`. Defaults to `'snake'`. |
| relationNameMap   | No        | [TBC]
| models            | No        | The Model object definitions (shapes) that the normalizer will build and return (if instructed). Provide the model definitions as an Object. |

### Instance

#### _Instance Properties_

| Name        | Type    | Description |
| ----------- | ------- | ----------- |
| ...         | ...     | [TBC - List all properties from constructor options] |
| Model       | Function | The Model factory that is constructed with the `models` provided at instantiation. If a payload type is handled by the normalizer, and a valid Model definition cannot be determined, the normalizer will simply return the generic normalized shape. |


#### _Instance Functions_

> All functions are synchronous.

| Name             | Parameters | Returns | Description |
| ---------------- | ---------- | ------- | ----------- |
| normalizePayload | `payload` - the payload to normalize. `asModel` - whether or not to return a Model object. | The normalized payload (generic object -or- Model object) | Perform the normalization of a provided Joint payload. |


### Errors

[TBC]


## For Developers

### Dev Lint

The plugin uses [ESLint][link-eslint-site] for source code linting. The linting will run automatically on `git commit`.

``` sh
$ yarn lint
```
> You can run with flag `--fix`, or shortcut command *flint*, to trigger auto fixing (e.g. `yarn flint`).



### Dev Test

The plugin uses [Mocha][link-mocha-site] for the testing framework,
and [Chai][link-chai-site] for its assertions.

``` sh
$ yarn test
```

To build the plugin before running the test, you can use:
``` sh
$ yarn build-test
```


### Dev Build

The plugin is automatically built on `yarn publish`. But, you can manually build the plugin using:

``` sh
$ yarn build
```


## License

[MIT](LICENSE)


[section-introduction]: #introduction
[section-how-to-use]: #how-to-use
[section-api]: #api
[section-for-developers]: #for-developers
[section-license]: #license

[link-eslint-site]: https://eslint.org
[link-mocha-site]: https://mochajs.org
[link-chai-site]: http://chaijs.com
