'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var generate = require('generate');
var npm = require('npm-install-global');
var gm = require('global-modules');
var del = require('delete');
var pkg = require('../package');
var generator = require('..');
var app;

var fixtures = path.resolve.bind(path, __dirname, 'fixtures');
var actual = path.resolve.bind(path, __dirname, 'actual');

function exists(name, re, cb) {
  if (typeof re === 'function') {
    cb = re;
    re = new RegExp(pkg.name);
  }

  return function(err) {
    if (err) return cb(err);
    var filepath = actual(name);
    fs.stat(filepath, function(err, stat) {
      if (err) return cb(err);
      assert(stat);
      var str = fs.readFileSync(filepath, 'utf8');
      assert(re.test(str));
      del(actual(), cb);
    });
  };
}

function symlink(dir, cb) {
  var src = path.resolve(dir);
  var name = path.basename(src);
  var dest = path.resolve(gm, name);
  fs.stat(dest, function(err, stat) {
    if (err) {
      fs.symlink(src, dest, cb);
    } else {
      cb();
    }
  });
}

describe('generate-snippet', function() {
  this.slow(150);

  if (!process.env.CI && !process.env.TRAVIS) {
    before(function(cb) {
      npm.maybeInstall('generate', cb);
    });
  }

  before(function(cb) {
    del(actual(), cb);
  });

  beforeEach(function() {
    app = generate({silent: true});
    app.option('snippets', '');
    app.option('choices', ['example.txt']);
    app.option('homedir', fixtures());
    app.option('dest', actual());
    app.cwd = actual();
  });

  afterEach(function(cb) {
    del(actual(), cb);
  });

  describe('tasks', function() {
    beforeEach(function() {
      app.use(generator);
    });

    it('should run the `default` task with .build', function(cb) {
      app.build('default', exists('example.txt', cb));
    });

    it('should run the `default` task with .generate', function(cb) {
      app.generate('default', exists('example.txt', cb));
    });
  });

  if (!process.env.CI && !process.env.TRAVIS) {
    describe('generator (CLI)', function() {
      before(function(cb) {
        symlink(__dirname, cb);
      });

      beforeEach(function() {
        app.use(generator);
      });

      it('should run the default task using the `generate-snippet` name', function(cb) {
        app.generate('generate-snippet', exists('example.txt', cb));
      });

      it('should run the default task using the `generator` generator alias', function(cb) {
        app.generate('snippet', exists('example.txt', cb));
      });
    });
  }

  describe('generator (API)', function() {
    it('should run the default task on the generator', function(cb) {
      app.register('foo', generator);
      app.generate('foo', exists('example.txt', cb));
    });

    it('should run the `snippet` task', function(cb) {
      app.register('snippet', generator);
      app.generate('snippet:default', exists('example.txt', cb));
    });

    it('should run the `default` task when defined explicitly', function(cb) {
      app.register('snippet', generator);
      app.generate('snippet:default', exists('example.txt', cb));
    });
  });

  describe('sub-generator', function() {
    it('should work as a sub-generator', function(cb) {
      app.register('foo', function(foo) {
        foo.register('snippet', generator);
      });
      app.generate('foo.snippet', exists('example.txt', cb));
    });

    it('should run the `default` task by default', function(cb) {
      app.register('foo', function(foo) {
        foo.register('snippet', generator);
      });
      app.generate('foo.snippet', exists('example.txt', cb));
    });

    it('should run the `snippet:default` task when defined explicitly', function(cb) {
      app.register('foo', function(foo) {
        foo.register('snippet', generator);
      });
      app.generate('foo.snippet:default', exists('example.txt', cb));
    });

    it('should run the `snippet:default` task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('snippet', generator);
      });
      app.generate('foo.snippet:default', exists('example.txt', cb));
    });

    it('should work with nested sub-generators', function(cb) {
      app
        .register('foo', generator)
        .register('bar', generator)
        .register('baz', generator)
      app.generate('foo.bar.baz', exists('example.txt', cb));
    });
  });
});
