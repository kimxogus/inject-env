# string-env-parser
> Parse environment variables from string

[![npm version](https://img.shields.io/npm/v/string-env-parser.svg)](https://npmjs.org/package/string-env-parser)
[![npm downloads](https://img.shields.io/npm/dm/string-env-parser.svg)](https://npmjs.org/package/string-env-parser)


[![Build Status](https://travis-ci.org/kimxogus/string-env-parser.svg?branch=master)](https://travis-ci.org/kimxogus/string-env-parser)

## Installation
- npm
```bash
npm install string-env-parser
```

- yarn
```bash
yarn add string-env-parser
```

## Usage
```js
import stringEnvParser from 'string-env-parser'

const bashProfilePath = stringEnvParser('${HOME}/.bash_profile');   // /your/home/.bash_profile

const apiURL = stringEnvParser('${HTTP_PROXY}/api');                // http://proxy.url/api

// Without default value
stringEnvParser('${NODE_ENV}');             // undefined

// With default value
stringEnvParser('${NODE_ENV:development}')  // development

// Does not work without '{' and '}' characters!
stringEnvParser('$NODE_ENV');               // $NODE_ENV
```
