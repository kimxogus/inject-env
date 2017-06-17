# inject-env
> Parse environment variables from string

[![npm version](https://img.shields.io/npm/v/inject-env.svg)](https://npmjs.org/package/inject-env)
[![npm downloads](https://img.shields.io/npm/dm/inject-env.svg)](https://npmjs.org/package/inject-env)


[![Build Status](https://travis-ci.org/kimxogus/inject-env.svg?branch=master)](https://travis-ci.org/kimxogus/inject-env)

## Installation
- npm
```bash
npm install inject-env
```

- yarn
```bash
yarn add inject-env
```

## Usage
```js
import injectEnv from 'inject-env'

const bashProfilePath = injectEnv('${HOME}/.bash_profile');   // /your/home/.bash_profile

const apiURL = injectEnv('${HTTP_PROXY}/api');                // http://proxy.url/api

// Without default value
injectEnv('${NODE_ENV}');             // undefined

// With default value
injectEnv('${NODE_ENV:development}')  // development

// Does not work without '{' and '}' characters!
injectEnv('$NODE_ENV');               // $NODE_ENV
```
