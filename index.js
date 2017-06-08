const regexp = /\$\{(.*?)\}/;

exports.getEnvVar = function getEnvVar(name, defaultValue) {
  return process.env[name] ? process.env[name] : defaultValue;
}

module.exports = function(s) {
  while (regexp.test(s)) {
    const r = RegExp.$1;
    const split = r.split(':');
    s = s.replace('${' + r + '}', getEnvVar(split[0], split[1] || ''));
  }
  return s;
};
