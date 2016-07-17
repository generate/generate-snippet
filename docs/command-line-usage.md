### Install
{%= include(platform.name + "/" + platform.configname + "-install") %}

### Run
You should now be able to run `{%= name %}` with the following command:

```sh
$ {%= platform.command %} {%= alias %}
```

**What will happen?**

Running `$ gen {%= alias %}` will run the generator's [default task](#default), which will:

1. prompt you to choose a license to generate
1. prompt you for any information that's missing, if applicable (like author name, etc.)
1. render the necessary template(s) using your answers
1. write [the resulting files](#available-tasks) to the current working directory

**What you should see in the terminal**

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

### Help
To see a general help menu and available commands for {%= platform.proper %}'s CLI, run:

```sh
$ {%= platform.command %} help
```

### Running tasks
Tasks on `{%= name %}` are run by passing the name of the task to run after the {%= platform.configname %} name, delimited by a comma:

```sh
$ {%= platform.command %} {%= alias %}:foo
       ^       ^
{%= platform.configname %}     task
```

**Example**

The following will run {%= platform.configname %} `foo`, task `bar`:

```sh
$ {%= platform.command %} foo:bar
```

**Default task**

When a task name is not explicitly passed on the command line, {%= platform.proper %}'s CLI will run the [default](#default) task.

### Tasks
The following tasks are registered on `{%= name %}`.

{%= apidocs("generator.js") %}

Learn [more about tasks]({%= platform.docs %}/tasks.md).

### CLI Options

- `--dest`, `-d`: the destination directory to use for generated files
- `--snippets`: the source directory for snippets, relative to user home on your system (`~/`)
- `--file`: filename or glob pattern to use for loading snippets (glob patterns may need to be wrapped in quotes depending on your shell)

[docs]: {%= platform.docs %}/
