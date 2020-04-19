# Simple todo cli app using Cobra

A simple app to keep track of your todos via cli implemented using Cobra cli fw. I mainly created this while learning Cobra and understanding the fw.

## Install and Features

```
go install -u github.com/jan25/sandbox-2020/cobra/todo

todo -h
todo add "Next awesome thing todo"
todo list
todo mark "Something cool" --done
```

This app stores data on disk in a json file at `$HOME/todo/todo.json`.

## Notes on Cobra

`cobra add name` can generate skeleton code for a `name` command. Code has a few pieces to help with Usage text and execution flows.

`init` method is called for all `*Cmd`'s until `rootCmd` is reached before actually `*Cmd.Run` func is called for a command. `init` can be used to initialize flags(both Local and Persistant(global) flags).

`initConfig` funcs can be appeneded in `init` function. `initConfig` is called just before `Run` is called for a command.

`RunE` version can be used for func returning `error`.

`cobra` can only create command files under `/cmd` by default. So if there is subcommand named same as one of main commands, the file names can be conflicting. Only way to fix that is manually renaming commands or moving files.

Additionally, `viper` can be used for more advanced configuration, flags etc. This app doesn't use it.

## References

- https://github.com/spf13/cobra/#table-of-contents
- https://www.linode.com/docs/development/go/using-cobra/
