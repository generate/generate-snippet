Use `{%= name %}` as a [plugin][docs]{plugins.md} in your own [generator][docs]{generators.md}.

### Install locally
{%= include("install-npm", {save: true}) %}


### Use as a plugin
When used as a plugin, tasks from `{%= name %}` are added to your generator's instance.

```js
module.exports = function(app) {
  app.use(require('{%= name %}'));
  // do generator stuff
};
```

**Running tasks**

You can now run any tasks from `{%= name %}` as if they were part of your own generator.

```js
module.exports = function(app) {
  app.use(require('{%= name %}'));

  app.task('foo', function(cb) {
    // do task stuff
    cb();
  });

  // run the `mit` task from `{%= name %}`
  app.task('default', ['foo', 'mit']);
};
```

### Register as a generator
When registered as a generator, tasks from `{%= name %}` are added to the "namespace" you give to the generator.

```js
module.exports = function(app) {
  app.register('foo', require('{%= name %}'));
  // generate
};
```

**Running tasks**

Pass the names of one or more tasks to run to the `.generate` method, prefixed with the namespace of the sub-generator (`foo`, in our example):

**Examples**

Run the [mit](#mit) task from `{%= name %}`:

```js
module.exports = function(app) {
  app.register('foo', require('{%= name %}'));

  app.generate('foo:mit', function(err) {
    if (err) console.log(err);
  });
};
```

Wrap the call to `.generate` in a task, so it can be called on demand:

```js
module.exports = function(app) {
  app.register('foo', require('{%= name %}'));

  app.task('mit-license', function(cb) {
    app.generate('foo:mit', cb);
  });
};
```

**More information**

Visit the [generator docs][docs]{generators.md} to learn more about creating, installing, using and publishing generators.


[docs]: {%= platform.docs %}/
