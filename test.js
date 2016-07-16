'use strict';

require('mocha');
var assert = require('assert');
var snippet = require('./');

describe('generate-snippet', function() {
  it('should export a function', function() {
    assert.equal(typeof snippet, 'function');
  });

  it('should export an object', function() {
    assert(snippet);
    assert.equal(typeof snippet, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      snippet();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected a callback function');
      cb();
    }
  });
});
