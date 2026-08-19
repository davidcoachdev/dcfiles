# Dc-Dev Superflow — Final Check (independent, disk-literal)

**Date:** 2026-08-18 · **Runtime under test:** OpenCode 1.18.18 · **Phase:** Final Check after Make 5/5 (five-iteration cap reached)
**Scope constraint honored:** no feature edits; this check wrote only `context/dc-dev-superflow/impl/check-final.md` plus a verdict line appended to the new-namespace trace (`context/dc-dev-superflow/impl/trace.md`). No legacy artifact touched.

---

## 0. Evidence base (commands actually executed, fresh this session)

- `node --test tests/dc-dev-superflow/{w0-contracts,skills-contract,agents-contract,integration-contract,iter4-contract}.test.mjs` → **`ℹ tests 25 / ℹ pass 25 / ℹ fail 0`** (literal TAP summary).
- `node --test $(find tests/dc-dev -name '*.test.mjs' | sort)` (legacy recursive, run separately) → **`ℹ tests 12 / ℹ pass 12 / ℹ fail 0`** — including the previously-failing `all Dc-Dev kits contain exactly 25 requirements and 88 acceptance criteria` (✔) and `final coverage proves 25 requirements and 88 criteria` (✔).
- Independent kit parse (my own regex, not the flow's parser): 10 kits, 41 `### R\d+:` headings, 0 duplicate R-IDs, **125** checkboxes scoped under `**Acceptance Criteria**` sections.
- Live `auditSuperflowKits()` → `{files:10, requirements:{expected:41,actual:41}, acceptance_criteria:{expected:125,actual:125}, duplicate_requirement_ids:[], legacy:{requirements:25,acceptance_criteria:88}}`.
- Recursive deep-diff `opencode.json` vs `opencode.json.bak-dc-dev-superflow-20260818`.
- Static security scan of 45 new-namespace files (agents/7 dirs + core, tests, fixtures, 16 skills).
- Live module probes: `compressWithBudget`, `retrieveCompressed`, `validateResult`, `recoverRun`, `createProvenance`/`isTrusted`, `admitCapability`, `selectModel`, `admitOptionalTransport`, `securityGate`.
- Live safe runtime probes (read-only, with controls — see §3).
- mtime sweep of legacy tests/kits; full source read of `coverage.mjs`, `compression.mjs`, `transport.mjs`, `iter4-contract.test.mjs`, `integration-contract.test.mjs`.
- Prior artifacts read from disk: `check-2.md`, `dc-dev-superflow-check-1.md`, `make-result.md`, `trace.md`, `runtime-proof.md`, `check-2-input.md`, tracking doc, build-site plan register.

## 1. Verification of the 8 required evidence items (from check-2-input)

| # | Required evidence | Result | Fresh detail |
|---|---|---|---|
| 1 | 10 kits in new namespace; 0 superflow files in `context/kits/` | **Complete ✓** | 10 × `dc-dev-superflow-*.md` under `context/dc-dev-superflow/kits/`; `context/kits/` glob for superflow = 0 |
| 2 | Parser reports 41/125 and 25/88 separately — measured, not hardcoded | **Complete ✓** | Live audit returns exactly that; `coverage.mjs` source confirmed: legacy measured from `context/kits/` via `auditKitDirectory()` with `dc-dev-superflow-` exclusion (Check-2 P2-1 fix is real) |
| 3 | New suite green; legacy run separately, **reported literally** | **Complete ✓** | Fresh runs: new **25/25**, legacy recursive **12/12**. Tracking Test Health literally says `New superflow focused tests | 25 | 0` and `Existing Dc-Dev tests | 12 | 0`; trace Iter 5 says 25/25 and 12/12; regression test asserts these literals and bans stale `24`/`10\/10` patterns (Check-2 P1-1 fix is real and locked by test) |
| 4 | Compression: measurable non-authoritative reduction, reversible originals, literal transport for authoritative content, setup-required/safe no-compression when helpers unavailable | **Complete ✓** | Source + live tests: real filler reduction with computed `measuredLoss`; `retrieveCompressed` returns the exact original; literal capsule on `mode:"literal"` \| `authoritative:true` \| AUTHORITATIVE regex (security/approval/**authorize/authorization/authority**/receipt/evidence/verdict/provenance/irreversible/secret/credential/password/token/protected_path/P0/P1 — Check-2 P2-2 variants covered); missing helper → `status:"setup-required"`, `measuredLoss:0`, no fake savings; `loss-budget-exceeded` → safe fallback capsule |
| 5 | Result Contract rejects missing/invalid corpus counts; carries both corpus counts + test counts | **Complete ✓** | `iter4-contract` test 6 live-green: accepts full shape; blocks missing `tests`, non-integer `12.5`, missing `legacy`. Rejection-path regression present (Check-2 P2-3 fix is real). My malformed synthetic payloads were **blocked** (`contract-invalid`), not accepted — no false-green surface found |
| 6 | No forbidden executable dependency or hidden fallback | **Complete ✓** | 45 files: `child_process`/exec/eval = 0, network = 0, secrets = 0. 5 forbidden-family refs, all denial-enforcement (FORBIDDEN constants, blocked-assertions, `doesNotMatch`) |
| 7 | Config diff = 8 additive paths, 0 removals, 0 value changes | **Complete ✓** | Fresh deep-diff: exactly 8 paths present in current and absent from backup (7 hidden `mode:subagent` children + `$.agent.dc-dev.permission`); 0 paths removed; 0 value changes. Parent `dc-dev` byte-identical to backup after deleting the added permission key |
| 8 | Runtime/recovery/provenance/TTS/model-capability + I/V/T coverage classified PASS/OPEN/INCONCLUSIVE | **Complete ✓ (upgraded)** | See §3 — loader/agent resolution now **PASS with fresh live evidence**; dispatch admission still **INCONCLUSIVE/setup-required**; recovery/provenance/TTS/model/capability PASS at contract level with live-green tests; I/V-001–041 honestly PARTIAL; T-061–T-093 honestly NOT_STARTED/partial |

## 2. Claim-by-claim verdict on Make 5 Result Contract

| Make 5 claim | Verdict |
|---|---|
| New suite 25/25; legacy recursive 12/12, run separately | **TRUE** (fresh reruns, literal TAP summaries) |
| Coverage 41/125 new; 25/88 legacy | **TRUE** (live parser + independent count) |
| Metric-integrity gaps closed, regression coverage added | **TRUE** (stale-count, authority-variant, rejection tests on disk and green) |
| Compression real with loss budget, literal authority, safe fallback | **TRUE** (source + live tests) |
| Legacy counts measured, not hardcoded | **TRUE** (`auditKitDirectory` reads `context/kits/`) |
| Runtime INCONCLUSIVE; safe probe could not resolve `dc-dev-superflow-core` | **TRUE as stated, but the probe target was wrong** — see §3. The claim was honest (no boot/dispatch success asserted), yet the probe queried a module-directory name that is not (and should not be) a registered agent, so it evidenced nothing about the loader. Corrected probe below upgrades the loader half. |
| Security gates static/contract PASS | **TRUE** (independently reproduced) |
| `fixtures/dc-dev-superflow/README.md` exists | **TRUE** (on disk) |

## 3. Runtime — fresh live evidence, split verdict

Safe read-only probes executed this session (OpenCode 1.18.18):

| Probe | Result |
|---|---|
| `opencode debug agent dc-dev` (positive control) | exit 0 — resolves, `mode: primary` |
| `opencode debug agent dc-dev-superflow-coordinator` | **exit 0 — resolves, `mode: subagent`** |
| `opencode debug agent dc-dev-superflow-security` | **exit 0 — resolves, `mode: subagent`** |
| `opencode debug agent definitely-not-registered-xyz` (negative control) | exit 1 — `not found` |

- **Loader/agent-resolution: PASS (fresh live evidence).** The additive registrations in `opencode.json` resolve in the real OpenCode 1.18.18 runtime. The prior INCONCLUSIVE was caused by probing `dc-dev-superflow-core` — a **module directory**, not a registered agent name (registrations are the 7 `dc-dev-superflow-<role>` names). `runtime-proof.md`'s conclusion was honest but its probe had zero evidentiary value; this check supplies the corrected probe.
- **Dispatch admission (coordinator → child through the permission gate): INCONCLUSIVE / setup-required — unchanged.** No dispatch receipt exists on disk and none was fabricated here. T-061/T-082/T-085/T-086 stay open until the live-session steps in §7 produce receipts. Per instruction, dispatch is NOT upgraded.

## 4. Gap analysis (vs plan register, 133 tasks)

| Group | Plan tasks | Status | Evidence |
|---|---|---|---|
| W0 contracts | T-001–T-010 (10) | Complete | 17 core modules; 25/25 live suite |
| W1–W2 domain | I-001–I-041 (41) | Partial | contract proxies ≈15/41 domains; full AC-set implementation absent (honestly tracked) |
| W3 components | T-011–T-018 (8) | **Complete** (was 7+1 Partial) | T-014 `fixtures/dc-dev-superflow/README.md` now exists; T-017 compression now real (measured reduction, budget, literal escape) |
| W4 validation | V-001–V-041 (41) | Partial (proxy level) | no per-requirement full-AC enumeration; 125-aggregate bar not yet met |
| W5 integration | T-061–T-070 (10) | Missing | T-061 loader half now evidenced (§3); integration artifacts absent |
| W6 gates | T-071–T-080 (10) | 6 Partial, 4 Missing | T-071 aggregate corpus audit only; T-072/T-073/T-074/T-075/T-077 have direct live contract tests; T-076/T-078/T-079/T-080 no artifacts |
| W7 runtime | T-081–T-090 (10) | Missing | agent-resolution live PASS; dispatch/setup-required receipts outstanding |
| W8 final loop | T-091–T-093 (3) | Missing | final sweeps/publication decision absent (publication locked — correct) |

**Totals: Complete 18, Partial 88, Missing 27, Over-built 0 (133).** (Check 2 was 17/84/32; deltas: T-014 honest-Complete, W6 partials reclassified on direct test evidence.) Formal AC-enumerated validation remains far below the 125/125 bar — this is the known open scope for the live-testing phase, not a regression.

## 5. Peer review findings (independent; "find what the builder missed")

- **P0 — none found.**
- **P1 — none found.** Both Check-2 P1s are verifiably closed on disk and locked by regression tests.
- **P2 — none found.**
- **P3 (logged, non-blocking):**
  1. `runtime-proof.md` probed an unregistered name (`dc-dev-superflow-core` = module dir), so its "safe probe" could not fail for the right reason. Superseded by §3's corrected probes; recommend a one-line correction note when the file is next touched.
  2. Plan's "Wave topology" rollup table (8+15+15+12+10+16+8+5+3 = 92) does not literally reconcile with the 133-ID task register the tracking and all checks use (ranges vs rollups). Documentation-only; recommend a clarifying line.
  3. Kits contain 31 non-AC `- [ ]` checkboxes (workflow steps) beyond the 125 AC-scoped ones; naive future auditors using raw checkbox counts will get 156. `coverage.mjs` scopes correctly — recommend keeping the section-scoped parse as the only canonical counter.

## 6. Security axis (independent — always-on gate)

- **Config additivity:** deep diff vs pre-registration backup — 8 added paths only; 0 removed; 0 value-changed. Parent `dc-dev` unchanged except the added `permission.task` allowlist `{"dc-dev-superflow-*":"allow"}`.
- **Dispatch containment:** only `dc-dev-superflow-coordinator` has `delegate`, restricted to `{"*":"deny","dc-dev-superflow-*":"allow"}`; all 6 other children lack the delegate tool entirely (verified in live config). `FORBIDDEN` regexes block `kiroExplore|cavekit-|gentle-|sdd-|external-agent` (enforcement-only refs).
- **Model policy:** builder-side (`coordinator/research/planner/recovery`) = `opencode-go/gpt-5.6-luna`; verifier-side (`security/reviewer/evaluator`) = `opencode-go/glm-5.3` — inequality holds. Live `selectModel('nonexistent-model-xyz')` → `setup-required / model-not-selected`; no substitution path in code.
- **TTS non-authoritative:** `admitOptionalTransport` — unavailable → `setup-required`; `tts` with purpose ≠ `notification` → `blocked: tts-not-authority`; admitted ⇒ `isolated:true`. Live-green in the 25.
- **Browsers/MCP/model setup-required:** live `admitCapability({name:'browser',available:false})` → `setup-required`; TTS unavailable → `setup-required`. No silent degradation.
- **Untrusted input:** `createProvenance` defaults to `authority:"data-only"`; `isTrusted` requires explicit authority + confidence ≥ 0.9 + hash (strict predicate confirmed — my synthetic high-confidence probe was correctly rejected).
- **Executable/secrets/network:** 0/0/0 across 45 new-namespace files. No hidden fallback anywhere: helper absence → explicit `setup-required`, never fake savings.
- **No-edit-existing:** legacy test mtimes 02:09–02:16Z and legacy kit mtimes 01:48Z — all pre-flow (flow start ≈05:43Z); both legacy suites green; config strictly additive; backup chain intact.
- **P0/P1 gate:** live `securityGate` blocks P0 before dispatch and requires independent review (test-green).

**Security Gates: PASS** (contract/static level; live dispatch receipts remain open scope, tracked as Missing — not as findings of insecurity).

## 7. Safe to begin disk-level testing? — YES, with one setup step

The flow is **safe to begin disk-level/live testing now**:

- Everything built is additive and isolated; both legacy suites are green (12/12, rerun this session); the legacy corpus is untouched (mtimes pre-flow); config is 8-paths-additive with the parent intact; no exec/network/secret surface exists in the new namespace; failure paths return `blocked`/`setup-required` instead of green.
- **Exact restart/config step for live dispatch testing:**
  1. **Restart OpenCode** (exit and relaunch, or open a fresh session) so the 7 additive subagent registrations load into an interactive session — CLI resolution is already proven (§3); the restart makes them available for in-session `delegate` dispatch.
  2. In the fresh session, run the runtime-proof's own "Setup required" list: (a) confirm agent resolution (already done via CLI), (b) execute one **no-side-effect coordinator dispatch** (e.g., a read-only confirmation task to `dc-dev-superflow-coordinator`) and capture the receipt, (c) capture pre-dispatch capability/permission admission evidence, (d) confirm `setup-required` receipts for any unavailable model/capability (verify `opencode-go/gpt-5.6-luna` availability in-session — `opencode-go/glm-5.3` is the current session's model and is available).
  3. Do **not** reclassify T-082/T-085/T-086 until those receipts exist on disk. Publication stays locked until then and until the W4 125-AC validation bar is met.

## 8. Result Contract

```
Gap Analysis: Complete 18, Partial 88, Missing 27, Over-built 0 (133 tasks)
Critical Gaps (blocking retry): none — Check-2 P1-1 (metric integrity) and P1-2 (runtime evidence)
  are closed: P1-1 verifiably fixed and regression-locked; P1-2 satisfied via the explicitly
  permitted setup-required/INCONCLUSIVE return, with loader-resolution additionally UPGRADED to
  PASS by fresh live probes (corrected target + positive/negative controls). Dispatch remains
  setup-required and is NOT upgraded.
Peer Review: P0 0, P1 0, P2 0, P3 3
Security Gates: PASS (contract/static + live loader resolution; dispatch receipts open scope)
Verdict: APPROVE
```

**HITL note:** the five-iteration Make cap is reached and no P0/P1 remains; per the Check contract the verdict above is the orchestrator's recommendation — the human approves entering the live/disk-level testing phase. Publication of the superflow as "fully operational" stays locked behind: live dispatch receipts (§7), W4 125-AC independent validation, and W5–W8 scope.

**Trace:** verdict line appended to `context/dc-dev-superflow/impl/trace.md` (new-namespace trace only; legacy `context/impl/trace.md` untouched by this check).
