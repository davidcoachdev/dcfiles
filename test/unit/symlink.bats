#!/usr/bin/env bats
#
# symlink.bats — Unit tests for the symlink engine (lib/symlink.sh)
#
# Covers R-002: two-pass deploy, hostname overrides, backup logic, idempotency.

load ../helpers/common

setup() {
    setup_sandbox
}

teardown() {
    teardown_sandbox
}

# ---------------------------------------------------------------------------
# Basic deployment
# ---------------------------------------------------------------------------

@test "deploy_all creates symlinks for all config files" {
    deploy_all

    # Each fixture file should be symlinked into $HOME/<subdir>/
    [[ -L "${HOME}/bash/.bashrc" ]]
    [[ -L "${HOME}/git/.gitconfig" ]]
    [[ -L "${HOME}/tmux/.tmux.conf" ]]
}

@test "symlink points to correct config path" {
    deploy_all

    local target
    target="$(readlink "${HOME}/bash/.bashrc")"
    # The relative symlink should point into config/bash/.bashrc
    [[ "$target" == *"config/bash/.bashrc" ]]
}

@test "deploy_all creates all expected symlinks from fixtures" {
    deploy_all

    # Count symlinks — should match non-override files in config/
    local link_count file_count
    link_count="$(find "${HOME}" -type l | wc -l)"
    file_count="$(find "${DCFILES_HOME}/config" -type f | wc -l)"

    # In default state (no overrides), every config file gets a symlink
    [[ "$link_count" -eq "$file_count" ]]
}

# ---------------------------------------------------------------------------
# Hostname override resolution
# ---------------------------------------------------------------------------

@test "hostname override wins over base file" {
    local hn="testbox"
    mock_hostname "$hn"

    # Create override file matching the mocked hostname
    echo "# override for testbox" > "${DCFILES_HOME}/config/bash/.bashrc.${hn}"

    deploy_all

    # The bash/.bashrc symlink should point to the override file
    local target
    target="$(readlink "${HOME}/bash/.bashrc")"
    [[ "$target" == *".bashrc.${hn}" ]] || {
        echo "Expected symlink target to contain .bashrc.${hn}, got: ${target}"
        return 1
    }
}

@test "hostname no-match falls back to base file" {
    mock_hostname "laptop"

    # Create override file for a DIFFERENT hostname
    echo "# override for terminus" > "${DCFILES_HOME}/config/bash/.bashrc.terminus"

    deploy_all

    # bash/.bashrc should link to the base file, NOT the terminus override
    local target
    target="$(readlink "${HOME}/bash/.bashrc")"
    [[ "$target" == *"config/bash/.bashrc" ]] && [[ "$target" != *".bashrc.terminus" ]]
}

@test "override file itself is not deployed as a separate symlink" {
    local hn="testbox"
    mock_hostname "$hn"

    echo "# override" > "${DCFILES_HOME}/config/bash/.bashrc.${hn}"

    deploy_all

    # The .bashrc.testbox file should NOT have its own symlink in $HOME
    [[ ! -f "${HOME}/bash/.bashrc.testbox" ]]
    [[ ! -L "${HOME}/bash/.bashrc.testbox" ]]
}

# ---------------------------------------------------------------------------
# Backup behavior
# ---------------------------------------------------------------------------

@test "existing regular file is backed up before symlink creation" {
    # Create a regular file at the target location BEFORE deploy
    mkdir -p "${HOME}/bash"
    echo "# existing bashrc" > "${HOME}/bash/.bashrc"

    deploy_all

    # Original should be backed up
    [[ -f "${HOME}/bash/.bashrc.dcfiles.bak" ]]

    # And the original location should now be a symlink
    [[ -L "${HOME}/bash/.bashrc" ]]

    # Backup content should match the original
    local bak_content
    bak_content="$(cat "${HOME}/bash/.bashrc.dcfiles.bak")"
    [[ "$bak_content" == "# existing bashrc" ]]
}

@test "existing dcfiles symlink is NOT backed up" {
    deploy_all

    # Now create a non-symlink file for a different config entry
    rm "${HOME}/git/.gitconfig"
    echo "# manual gitconfig" > "${HOME}/git/.gitconfig"

    # Re-run deploy — should back up git/.gitconfig
    deploy_all

    # bash/.bashrc was already a dcfiles symlink — should NOT have a backup
    [[ ! -f "${HOME}/bash/.bashrc.dcfiles.bak" ]]

    # git/.gitconfig was a regular file — SHOULD have a backup
    [[ -f "${HOME}/git/.gitconfig.dcfiles.bak" ]]
}

# ---------------------------------------------------------------------------
# Idempotency
# ---------------------------------------------------------------------------

@test "re-running deploy_all does not change existing symlinks (idempotent)" {
    deploy_all

    # Record symlink targets after first run
    local target1
    target1="$(readlink "${HOME}/bash/.bashrc")"

    # Also create a backup-snapshot marker
    local bak_count1
    bak_count1="$(find "${HOME}" -name '*.dcfiles.bak' | wc -l)"

    # Run deploy_all again
    deploy_all

    # Symlink target should be unchanged
    local target2
    target2="$(readlink "${HOME}/bash/.bashrc")"
    [[ "$target1" == "$target2" ]]

    # No new backups should have been created (no regular files to overwrite)
    local bak_count2
    bak_count2="$(find "${HOME}" -name '*.dcfiles.bak' | wc -l)"
    [[ "$bak_count2" -eq "$bak_count1" ]]
}

@test "deploy_all does not fail on empty config directory" {
    # Temporarily empty config dir
    local config_backup
    config_backup="$(mktemp -d "/tmp/dcfiles-config-backup.XXXXXX")"
    mv "${DCFILES_HOME}/config"/* "$config_backup/" 2>/dev/null || true

    run deploy_all
    [[ "$status" -eq 0 ]]

    # Restore config
    mv "$config_backup"/* "${DCFILES_HOME}/config/" 2>/dev/null || true
    rm -rf "$config_backup"
}

# ---------------------------------------------------------------------------
# _link helper
# ---------------------------------------------------------------------------

@test "_link creates relative symlink" {
    local src="${DCFILES_HOME}/config/bash/.bashrc"
    mkdir -p "${HOME}/bash"

    _link "$src" ".bashrc" "bash"

    local target
    target="$(readlink "${HOME}/bash/.bashrc")"
    # Must be a relative path (starting with ../ or ./)
    [[ "$target" != /* ]] || {
        echo "Expected relative symlink, got absolute: ${target}"
        return 1
    }
    # Must resolve to the correct file
    [[ "$(readlink -f "${HOME}/bash/.bashrc")" == "$(readlink -f "$src")" ]]
}

@test "_link creates parent directory when it does not exist" {
    local src="${DCFILES_HOME}/config/bash/.bashrc"

    # target dir does not exist yet
    [[ ! -d "${HOME}/bash" ]]

    _link "$src" ".bashrc" "bash"

    # Parent should have been created
    [[ -d "${HOME}/bash" ]]
    [[ -L "${HOME}/bash/.bashrc" ]]
}
