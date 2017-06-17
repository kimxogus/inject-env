var injectEnv = require('inject-env');

describe('inject-env', function() {
  it('should extract env variable', function() {
    expect(injectEnv('${PWD}')).toBe(process.cwd());
    expect(injectEnv('${PWD}/${PWD}')).toBe(process.cwd() + '/' + process.cwd());
    expect(injectEnv('${PWD}/file')).toBe(process.cwd() + '/file');
  });

  it('should return default value if env does not exists', function() {
    expect(injectEnv('${NOT_EXISTS:default}')).toBe('default');
    expect(injectEnv('${NOT_EXISTS:default}/${NO:no}')).toBe('default/no');
    expect(injectEnv('${NOT_EXISTS:default}/file')).toBe('default/file');
  });

  it('does not work without \'{\' and \'}\' characters', function() {
    expect(injectEnv('$NODE_ENV')).toBe('$NODE_ENV');
    expect(injectEnv('$NODE_ENV:default')).toBe('$NODE_ENV:default');
  });
});
