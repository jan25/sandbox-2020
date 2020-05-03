### Some handy commands

```
nsloop github.com

find ./dir

find ./dir | xargs grep ".json$"

wc
wc -l
wc -w

strace cmd
strace -e syscall cmd
strace -c cmd
strace -f cmd
strace -p pid

top -u user
htop -u user

ps -A|e
ps -u user
ps -p pid
```

### Shortcuts

Some of commands work in Vim too, which are useful.

- `ctrl+R` recursive search history. Repeat to go back in history with a search.
- `ctrl+E` goto end of line
- `ctrl+W` delete to start of word
- `ctrl+A` goto start of line
- `ctrl+D` delete char under cursor
