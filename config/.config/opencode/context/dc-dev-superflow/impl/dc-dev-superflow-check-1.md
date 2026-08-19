# Dc-Dev Superflow — Check 1 (independent, disk-literal)

**Phase:** Check (post-Make iteration 3/5) · **Date:** 2026-08-18 · **Reviewer:** independent check agent (separate from builder)
**Method:** every number below was re-derived from disk during this check (live `node --test` runs, live `auditKits()` execution, independent re-parsing of all 15 kits, full recursive diff of `opencode.json` vs pre-registration backup, full-tree mtime sweep). The Make report was used only as a claim to falsify, never as evidence.

## 1. Evidence base (commands actually executed)

- `node tests/dc-dev/kit-coverage.mjs` (live legacy audit) → `{requirements: {expected:25, actual:66}, acceptance_criteria: {expected:88, actual:88}, duplicate_requirement_ids: [R1..R25], malformed: []}` over **15 files**.
- `node --test tests/dc-dev-superflow/*.test.mjs` → **19 tests, 19 pass, 0 fail**.
- `node --test` over all 12 `tests/dc-dev/**/*.test.mjs` files → **12 tests, 11 pass, 1 fail**; the single failure is `all Dc-Dev kits contain exactly 25 requirements and 88 acceptance criteria`.
- Independent re-parse of `context/kits/dc-dev-*.md` (two parsers: legacy-format and liberal checkbox) plus a third targeted parser for `**Acceptance Criteria:**` blocks.
- `deepDiff(opencode.json, opencode.json.bak-dc-dev-superflow-20260818)` → **8 added paths, 0 removed, 0 value-changes**.
- Full-tree mtime sweep with cutoff 2026-08-18T05:43:00Z (flow start) excluding superflow-owned paths.

## 2. Critical blocker determination (legacy kit-coverage test)

**Question:** is the 25/88-vs-new-kits failure a real contract conflict, a counting bug, or a stale test?

**Answer: all three, at different layers — and Make's report misstates the middle layer.**

1. **Counting facts (independently verified).** The 10 superflow kits contain exactly **41 requirement headings and 125 ACs** (per-kit: architecture-planning 12, context-caveman 12, evidence-review 12, execution-tdd 13, intake-routing 13, overview 12, recovery-memory 12, research-provenance 12, security-capability 15, token-efficiency 12). The 5 legacy kits contain 25 requirements / 88 ACs. The legacy audit glob `dc-dev-*.md` matches both corpora → requirements actual = 25+41 = **66**.
2. **Make's "66/125" claim is a misreport.** The live audit returns `acceptance_criteria.actual = 88`, not 125. Reason: the legacy parser only counts `  - [ ] ` items under `- **Acceptance criteria**:` lines; the new kits use `**Acceptance Criteria:**` with zero-indent `- [ ]` items, so **the audit parses 0 ACs from the superflow kits**. "125" is the plan-level kit total, not the audit's output.
3. **It is a real, unfixable-by-Make contract conflict.** Three independent assertions fail or would fail: (a) requirement count 66≠25; (b) even with updated counts, `duplicate_requirement_ids` is non-empty — the superflow reuses the R1–R41 namespace and **collides with legacy R1–R25** (25 duplicates reported live); (c) AC totals depend on parser format. No change Make is allowed to make (new files only) can make this test pass while both corpora share `context/kits/` and the `dc-dev-` prefix.
4. **The test itself is stale in scope, not wrong in intent.** It faithfully encodes "the legacy 5-kit corpus is 25 R / 88 AC with unique IDs" but was written before the superflow existed; its glob assumes `dc-dev-*` means only the legacy corpus. It has **not** been tampered with (mtime 02:09, pre-dates flow start 05:43; content matches its original contract).

**Classification: P1 blocker, publication-blocking, owned by HITL — not fixable inside the Make boundary.** The failure was kept visible by Make (correct behavior); nothing was edited to hide it (verified).

**Resolution options for the human (none may be performed by Make/Check):**
- **A. Authorize a legacy test-contract update** — narrow the audit's glob/expectations to the legacy corpus (explicit file list or exclude `dc-dev-superflow-*`), and add a separate superflow coverage auditor with its own 41/125 expectation. Requires editing a protected test → explicit authorization.
- **B. Relocate the superflow kits** (e.g. `context/kits/superflow/`) — no legacy file is touched; verified during this check that **no new-flow artifact references `context/kits/` paths and no new test asserts 125**, so relocation breaks nothing the flow built. Requires authorizing a post-hoc move of Sketch artifacts and updating plan/scope references.
- **C. Renumber superflow requirements** to a non-colliding space (e.g. R101+) — still fails the count assertion alone; only viable combined with A.
- **D. Accept a known-failing sentinel** until an authorized maintenance window — publication stays blocked; iterations may continue with suites run separately.

