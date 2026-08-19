# Dc-Dev Superflow — Check 2 (independent, disk-literal)

**Phase:** Check (post-Make iteration 4/5) · **Date:** 2026-08-18 · **Reviewer:** independent check agent (separate from builder)
**Method:** every number below was re-derived live from disk during this check (glob-based `node --test` runs of both suites, live `auditSuperflowKits()` and legacy `kit-coverage.mjs` executions, live `validateResult()` rejection probes, live compression module review, recursive JSON deep-diff of `opencode.json` vs `opencode.json.bak-dc-dev-superflow-20260818`, full-tree mtime sweep at cutoff 2026-08-18T05:43:00Z, forbidden/exec/secret scan over 60 new-namespace files). The Make report was used only as a claim to falsify.

## 1. Evidence base (commands actually executed)

- `node --test tests/dc-dev-superflow/*.test.mjs` → **25 tests, 25 pass, 0 fail**.
- `node --test $(find tests/dc-dev -name '*.test.mjs')` (legacy, run separately) → **12 tests, 12 pass, 0 fail** — including the previously-failing `all Dc-Dev kits contain exactly 25 requirements and 88 acceptance criteria`, now green via kit relocation (legacy test files untouched: mtimes 02:09–02:16Z, pre-flow).
- `auditSuperflowKits("context/dc-dev-superflow/kits")` (live) → `{files:10, requirements:{expected:41,actual:41}, acceptance_criteria:{expected:125,actual:125}, duplicate_requirement_ids:[], legacy:{requirements:25,acceptance_criteria:88}}`.
- `node tests/dc-dev/kit-coverage.mjs` (live legacy auditor) → 5 files, 25/25 requirements, 88/88 AC, no duplicates, no malformed.
- Live `validateResult()` probes: valid→`ok`; missing `coverage`→`blocked/contract-invalid`; non-integer counts→`blocked/contract-invalid`; missing `legacy` corpus→`blocked/contract-invalid`.
- Recursive deep-diff `opencode.json` vs pre-registration backup → **8 added paths, 0 removed, 0 value-changes** (7 `dc-dev-superflow-*` hidden subagent registrations + one `agent.dc-dev.permission` allowlist key on the existing `dc-dev` parent; all other parent keys unchanged).
- Full-tree mtime sweep (cutoff 05:43:00Z): 92 files changed — 63 on approved additive surface; the rest are harness artifacts (`kiro.db*`, `kiro-logs/`, `context-mode/*`) plus `context/impl/trace.md`, which the **legacy dc-dev runtime hook auto-appends to** (entries log this check's own tool calls at 06:23–06:29Z) — harness activity, not a Make write.
- Scan of 60 new-namespace files: forbidden-family refs = 7, **all denial-enforcement** (FORBIDDEN regex constants in `routing.mjs`/`scope.mjs`, blocked-assertions, `doesNotMatch` contract tests — acceptable per input #6); exec/child_process = 0; network = 0; secrets = 0.

## 2. Verification of the 8 required evidence items

| # | Required evidence | Result | Detail |
|---|---|---|---|
| 1 | 10 kits in new namespace; 0 superflow files in `context/kits/` | **Complete ✓** | 10× `dc-dev-superflow-*.md` in `context/dc-dev-superflow/kits/`; `context/kits/` holds only the 5 legacy kits |
| 2 | Parser reports 41/125 and 25/88 separately | **Complete ✓ (P2-1)** | Live 41/41, 125/125, no dup IDs; legacy reported separately — but as a **hardcoded constant**, not a measurement (see P2-1) |
| 3 | New suite green; legacy run separately and **reported literally** | **Partial ✗ (P1-1)** | Both suites green live (25/25 and 12/12) but trace + tracking report legacy as "10/10" and Test Health says new = 24 (live: 25). Literal-reporting requirement violated |
| 4 | Compression: measurable non-authoritative reduction, reversible originals, literal transport for authoritative content, setup-required/safe no-compression when helpers unavailable | **Complete ✓ (P2-2)** | Real regex Caveman reduction with computed `measuredLoss`; `retrieveCompressed` returns original; literal on `mode:"literal"` \| `authoritative` \| AUTHORITATIVE regex (security/approval/receipt/evidence/verdict/provenance/irreversible/secret/P0/P1); missing requested helper → `setup-required` with measuredLoss 0 (no fake savings); helper error/non-shrink/loss-exceeded → safe fallback. Keyword gaps → P2-2 |
| 5 | Result Contract rejects missing/invalid corpus counts; carries both corpus counts + test counts | **Complete ✓ (P2-3)** | Live probes reject missing coverage, non-integer counts, missing legacy corpus; `validCoverage` requires integer `requirements`/`acceptance_criteria`/`tests` on both corpora. No rejection-path regression test in suite (P2-3); `tests: 0` accepted |
| 6 | No forbidden executable dependency or hidden fallback | **Complete ✓** | 0 exec/network/secret across 60 files; 7 forbidden refs all enforce denial |
| 7 | Config diff = 8 additive paths, 0 removals, 0 value changes | **Complete ✓** | Exactly 8 added (7 hidden subagents + parent `permission` allowlist); 0 removed; 0 changed. Coordinator-only `delegate` with `{"*":"deny","dc-dev-superflow-*":"allow"}`; builder/verifier model inequality preserved |
| 8 | Runtime/recovery/provenance/TTS/model-capability + I/V/T coverage classified PASS/OPEN/INCONCLUSIVE | **Partial (P1-2)** | Runtime loader/dispatch honestly **OPEN** (no superflow runtime/boot/dispatch artifact exists on disk; only the legacy hook trace is live). Recovery/provenance/TTS-isolation/model-setup-required: PASS at unit/contract level. I/V-001–041 honestly PARTIAL. Two classification data points inaccurate (P1-1 counts; T-014 "fixtures" DONE vs absent `fixtures/dc-dev-superflow/`) |

## 3. Claim-by-claim verdict on Make's statements

| Make claim | Disk truth | Verdict |
|---|---|---|
| New tests 25/25 | 25 tests, 25 pass, 0 fail (live) | TRUE |
| Legacy 10/10 | 12 tests, 12 pass, 0 fail (live, recursive) | **FALSE count, TRUE substance** — all green, none edited, but literal count is wrong |
| Kits 41/125 isolated | 10 kits, 41/41 R, 125/125 AC, 0 superflow files in legacy dir | TRUE |
| Config additive | 8 added / 0 removed / 0 changed vs backup | TRUE |
| Runtime loader/dispatch open | No runtime proof artifact exists; declared OPEN | TRUE (honest) |

## 4. Gap analysis (vs plan register, 133 tasks)

| Group | Plan tasks | Status | Evidence |
|---|---|---|---|
| W0 contracts | T-001–T-010 (10) | Complete | 16 core modules; 25/25 live suite |
| W1–W2 domain | I-001–I-041 (41) | Partial | contract proxies exist; full AC-set implementation absent (honestly tracked) |
| W3 components | T-011–T-018 (8) | 7 Complete, 1 Partial | T-014 "fixtures" DONE claim contradicts absent `fixtures/dc-dev-superflow/` (inline fixtures used) |
| W4 validation | V-001–V-041 (41) | Partial (proxy level) | no test enumerates any requirement's full AC set; 125-aggregate bar not yet met |
| W5 integration | T-061–T-070 (10) | Missing | no artifacts |
| W6 gates | T-071–T-080 (10) | T-071 Partial (corpus totals counted, no AC→test mapping), rest Missing | compression/coverage gates partially covered by iter4 tests |
| W7 runtime | T-081–T-090 (10) | Missing | no runtime probe evidence; loader/boot unproven (declared OPEN) |
| W8 final loop | T-091–T-093 (3) | Missing | iteration controller exists (unit); final sweeps/reports absent |

**Totals: Complete 17, Partial 84, Missing 32, Over-built 0** (133 tasks). Formal AC-enumerated validation remains far below the 125/125 bar; unit-contract proxies ≈15/41 requirement domains.

## 5. Peer review findings (independent; "find what the builder missed")

### P0 — none found.

### P1 (block advancement)

1. **Legacy suite count misreported — recurrence of Check-1 P1-3 class after explicit feedback.** Trace ("10/10 tests pass"), tracking Gate 2 ("10/10") and Test Health ("Existing Dc-Dev tests: 10") all disagree with the live recursive run: **12 tests / 12 pass** (12 `*.test.mjs` files exist under `tests/dc-dev/` incl. subdirs). Test Health also lists new suite as 24 (live: 25, matching Gate 2's own 25/25 — the doc contradicts itself). Check-1's feedback item #1 demanded true legacy counts; the correction regressed. Evidence-integrity violation of required evidence #3 ("reported literally").
2. **Runtime loader/dispatch evidence absent (publication gate unmet).** No artifact on disk demonstrates a real OpenCode boot with the 7 hidden subagent registrations, an actual dispatch through the coordinator allowlist, or the `{file:…}`/loader forms (T-061/T-085 class; plan blocker #3). Honestly declared OPEN — but until produced or explicitly returned as `setup-required`/`INCONCLUSIVE`, publication stays locked and APPROVE is impossible.

### P2 (logged, non-blocking)

1. `coverage.mjs` hardcodes `legacy: {requirements: 25, acceptance_criteria: 88}` instead of measuring the legacy corpus (values agree with the live legacy auditor today; single-source-of-truth risk if the legacy corpus ever changes).
2. `AUTHORITATIVE` literal-transport regex misses `approve(d)`, `authorize/authorization`, `credential`, `password`, `token`, and the `protected_path` (underscore) variant — authoritative content phrased with those words would be compressible. The enumerated contract keywords (security/approval/receipt/evidence/provenance/irreversible) are covered.
3. No regression test asserts the Result Contract's coverage-rejection path (behavior exists — verified live by this check — but only positive-path tests exist). Also `tests: 0` is accepted for either corpus.
4. T-014 marked DONE listing "fixtures" while `fixtures/dc-dev-superflow/` was never created (approved path unused; inline fixtures used instead).

### P3 (logged)

1. Multiple `opencode.json.bak-*` files accumulate at config root (hygiene; carried from Check-1).
2. `schema.mjs::validateSuperflowSchema()` still reads-and-returns the schema file without enforcing anything (carried from Check-1).

## 6. Security axis (independent)

- **Config additivity:** deep diff vs pre-registration backup — 8 added paths only; zero removals, zero value changes. Parent `dc-dev` keeps its original description/mode/model/prompt/tools; only the `permission.task` allowlist `{"dc-dev-superflow-*":"allow"}` was added to it.
- **Dispatch containment:** only the coordinator holds `delegate`, restricted to `{"*":"deny","dc-dev-superflow-*":"allow"}`; all other children lack delegate. `FORBIDDEN` regexes in `routing.mjs`/`scope.mjs` block `kiroExplore|cavekit-|gentle-|sdd-|external-agent` (enforcement-only references — allowed).
- **Model policy:** builder-side = `opencode-go/gpt-5.6-luna`, verifier-side = `opencode-go/glm-5.3` (inequality holds); `selectModel` setup-required on unavailable models; no substitution path.
- **Transports:** TTS admitted only for `notification` (cannot approve/authorize); unavailable browser → `setup-required` (unit level, tests green in the 25).
- **Untrusted input / provenance:** `createProvenance` data-only default; `isTrusted` requires explicit authority + confidence ≥ 0.9 + hash (unit-tested).
- **Executable/secrets:** 0 `child_process`/exec/eval, 0 network, 0 secret material across 60 new-namespace files. No hidden fallback: helper absence → explicit `setup-required`, never fake savings.
- **No-edit-existing:** mtime sweep holds — only approved-surface files, harness DBs, and the legacy hook's own auto-trace changed; legacy tests/kits/config values untouched (legacy test mtimes 02:09–02:16Z, pre-flow).

**Security Gates: PASS** (contract/static level). Runtime-proof gates (T-081–T-085 class) remain unexecuted and are tracked as Missing coverage, not findings of insecurity.

## 7. Result Contract

```
Gap Analysis: Complete 17, Partial 84, Missing 32, Over-built 0 (133 tasks)
Critical Gaps (blocking retry):
- P1-1: Legacy suite reported "10/10" (trace + tracking) and "24" new (Test Health) — live literal counts are 12/12 legacy and 25 new; recurrence of Check-1 P1-3 metric-integrity class after explicit feedback (violates required evidence #3 "reported literally")
- P1-2: Runtime loader/dispatch evidence absent (T-061/T-085 class) — honestly declared OPEN; publication locked until produced or returned as explicit setup-required/INCONCLUSIVE
Peer Review: P0 0, P1 2, P2 4, P3 2
Security Gates: PASS (contract/static level; runtime proofs outstanding and tracked as Missing)
Verdict: REVISE
```

**HITL note:** no human decision is pending from this check — Check-1's blocking HITL choice was resolved by kit relocation (option B executed; legacy suite green without any legacy edit). Publication remains locked by P1-2 and the five-iteration cap (iteration 5 is the last).

**Trace:** per the operator's instruction for this retry, only this file was written; the `Verdict` line above is the trace payload for the orchestrator (no append to `trace.md` was performed).

## 8. Feedback routing for next Make iteration (final iteration 5/5)

1. Correct every literal count in `context/dc-dev-superflow/impl/trace.md` and the tracking doc: legacy = **12 tests / 12 pass** (12 files incl. subdirs), new = **25 / 25**; keep both suites run separately.
2. Add a regression test for the Result Contract coverage-rejection path (missing/non-integer/missing-legacy corpus → `contract-invalid`), including whether `tests: 0` should be rejected for the legacy corpus.
3. Fix T-014 honesty: either create `fixtures/dc-dev-superflow/` (approved path, currently unused) or reword DONE to reference inline fixtures.
4. Harden `AUTHORITATIVE` regex (approve/authorize/authorization/credential/password/token, `protected_path` underscore variant) with RED tests first.
5. Make `coverage.mjs` measure the legacy corpus (or cite the legacy auditor output) instead of hardcoding 25/88.
6. Runtime: produce loader/boot/dispatch evidence (T-085/T-086) or return an explicit `setup-required`/`INCONCLUSIVE` result with the missing capability named — do not guess success; publication stays locked either way until gates have evidence.
