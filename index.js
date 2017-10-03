var regexp = /\$\{(.*?)\}/;

function getEnvVar(name, defaultValue) {
  return process.env[name] ? process.env[name] : defaultValue;
}

exports.getEnvVar = getEnvVar;

function injectEnv(input) {
  if(typeof input === 'string') {
    while (regexp.test(input)) {
      var r = RegExp.$1;
      var split = r.split(':');
      input = input.replace('${' + r + '}', getEnvVar(split[0], split[1] || ''));
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