## 3. Gap analysis (vs plan register, 133 tasks)

| Group | Plan tasks | Status | Evidence |
|---|---|---|---|
| W0 contracts | T-001–T-010 (10) | **Complete** | scope.json, 15 core modules, 19/19 passing tests |
| W1–W2 domain implementation | I-001–I-041 (41) | **Partial** | unit-level contract proxies exist for ≈14/41 requirement domains; full AC-set implementation absent (tracker says PARTIAL — accurate) |
| W3 additive components | T-011–T-018 (8) | **7 Complete, 1 Partial** | T-017 compression adapter is a pass-through (§4.2); T-014's approved `fixtures/dc-dev-superflow/` was never created (inline fixtures used instead) |
| W4 independent validation | V-001–V-041 (41) | **Missing** | no test enumerates any requirement's full AC set; the plan's "aggregate must equal 125" bar is at 0 |
| W5 integration | T-061–T-070 (10) | **Missing** | no artifacts |
| W6 gates | T-071–T-080 (10) | **Missing** | no artifacts |
| W7 runtime proofs | T-081–T-090 (10) | **Missing** | no runtime probe evidence; loader/boot unproven |
| W8 final loop | T-091–T-093 (3) | **Missing** | no final coverage auditor exists for the superflow |

**Totals: Complete 17, Partial 42, Missing 74, Over-built 0.** Formal AC-enumerated validation: **0/125** (unit-contract proxies cover ≈14/41 requirement domains).

## 4. Adversarial review findings (independent; "find what the builder missed")

### P0 — none found.

### P1 (block advancement; must be addressed before any PASS)

