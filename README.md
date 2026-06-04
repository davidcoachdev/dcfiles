# dcfiles — zero-dependency dotfiles manager

**dcfiles** is a minimal, zero-dependency dotfiles manager written in pure Bash.
Clone it, run `install.sh`, and your dotfiles are deployed — no Stow, no Python,
no npm.

## Quick Start

```bash
# Clone the repo and bootstrap
git clone <repo-url> ~/dcfiles
~/dcfiles/install.sh
```

This clones the repo (if needed), deploys all dotfiles as relative symlinks,
and makes the `dcfiles` CLI available at `~/.local/bin/dcfiles`.

Add `~/.local/bin` to your `$PATH` if it isn't already:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

## Requirements

| Tool     | Minimum version | Notes                          |
|----------|----------------|--------------------------------|
| bash     | ≥ 4.0          | Required for `set -euo pipefail` and `find -print0` |
| git      | any            | Needed for clone and CLI auto-commit |
| coreutils| any            | Commands: `ln`, `cp`, `readlink` |

All are pre-installed on every modern Linux distribution and macOS (via Xcode
CLI tools or Homebrew).

## Directory Structure

```
~/.local/bin/dcfiles      →  ~/dcfiles/bin/dcfiles      CLI entry point
~/dcfiles/
├── install.sh            Bootstrap script
├── bin/dcfiles           CLI dispatcher (add, sync, status, diff)
├── lib/
│   ├── utils.sh          Shared helpers (logging, path resolution)
│   └── symlink.sh        Symlink engine (deploy_all, deploy_single)
├── config/               Your dotfiles, organised by application
│   ├── bash/.bashrc
│   ├── git/.gitconfig
│   └── tmux/.tmux.conf
└── README.md             This file
```

## CLI Reference

### `dcfiles add <file>`

Copy a dotfile into the managed config directory, create a symlink back to
its original location, and stage the new file for commit.

```bash
dcfiles add ~/.config/kitty/kitty.conf
```

### `dcfiles sync [--fix]`

Deploy all dotfiles from `config/` to `$HOME`. Run automatically by
`install.sh`. Use `--fix` to remove broken symlinks before re-deploying.

```bash
dcfiles sync --fix
```

### `dcfiles status`

Show the state of each tracked file. States: `ok` (correct symlink),
`missing` (no file at target), `overridden` (regular file replaced the
symlink), `broken` (symlink target does not exist).

```bash
dcfiles status
```

### `dcfiles diff`

Show the git diff between the config directory and the deployed state.
Reports overridden files that are not symlinked.

```bash
dcfiles diff
```

## Hostname Override Convention

Place a file named `<name>.<hostname>` next to `<name>` in `config/` and
it will be deployed instead of the base file when the machine's hostname
matches:

```bash
config/bash/.bashrc              # base — deployed on every machine
config/bash/.bashrc.terminus     # deployed only when hostname is "terminus"
```

## Future

A Rust rewrite is planned. The symlink engine boundary is already isolated
(`lib/symlink.sh` — `deploy_all`, `deploy_single`) to make the migration
straightforward.

## License

MIT
