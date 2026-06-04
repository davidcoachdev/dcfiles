# Delta Spec: init-dcfiles

## Purpose

Specify behavior for dcfiles MVP: bootstrap installer and dotfiles CLI.

## ADDED Requirements — bootstrap

### R-001: One-Command Bootstrap
`install.sh` MUST clone/update the repo to `$DCFILES_HOME` (default `~/dcfiles/`), verify dependencies, deploy symlinks, and symlink CLI. Exit 0 on success, non-zero on failure.

#### Scenario: Fresh install
- GIVEN Linux machine with bash≥4.0 and git
- WHEN `git clone <repo> ~/dcfiles && ~/dcfiles/install.sh`
- THEN repo cloned to `~/dcfiles/`, all dotfiles symlinked to `$HOME`, `dcfiles` CLI available

#### Scenario: Update existing repo
- GIVEN `~/dcfiles/` exists as git repo
- WHEN `~/dcfiles/install.sh` runs
- THEN `git pull` updates repo, symlinks re-deployed

#### Scenario: Missing dependency
- GIVEN git not installed
- WHEN `install.sh` runs
- THEN error listing missing deps, exit 1

### R-002: Symlink Engine with Hostname Overrides
The symlink engine MUST walk `config/`, mirror tree structure to `$HOME`, and create relative symlinks. Files named `<name>.<hostname>` MUST override `<name>` when `$(hostname -s)` matches.

#### Scenario: Standard deploy
- GIVEN `config/bash/.bashrc` exists
- WHEN symlink engine runs
- THEN `~/.bashrc` → symlink to `config/bash/.bashrc`

#### Scenario: Hostname match
- GIVEN `config/bash/.bashrc` AND `config/bash/.bashrc.terminus`
- AND hostname is `terminus`
- WHEN symlink engine runs
- THEN `~/.bashrc` → `config/bash/.bashrc.terminus` (override wins)

#### Scenario: Hostname no-match
- GIVEN `config/bash/.bashrc.terminus` exists AND hostname is `laptop`
- WHEN symlink engine runs
- THEN `config/bash/.bashrc` used, `.bashrc.terminus` ignored

#### Scenario: Symlink already correct
- GIVEN `~/.bashrc` → correct repo target
- WHEN symlink engine runs
- THEN symlink left untouched

## ADDED Requirements — dotfiles-sync

### R-003: CLI Entry Point
`install.sh` MUST symlink `bin/dcfiles` to `~/.local/bin/dcfiles`. CLI MUST respect `$DCFILES_HOME` env var for repo location.

#### Scenario: CLI in PATH
- GIVEN `~/.local/bin/` in `$PATH`
- WHEN `install.sh` completes
- THEN `dcfiles` available, `~/.local/bin/dcfiles` → `~/dcfiles/bin/dcfiles`

#### Scenario: DCFILES_HOME override
- GIVEN `DCFILES_HOME=/opt/dotfiles`
- WHEN `dcfiles sync` runs
- THEN repo at `/opt/dotfiles/` used

### R-004: Add Subcommand
`dcfiles add <file>` MUST copy file into `config/` (preserving `$HOME`-relative path), create symlink, and git-stage both. MUST reject already-tracked and non-existent files.

#### Scenario: Add new dotfile
- GIVEN `~/.config/kitty/kitty.conf` as regular file
- WHEN `dcfiles add ~/.config/kitty/kitty.conf`
- THEN copy to `config/kitty/kitty.conf`, symlink `~/.config/kitty/kitty.conf` → repo, git staged

#### Scenario: Already tracked
- GIVEN `~/.bashrc` already dcfiles-managed symlink
- WHEN `dcfiles add ~/.bashrc`
- THEN message "already tracked", exit 0, no changes

#### Scenario: File not found
- GIVEN `~/.nonexistent` does not exist
- WHEN `dcfiles add ~/.nonexistent`
- THEN error message, exit 2

### R-005: Sync Subcommand
`dcfiles sync` MUST deploy all symlinks using the same engine as bootstrap. `--fix` flag MUST detect and repair broken symlinks.

#### Scenario: Deploy new file
- GIVEN new file added to `config/nvim/init.lua`
- WHEN `dcfiles sync`
- THEN `~/.config/nvim/init.lua` → symlink created

#### Scenario: Fix broken symlinks
- GIVEN `~/.gitconfig` is broken symlink (target missing)
- WHEN `dcfiles sync --fix`
- THEN broken symlink replaced with valid repo link

### R-006: Status Subcommand
`dcfiles status` MUST report each tracked file's state: `ok`, `missing`, `overridden`, or `untracked`. Exit 0 always (informational).

#### Scenario: All synced
- GIVEN all tracked files have correct symlinks
- WHEN `dcfiles status`
- THEN each listed as `ok`, exit 0

#### Scenario: Issues detected
- GIVEN `~/.bashrc` is regular file (overridden), `~/.tmux.conf` missing
- WHEN `dcfiles status`
- THEN `bash/.bashrc: overridden`, `tmux/.tmux.conf: missing`, exit 0

### R-007: Diff Subcommand
`dcfiles diff` MUST show `git diff` between repo and `$HOME` for each tracked file. Untracked regular files SHALL be reported but not diffed.

#### Scenario: Tracked file differs
- GIVEN `config/git/.gitconfig` modified in repo (uncommitted)
- WHEN `dcfiles diff`
- THEN git-style diff shown for `.gitconfig`

#### Scenario: Untracked file
- GIVEN `~/.profile` is regular file not in `config/`
- WHEN `dcfiles diff`
- THEN reported "untracked", no diff computed
