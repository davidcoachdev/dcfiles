---
description: Manage dotfiles with dcfiles CLI — add, sync, status, diff
---

Run the dcfiles CLI to manage dotfiles. The tool is at `~/.local/bin/dcfiles` and the repo at `$DCFILES_HOME` (defaults to `~/dcfiles`).

## Subcommands

| Subcommand | What it does |
|-----------|-------------|
| `add <file>` | Copy a file into the managed config, symlink it, stage for commit |
| `sync [--fix]` | Deploy all symlinks, git commit, git push |
| `status` | Show state of all tracked files (ok, missing, broken, overridden) |
| `diff` | Git diff of config + list overridden files |

## Execution

Run `~/.local/bin/dcfiles <subcommand> [args]` via bash. Report the output to the user.
If the user provides no subcommand, run `dcfiles status` by default.

Set `DCFILES_HOME` if the repo is not at `~/dcfiles`: