---
name: dcfiles
description: "Trigger: dcfiles, dotfiles, dcfile, respaldar config, backup dotfiles, sincronizar config, backup Engram. Manage dotfiles and portable Engram memory backups with the dcfiles CLI."
license: MIT
metadata:
  author: davidcoachdev
  version: "1.1"
---

## Activation Contract

Use this skill when the user wants to:
- Add a new dotfile to version control (`dcfiles add`)
- Sync deployed dotfiles with the repo (`dcfiles sync`)
- Check dotfile state (`dcfiles status`)
- Diff dotfiles against config (`dcfiles diff`)
- Bootstrap dotfiles on a new machine (`install.sh`)
- Back up or restore Engram memory as part of the dcfiles lifecycle

## Canonical Paths

- `DCFILES_HOME` is the canonical dcfiles repository. Set it explicitly when
  more than one clone exists; never mix clones in one operation.
- In this environment the active OpenCode-linked clone is
  `~/Proyects/dcfiles`; the standalone CLI clone may be `~/dcfiles`.
- Engram's live SQLite data is `~/.engram/engram.db`, with transient
  `engram.db-wal` and `engram.db-shm` files.
- The portable Engram backup belongs at
  `$DCFILES_HOME/engram/engram-export.json`.

## Hard Rules

- Always set `DCFILES_HOME` explicitly before running dcfiles commands.
- The dcfiles CLI may be installed at `~/.local/bin/dcfiles`, but if that
  launcher is broken, call `$DCFILES_HOME/bin/dcfiles` directly. Do not guess
  a second repository.
- `dcfiles sync` auto-commits **and pushes**. Warn about the remote mutation
  and inspect `git status`/`git diff` before running it.
- Never commit secrets. API keys, tokens, credentials, SSH keys, and private
  auth files must be redacted or excluded from the repository.
- Engram export is memory content, not a secret store. Review it for private
  project data before pushing it to a remote repository.
- Never add `~/.engram/` with `dcfiles add`: this would capture a live binary
  database and may create an unsafe symlink. Export Engram to JSON instead.
- Never commit `engram.db`, `engram.db-wal`, or `engram.db-shm`.
- After `dcfiles add`, the original file becomes a symlink.
- Hostname overrides: `<name>.<hostname>` is deployed when the hostname
  matches; base `<name>` is deployed otherwise.

## Engram Backup Contract

Engram backup is a mandatory preflight for both `add` and `sync`.

### Export command

```bash
export DCFILES_HOME="${DCFILES_HOME:-$HOME/dcfiles}"
mkdir -p "$DCFILES_HOME/engram"
"$HOME/.local/bin/engram" export "$DCFILES_HOME/engram/engram-export.json"
```

If `~/.local/bin/engram` is unavailable, use `command -v engram` and report
the resolved path. The export must finish successfully before staging or
syncing dcfiles. If it fails, stop: do not commit or push a stale backup.

### Before `dcfiles add`

1. Confirm the target dcfiles repository and check its existing worktree.
2. Run the Engram export above.
3. Review the generated JSON for secrets or private data.
4. Run `dcfiles add <file>` for the requested dotfile only; do not add the
   live Engram directory.
5. Review the staged diff, including the Engram export, before syncing.

Example:

```bash
export DCFILES_HOME="$HOME/Proyects/dcfiles"
"$HOME/.local/bin/engram" export "$DCFILES_HOME/engram/engram-export.json"
DCFILES_HOME="$DCFILES_HOME" "$DCFILES_HOME/bin/dcfiles" add ~/.config/kitty/kitty.conf
git -C "$DCFILES_HOME" status --short
git -C "$DCFILES_HOME" diff --cached --stat
```

### Before `dcfiles sync`

1. Run the Engram export again so the backup includes the latest memory.
2. Check `git status --short` and inspect the diff.
3. Confirm the export contains no secrets or unwanted private data.
4. Tell the user that `sync` commits and pushes, then obtain confirmation if
   the operation was not explicitly requested.
5. Run `dcfiles sync` only after the checks pass.
6. Run `dcfiles status` afterward and report the commit/push result.

