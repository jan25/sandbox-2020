# Simple todo cli app using Cobra

## Install and Features

steps to install this tool

features with command examples

mention about disk/filesystem usage

## Initialize directory structure

explain with commands

explain each field in cobra.Command

## Add subcommands

## Add command flags

local flags

global flags

## Configuration setting

use file system path as example

explain about init and initConfig

---

```
mkdir cobra/todo

cobra init example --pkg-name="github.com/jan25/sandbox-2020/cobra/todo"
go mod init github.com/jan25/sandbox-2020/cobra/todo

```

## Features

```
todo list

todo add "next thing"

todo mark --done=0|1 "next thing"

todo purge --i-know-what-i-want
```

## References

- https://www.linode.com/docs/development/go/using-cobra/
