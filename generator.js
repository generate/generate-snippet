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
  app.onStream(/./, function(file, next) {
    if (app.cache.data.hasOwnProperty(file.stem)) {
      file.data = merge({}, app.cache.data[file.stem], file.data);
    }
    next();
  });

  /**
   * Create the `snippets` collection, then load snippets from
   * `~/snippets` or the user-defined directory in `~/`
   */

  app.task('snippets-load', function(cb) {
    app.fillin('snippets', 'snippets/templates');
    app.create('snippets', {cwd: app.home(app.options.snippets)});
    app.snippets(app.options.file || '*');
    cb();
  });

  /**
   * Load any use-defined data in `~/snippets/data`
   */

  app.task('snippets-data', function(cb) {
    app.fillin('snippets', 'snippets/templates');
    app.data(app.home(app.options.snippets, '../data/*.json'));
    if (app.has('cache.data.data')) {
      var data = app.data('data');
      app.del('cache.data.data');
      app.data(data);
    }
    cb();
  });

  /**
   * Prompts you to choose a snippet from `~/snippets/templates` to generate to
   * the current working directory or specified `--dest`. You can optionally store
   * default data to use for rendering templates in `~/snippets/data`, where the
   * name of each `.json` file matches the name of a snippet. General data can
   * be stored in `~/snippets/data/data.json`.
   *
   * ```sh
   * $ gen snippet
   * ```
   * @name snippet
   * @api public
   */

  app.task('snippet', ['snippets-data', 'snippets-load'], function() {
    app.option('askWhen', 'always');
    return app.toStream('snippets')
      .pipe(choose(app.options))
      .pipe(app.renderFile('*'))
      .pipe(app.conflicts(app.cwd))
      .pipe(app.dest(app.cwd));
  });

  app.task('default', ['snippet']);
};