Do not silently run `sync` merely because an export changed. A changed
Engram backup is expected; a remote push is still a user-visible mutation.

### Restore on a new machine

```bash
git clone https://github.com/davidcoachdev/dcfiles "$HOME/dcfiles"
export DCFILES_HOME="$HOME/dcfiles"
"$DCFILES_HOME/install.sh"
"$HOME/.local/bin/engram" import "$DCFILES_HOME/engram/engram-export.json"
```

If Engram is not installed yet, install/setup it first, then run the import.
Never restore by copying the SQLite database, WAL, or SHM files over a live
Engram data directory.

## Decision Gates

| Situation | Action |
|-----------|--------|
| User wants to back up a new config | Export Engram first, then `dcfiles add <file>` |
| User says "sync" or "deploy" | Export Engram, review diff, warn about commit/push, then `dcfiles sync` |
| User asks to back up Engram | `engram export $DCFILES_HOME/engram/engram-export.json` |
| User asks to restore Engram | `engram import $DCFILES_HOME/engram/engram-export.json` |
| User asks "what's tracked?" | `dcfiles status` |
| User asks "what changed?" | `dcfiles diff` plus review the Engram JSON diff |
| Symlink broken after git pull | `dcfiles sync --fix` (after Engram preflight if syncing) |
| New machine, first setup | Run `install.sh`, then import the Engram JSON backup |
| File has secrets/tokens | Redact/exclude it before `add`; never rely on Engram export to hide secrets |
| Engram export fails | Stop the flow; do not commit/push a stale or partial backup |
| User edited a symlinked file | Export Engram, then `dcfiles sync` after review |

## Common Patterns

### Add a new dotfile with Engram backup

```bash
export DCFILES_HOME="$HOME/Proyects/dcfiles"
mkdir -p "$DCFILES_HOME/engram"
"$HOME/.local/bin/engram" export "$DCFILES_HOME/engram/engram-export.json"
DCFILES_HOME="$DCFILES_HOME" "$DCFILES_HOME/bin/dcfiles" add ~/.config/kitty/kitty.conf
git -C "$DCFILES_HOME" diff --cached --stat
# Review, then explicitly run sync when the user approves the push.
```

### Check after system changes

```bash
export DCFILES_HOME="$HOME/Proyects/dcfiles"
DCFILES_HOME="$DCFILES_HOME" "$DCFILES_HOME/bin/dcfiles" status
DCFILES_HOME="$DCFILES_HOME" "$DCFILES_HOME/bin/dcfiles" diff
git -C "$DCFILES_HOME" diff -- engram/engram-export.json
```

### Manual Engram backup without changing dotfiles

```bash
export DCFILES_HOME="$HOME/Proyects/dcfiles"
mkdir -p "$DCFILES_HOME/engram"
"$HOME/.local/bin/engram" export "$DCFILES_HOME/engram/engram-export.json"
git -C "$DCFILES_HOME" status --short
```

## Directory Structure

```text
$DCFILES_HOME/
├── install.sh              # bootstrap: clone → deploy → link CLI
├── bin/dcfiles              # CLI dispatcher
├── lib/
│   ├── utils.sh             # logging, path helpers, die()
│   └── symlink.sh           # two-pass symlink engine
├── config/                  # dotfiles, mirroring $HOME
├── engram/
│   └── engram-export.json   # portable memory backup, not the live DB
└── test/                    # bats unit + integration
```

## Output Contract

After any dcfiles operation, report:
- Files added/copied and symlinks created
- Engram export path, timestamp, and whether export succeeded
- Whether the Engram JSON was reviewed for secrets/private data
- Commit and push status (if `sync` was run)
- Any warnings: broken symlinks, missing dependencies, stale export, or
  multiple dcfiles clones

## References

- Repo: `https://github.com/davidcoachdev/dcfiles`
- CLI source: `$DCFILES_HOME/bin/dcfiles`
- Lib source: `$DCFILES_HOME/lib/symlink.sh`, `$DCFILES_HOME/lib/utils.sh`
- Tests: `$DCFILES_HOME/test/`
- Engram data directory: `~/.engram/`
- Engram export/import: `engram export`, `engram import`
