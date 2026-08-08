#!/usr/bin/env bats
#
# import.bats — regression tests for the import-root discovery bug
#
# The previous `import_roots()` derived scan roots only from directories that
# *directly* contained a managed file. A newly-created subdirectory under a
# managed container whose files are all nested one level down (e.g.
# skills/newskill/ when skills/<old>/SKILL.md is the only managed content)
# was silently invisible to `sync --import`, `sync --dry-run`, and the new-file
# warning in `status`.
#
# These tests build a tiny self-contained DCFILES_HOME + HOME (no real config
# copy, no network) and assert the discovery now works.

# Resolve project root relative to this file (test/unit -> repo root).
PROJECT_ROOT="$(cd "${BATS_TEST_DIRNAME}/../.." && pwd -P)"

setup() {
    SANDBOX="$(mktemp -d)"
    export DCFILES_HOME="${SANDBOX}/dcfiles"
    export HOME="${SANDBOX}/home"
    mkdir -p "${DCFILES_HOME}" "${HOME}"

    cp -r "${PROJECT_ROOT}/lib" "${DCFILES_HOME}/"
    cp -r "${PROJECT_ROOT}/bin" "${DCFILES_HOME}/"
    printf 'node_modules/\n.git/\n' > "${DCFILES_HOME}/.dcfilesignore"

    git -C "${DCFILES_HOME}" init -q -b main
    git -C "${DCFILES_HOME}" config user.email "test@dcfiles.dev"
    git -C "${DCFILES_HOME}" config user.name "dcfiles test"
}

teardown() {
    [[ -n "${SANDBOX:-}" && -d "${SANDBOX}" ]] && rm -rf "${SANDBOX}"
}

# Helper: stage a managed file + corresponding symlink in $HOME.
stage_managed() {
    local rel="$1" content="$2"
    local dest="${DCFILES_HOME}/config/${rel}"
    mkdir -p "$(dirname "$dest")"
    printf '%s\n' "$content" > "$dest"
    mkdir -p "$(dirname "${HOME}/${rel}")"
    ln -sf "$dest" "${HOME}/${rel}"
}

@test "sync --dry-run discovers a new nested subdir under a container (skills-style)" {
    stage_managed ".config/app/skills/oldskill/SKILL.md" "old"
    # New plugin directory — no corresponding entry in config/ yet.
    mkdir -p "${HOME}/.config/app/skills/newskill"
    printf 'new\n' > "${HOME}/.config/app/skills/newskill/SKILL.md"

    run "${DCFILES_HOME}/bin/dcfiles" sync --dry-run
    [[ "$status" -eq 0 ]]
    [[ "$output" == *"skills/newskill/SKILL.md"* ]]
}

@test "sync --dry-run still discovers a new flat file under a managed dir" {
    stage_managed ".config/opencode/plugins/existing.ts" "p"
    printf 'fresh\n' > "${HOME}/.config/opencode/plugins/fresh.ts"

    run "${DCFILES_HOME}/bin/dcfiles" sync --dry-run
    [[ "$status" -eq 0 ]]
    [[ "$output" == *"plugins/fresh.ts"* ]]
}

@test "sync --import (yes) actually imports a new nested subdir" {
    stage_managed ".config/app/skills/oldskill/SKILL.md" "old"
    mkdir -p "${HOME}/.config/app/skills/newskill"
    printf 'new\n' > "${HOME}/.config/app/skills/newskill/SKILL.md"

    run "${DCFILES_HOME}/bin/dcfiles" sync --import -y
    [[ "$status" -eq 0 ]]
    [[ "$output" == *"Imported 1"* ]]

    # Landed in config/ and symlinked back into $HOME.
    [[ -f "${DCFILES_HOME}/config/.config/app/skills/newskill/SKILL.md" ]]
    [[ -L "${HOME}/.config/app/skills/newskill/SKILL.md" ]]
}

@test "status warns about new files in nested subdirs" {
    stage_managed ".config/app/skills/oldskill/SKILL.md" "old"
    mkdir -p "${HOME}/.config/app/skills/newskill"
    printf 'new\n' > "${HOME}/.config/app/skills/newskill/SKILL.md"

    run "${DCFILES_HOME}/bin/dcfiles" status
    [[ "$status" -eq 0 ]]
    [[ "$output" == *"new file(s) in managed directories"* ]]
}

@test "sync --dry-run does NOT import unmanaged sibling trees (e.g. gcloud)" {
    # Managed subtree with a nested file (no direct file in the container).
    stage_managed ".config/opencode/skills/oldskill/SKILL.md" "old"
    # New plugin directory under the managed subtree — SHOULD be discovered.
    mkdir -p "${HOME}/.config/opencode/skills/newskill"
    printf 'new\n' > "${HOME}/.config/opencode/skills/newskill/SKILL.md"
    # Unmanaged sibling tree under .config (machine state) — MUST be ignored.
    mkdir -p "${HOME}/.config/gcloud"
    printf 'MACHINE STATE\n' > "${HOME}/.config/gcloud/active_config"
    printf 'uuid\n' > "${HOME}/.config/gcloud/.metricsUUID"

    run "${DCFILES_HOME}/bin/dcfiles" sync --dry-run
    [[ "$status" -eq 0 ]]
    [[ "$output" == *"skills/newskill/SKILL.md"* ]]
    # The junk sibling must never be reported.
    [[ "$output" != *"gcloud"* ]]
}
