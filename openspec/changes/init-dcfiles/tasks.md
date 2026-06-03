# Tasks: init-dcfiles

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~550 |
| 400-line budget risk | Medium |
| User review budget | 2000 lines |
| Chained PRs recommended | Yes |
| Suggested split | PR 1: Foundation (libs + config) → PR 2: Bootstrap + CLI → PR 3: Tests + CI + Docs |
| Delivery strategy | auto-forecast |
| Chain strategy | undetermined — needs user decision |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Base | Lines | Notes |
|------|------|-----------|------|-------|-------|
| 1 | Foundation libs + config | PR 1 | main | ~130 | `lib/utils.sh`, `lib/symlink.sh`, `config/`, `.shellcheckrc` |
| 2 | Bootstrap + CLI tool | PR 2 | main | ~150 | `install.sh`, `bin/dcfiles` |
| 3 | Tests + CI + Docs | PR 3 | main | ~270 | bats tests, GitHub Actions, README |

All PRs target main (stacked-to-main pattern). PR 2 depends on PR 1 files being present; PR 3 depends on PR 2 scripts existing.

---

## Phase 1: Foundation

- [x] 1.1 Create `config/` with example dotfiles: `config/bash/.bashrc`, `config/git/.gitconfig`, `config/tmux/.tmux.conf`
- [x] 1.2 Create `lib/utils.sh` — `set -euo pipefail`, color vars, `msg()`, `warn()`, `die()`, `abspath()`, `is_tracked()`, `$DCFILES_HOME` default `~/dcfiles`
- [x] 1.3 Create `lib/symlink.sh` — source `utils.sh`, `deploy_all()` (two-pass: overrides-first by `hostname -s`, then base files skipping resolved overrides), `deploy_single()`, `_link()` helper (backup `.dcfiles.bak`, `mkdir -p`, `ln -sf`), `strip_suffix()`
- [x] 1.4 Create `.shellcheckrc` — `disable=SC1091` (sourced files are project-internal)

**Verify**: `bash -n lib/utils.sh lib/symlink.sh` passes. `shellcheck lib/utils.sh lib/symlink.sh` zero errors.

## Phase 2: Bootstrap

- [ ] 2.1 Create `install.sh` — shebang + `set -euo pipefail`, check deps (bash≥4.0, git, ln, cp), resolve `$DCFILES_HOME`, clone repo if missing / `git pull` if exists, source `lib/utils.sh` and `lib/symlink.sh`, `deploy_all` (R-001), symlink `bin/dcfiles` → `~/.local/bin/dcfiles` (R-003)

**Verify**: `bash -n install.sh` passes. `shellcheck install.sh` zero errors. Manual test in temp dir with fake `$HOME`.

## Phase 3: CLI

- [ ] 3.1 Create `bin/dcfiles` — shebang, set `$DCFILES_HOME`, source libs, `usage()` help, case dispatch:
  - `add <file>` — validate exists + not tracked → `mkdir -p` + `cp` into `config/` preserving `$HOME`-relative path → `deploy_single` → `git add` (R-004)
  - `sync` — `deploy_all` → auto-commit + auto-push changes (R-005). `--fix` flag repairs broken symlinks
  - `status` — walk `config/`, classify each file: `ok` / `missing` / `overridden` / `broken`, table output (R-006)
  - `diff` — `git diff -- config/` for tracked files, report untracked `$HOME` files (R-007)

**Verify**: `bash -n bin/dcfiles` passes. `shellcheck bin/dcfiles` zero errors. Each subcommand exercised manually.

## Phase 4: Tests

- [ ] 4.1 Create `test/helpers/common.bash` — bats `setup()` creating temp `$HOME` with fake config tree (bash, git, tmux files), hostname override fixtures (`.bashrc.terminus`), `teardown()` removing `$TMPDIR`
- [ ] 4.2 Create `test/unit/symlink.bats` — tests covering R-002: standard deploy, hostname match wins, hostname no-match falls back, backup before overwrite, symlink already correct (idempotent), empty config, broken symlink repair via `--fix`
- [ ] 4.3 Create `test/integration/cli.bats` — full workflow: add new dotfile → sync deploys → status reports ok → diff shows changes; add already-tracked file (exit 0), add nonexistent file (exit 2), sync `--fix`, status with overridden/missing states (R-003 through R-007)

**Verify**: `bats test/` all pass. `shellcheck test/**/*.bats test/**/*.bash` zero errors.

## Phase 5: CI & Docs

- [ ] 5.1 Create `.github/workflows/ci.yml` — push/PR trigger, jobs: `shellcheck` (all `*.sh` files, fail on error) + `bats` (install bats-core, run `test/`)
- [ ] 5.2 Create `README.md` — one-liner bootstrap (`git clone <url> ~/dcfiles && ~/dcfiles/install.sh`), requirements (bash≥4.0, git, coreutils), directory structure, subcommand reference (add/sync/status/diff), hostname override convention

**Verify**: CI passes on push (`shellcheck` + `bats`). README renders correctly.
