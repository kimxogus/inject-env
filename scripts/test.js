process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var assert = require('assert');
var injectEnv = require('../index');

// string test

// should extract env variable
assert.equal(injectEnv('${PWD}'), process.cwd(), 'should extract env variable');
assert.equal(injectEnv('${PWD}/${PWD}'), process.cwd() + '/' + process.cwd(), 'should extract env variable');
assert.equal(injectEnv('${PWD}/file'), process.cwd() + '/file', 'should extract env variable');

// should return default value if env does not exist
assert.equal(injectEnv('${NOT_EXISTS:-default}'), 'default', 'should return default value if env does not exist');
assert.equal(injectEnv('${NOT_EXISTS-default}', { env: Object.assign({NOT_EXISTS: null}, process.env) }), '', 'should return default value if env does not exist');
assert.equal(injectEnv('${NOT_EXISTS}', {defaultValue: ''}), '', 'should return default value if env does not exist');
assert.equal(injectEnv('${NOT_EXISTS:-default}/${NO:-no}'), 'default/no', 'should return default value if env does not exist');
assert.equal(injectEnv('${NOT_EXISTS:-default}/file'), 'default/file', 'should return default value if env does not exist');

// should return substitute value if env exists
assert.equal(injectEnv('${HOME:+substitute}'), 'substitute', 'should return substitute value if env does exist');
assert.equal(injectEnv('${HOME:+substitute}/${NOT_EXISTS:+no}'), 'substitute/', 'should return default value if env does exist');
assert.equal(injectEnv('${NOT_EXISTS+substitute}', { env: Object.assign({NOT_EXISTS: null}, process.env) }), 'substitute', 'should return substitute value if env is defined');

// does not work without '{' and '}' characters
assert.equal(injectEnv('$NODE_ENV'), '$NODE_ENV', 'does not work without \'{\' and \'}\' characters');
assert.equal(injectEnv('$NODE_ENV:-default'), '$NODE_ENV:-default', 'does not work without \'{\' and \'}\' characters');

// array test

// should extract env variable
assert.equal(injectEnv(['${PWD}'])[0], process.cwd(), 'should extract env variable');
assert.equal(injectEnv(['${PWD}/${PWD}'])[0], process.cwd() + '/' + process.cwd(), 'should extract env variable');
assert.equal(injectEnv(['${PWD}/file'])[0], process.cwd() + '/file', 'should extract env variable');

// should return default value if env does not exist
assert.equal(injectEnv(['${NOT_EXISTS:-default}'])[0], 'default', 'should return default value if env does not exist');
assert.equal(injectEnv(['${NOT_EXISTS:-default}/${NO:-no}'])[0], 'default/no', 'should return default value if env does not exist');
assert.equal(injectEnv(['${NOT_EXISTS:-default}/file'])[0], 'default/file', 'should return default value if env does not exist');

// does not work without '{' and '}' characters
assert.equal(injectEnv(['$NODE_ENV'])[0], '$NODE_ENV', 'does not work without \'{\' and \'}\' characters');
assert.equal(injectEnv(['$NODE_ENV:-default'])[0], '$NODE_ENV:-default', 'does not work without \'{\' and \'}\' characters');

// object test

// should extract env variable
assert.equal(injectEnv({0: '${PWD}'})[0], process.cwd(), 'should extract env variable');
assert.equal(injectEnv({0: '${PWD}/${PWD}'})[0], process.cwd() + '/' + process.cwd(), 'should extract env variable');
assert.equal(injectEnv({0: '${PWD}/file'})[0], process.cwd() + '/file', 'should extract env variable');

// should return default value if env does not exist
assert.equal(injectEnv({0: '${NOT_EXISTS:-default}'})[0], 'default', 'should return default value if env does not exist');
assert.equal(injectEnv({0: '${NOT_EXISTS:-default}/${NO:-no}'})[0], 'default/no', 'should return default value if env does not exist');
assert.equal(injectEnv({0: '${NOT_EXISTS:-default}/file'})[0], 'default/file', 'should return default value if env does not exist');

// does not work without '{' and '}' characters
assert.equal(injectEnv({0: '$NODE_ENV'})[0], '$NODE_ENV', 'does not work without \'{\' and \'}\' characters');
assert.equal(injectEnv({0: '$NODE_ENV:-default'})[0], '$NODE_ENV:-default', 'does not work without \'{\' and \'}\' characters');
