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

# die — print red error message and exit with optional status code
# Usage:  die [<code>] "message"        (default code is 1)
die() {
    local code=1
    if [[ "$1" =~ ^[0-9]+$ ]]; then
        code="$1"
        shift
    fi
    printf "${RED}ERROR:${RESET} %s\n" "$*" >&2
    exit "$code"
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

# ---------------------------------------------------------------------------
# Ignore rules (.dcfilesignore)
# ---------------------------------------------------------------------------

# Pattern cache — populated on first use by load_ignore_patterns.
_DCFILES_IGNORE_LOADED=""
_DCFILES_IGNORE_PATTERNS=()

# load_ignore_patterns — read $DCFILES_HOME/.dcfilesignore into the cache
#
# Blank lines and `#` comments are dropped. Leading/trailing whitespace is
# trimmed. Missing file is not an error — it just means "ignore nothing".
#
# _DCFILES_IGNORE_LOADED is set to "1" ONLY after the file has been read, so
# the cache is genuinely populated. An external `[[ -n "$_DCFILES_IGNORE_LOADED" ]]`
# guard elsewhere must NOT flip this to non-empty before the read happens — that
# would skip the load entirely and silently match nothing.
load_ignore_patterns() {
    [[ "$_DCFILES_IGNORE_LOADED" == "1" ]] && return 0
    _DCFILES_IGNORE_PATTERNS=()
    _DCFILES_IGNORE_LOADED="1"

    local file="${DCFILES_HOME}/.dcfilesignore"
    [[ -f "$file" ]] || return 0

    local line
    while IFS= read -r line || [[ -n "$line" ]]; do
        line="${line%%#*}"                          # strip comment
        line="${line#"${line%%[![:space:]]*}"}"     # ltrim
        line="${line%"${line##*[![:space:]]}"}"     # rtrim
        [[ -z "$line" ]] && continue
        _DCFILES_IGNORE_PATTERNS+=("$line")
    done < "$file"
}

# is_ignored — return 0 if a $HOME-relative path matches an ignore pattern
#
# Matching rules:
#   "name/"     bare directory name — matches that component at any depth
#   "a/b/"      anchored directory  — matches the path prefix a/b only
#   "a/b/*.ext" path glob           — matched against the whole relative path
#   "*.ext"     basename glob       — matched against the filename only
#
# The anchored form is what lets `.config/tmux/plugins/` be excluded while
# `.config/opencode/plugins/` stays managed.
#
# Usage:
#   is_ignored ".config/opencode/node_modules/x.js"   # → 0 (ignored)
is_ignored() {
    local rel="$1"
    load_ignore_patterns

    [[ ${#_DCFILES_IGNORE_PATTERNS[@]} -eq 0 ]] && return 1

    local pat dir
    for pat in "${_DCFILES_IGNORE_PATTERNS[@]}"; do
        if [[ "$pat" == */ ]]; then
            dir="${pat%/}"
            if [[ "$dir" == */* ]]; then
                # Anchored directory — match as a prefix of the relative path
                [[ "$rel" == "$dir"/* ]] && return 0
            else
                # Bare directory name — match a whole component at any depth
                [[ "/${rel}/" == *"/${dir}/"* ]] && return 0
            fi
        elif [[ "$pat" == */* ]]; then
            # Path glob — match against the full relative path
            # shellcheck disable=SC2053
            [[ "$rel" == $pat ]] && return 0
        else
            # Basename glob
            # shellcheck disable=SC2053
            [[ "${rel##*/}" == $pat ]] && return 0
        fi
    done

    return 1
}

# Largest file dcfiles will import, in bytes. Override with DCFILES_MAX_SIZE.
# A dotfiles repo holds text config; a 150 MB ELF binary sitting in a config
# directory is not something you want in git history.
DCFILES_MAX_SIZE="${DCFILES_MAX_SIZE:-1048576}"   # 1 MiB

# within_size_limit — return 0 if FILE is small enough to import
within_size_limit() {
    local file="$1"
    local size
    size="$(stat -c %s "$file" 2>/dev/null || printf '0')"
    [[ "$size" -le "$DCFILES_MAX_SIZE" ]]
}

# walk_files — print NUL-separated files under a root, pruning ignored dirs
#
# Emits regular files and symlinks. Directories excluded by a `…/` pattern in
# .dcfilesignore are pruned, so their contents are never even stat'ed. This is
# what keeps a node_modules tree from costing 30k stat calls per scan.
#
# Args:
#   $1  root — absolute directory to walk
walk_files() {
    local root="$1"
    [[ -d "$root" ]] || return 0

    load_ignore_patterns

    local -a prune=()
    local pat dir
    if [[ ${#_DCFILES_IGNORE_PATTERNS[@]} -gt 0 ]]; then
        for pat in "${_DCFILES_IGNORE_PATTERNS[@]}"; do
            [[ "$pat" == */ ]] || continue
            dir="${pat%/}"
            if [[ "$dir" == */* ]]; then
                prune+=(-path "*/${dir}" -o)
            else
                prune+=(-name "$dir" -o)
            fi
        done
    fi

    if [[ ${#prune[@]} -gt 0 ]]; then
        unset "prune[$(( ${#prune[@]} - 1 ))]"   # drop trailing -o
        find "$root" \( -type d \( "${prune[@]}" \) -prune \) -o \
                     \( \( -type f -o -type l \) -print0 \)
    else
        find "$root" \( -type f -o -type l \) -print0
    fi
}
