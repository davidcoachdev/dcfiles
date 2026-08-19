# Security Review

The review covers approval boundaries, runtime allowlists, redaction,
protected paths, traversal and symlink escape, scope stop, and evidence
integrity. P0/P1 findings block approval.

## T-033 Independent Workspace Audit Evidence

Command executed from `/home/dcdebian/.config/opencode`:

```text
node context/fixtures/security/workspace-audit.mjs
```

Real output:

```json
{
  "status": "ok",
  "checksExecuted": [
    "config-permissions",
    "hardcoded-secrets",
    "protected-paths",
    "hook-config",
    "runtime-write-scope",
    "bash-scope",
    "approval-durability",
    "trace-consistency"
  ],
  "findings": []
}
```

The audit executes nine checks against the current workspace: config file
permissions, hardcoded provider secrets, protected-path behavior, hook
configuration, valid and symlinked runtime writes, Bash scope confinement,
durable approval storage and permissions, and trace verdict consistency. It
uses temporary fixtures for mutation and approval checks and is independent
of artifact-existence tests. Live OpenCode dispatch remains a separate
  restart-dependent check and is not represented as passed here.

Actual Iteration 4 command evidence:

```text
$ node context/fixtures/security/workspace-audit.mjs
{"status":"ok","checksExecuted":["config-permissions","hardcoded-secrets","config-protected-paths","protected-paths","hook-config","runtime-write-scope","bash-scope","approval-durability","trace-consistency"],"findings":[]}
```

The targeted native-shape suite ran 12 tests with `12 pass, 0 fail`. Its write
cases pass absolute `filePath` values, including an allowed workspace target,
`/tmp/outside.md`, a workspace `.env`, and a symlink; the latter three are
rejected by the scope/protected-path gates.

## Iteration 4 security evidence

- The audit reads the real `opencode.json` from disk and checks file mode,
  provider-secret patterns, and configured read-deny entries for key,
  certificate, AWS, GitHub-host, environment, SSH, credential, and secret
  paths.
- Scope tests use absolute `filePath` arguments matching the native write tool
  contract. Relative paths remain accepted only by the internal guard API.
- Bash tests reject `source`, `find -exec`, and environment-variable
  indirection. This is not a complete shell sandbox; residual risk is
  documented in the threat model.
- Approval records default to the workspace-anchored
  `context/impl/.dc-dev-approvals.json` path, independent of current working
  directory. `actor` is an application-supplied identity assertion: it is
  request-bound, expiring, and revocable, but is not OS-level provenance or
  cryptographic human identity proof. A trusted caller boundary is required.
