# Final Verification

Final verification requires JSON validation, all `tests/dc-dev/` tests, runtime
probe, model separation, security review, scope audit, secret scan, and
`git diff --check` where a Git repository is available.

## Iteration 3 disk evidence

- `node --test agents/dc-dev/**/*.test.mjs hooks/dc-dev/**/*.test.mjs tests/dc-dev/**/*.test.mjs`: **36 passed, 0 failed**.
- `node context/fixtures/security/workspace-audit.mjs`: **status `ok`**, eight checks executed, `findings: []`.
- JSON parsing, module loading, and model-separation tests pass.
- `git diff --check` is unavailable because this workspace is not a Git repository.
- Live OpenCode 1.18.18 plugin dispatch is pending a restart and is intentionally not claimed as passed.
