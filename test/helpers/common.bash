#!/usr/bin/env bash
#
# common.bash — Shared test helpers for dcfiles bats tests
#
# Provides:
#   setup_sandbox       — creates temp $HOME with fixture config tree
#   teardown_sandbox    — removes temp directory
#   mock_hostname       — overrides hostname -s for testing
#
# Source this from your bats test file BEFORE setup():
#   load ../helpers/common
#
# NOTE: Do NOT add `set -euo pipefail` here — it interacts badly with bats
# internals. The project libs (utils.sh, symlink.sh) already set it and are
# sourced only at call time inside test functions.

# Resolve DCFILES_HOME to the project root (two levels up from this file's dir)
_DCFILES_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd -P)"
DCFILES_HOME="${DCFILES_HOME:-$_DCFILES_ROOT}"
export DCFILES_HOME

# Source the project libraries for test access
source "${DCFILES_HOME}/lib/utils.sh"
source "${DCFILES_HOME}/lib/symlink.sh"

# ---------------------------------------------------------------------------
# Hostname mock
# ---------------------------------------------------------------------------

# mock_hostname — replace the hostname command with a function that returns
# a fixed value. Use this to test hostname-specific override files without
# depending on the actual machine's hostname.
#
# Usage:  mock_hostname "terminus"
mock_hostname() {
    local name="$1"
    eval "hostname() { echo '${name}'; }"
    export -f hostname
}

# restore_hostname — remove the mock and use the real hostname again
restore_hostname() {
    unset -f hostname 2>/dev/null || true
}

# ---------------------------------------------------------------------------
# Sandbox helpers
# ---------------------------------------------------------------------------

# setup_sandbox — create a temporary sandbox directory mimicking $HOME
# with a sample config tree matching the real config/ structure.
#
# Post-conditions:
#   SANDBOX  — path to the temporary directory
#   HOME     — redirected to SANDBOX
setup_sandbox() {
    SANDBOX="$(mktemp -d "/tmp/dcfiles-test.XXXXXX")"
    export HOME="${SANDBOX}"

    # Ensure the project fixture config exists (Phase 1 fixtures)
    mkdir -p "${DCFILES_HOME}/config/bash"
    mkdir -p "${DCFILES_HOME}/config/git"
    mkdir -p "${DCFILES_HOME}/config/tmux"

    # Write fixture files if they don't already exist (idempotent)
    [[ -f "${DCFILES_HOME}/config/bash/.bashrc" ]] || \
        echo '# test bashrc' > "${DCFILES_HOME}/config/bash/.bashrc"
    [[ -f "${DCFILES_HOME}/config/git/.gitconfig" ]] || \
        echo '# test gitconfig' > "${DCFILES_HOME}/config/git/.gitconfig"
    [[ -f "${DCFILES_HOME}/config/tmux/.tmux.conf" ]] || \
        echo '# test tmux.conf' > "${DCFILES_HOME}/config/tmux/.tmux.conf"

    msg "Sandbox: HOME=${HOME}"
}

# teardown_sandbox — clean up the temporary sandbox directory
teardown_sandbox() {
    if [[ -n "${SANDBOX:-}" && -d "$SANDBOX" ]]; then
        rm -rf "$SANDBOX"
        msg "Cleaned sandbox: ${SANDBOX}"
    fi
}

# ---------------------------------------------------------------------------
# Integration sandbox
# ---------------------------------------------------------------------------

# setup_integration_sandbox — create an isolated environment with its own
# DCFILES_HOME (a temporary git repo) and HOME. Used by CLI integration tests
# to avoid side effects on the real project repo.
#
# Post-conditions:
#   SANDBOX     — path to the temporary directory
#   HOME        — redirected to SANDBOX/home
#   DCFILES_HOME — redirected to SANDBOX/dcfiles (initialised git repo with
#                  lib/, bin/, config/ copied from the real project)
#   real_dcfiles_home — saved original project root for reference
setup_integration_sandbox() {
    SANDBOX="$(mktemp -d "/tmp/dcfiles-integration.XXXXXX")"
    export HOME="${SANDBOX}/home"
    mkdir -p "$HOME"

    local fake_dcfiles="${SANDBOX}/dcfiles"
    mkdir -p "$fake_dcfiles"

    # Copy project structure into the sandbox
    cp -r "${DCFILES_HOME}/lib"   "${fake_dcfiles}/lib"
    cp -r "${DCFILES_HOME}/bin"   "${fake_dcfiles}/bin"
    cp -r "${DCFILES_HOME}/config" "${fake_dcfiles}/config"

    export DCFILES_HOME="$fake_dcfiles"

    # Source the libs from the new DCFILES_HOME
    source "${DCFILES_HOME}/lib/utils.sh"
    source "${DCFILES_HOME}/lib/symlink.sh"

    # Initialise a git repo inside the fake DCFILES_HOME
    git -C "$DCFILES_HOME" init
    git -C "$DCFILES_HOME" config user.email "test@dcfiles.dev"
    git -C "$DCFILES_HOME" config user.name "dcfiles test"
    git -C "$DCFILES_HOME" add -A
    git -C "$DCFILES_HOME" commit -m "initial test state" 2>/dev/null || true

    msg "Integration sandbox: HOME=${HOME} DCFILES_HOME=${DCFILES_HOME}"
}

# teardown_integration_sandbox — clean up the integration sandbox
teardown_integration_sandbox() {
    teardown_sandbox
}
