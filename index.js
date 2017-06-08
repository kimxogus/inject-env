var regexp = /\$\{(.*?)\}/;

exports.getEnvVar = function getEnvVar(name, defaultValue) {
  return process.env[name] ? process.env[name] : defaultValue;
}

module.exports = function(s) {
  while (regexp.test(s)) {
    var r = RegExp.$1;
    var split = r.split(':');
    s = s.replace('${' + r + '}', getEnvVar(split[0], split[1] || ''));
  }
  return s;
};
