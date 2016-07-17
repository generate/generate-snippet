### Destination directory
To customize the destination directory, install [generate-dest][] globally, then in the command line prefix `dest` before any other {%= platform.configname %} names.

For example, the following will prompt you for the destination path to use, then pass the result to `{%= name %}`:

```sh
$ {%= platform.command %} dest {%= alias %}
```

### Overriding templates
You can override a template by adding a template of the same name to the `templates` directory in user home.

For example, to override the `foo.tmpl` template, add a template at the following path `~/generate/templates/foo.tmpl`, where `~/` is the user-home directory that `os.homedir()` resolves to on your system.


[docs]: {%= platform.docs %}/
