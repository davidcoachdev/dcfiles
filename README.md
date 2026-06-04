# dcfiles

> Zero-dependency dotfiles manager — pure Bash. Your configs, versioned and
> portable across machines.

[![CI](https://github.com/davidcoachdev/dcfiles/actions/workflows/ci.yml/badge.svg)](https://github.com/davidcoachdev/dcfiles/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## Why

Most dotfiles managers pull in runtimes or package managers. dcfiles doesn't.
`git clone && ./install.sh` — that's it. No Stow, no Python, no npm, no Rust
(yet). Every file is a relative symlink tracked by Git. If you lose the repo,
nothing breaks — the files are still physically in `config/`.

## Quick Start

```bash
git clone https://github.com/davidcoachdev/dcfiles ~/dcfiles
~/dcfiles/install.sh
```

`install.sh`:
- Clones the repo if missing (or pulls if already present)
- Deploys every dotfile as a relative symlink into `$HOME`
- Links `bin/dcfiles` → `~/.local/bin/dcfiles`

Make sure `~/.local/bin` is on your `$PATH`:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

## How It Works

```
~/.bashrc  ──symlink──►  ~/dcfiles/config/.bashrc
~/.config/gh/hosts.yml  ──symlink──►  ~/dcfiles/config/.config/gh/hosts.yml
```

`config/` mirrors `$HOME` exactly. When you `dcfiles add ~/.zshrc`, it copies
the file into `config/.zshrc` and replaces the original with a symlink. The
original is backed up as `.zshrc.dcfiles.bak`.

## CLI

| Command | What it does |
|---------|-------------|
| `dcfiles add <file>` | Copy a file into `config/` and symlink it. Backs up original. |
| `dcfiles sync [--fix]` | Deploy all symlinks, `git commit`, `git push`. `--fix` repairs broken symlinks first. |
| `dcfiles status` | Show every tracked file: `ok`, `missing`, `overridden`, `broken`. |
| `dcfiles diff` | Git diff of config + list of overridden files in `$HOME`. |

### Examples

```bash
dcfiles add ~/.config/nvim/init.lua    # start tracking a new config
dcfiles status                          # check everything's synced
dcfiles sync                            # deploy + commit + push
dcfiles sync --fix                      # repair broken symlinks before sync
```

## Per-Machine Overrides

Drop a `.<hostname>` variant next to any config file and it wins on that
machine:

```
config/
├── .bashrc                  # used everywhere
├── .bashrc.terminus         # used only when hostname = "terminus"
└── .gitconfig
    └── .gitconfig.work      # used only when hostname = "work"
```

## Requirements

| Tool | Minimum | Why |
|------|---------|-----|
| bash | ≥ 4.0 | `set -euo pipefail`, `read -d ''` |
| git | any | clone, commit, push |
| coreutils | any | `ln`, `cp`, `readlink` |

Everything ships with Linux and macOS.

## Testing & CI

- **Unit tests**: [bats-core](https://github.com/bats-core/bats-core) — 12 tests
  covering symlink engine, overrides, backups, idempotency
- **Integration tests**: 15 tests — full `add → sync → status → diff` workflow
- **Static analysis**: [shellcheck](https://www.shellcheck.net/) with zero-error policy
- **CI**: GitHub Actions runs both on every push and PR

```bash
bats test/unit/symlink.bats test/integration/cli.bats
# 27 tests, 0 failures
```

## What's Inside This Repo

A snapshot of my personal environment:

```
config/
├── .bashrc, .profile, .zshrc        # shell configs
├── .config/
│   ├── fish/                         # fish shell + tide prompt (92 functions)
│   ├── tmux/tmux.conf                # terminal multiplexer
│   ├── gh/                           # GitHub CLI
│   ├── opencode/                     # OpenCode agents, commands, skills (235)
│   ├── rtk/, deepseek/, kilo/        # terminal & AI tools
│   └── trust-escrow/, ngrok/         # blockchain & networking
└── .claude.json, .gitconfig          # misc configs
```

> **Your fork will look different.** This is just my setup — swap in your own
> dotfiles with `dcfiles add`.

## Directory Structure

```
~/dcfiles/
├── install.sh              # bootstrap: clone → deploy → link CLI
├── bin/dcfiles             # CLI dispatcher
├── lib/
│   ├── utils.sh            # logging, path helpers, die()
│   └── symlink.sh          # two-pass symlink engine + hostname overrides
├── config/                 # YOUR dotfiles (mirrors $HOME)
├── test/                   # bats unit + integration tests
├── .github/workflows/      # CI: shellcheck + bats
└── README.md
```

## Roadmap

- [x] Symlink engine with hostname overrides
- [x] `add`, `sync`, `status`, `diff` CLI
- [x] Auto-commit + push on `sync`
- [x] bats test suite
- [x] shellcheck CI
- [ ] `dcfiles bootstrap` — install packages from a manifest
- [ ] Template engine (secrets, env-specific values)
- [ ] Rust rewrite — symlink engine already isolated in `lib/symlink.sh`

## License

MIT © [davidcoachdev](https://github.com/davidcoachdev)
