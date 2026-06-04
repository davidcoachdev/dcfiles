---
name: dcfiles
description: "Trigger: dcfiles, dotfiles, dcfile, respaldar config, backup dotfiles, sincronizar config. Manage dotfiles with the dcfiles CLI — zero-dependency Bash tool."
license: MIT
metadata:
  author: davidcoachdev
  version: "1.0"
---

## Activation Contract

Use this skill when the user wants to:
- Add a new dotfile to version control (`dcfiles add`)
- Sync deployed dotfiles with the repo (`dcfiles sync`)
- Check dotfile state (`dcfiles status`)
- Diff dotfiles against config (`dcfiles diff`)
- Bootstrap dotfiles on a new machine (`install.sh`)

## Hard Rules

- The CLI lives at `~/.local/bin/dcfiles`. Always use the full path or set `DCFILES_HOME`.
- `DCFILES_HOME` defaults to `~/dcfiles`. Set it if cloned elsewhere.
- `dcfiles sync` auto-commits AND pushes. Warn before running if there are uncommitted changes.
- Never commit secrets. Files with tokens (gh hosts.yml, aws credentials, ssh keys) MUST be REDACTED in the repo.
- Use `--skip-worktree` on files that need real tokens locally but REDACTED in git.
- After `dcfiles add`, the original file becomes a symlink. The backup is at `<file>.dcfiles.bak`.
- Hostname overrides: `<name>.<hostname>` deployed when hostname matches. Base `<name>` deployed otherwise.

## Decision Gates

| Situation | Action |
|-----------|--------|
| User wants to back up a new config | `dcfiles add <file>` |
| User says "sync" or "deploy" | `dcfiles sync` |
| User asks "what's tracked?" | `dcfiles status` |
| User asks "what changed?" | `dcfiles diff` |
| Symlink broken after git pull | `dcfiles sync --fix` |
| New machine, first setup | Run `~/dcfiles/install.sh` |
| File has secrets/tokens | REDACT them before `add`, use `--skip-worktree` |
| User edited a symlinked file | `dcfiles sync` to commit the changes |

## Execution Steps

1. **Check env**: Verify `DCFILES_HOME` is set. Default to `~/dcfiles` if not.
2. **Run the command**: `DCFILES_HOME=~/dcfiles ~/.local/bin/dcfiles <subcommand> [args]`
3. **Report output**: Show the user what was copied, linked, backed up, or synced.
4. **Verify state**: After `sync`, run `dcfiles status` to confirm everything is ok.

## Common Patterns

### Adding a new dotfile
```bash
dcfiles add ~/.config/kitty/kitty.conf
# → Copies to config/.config/kitty/kitty.conf
# → Creates symlink ~/.config/kitty/kitty.conf → repo
# → Original backed up as kitty.conf.dcfiles.bak
# → Staged for commit
dcfiles sync  # commit + push
```

### Checking after system changes
```bash
dcfiles status  # show ok/missing/overridden/broken
dcfiles diff    # show actual diffs
```

### Restoring on a new machine
```bash
git clone https://github.com/davidcoachdev/dcfiles ~/dcfiles
~/dcfiles/install.sh
# All dotfiles deployed as symlinks, dcfiles CLI linked to ~/.local/bin
```

## Directory Structure

```
~/dcfiles/
├── install.sh              # bootstrap: clone → deploy → link CLI
├── bin/dcfiles             # CLI dispatcher
├── lib/
│   ├── utils.sh            # logging, path helpers, die()
│   └── symlink.sh          # two-pass symlink engine
├── config/                 # YOUR dotfiles (mirrors $HOME)
└── test/                   # bats unit + integration
```

## Output Contract

After any dcfiles operation, report:
- Files added/copied (if any)
- Symlinks created
- Backups made (.dcfiles.bak)
- Commit status (if sync was run)
- Any warnings (broken symlinks, missing deps)

## References

- Repo: `https://github.com/davidcoachdev/dcfiles`
- CLI source: `~/dcfiles/bin/dcfiles`
- Lib source: `~/dcfiles/lib/symlink.sh`, `~/dcfiles/lib/utils.sh`
- Tests: `~/dcfiles/test/`