1. **Legacy kit-audit contract conflict** (§2) — publication-blocking, HITL-owned.
2. **False progress signal in tracking:** `context/impl/dc-dev-superflow.md` marks T-015–T-018 blanket DONE, but `compression.mjs` returns `{text: source, original: source, measuredLoss: 0}` — it compresses nothing and implements no Caveman mode, no Headroom/RTK measurement, no real loss budget. Gates T-074/T-075 and kit R38–R41 (12 ACs) rest on a pass-through. T-017 must be implemented or honestly downgraded.
3. **Metric misreports in tracking:** (a) audit actuals stated as "66/125" when the live audit says 66/**88**; (b) "Existing Dc-Dev tests: 26 passing, 1 failing" when the live run is **11 passing, 1 failing of 12**. Inaccurate feedback entries corrupt the next iteration's steering.

### P2 (logged, non-blocking)

1. Plan coverage-matrix rows are wrong for two kits (intake-routing 13 AC not 12; execution-tdd 13 not 12 — R6 and R22 carry 4 ACs). The 125 total is nonetheless correct.
2. `schema.mjs::validateSuperflowSchema()` only reads and returns the JSON schema file — it validates nothing; the passing "schema requires lineage…" test asserts file content, not enforcement.
3. Runtime loader/boot compatibility (T-061/T-085) unproven: the `{file:…}` prompt form and `hidden` subagent registration are untested in a real OpenCode boot. Already declared as plan blocker #3 — correctly tracked, still open.
4. Skills are ~0.5 KB contract stubs (Trigger/Workflow/Failure/Result Contract). Adequate for W3, thin for W5+ dispatch.

### P3 (logged)

1. Multiple `opencode.json.bak-*` backups accumulate at config root (hygiene).
2. `capability.mjs` admission records lack provider/version/expiry fields that R25's first AC requires.

## 5. Security axis (independent)

- **Config diff vs pre-registration backup:** strictly additive — 7 new `hidden:true`/`mode:subagent` agent registrations + one `permission.task.{"dc-dev-superflow-*":"allow"}` key added to the existing `dc-dev` entry. No existing value changed, nothing removed. Parent remains primary with unchanged model/prompt/tools.
- **Dispatch containment:** only the coordinator holds `delegate`, with `task: {"*":"deny","dc-dev-superflow-*":"allow"}` — matches the owned-graph allowlist (R8). All other children lack the delegate tool entirely. FORBIDDEN regex blocks `kiroExplore|cavekit-|gentle-|sdd-|external-agent` targets.
- **Model policy:** builder-side (coordinator/research/planner/recovery) = `opencode-go/gpt-5.6-luna`; verifier-side (security/reviewer/evaluator) = `opencode-go/glm-5.3` — inequality satisfies R7's builder≠verifier AC. `selectModel` returns setup-required on unavailable models; no substitution path exists in code.
- **Transports:** `admitOptionalTransport` blocks TTS for any purpose except `notification` (cannot approve/authorize — R28 gate satisfied at unit level); unavailable browser → `setup-required`. No runtime TTS/browser probes yet (T-081 Missing — declared).
- **Untrusted input:** `createProvenance` defaults to `authority: "data-only"`; `isTrusted` requires explicit authority + confidence ≥ 0.9 + hash. Unit-tested.
- **Global permissions:** `bash "*": "ask"` plus secret-file read deny list; subagent bash prompts HITL rather than silently executing. (Improvement over the legacy flow's earlier globally-allow finding.)
- **No secret material, no credential, no network egress** in any new artifact (static scan clean; mutation-risk scan of new tests/modules clean).

**Security Gates: PASS** — no P0/P1 security vulnerability in shipped artifacts. Runtime-proof gates (T-076–T-084 class) remain unexecuted and are tracked as Missing coverage, not as findings of insecurity.

## 6. Requested spot-checks

| Check | Result |
|---|---|
| Empty-result | `validateResult` blocks `ok` with empty/unverified artifacts (`unverified-or-empty`) — unit-tested ✓ |
| Recovery | `recoverRun` state machine (retry/resume/new-lineage/abandon/blocked/inconclusive/complete); inconclusive never resolves to success ✓ |
| Provenance | data-only default, authority/confidence/hash trust test ✓ |
| Caveman / compression | **STUB** — pass-through, measured loss always 0, nothing compressed ✗ (P1 #2) |
| Token budgets | same stub; R38–R41 unimplemented beyond mode enum ✗ |
| TTS isolation | approval purpose → blocked; notification-only admission ✓ (unit level) |
| Browser admission | unavailable → setup-required; isolation flag enforced in `admitCapability` ✓ (unit level) |
| No-edit-existing | full-tree mtime sweep + config diff: **holds** (only superflow-owned files, authorized additive registration, trace, and harness DBs changed) ✓ |
| Loader/permission contracts | unit-level export validation ✓; real-runtime boot unproven (T-061/T-085 open) |

## 7. Result Contract

```
Gap Analysis: Complete 17, Partial 42, Missing 74, Over-built 0 (133 tasks)
AC Coverage: 125 AC defined in kits (verified); formal AC-enumerated validation 0/125; unit-contract proxies ≈14/41 requirement domains
Critical Gaps (blocking retry):
- P1-1: Legacy tests/dc-dev/kit-coverage.test.mjs fails by structural necessity (66≠25 reqs; 25 duplicate R-IDs; format-blind AC parse → 88) — publication-blocking, resolvable only by HITL decision A/B/C/D (§2)
- P1-2: T-017 marked DONE but compression adapter is a pass-through (no Caveman/Headroom/RTK, measuredLoss=0) — R38–R41 and gates T-074/T-075 unsupported
- P1-3: Tracking misreports — audit actuals are 66/88 (not "66/125") and legacy suite is 11 pass/1 fail of 12 (not "26/1")
Peer Review: P0 0, P1 3, P2 4, P3 2
Security Gates: PASS (contract level; runtime proofs T-081–T-085 outstanding and tracked)
Verdict: REVISE
```

**HITL decision needed (exact):** choose legacy-conflict resolution **A** (authorize legacy test update to scope it to the legacy corpus + separate superflow auditor), **B** (authorize relocating the 10 superflow kits out of `context/kits/`), **C** (authorize both renumbering and test update), or **D** (accept a known-failing sentinel until an authorized window). Only the human can pick; Make must not touch the legacy test under any option.

**Safe continuation without modifying legacy artifacts: YES, with constraints.** Iterations 4–5 may proceed on superflow-owned paths while: (1) the legacy failure stays visible and is treated as a known sentinel, (2) the two suites are run and reported separately with literal counts, (3) no publication occurs until the HITL decision lands and P1-2/P1-3 are corrected, (4) the plan's five-iteration cap and setup-required semantics are respected. The additive boundary, backup chain, and test evidence give high confidence that continued Make work cannot damage the legacy flow.

## 8. Feedback routing for next Make iteration

1. Correct `context/impl/dc-dev-superflow.md`: true audit numbers (66/88), true legacy suite counts (11/1 of 12), T-017 downgraded to Partial or implemented for real (RED test first: nonzero measured loss on a real compressed corpus, retrieval fidelity, fallback).
2. Begin V-task scaffolding: one enumerator per requirement printing its literal AC IDs (brings the 125-aggregate bar into existence).
3. Implement the superflow's own kit-coverage auditor (41/125 expectation, own format) under `tests/dc-dev-superflow/` — additive, no legacy contact.
4. Do not attempt any fix to `tests/dc-dev/kit-coverage.*`; route all options to the human.
