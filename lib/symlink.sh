#!/usr/bin/env bash
#
# symlink.sh — Two-pass symlink engine with hostname override support
#
# This library provides the core dotfile deployment logic:
#   deploy_all    — walk config/ and symlink everything to $HOME
#   deploy_single — symlink a single file (used by `dcfiles add`)
#
# Override convention:
#   If `config/bash/.bashrc` and `config/bash/.bashrc.<hostname>` both exist,
#   the hostname-specific file wins when `$(hostname -s)` matches.
#
# Failure policy:
#   A single bad link must never abort a full deploy. `_link` reports failure
#   through its exit status; `deploy_all` tallies the failures and surfaces a
#   summary instead of dying halfway through under `set -e`.

set -euo pipefail

# Source shared utilities
source "${DCFILES_HOME:?DCFILES_HOME must be set}/lib/utils.sh"

# Results of the last deploy_all run — read by callers for reporting.
DCFILES_DEPLOY_LINKED=0
DCFILES_DEPLOY_FAILED=0

# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

# strip_suffix — strip a hostname suffix from a filename
#   strip_suffix ".bashrc.terminus" "terminus"  →  ".bashrc"
strip_suffix() {
    local filename="$1"
    local suffix="$2"
    printf '%s\n' "${filename%."${suffix}"}"
}

# _link — create a single relative symlink
#
# Never aborts the caller. Returns non-zero on failure so the caller can tally
# errors and keep going.
#
# Args:
#   $1  src         — absolute path to source file in config/
#   $2  name        — target filename (e.g. ".bashrc")
#   $3  subdir      — subdirectory under $HOME (e.g. "bash")
_link() {
    local src="$1"
    local name="$2"
    local subdir="$3"
    local target="${HOME}/${subdir}/${name}"

    # Ensure parent directory exists.
    # `${target%/*}` replaces a dirname(1) fork — this runs once per managed
    # file, so on a 1.6k-file tree the forks alone cost minutes.
    local target_dir="${target%/*}"
    if [[ ! -d "$target_dir" ]]; then
        if ! mkdir -p "$target_dir" 2>/dev/null; then
            warn "Cannot create parent directory for: ${target}"
            return 1
        fi
    fi

    # A real directory where a file belongs: `ln -sf` would silently nest the
    # link *inside* it. Refuse instead of corrupting the tree.
    if [[ -d "$target" && ! -L "$target" ]]; then
        warn "Target is a directory, refusing to link: ${target}"
        return 1
    fi

    # Idempotent: already a symlink pointing at this source. Skipping avoids
    # ~thousands of redundant ln(1) calls on a re-deploy of an unchanged tree
    # (and is what makes repeated `dcfiles status` fast).
    if [[ -L "$target" ]]; then
        local cur
        cur="$(readlink "$target" 2>/dev/null || true)"
        if [[ "$cur" == "$src" || "$cur" == "${src#"${HOME}/"}" ]]; then
            return 0
        fi
    fi

    # Create relative symlink (GNU ln --relative)
    if ! ln -sfr "$src" "$target" 2>/dev/null; then
        warn "Failed to link: ${target}"
        return 1
    fi

    [[ "${DCFILES_QUIET:-false}" == true ]] || msg "Linked: ${target}"
    return 0
}

# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

# deploy_all — two-pass symlink deployment
#
# Pass 1 — Hostname overrides.
#   Every file ending with `.<hostname>` is linked. The hostname suffix is
#   stripped from the link name so that `.bashrc.terminus` becomes `~/.bashrc`.
#
# Pass 2 — Base files.
#   All non-override files are linked UNLESS a hostname override exists in the
#   same directory. If an override exists it was already handled in pass 1 so
#   the base file is skipped.
#
# Sets DCFILES_DEPLOY_LINKED / DCFILES_DEPLOY_FAILED.
# Returns non-zero if any link failed.
deploy_all() {
    local hostname
    hostname="$(hostname -s)"
    local config_dir="${DCFILES_HOME}/config"

    DCFILES_DEPLOY_LINKED=0
    DCFILES_DEPLOY_FAILED=0

    if [[ ! -d "$config_dir" ]]; then
        warn "No config directory found at ${config_dir} — nothing to deploy"
        return 0
    fi

    # -----------------------------------------------------------------------
    # Pass 1: hostname overrides only
    # -----------------------------------------------------------------------
    # Both passes use parameter expansion instead of basename/dirname. Each
    # fork costs ~1 ms; at two passes over a 1.6k-file tree that is minutes.
    while IFS= read -r -d '' src; do
        local name rel subdir
        name="${src##*/}"

        # Skip files that do not match this hostname
        [[ "$name" == *".${hostname}" ]] || continue

        rel="${src#"${config_dir}"/}"
        if [[ "$rel" == */* ]]; then subdir="${rel%/*}"; else subdir="."; fi

        local base_name="${name%."${hostname}"}"

        if _link "$src" "$base_name" "$subdir"; then
            DCFILES_DEPLOY_LINKED=$(( DCFILES_DEPLOY_LINKED + 1 ))
        else
            DCFILES_DEPLOY_FAILED=$(( DCFILES_DEPLOY_FAILED + 1 ))
        fi
    done < <(find "$config_dir" -type f -print0)

    # -----------------------------------------------------------------------
    # Pass 2: base files (skip if a hostname override exists)
    # -----------------------------------------------------------------------
    while IFS= read -r -d '' src; do
        local name rel subdir
        name="${src##*/}"
        rel="${src#"${config_dir}"/}"
        if [[ "$rel" == */* ]]; then subdir="${rel%/*}"; else subdir="."; fi

        # Skip hostname override files themselves
        [[ "$name" == *".${hostname}" ]] && continue

        # Skip if a hostname override exists for this file
        local override="${config_dir}/${subdir}/${name}.${hostname}"
        [[ -f "$override" ]] && continue

        if _link "$src" "$name" "$subdir"; then
            DCFILES_DEPLOY_LINKED=$(( DCFILES_DEPLOY_LINKED + 1 ))
        else
            DCFILES_DEPLOY_FAILED=$(( DCFILES_DEPLOY_FAILED + 1 ))
        fi
    done < <(find "$config_dir" -type f -print0)

    [[ $DCFILES_DEPLOY_FAILED -gt 0 ]] && return 1
    return 0
}

# deploy_single — symlink a single file (used by `dcfiles add`)
#
# Resolves any hostname override before creating the link.
# Args:
#   $1  src  — absolute path to source file inside config/
deploy_single() {
    local src="$1"
    local hostname
    hostname="$(hostname -s)"
    local config_dir="${DCFILES_HOME}/config"

    local rel="${src#"${config_dir}"/}"
    local subdir
    if [[ "$rel" == */* ]]; then subdir="${rel%/*}"; else subdir="."; fi
    local name="${src##*/}"
    local link_src="$src"
    local link_name="$name"

    # Check for hostname override
    local override="${src}.${hostname}"
    if [[ -f "$override" ]]; then
        link_src="$override"
        link_name=$(strip_suffix "$name" "$hostname")
    fi

    _link "$link_src" "$link_name" "$subdir"
}
