# Design: init-dcfiles

## Technical Approach

Pure Bash symlink engine (~40 lines) that walks `config/`, mirrors to `$HOME`, resolves hostname overrides, and backs up conflicting files. No GNU Stow, no Perl, no Python. The repo code IS the tool — clone and run `install.sh`. Zero runtime dependencies beyond bash ≥4.0, git, and coreutils (`ln`, `cp`, `readlink`).

Architecture follows the proposal's shell-first strategy: the symlink engine is extracted into a shared library (`lib/symlink.sh`) consumed by both `install.sh` (bootstrap) and `bin/dcfiles` (daily CLI). This avoids duplication and keeps the future Rust migration path clean — the engine boundary is a single `deploy_all` + `deploy_single` interface.

## Architecture Decisions

| Decision | Choice | Rejected | Rationale |
|----------|--------|----------|-----------|
| Symlink engine design | Two-pass walk: overrides-first, then base files | Single-pass with in-memory map | Eliminates associative array dependency (bash 4+ guarantee); two-pass handles override-only files naturally |
| Symlink type | Relative symlinks via `ln -sf` | Absolute symlinks | Portable if repo moves; survives `$HOME` changes |
| Backup strategy | Copy to `<file>.dcfiles.bak` | Move to `.dcfiles/backups/` dir | User sees backup next to original; simpler recovery |
| CLI dispatch | `case` statement in `bin/dcfiles` | getopts subcommand parser | 4 subcommands don't warrant a parser; add complexity when >8 subcommands |
| File organization | `config/<app>/<file>` mirroring `$HOME` | Flat `config/` directory | Natural grouping; `add` command path resolution is trivial |
| Hostname detection | `$(hostname -s)` called once, cached in var | `$(hostname)` FQDN | Short name = simpler file naming (`.bashrc.terminus` vs `.bashrc.terminus.example.com`) |
| Shell safety | `set -euo pipefail` + `trap` on ERR | `set -e` only | `pipefail` catches `find | while` failures; `-u` catches unset `$DCFILES_HOME` |

## Data Flow

```
install.sh bootstrap:
  check deps (bash, git, ln, cp) → git clone/update $DCFILES_HOME
  → source lib/symlink.sh → deploy_all → ln CLI to ~/.local/bin/

dcfiles add <file>:
  validate file exists & isn't tracked → resolve $HOME-relative path
  → mkdir -p config/<dir>/ → cp into config/ → deploy_single (symlink back)
  → git add config/<dir>/<file> → report

dcfiles sync:
  source lib/symlink.sh → deploy_all (walk config/, resolve overrides,
  backup conflicts, create symlinks) → report created/skipped/overridden

dcfiles status:
  walk config/ → for each file: check if target is symlink to correct source
  → classify: ok | missing | overridden | broken → table output

dcfiles diff:
  git diff -- config/ → report per-file diffs, flag untracked $HOME files
```

## Symlink Engine Core Logic

```bash
# Two-pass algorithm (pseudocode, ~40 lines)
deploy_all() {
    local hn hostname="$(hostname -s)"

    # Pass 1: hostname overrides only
    while read -r src; do
        local name=$(basename "$src")
        [[ "$name" == *".$hostname" ]] || continue
        _link "$src" "$(strip_suffix "$name" "$hostname")" "$(dirname "$rel")"
    done < <(find "$CONFIG" -type f)

    # Pass 2: base files (skip if override exists)
    while read -r src; do
        local name=$(basename "$src")
        [[ -f "$(dirname "$src")/${name}.${hostname}" ]] && continue
        _link "$src" "$name" "$(dirname "$rel")"
    done < <(find "$CONFIG" -type f)
}

_link() {  # source, target_name, target_subdir
    local target="$HOME/${3:+$3/}$2"
    mkdir -p "$(dirname "$target")"
    [[ -f "$target" && ! -L "$target" ]] && cp "$target" "${target}.dcfiles.bak"
    ln -sf "$1" "$target"
}
```

## File Changes

| File | Action | Purpose |
|------|--------|---------|
| `install.sh` | Create | Bootstrap: clone repo, verify deps, invoke deploy_all, symlink CLI |
| `bin/dcfiles` | Create | CLI dispatcher for add/sync/status/diff subcommands |
| `lib/symlink.sh` | Create | Symlink engine: deploy_all, deploy_single, hostname override resolution, backup logic |
| `lib/utils.sh` | Create | Shared helpers: color output, `die()`, logging, `abspath()`, `is_tracked()` |
| `config/` | Create dir | Dotfiles organized by application subdirectory |
| `test/helpers/common.bash` | Create | bats shared setup: temp $HOME, test config fixtures |
| `test/unit/symlink.bats` | Create | Unit tests: override resolution, backup behavior, idempotency |
| `test/integration/cli.bats` | Create | Integration: add→sync→status→diff workflow |
| `.github/workflows/ci.yml` | Create | CI: shellcheck + bats on every push/PR |
| `.shellcheckrc` | Create | shellcheck config: disable SC1091 (sourced files) |

## Testing Strategy

| Layer | Tool | Scope |
|-------|------|-------|
| Static analysis | `shellcheck` | All `.sh` files — zero errors enforced in CI |
| Unit | `bats-core` | Symlink engine: override matching, backup logic, edge cases (empty config, broken symlinks) |
| Integration | `bats-core` | Full CLI workflow: add new dotfile → sync deploys → status reports ok → diff shows changes |
| Fixture strategy | Temp `$HOME` per test | `bats` `setup()` creates `TMPDIR` with fake `$HOME` and sample config tree |

## Open Questions

- [ ] Should `dcfiles sync` auto-commit changes or leave staging to user? (Spec silent — default: leave staging)
- [ ] Should `install.sh` require `$DCFILES_HOME` be pre-cloned, or clone itself? (Spec: assumes pre-cloned per R-001 scenario)
