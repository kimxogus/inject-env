var has = require('lodash.has');
var isPlainObject = require('lodash.isplainobject');

var regexp = /\$\{(.*?)\}/;

function getEnvVar(name, defaultValue, env) {
  env = env || process.env;
  return has(env, name) ? env[name] : defaultValue;
}

exports.getEnvVar = getEnvVar;

function injectEnv(input, option) {
  if(typeof input === 'string') {
    option = option || {};
    while (regexp.test(input)) {
      var r = RegExp.$1;
      var split = r.split(':');
      input = input.replace(
        '${' + r + '}',
         getEnvVar(split[0], split[1] || option.defaultValue || '', option.env)
      );
    }
    return input;
  } else if(Array.isArray(input)) {
    return input.map(i => injectEnv(i, option));
  } else if(isPlainObject(input)) {
    return Object.keys(input).reduce((a, b) => {
      a[b] = injectEnv(input[b], option);
      return a;
    }, {});
  }

  return input;
}

module.exports = injectEnv;
