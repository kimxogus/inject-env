var has = require('lodash.has');

var regexp = /\$\{(.*?)\}/;

function getEnvVar(name, defaultValue, env) {
  env = env || process.env;
  return has(env, name) ? env[name] : defaultValue;
}

exports.getEnvVar = getEnvVar;

function injectEnv(input, env) {
  if(typeof input === 'string') {
    while (regexp.test(input)) {
      var r = RegExp.$1;
      var split = r.split(':');
      input = input.replace('${' + r + '}', getEnvVar(split[0], split[1], env));
    }
    return input;
  } else if(Array.isArray(input)) {
    return input.map(i => injectEnv(i));
  } else {
    return Object.keys(input).reduce((a, b) => {
      a[b] = injectEnv(input[b]);
      return a;
    }, {});
  }
}

module.exports = injectEnv;
