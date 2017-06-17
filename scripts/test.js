process.env.NODE_ENV = process.env.NODE_ENV || 'test';

if(process.versions.node >= '4') {
  var jest = require('jest');

  jest.run();
} else {
  var assert = require('assert');
  var injectEnv = require('inject-env');

  // should extract env variable
  assert.equal(injectEnv('${PWD}'), process.cwd());
  assert.equal(injectEnv('${PWD}/${PWD}'), process.cwd() + '/' + process.cwd());
  assert.equal(injectEnv('${PWD}/file'), process.cwd() + '/file');

  // should return default value if env does not exists
  assert.equal(injectEnv('${NOT_EXISTS:default}'), 'default');
  assert.equal(injectEnv('${NOT_EXISTS:default}/${NO:no}'), 'default/no');
  assert.equal(injectEnv('${NOT_EXISTS:default}/file'), 'default/file');

  // 'does not work without '{' and '}' characters
  assert.equal(injectEnv('$NODE_ENV'), '$NODE_ENV');
  assert.equal(injectEnv('$NODE_ENV:default'), '$NODE_ENV:default');
}
