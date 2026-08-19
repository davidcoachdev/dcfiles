# Dc-Dev Adversarial Audit

The adversarial audit checks front-door approval, model separation, evidence,
scope confinement, trace redaction, literal verdicts, sentinel integrity, and
P0/P1 blocking. Any unresolved P0/P1 finding produces `Verdict: REJECT`.

## Iteration 2 Evidence

- Runtime plugin is registered at `/home/dcdebian/.config/opencode/plugins/dc-dev-runtime.mjs`.
- Registered enforcement keys are limited to the probed OpenCode 1.18.18 events:
  `permission.ask`, `command.execute.before`, `tool.execute.before`, and
  `tool.execute.after`.
- Independent workspace audit output is recorded in `dc-dev-security-review.md`
  and returned `status: ok` with no findings.
- Scope tests cover canonical paths and symlink escape; approval tests cover
  attribution, expiry, revocation, and request binding.

## Iteration 3 Evidence

- The global runtime allowlist defaults explicitly to the workspace directory
  when `DC_DEV_ALLOWED_PATHS` is absent; configured comma-separated paths still
  override it.
- `tool.execute.before` and `tool.execute.after` enforce Bash path candidates;
  protected paths and outside/symlinked paths are rejected.
- Approval records are persisted as mode `0600` JSON records with actor,
  request hash, timestamps, expiry, and revocation. Entry and triage ignore
  caller-supplied approval objects and load by durable approval ID.
- T-033 real output is recorded in `dc-dev-security-review.md` with eight
  executed checks and an empty findings list.
- Disk gates pass. Live OpenCode 1.18.18 dispatch remains pending until a
  restart; this is an explicit runtime limitation, not a synthetic pass.
