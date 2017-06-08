var stringEnvParser = require('./index');

describe('string-env-parser', function() {
  it('should extract env variable', function() {
    expect(stringEnvParser('${PWD}')).toBe(process.cwd());
    expect(stringEnvParser('${PWD}/${PWD}')).toBe(process.cwd() + '/' + process.cwd());
    expect(stringEnvParser('${PWD}/file')).toBe(process.cwd() + '/file');
  });

  it('should return default value if env does not exists', function() {
    expect(stringEnvParser('${NOT_EXISTS:default}')).toBe('default');
    expect(stringEnvParser('${NOT_EXISTS:default}/${NO:no}')).toBe('default/no');
    expect(stringEnvParser('${NOT_EXISTS:default}/file')).toBe('default/file');
  });

  it('does not work without \'{\' and \'}\' characters', function() {
    expect(stringEnvParser('$NODE_ENV')).toBe('$NODE_ENV');
    expect(stringEnvParser('$NODE_ENV:default')).toBe('$NODE_ENV:default');
  });
});
