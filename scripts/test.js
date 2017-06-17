process.env.NODE_ENV = process.env.NODE_ENV || 'test';

if(process.versions.node >= '4') {
  var jest = require('jest');

  jest.run();
} else {
  var assert = require('assert');
  var injectEnv = require('../index');

  // should extract env variable
  assert.equal(injectEnv('${PWD}'), process.cwd(), 'should extract env variable');
  assert.equal(injectEnv('${PWD}/${PWD}'), process.cwd() + '/' + process.cwd(), 'should extract env variable');
  assert.equal(injectEnv('${PWD}/file'), process.cwd() + '/file', 'should extract env variable');

  // should return default value if env does not exists
  assert.equal(injectEnv('${NOT_EXISTS:default}'), 'default', 'should return default value if env does not exists');
  assert.equal(injectEnv('${NOT_EXISTS:default}/${NO:no}'), 'default/no', 'should return default value if env does not exists');
  assert.equal(injectEnv('${NOT_EXISTS:default}/file'), 'default/file', 'should return default value if env does not exists');

  // does not work without '{' and '}' characters
  assert.equal(injectEnv('$NODE_ENV'), '$NODE_ENV', 'does not work without \'{\' and \'}\' characters');
  assert.equal(injectEnv('$NODE_ENV:default'), '$NODE_ENV:default', 'does not work without \'{\' and \'}\' characters');
}
