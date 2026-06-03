#!/usr/bin/env bash
# shellcheck disable=SC2034
#
# utils.sh — Shared utilities for dcfiles
#
# Provides: colored output, logging, path helpers, tracking checks.
# Source this from any dcfiles script. Idempotent — safe to source multiple times.
#
# Usage:
#   source "${DCFILES_HOME}/lib/utils.sh"
#   msg "Installing…"; warn "Overriding…"; die "Fatal: $?"
#   abspath "some/relative/path"
#   is_tracked "$HOME/.bashrc"

set -euo pipefail

# Guard — prevent re-sourcing
if [[ -n "${_UTILS_SH_LOADED:-}" ]]; then
    return 0
fi
_UTILS_SH_LOADED=1

# ---------------------------------------------------------------------------
# Defaults
# ---------------------------------------------------------------------------
DCFILES_HOME="${DCFILES_HOME:-$HOME/dcfiles}"

# ---------------------------------------------------------------------------
# ANSI colour constants
# ---------------------------------------------------------------------------
readonly RESET='\033[0m'
readonly BOLD='\033[1m'
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[0;33m'
readonly BLUE='\033[0;34m'

# ---------------------------------------------------------------------------
# Logging helpers
# ---------------------------------------------------------------------------

# msg — green-tagged info line printed to stdout
msg() {
    printf "${GREEN}==>${RESET} %s\n" "$*"
}

# warn — yellow-tagged warning line printed to stderr
warn() {
    printf "${YELLOW}==>${RESET} %s\n" "$*" >&2
}

# die — print red error message and exit with status 1
die() {
    printf "${RED}ERROR:${RESET} %s\n" "$*" >&2
    exit 1
}

# ---------------------------------------------------------------------------
# Path helpers
# ---------------------------------------------------------------------------

# abspath — resolve any path to an absolute canonical path
# Falls back to a best-effort resolution when the path does not exist yet.
abspath() {
    local path="$1"

    if [[ -d "$path" ]]; then
        cd "$path" && pwd -P
    elif [[ -f "$path" || -L "$path" ]]; then
        local dir
        dir="$(cd "$(dirname "$path")" && pwd -P)"
        printf '%s/%s\n' "${dir}" "$(basename "$path")"
    else
        # Path does not exist yet — resolve what we can
        local dir
        if dir="$(cd "$(dirname "$path")" 2>/dev/null && pwd -P)"; then
            printf '%s/%s\n' "${dir}" "$(basename "$path")"
        else
            # Fallback: print the input as-is
            printf '%s\n' "$path"
        fi
    fi
}

# ---------------------------------------------------------------------------
# File helpers
# ---------------------------------------------------------------------------

# is_tracked — return 0 if FILE is already a dcfiles-managed symlink
# A file is "tracked" when it is a symbolic link pointing somewhere inside
# the DCFILES_HOME/config directory tree.
#
# Usage:
#   if is_tracked "$HOME/.bashrc"; then
#       msg "Already tracked"
#   fi
is_tracked() {
    local file="$1"

    # Must exist and be a symbolic link
    [[ -L "$file" ]] || return 1

    local target
    target="$(readlink "$file")"

    # Resolve to absolute path (handle relative symlinks)
    case "$target" in
        /*) ;;
        *)  target="$(cd "$(dirname "$file")" && cd "$(dirname "$target")" 2>/dev/null && pwd -P)/$(basename "$target")" ;;
    esac

    # Must point inside DCFILES_HOME/config
    [[ "$target" == "${DCFILES_HOME}/config/"* ]]
}
