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

set -euo pipefail

# Source shared utilities
source "${DCFILES_HOME:?DCFILES_HOME must be set}/lib/utils.sh"

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
# Args:
#   $1  src         — absolute path to source file in config/
#   $2  name        — target filename (e.g. ".bashrc")
#   $3  subdir      — subdirectory under $HOME (e.g. "bash")
_link() {
    local src="$1"
    local name="$2"
    local subdir="$3"
    local target="${HOME}/${subdir}/${name}"

    # Ensure parent directory exists
    mkdir -p "$(dirname "$target")"

    # Create relative symlink (GNU ln --relative)
    ln -sfr "$src" "$target"
    msg "Linked: ${target}"
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
deploy_all() {
    local hostname
    hostname="$(hostname -s)"
    local config_dir="${DCFILES_HOME}/config"

    if [[ ! -d "$config_dir" ]]; then
        warn "No config directory found at ${config_dir} — nothing to deploy"
        return 0
    fi

    # -----------------------------------------------------------------------
    # Pass 1: hostname overrides only
    # -----------------------------------------------------------------------
    while IFS= read -r -d '' src; do
        local name subdir
        name="$(basename "$src")"
        subdir="$(dirname "${src#"${config_dir}"/}")"

        # Skip files that do not match this hostname
        [[ "$name" == *".${hostname}" ]] || continue

        local base_name
        base_name="$(strip_suffix "$name" "$hostname")"
        _link "$src" "$base_name" "$subdir"
    done < <(find "$config_dir" -type f -print0)

    # -----------------------------------------------------------------------
    # Pass 2: base files (skip if a hostname override exists)
    # -----------------------------------------------------------------------
    while IFS= read -r -d '' src; do
        local name subdir
        name="$(basename "$src")"
        subdir="$(dirname "${src#"${config_dir}"/}")"

        # Skip hostname override files themselves
        [[ "$name" == *".${hostname}" ]] && continue

        # Skip if a hostname override exists for this file
        local override="${config_dir}/${subdir}/${name}.${hostname}"
        [[ -f "$override" ]] && continue

        _link "$src" "$name" "$subdir"
    done < <(find "$config_dir" -type f -print0)
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
    subdir="$(dirname "$rel")"
    local name
    name="$(basename "$src")"
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
