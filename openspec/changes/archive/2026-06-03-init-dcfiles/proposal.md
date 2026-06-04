# Proposal: init-dcfiles

## Intent

Build a zero-dependency dotfiles tool using pure Bash scripts. The repo IS the tool — `git clone && ./install.sh`. User rejected exploration's Go CLI recommendation in favor of shell-first with a clean structure ready for future Rust migration.

## Scope

### In Scope
- `install.sh` bootstrap: clone/update repo, create dirs, deploy symlinks
- Symlink engine: walk `config/`, mirror to `$HOME`, handle `<file>.<hostname>` overrides
- Per-machine configs via hostname-based file overrides (yadm-style)
- `bin/dcfiles` CLI wrapper: `add`, `sync`, `status`, `diff` subcommands
- README with one-command bootstrap
- Conventional commits from day one

### Out of Scope
- Encryption (age/GPG) — deferred
- Template engine (shell variable substitution suffices for MVP)
- Package installation scripts
- Multi-OS support (Linux-only for MVP)
- Dry-run mode
- Rust migration (future)

## Capabilities

### New Capabilities
- `bootstrap`: initial machine setup — clone repo, create directories, deploy all symlinks
- `dotfiles-sync`: symlink engine with hostname override precedence, add new dotfiles to repo

### Modified Capabilities
- None (greenfield project)

## Approach

**Shell-first, structure-clean.** Symlink engine in pure Bash using only `ln`, `cp`, `readlink`. Hostname-based overrides match yadm's alt-file pattern. The repo serves dual role: personal dotfiles storage + self-contained tooling.

## Directory Structure

```
dcfiles/
├── bin/
│   └── dcfiles              # CLI wrapper (add, sync, status, diff)
├── lib/
│   ├── symlink.sh           # Symlink engine
│   └── utils.sh             # Shared helpers (colors, logging)
├── config/                  # Dotfiles grouped by app
│   ├── bash/
│   │   ├── .bashrc
│   │   └── .bashrc.terminus # hostname override
│   ├── git/
│   │   └── .gitconfig
│   ├── tmux/
│   │   └── .tmux.conf
│   └── nvim/
│       └── init.lua
├── install.sh               # Bootstrap entry point
└── README.md
```

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Language | Pure Bash | User requirement — zero deps, immediate usability |
| Symlink strategy | Custom engine (not GNU Stow) | Stow is Perl, violates zero-deps; own engine is ~40 lines |
| Machine-specific configs | `<file>.<hostname>` inline overrides | yadm pattern, simple to implement in shell |
| Git strategy | Repo IS the tool | Clone to `~/dcfiles/`, run `install.sh`, use `bin/dcfiles` daily |
| CLI entry point | `bin/dcfiles` symlinked to `~/.local/bin/` | Single command, PATH-based, no shell pollution |
| Install target dir | `~/dcfiles/` (configurable via env) | Predictable, matches repo name |
| Hostname detection | `$(hostname -s)` | Standard, available everywhere |

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `bin/dcfiles` | New | CLI wrapper script |
| `lib/symlink.sh` | New | Core symlink engine |
| `lib/utils.sh` | New | Shared shell utilities |
| `config/` | New | Dotfiles organized by app |
| `install.sh` | New | Bootstrap entry point |
| `README.md` | New | Usage docs |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Shell cross-platform fragility | Medium | Target Linux only; macOS deferred |
| Symlink breakage on system changes | Low | `dcfiles sync --fix` to repair broken links |
| Hostname collision in overrides | Low | Document naming convention, validate in script |
| Scope creep toward chezmoi clone | Medium | Strict MVP boundaries; Rust rewrite is the expansion point |

## Rollback Plan

1. `rm ~/.local/bin/dcfiles` removes CLI
2. `rm -rf ~/dcfiles/` removes repo (backup first)
3. Symlinks remain — no automated cleanup needed (user owns their dotfiles)

## Dependencies

- `bash >= 4.0`
- `git` (for repo operations)
- `ln`, `cp`, `readlink` (coreutils — always present on Linux)

## Success Criteria

- [ ] `git clone <repo> && ./install.sh` produces working symlinks on a fresh Linux machine
- [ ] `dcfiles add ~/.config/newapp/config` copies file into repo and replaces with symlink
- [ ] `dcfiles sync` detects and applies hostname-specific overrides
- [ ] `dcfiles status` shows tracked files and their sync state
- [ ] `dcfiles diff` shows changes in tracked dotfiles vs repo
- [ ] All shell scripts pass `shellcheck` with zero errors
