'use strict';

var path = require('path');
var isValid = require('is-valid-app');
var choose = require('gulp-choose-files');
var merge = require('mixin-deep');

module.exports = function(app) {
  // return if generator is already loaded, or "app" is invalid
  if (!isValid(app, 'generate-snippet')) return;

  /**
   * Plugins
   */

  app.use(require('generate-defaults'));
  app.fillin('snippets', 'snippets/templates');

  // app.onStream(/./, function(file, next) {
  //   if (app.cache.data.hasOwnProperty(file.stem)) {
  //     file.data = merge({}, app.cache.data[file.stem], file.data);
  //   }
  //   next();
  // });

  /**
   * Create the `snippets` collection, then load snippets from
   * `~/snippets` or the user-defined directory in `~/`
   */

  app.task('snippets-load', function(cb) {
    app.create('snippets', {cwd: app.home(app.options.snippets)});
    app.snippets(app.options.file || '*');
    cb();
  });

  /**
   * Load any use-defined data in `~/snippets/data`
   */

  app.task('snippets-data', function(cb) {
    app.data(app.home(app.options.snippets, '../data/*.json'));
    cb();
  });

  /**
   * Generate a snippet.
   */

  app.task('snippet', ['snippets-data', 'snippets-load'], function() {
    app.option('askWhen', 'always');
    return app.toStream('snippets')
      .pipe(choose(app.options)).on('error', console.log)
      .pipe(app.renderFile('*')).on('error', console.log)
      .pipe(app.conflicts(app.cwd)).on('error', console.log)
      .pipe(app.dest(app.cwd)).on('error', console.log)
  });

  app.task('default', ['snippet']);
};

