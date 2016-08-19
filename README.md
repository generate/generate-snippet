<p align="center">

<a href="https://github.com/generate/generate">
<img height="150" width="150" src="https://raw.githubusercontent.com/generate/generate/master/docs/logo.png">
</a>
</p>

Generate a file or code snippet from any user-defined template.

# generate-snippet

[![NPM version](https://img.shields.io/npm/v/generate-snippet.svg?style=flat)](https://www.npmjs.com/package/generate-snippet) [![NPM downloads](https://img.shields.io/npm/dm/generate-snippet.svg?style=flat)](https://npmjs.org/package/generate-snippet) [![Build Status](https://img.shields.io/travis/generate/generate-snippet.svg?style=flat)](https://travis-ci.org/generate/generate-snippet)

![generate-snippet demo](https://raw.githubusercontent.com/generate/generate-snippet/master/docs/demo.gif)

## Quickstart

**Install**

Install [generate](https://github.com/generate/generate) and `generate-snippet`:

```sh
$ npm install --global generate generate-snippet
```

**Generate a snippet**

Initiate a prompt to generate any arbitrary snippet from the `~/templates` directory (in user home on your system):

```sh
$ gen snippet
```

## Data

Any `.json` files in `~/templates/data` will be automatically loaded onto the context.

### Data conventions

The basename of each `.json` file will be used as the root property for the object contained in the JSON file. For example, if `button.json` has the following contents:

```json
{
  "text": "Click me!"
}
```

It will be loaded onto the context as:

```js
{
  button: {
    text: 'Click me!'
  }
}
```

### data.json

If `data.json` is used, its contents will be loaded onto the "root" of the context. For example:

```json
{
  "text": "Click me!"
}
```

Will be loaded onto the context as:

```js
{
  text: 'Click me!'
}
```

## What is "Generate"?

Generate is a command line tool and developer framework for scaffolding out new GitHub projects using [generators](https://github.com/generate/generate/blob/master/docs/generators.md) and [tasks](https://github.com/generate/generate/blob/master/docs/tasks.md).

Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for [gulp](http://gulpjs.com), [base](https://github.com/node-base/base) and [assemble](https://github.com/assemble/assemble) plugins, and much more.

**For more information**:

* Visit the [generate project](https://github.com/generate/generate/)
* Visit the [generate documentation](https://github.com/generate/generate/blob/master/docs/)
* Find [generators on npm](https://www.npmjs.com/browse/keyword/generate-generator) (help us [author generators](https://github.com/generate/generate/blob/master/docs/micro-generators.md))

## Getting started

### Install

**Installing the CLI**

To run the `snippet` generator from the command line, you'll need to install [Generate](https://github.com/generate/generate) globally first. You can do that now with the following command:

```sh
$ npm install --global generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Install generate-snippet**

Install this module with the following command:

```sh
$ npm install --global generate-snippet
```

### Usage

Run this generator's `default` [task](https://github.com/generate/generate/blob/master/docs/tasks.md#default) with the following command:

```sh
$ gen snippet
```

**What you should see in the terminal**

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

### Help

To see a general help menu and available commands for Generate's CLI, run:

```sh
$ gen help
```

## Tasks

All available tasks.

### [snippet](generator.js#L66)

Prompts you to choose a snippet from `~/snippets/templates` to generate to the current working directory or specified `--dest`. You can optionally store default data to use for rendering templates in `~/snippets/data`, where the name of each `.json` file matches the name of a snippet. General data can be stored in `~/snippets/data/data.json`.

**Example**

```sh
$ gen snippet
```

Visit Generate's [documentation for tasks](https://github.com/generate/generate/blob/master/docs/tasks.md).

## Next steps

### Running unit tests

It's never too early to begin running unit tests. When you're ready to get started, the following command will ensure the project's dependencies are installed then run all of the unit tests:

```sh
$ npm install && test
```

### Publishing your generator

If you're tests are passing and you're ready to publish your generator to [npm](https://www.npmjs.com), you can do that now with the following command:

**Are you sure you're ready?!**

Let's go!

```sh
$ npm publish
```

## About

### Related projects

* [generate-gitignore](https://www.npmjs.com/package/generate-gitignore): Generate a .gitignore file from the command line when Generate's CLI is installed globally, or… [more](https://github.com/generate/generate-gitignore) | [homepage](https://github.com/generate/generate-gitignore "Generate a .gitignore file from the command line when Generate's CLI is installed globally, or use as a plugin or sub-generator in your own generator to make it a continuous part of the build workflow when scaffolding out a new project.")
* [generate-license](https://www.npmjs.com/package/generate-license): Generate a license file for a GitHub project. | [homepage](https://github.com/generate/generate-license "Generate a license file for a GitHub project.")
* [generate-project](https://www.npmjs.com/package/generate-project): Scaffold out complete code projects from the command line, or use this generator as a… [more](https://github.com/generate/generate-project) | [homepage](https://github.com/generate/generate-project "Scaffold out complete code projects from the command line, or use this generator as a plugin in other generators to provide baseline functionality.")

### Community

Are you using [Generate](https://github.com/generate/generate) in your project? Have you published a [generator](https://github.com/generate/generate/blob/master/docs/generators.md) and want to share your project with the world?

Here are some suggestions!

* If you get like Generate and want to tweet about it, please feel free to mention `@generatejs` or use the `#generatejs` hashtag
* Show your love by starring [Generate](https://github.com/generate/generate) and `generate-snippet`
* Get implementation help on [StackOverflow](http://stackoverflow.com/questions/tagged/generate) (please use the `generatejs` tag in questions)
* **Gitter** Discuss Generate with us on [Gitter](https://gitter.im/generate/generate)
* If you publish an generator, thank you! To make your project as discoverable as possible, please add the keyword `generategenerator` to package.json.

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/generate/generate-snippet/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.30, on August 19, 2016._