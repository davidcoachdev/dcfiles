# Implementation Tracking: Dc-Dev Superflow

## Status: IN_PROGRESS

**Last Updated:** 2026-08-18  
**Current Phase:** Implement  
**Blocking Issues:** Runtime loader/dispatch evidence and the remaining I/V and T-061–T-093 coverage are still open. Legacy corpus remains separate and green.

## Task Status

| Task | Status | Notes |
|---|---|---|
| T-001 | DONE | Added additive scope manifest. |
| T-002 | DONE | Added forbidden dependency scanner contract and tests. |
| T-003 | DONE | Added capability admission with setup-required behavior. |
| T-004 | DONE | Added loader export contract. |
| T-005 | DONE | Added expanded result contract and safety tests. |
| T-006 | DONE | Added explicit model selection; unavailable requested model never substitutes. |
| T-007 | DONE | Added RED/GREEN/REFACTOR receipt ledger. |
| T-008 | DONE | Added provenance and data-only trust boundary. |
| T-009 | DONE | Added P0/P1 and independent-review gate. |
| T-010 | DONE | Added five-iteration controller and publication lock. |
| T-011 | DONE | Added seven narrow `dc-dev-superflow-*` agents. |
| T-012 | DONE | Added sixteen contract-tested `dc-dev-superflow-*` skills. |
| T-013 | DONE | Added additive child registration and parent permission allowlist; backup created first. |
| T-014 | DONE | Added tests, schema, tracking artifacts, and `fixtures/dc-dev-superflow/README.md`; tests use inline fixtures. |
| T-015–T-016, T-018 | DONE | Model/capability, provenance, and optional transport adapters implemented. |
| T-017 | DONE | Caveman reduction, helper capability detection, measurement, loss-budget fallback, and expanded literal-authority escape implemented. |
| P1-1 | DONE | Corrected current reports to new 25/25 and legacy 12/12 test counts; added stale-count regression coverage. |
| P1-2 | INCONCLUSIVE | Safe OpenCode 1.18.18 probe attempted; runtime agent resolution returned not found. See `impl/runtime-proof.md`. |
| P2-1 | DONE | Legacy corpus counts are measured from `context/kits/`, not hardcoded. |
| P2-2 | DONE | Added RED/GREEN coverage for authority-word variants. |
| P2-3 | DONE | Added Result Contract rejection regression tests for incomplete coverage. |
| I/V-001–I/V-041 | PARTIAL | Core contract coverage exists; full 125-AC implementation and independent validation remain. |
| T-061–T-093 | NOT_STARTED | Integration, runtime, adversarial, and final publication gates remain. |

## Files Created

- `agents/dc-dev-superflow-core/*.mjs` — additive control-plane contracts and adapters.
- `agents/dc-dev-superflow-*/agent.mjs` — seven narrow child-agent role contracts.
- `skills/dc-dev-superflow-*/SKILL.md` — sixteen frontmatter/workflow/failure/contract-tested skills.
- `tests/dc-dev-superflow/*.test.mjs` — strict RED→GREEN contract tests.
- `fixtures/dc-dev-superflow/README.md` — additive fixture namespace for T-014.
- `context/dc-dev-superflow/impl/runtime-proof.md` — honest runtime probe and setup-required evidence.
- `context/dc-dev-superflow/plans/dc-dev-superflow-scope.json` — approved additive scope.
- `context/dc-dev-superflow/plans/dc-dev-superflow-result.schema.json` — expanded safe result schema.
- `context/dc-dev-superflow/impl/trace.md` — namespace-local append-only iteration trace.
- `agents/dc-dev-superflow-core/coverage.mjs` — deterministic new/legacy corpus counter.
- `tests/dc-dev-superflow/iter4-contract.test.mjs` — RED/GREEN tests for P1-1/P1-2/P1-3.
- `opencode.json.bak-dc-dev-superflow-20260818` — pre-registration backup.

## Files Modified

- `opencode.json` — additive `dc-dev-superflow-*` registrations and parent child permission allowlist only.
- `agents/dc-dev-superflow-core/compression.mjs` — measurable compression and safe fallback behavior.
- `agents/dc-dev-superflow-core/result.mjs` — Result Contract coverage-count enforcement.
- `agents/dc-dev-superflow-core/schema.mjs` — isolated schema path.
- `agents/dc-dev-superflow-core/scope.mjs` — isolated namespace allowlist.
- `context/dc-dev-superflow/kits/*.md` — relocated superflow kits; legacy kits untouched.
- `context/dc-dev-superflow/plans/*.md|json` — relocated superflow plans; legacy plans untouched.
- `context/dc-dev-superflow/impl/*.md` — relocated and updated superflow tracking.

## Test Health

| Suite | Passing | Failing |
|---|---:|---:|
| New superflow focused tests | 25 | 0 |
| Existing Dc-Dev tests | 12 | 0 |

The new auditor reports 41/41 requirements and 125/125 acceptance criteria; the legacy auditor independently measures 25/25 and 88/88. New and legacy suites are run separately: 25/25 and 12/12. No existing test or implementation was changed.

## Iteration 4 Gates

- Gate 1 Build/syntax: PASS (`node --test` loads all new modules).
- Gate 2 New focused suite: PASS (25/25).
- Gate 2 Legacy suite: PASS separately (12/12); legacy test files were not edited.
- Gate 3 Corpus audit: PASS (new 41/125; legacy 25/88).
- Gate 4 Compression measurement: PASS (non-authoritative reduction >0; literal authority reduction 0; helper absence setup-required).
- Gate 5 Runtime: INCONCLUSIVE/setup-required — `opencode debug agent dc-dev-superflow-core` returned not found; no live loader/dispatch proof is claimed.
- Gate 6 Security/manual: PASS on disk; publication remains locked pending runtime and remaining task coverage.

## Dead Ends & Failed Approaches

### DE-1: Delegated exploration through `kiroExplore`
**What was attempted:** Started three read-only exploration tasks as required by the repository workflow.
**Root cause of failure:** The active Make agent has no configured permission to invoke `kiroExplore`.
**Verdict:** Do not add a fallback or substitute agent. Continue only with direct local evidence; report this capability limitation.

### DE-2: Shared kit directory for two corpora
**What was attempted:** Stored the ten superflow kits beside the five legacy kits under `context/kits/`.
**Root cause of failure:** The legacy auditor intentionally scans direct `dc-dev-*.md` files and its R1–R25 namespace collided with the new corpus.
**Verdict:** Do not reattempt. Keep superflow kits under `context/dc-dev-superflow/kits/` and report legacy/new counts separately.

## Next Work Queue

1. Implement remaining domain modules for R1–R41 and independent V tasks, preserving RED receipts.
2. Add runtime admission/dispatch integration and execute T-061–T-093.
3. Run independent Check 2 against the isolated corpus, compression evidence, Result Contract coverage, and no-edit boundary.
4. Keep publication locked until runtime evidence and remaining coverage are complete.
