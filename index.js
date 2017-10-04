var isPlainObject = require('lodash.isplainobject');
var has = require('lodash.has');

Object.assign = Object.assign || require('object-assign');

var varNameRegexp = /^[a-zA-Z0-9_]*$/;
var regexp = /\$\{(.*?)\}/;

function wrapR(r) {
  return '${' + r +'}'
}

var delimiterMap = {
  ':-': function (i, r, s, o) {
    var replacement = o.env[s[0]] == null ? s[1] : (o.env[s[0]] || o.defaultValue);
    var wrappedR = wrapR(r);
    if(o.verbose) {
      console.log(wrappedR, '->', replacement);
    }
    return i.replace(wrappedR, replacement);
  },
  '-': function (i, r, s, o) {
    var replacement = (has(o.env, s[0]) ? o.env[s[0]] : s[1]) || o.defaultValue;
    var wrappedR = wrapR(r);
    if(o.verbose) {
      console.log(wrappedR, '->', replacement);
    }
    return i.replace(wrappedR, replacement);
  },
  ':+': function (i, r, s, o) {
    var replacement = o.env[s[0]] ? s[1] : (o.env[s[0]] || o.defaultValue);
    var wrappedR = wrapR(r);
    if(o.verbose) {
      console.log(wrappedR, '->', replacement);
    }
    return i.replace(wrappedR, replacement);
  },
  '+': function (i, r, s, o) {
    var replacement = has(o.env, s[0]) ? s[1] : (o.env[s[0]] || o.defaultValue);
    var wrappedR = wrapR(r);
    if(o.verbose) {
      console.log(wrappedR, '->', replacement);
    }
    return i.replace(wrappedR, replacement);
  },
};

var delimiters = Object.keys(delimiterMap);

function injectEnv(input, option) {
  if(typeof input === 'string') {
    option = option || {};
    option.env = option.env || process.env;
    option.defaultValue = has(option, 'defaultValue') ? option.defaultValue : '';
    option.verbose = !!option.verbose;
    while (regexp.test(input)) {
      var r = RegExp.$1;

      var supportedDelimiter = delimiters.some(function (d) {
        return r.indexOf(d) !== -1;
      });
      if(!supportedDelimiter) {
        if(!varNameRegexp.test(r)) {
          throw new Error(
            'Unsupported parameter in "${' + r + '}". \n - Supported delimiters: '
              + delimiters.join(', ')
          );
        } else {
          var replacement = option.env[r] || option.defaultValue;
          var wrappedR = wrapR(r);
          if(option.verbose) {
            console.log(wrappedR, '->', replacement);
          }
          input = input.replace(wrappedR, replacement);
        }
      } else {
        delimiters
          .filter(function (d) {
            return r.indexOf(d) !== -1;
          })
          .forEach(function (d) {
            input = delimiterMap[d](input, r, r.split(d), option);
          });
      }
    }
    return input;
  } else if(Array.isArray(input)) {
    return input.map(function (i) { return injectEnv(i, option); });
  } else if(isPlainObject(input)) {
    return Object.keys(input).reduce(function (a, b) {
      a[b] = injectEnv(input[b], option);
      return a;
    }, {});
  }

  return input;
}

module.exports = injectEnv;
