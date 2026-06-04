#!/usr/bin/env bash
#
# install.sh — Bootstrap dcfiles dotfile management
#
# Usage:
#   git clone <repo> ~/dcfiles && ~/dcfiles/install.sh
#
# What it does:
#   1. Verify dependencies (bash >= 4.0, git, ln, cp, readlink)
#   2. Resolve $DCFILES_HOME (default: ~/dcfiles)
#   3. Clone the repo if $DCFILES_HOME does not exist
#   4. Deploy all symlinks via lib/symlink.sh deploy_all()
#   5. Symlink bin/dcfiles to ~/.local/bin/dcfiles
#   6. Warn if ~/.local/bin is not in $PATH
#
# Requires: bash 4.0+, git, coreutils (ln, cp, readlink)

set -euo pipefail

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
script_dir="$(cd "$(dirname "$0")" && pwd -P)"
DCFILES_HOME="${DCFILES_HOME:-$HOME/dcfiles}"
REPO_URL="${REPO_URL:-}"

# ---------------------------------------------------------------------------
# Dependency check
# ---------------------------------------------------------------------------
missing_deps=()
for cmd in bash git ln cp readlink; do
    command -v "$cmd" >/dev/null 2>&1 || missing_deps+=("$cmd")
done

if [[ ${#missing_deps[@]} -gt 0 ]]; then
    echo "ERROR: Missing required dependencies: ${missing_deps[*]}" >&2
    echo "Please install them and re-run install.sh" >&2
    exit 1
fi

# bash version check
if [[ "${BASH_VERSINFO[0]:-0}" -lt 4 ]]; then
    echo "ERROR: bash >= 4.0 required (found ${BASH_VERSION})" >&2
    exit 1
fi

# ---------------------------------------------------------------------------
# Clone repo if missing
# ---------------------------------------------------------------------------
if [[ ! -d "$DCFILES_HOME" ]]; then
    if [[ -z "$REPO_URL" ]]; then
        # Try to detect from current repo's remote
        REPO_URL="$(git -C "$script_dir" remote get-url origin 2>/dev/null || true)"
    fi

    if [[ -z "$REPO_URL" ]]; then
        echo "ERROR: $DCFILES_HOME does not exist and REPO_URL is not set." >&2
        echo "  Either clone the repo manually:" >&2
        echo "    git clone <repo-url> $DCFILES_HOME" >&2
        echo "  Or set REPO_URL and re-run:" >&2
        echo "    REPO_URL=<repo-url> $0" >&2
        exit 1
    fi

    echo "==> Cloning dcfiles to ${DCFILES_HOME}..."
    git clone "$REPO_URL" "$DCFILES_HOME"
fi

# ---------------------------------------------------------------------------
# Source shared libraries
#   Use $(dirname "$0") relative path — works when install.sh is inside
#   the repo. DCFILES_HOME is set so lib/symlink.sh can resolve utils.sh.
# ---------------------------------------------------------------------------
source "${script_dir}/lib/utils.sh"
source "${script_dir}/lib/symlink.sh"

# ---------------------------------------------------------------------------
# Deploy all symlinks
# ---------------------------------------------------------------------------
msg "Deploying dotfiles to ${HOME}..."
deploy_all

# ---------------------------------------------------------------------------
# Symlink CLI binary
# ---------------------------------------------------------------------------
mkdir -p "$HOME/.local/bin"
ln -sf "${DCFILES_HOME}/bin/dcfiles" "$HOME/.local/bin/dcfiles"
msg "Linked: ~/.local/bin/dcfiles → dcfiles/bin/dcfiles"

# ---------------------------------------------------------------------------
# PATH check
# ---------------------------------------------------------------------------
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
    warn "$HOME/.local/bin is not in PATH"
    warn "Add the following to your shell rc file:"
    warn "  export PATH=\"\$HOME/.local/bin:\$PATH\""
fi

msg "Installation complete!"
