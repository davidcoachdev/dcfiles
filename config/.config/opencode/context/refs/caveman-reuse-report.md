# Caveman Family Reuse Report: Dc-Dev Agent Family

**Phase:** 0 — Retrieve  
**Date:** 2026-08-18  
**Scope:** Read-only inspiration audit for new `dc-dev-*` agents and skills. No existing agent, skill, plugin, `opencode.json`, or runtime file was modified.

## Evidence and retrieval status

The six requested repositories were inspected through GitHub's unauthenticated repository-tree API and raw-file endpoints. This was read-only and evidence was taken from repository files, not from assumptions:

- `juliusbrussee/caveman`: `README.md`, `docs/technical/{engine,context-recovery,security-and-privacy,proxy-and-providers}.md`, compression and agent skills, CaveCrew agent prompts.
- `JuliusBrussee/caveman-browse`: `README.md`, `skills/caveman-browse/SKILL.md`, `session.go`, `BENCHMARK.md`.
- `JuliusBrussee/cavegemma`: `README.md`, `training/config.toml`, `eval/metrics.py`.
- `JuliusBrussee/caveman-code`: `README.md`, model/memory/skills documentation, agent loop/router/compression/checkpoint/memory sources and tests.
- `JuliusBrussee/cavemem`: `README.md`, `docs/{architecture,compression}.md`, lifecycle hook scripts.
- `JuliusBrussee/cavekit`: `README.md`, `FORMAT.md`, `SECURITY.md`, and `skills/{spec,build,check,backprop}/SKILL.md`.

Literal tooling limitation: a local shell preflight returned `DC_DEV_SCOPE_DENIED` while checking `/tmp/opencode` and `/home/dcdebian`; therefore no local clone was created. The raw GitHub reads above are the successful fallback. No repository mutation was attempted.

Local Dc-Dev material inspected:

- `plans/dc-dev-inspiration-audit.md`
- `context/kits/dc-dev-overview.md`, `dc-dev-front-door.md`, `dc-dev-gold-loop.md`, `dc-dev-protocols.md`, `dc-dev-enforcement.md`
- `context/plans/dc-dev-unified-agent-build-site.md`
- `context/impl/check-1.md` through `check-5.md`, `context/impl/trace.md`
- `docs/adr/001-dc-dev-unified-agent.md`
- `plugins/dc-dev-runtime.mjs` and associated tests
- `opencode.json`

## Concrete source patterns

### 1. Caveman: compression, accounting, recovery, limits

**Observed pattern:** the engine chooses transforms by content type and has explicit modes (`record`, `compress`, `pixel`, `recommend`, `shadow`, `canary`, `active`). `docs/technical/context-recovery.md` defines CCR: exact original bytes are stored behind a short `ccr_*` handle, so lossy context remains recoverable. `docs/technical/accounting-and-evidence.md` and the engine docs distinguish provider-reported usage from inferred local savings.

**Safety boundary:** the security document treats prompts, tool output, source, credentials, proxy metadata, recovery records, durable memory, and browser state as sensitive surfaces. It explicitly keeps credentials out of YAML, prompts, fixtures, and logs.

**Limits/recovery:** transforms may be rejected for parse, size, policy, or recovery-gate failures; pass-through is valid. A new compressor requires tests, invariants, and recovery integration. This is a strong reusable principle: compression must fail closed to original/pass-through, never silently destroy the source.

**Decision:** **ADAPT**, not copy the runtime. Add a Dc-Dev context policy that records original-vs-visible bytes, redacts secrets, caps injected context, and preserves an auditable recovery reference. Do not add Caveman's proxy/provider stack to Dc-Dev.

### 2. Caveman Browse: compact browser loop with exact recovery

**Observed pattern:** `skills/caveman-browse/SKILL.md` specifies `snapshot → act → focused re-snapshot → recover`. Snapshots are compact accessibility trees with generation-scoped UIDs. `browser_recover` returns byte-exact original accessibility data from CCR, optionally narrowed by query. The tool contract states `settled:false` until a focused snapshot proves settlement.

**Honesty limits:** `BENCHMARK.md` bounds claims to same-origin pages with predictable controls; cross-origin iframe actionability is out of scope. Savings are marked `inferred`; unknown roles, UIDs, or CDP responses fail closed rather than fabricating handles.

**Decision:** **ADAPT** as an optional browser skill. Reuse the snapshot/action/verify/recover discipline, explicit claim boundary, stale-handle rejection, and no-fabrication rule. Do not import its Go/CDP runtime or claim browser capability where the configured MCP does not provide it.

### 3. Cavegemma: model specialization and evaluation discipline

**Observed pattern:** `README.md` documents a Gemma 4 instruction base plus a QLoRA adapter, deterministic generation (`do_sample=False`), and a fixed training/inference chat template. The training summary records base model, adapter method, dataset composition, hardware, and cost. The README also documents concrete model/runtime traps.

**Operational limit:** the README warns that concurrency can burn provider budget because every worker carries large session bootstrap context; it recommends a bounded worker count. Evaluation uses separate prompts/metrics rather than treating the fine-tuned model's own claims as proof.

**Decision:** **ADAPT** the model registry contract and evaluation evidence, not the model weights or a hardcoded Gemma dependency. Dc-Dev should select models by phase/capability/budget and record model IDs; a model change must be treated as a compatibility event and verified.

### 4. Caveman Code: coding loop, routing, checkpoints, memory

**Observed pattern:** the repository separates agent loop, router, compression, checkpoints, cost accounting, memory, repomap, tools, and worktrees. It documents cost-aware defaults and keeps provider/model selection configurable. Checkpoint manager supports snapshots, an indexed list, and rollback of N steps.

**Memory policy:** `docs/reference/memory.md` says Caveman Code delegates storage to Cavemem and owns policy: when to write, what to inject, and episodic-to-semantic consolidation. Default memory injection is capped at 2k tokens. Memory lifecycle hooks include session start, user prompt, post-tool use, and stop; explicit search/show/forget/off/on controls exist.

**Decision:** **REUSE/ADAPT** the separation of orchestration, routing, checkpoint, memory, and worktree concerns. Dc-Dev already has a bounded gold loop, model separation, trace, approval, and scope enforcement; add only missing policy skills and adapters. Do not duplicate a second coding runtime or checkpoint engine.

### 5. Cavemem: durable memory and compression boundaries

**Observed pattern:** Cavemem provides SQLite/FTS5 hybrid search, episodic/semantic/procedural memory, lifecycle hooks, and redaction of `<private>...</private>` blocks. Its documentation states that prose compression is allowed while code, paths, and URLs remain byte-for-byte. Compression has benchmark thresholds and requires round-trip fixtures for lexicon changes.

**Decision:** **ADAPT** the memory contract: write only durable, attributable observations; inject bounded, relevance-ranked snippets; preserve code/path/URL fidelity; support explicit forget/off controls; and test redaction plus round-trip behavior. Do not make memory injection mandatory for every request or silently treat recalled text as authoritative instructions.

### 6. Cavekit: kits, verification, and backpropagation

**Observed pattern:** `FORMAT.md` and the skills define a compact spec format with requirements, acceptance criteria, verification, explicit non-goals, and a build/check loop. `build` names exact tests before implementation; failures invoke backpropagation rather than blind retries. `check` is adversarial. `backprop` turns a discovered defect into a spec/verification update.

**Important limits:** the current Cavekit README explicitly distinguishes a newer single-thread/no-hooks/no-subagents mode from older full Hunt orchestration. The new family must not assume that every Cavekit feature exists in the current runtime.

**Decision:** **REUSE** the kit contract, named verification, adversarial check, non-goals, and defect-to-spec backpropagation. Dc-Dev's existing kits already implement most of this; add only delta kits for newly approved capabilities.

## Comparison against existing Dc-Dev

| Pattern | Existing Dc-Dev evidence | Decision | Duplication / gap |
|---|---|---|---|
| Single front door and intent triage | `dc-dev-front-door.md` R5–R9; ADR-001 | REUSE | Do not add another public orchestrator. |
| Ordered gold lifecycle and bounded loop | `dc-dev-gold-loop.md` R10–R14; build site waves | REUSE | Add recovery semantics only where absent. |
| Kits as contract, AC, non-goals | `dc-dev-overview.md`, five kits, 25 requirements | REUSE | Existing kit coverage and check history must remain source of truth. |
| Model separation for Make/Check | `dc-dev-enforcement.md` R24; Check evidence | REUSE | Add capability/budget registry, not another router. |
| Runtime enforcement and live proof | `plugins/dc-dev-runtime.mjs`; Check 5 live loader/dispatch evidence | REUSE | No replacement plugin; additive tests/registrations only after approval. |
| Write scope, symlink/path checks, Bash protections | Check 2–5 and runtime tests | REUSE | Caveman security concepts reinforce, but do not duplicate guards. |
| Durable request-bound HITL approval | Check 2–5 evidence | REUSE | Keep attributable, expiring approvals; never boolean approval. |
| Deterministic trace and evidence | `context/impl/trace.md`, R21/R23 | REUSE | Add redaction/recovery fields only through a kit change. |
| Context compression with recoverability | No equivalent complete Dc-Dev kit/runtime contract found | ADAPT | New `dc-dev-context-recovery` kit/skill is a gap. |
| Browser snapshot/action/verify/recover | No browser-specific Dc-Dev kit found in inspected set | ADAPT | New optional `dc-dev-browse` skill; capability-gated. |
| Durable memory policy | Protocol/context references exist, but no Cavemem-equivalent complete contract | ADAPT | New `dc-dev-memory-policy` kit/skill; bounded injection and redaction. |
| Checkpoints/rollback | No coding checkpoint contract found in Dc-Dev kits | SKIP for now | Add only if user approves coding rollback scope; do not import runtime. |
| Cost-aware model selection | Phase routing exists; numeric budget/resource limits remain policy-level in Check 5 | ADAPT | New model-capability/budget skill; explicit numeric limits required. |
| Fine-tuned model | No requirement for local model training | SKIP | Avoid Gemma lock-in, training cost, and model-specific assumptions. |
| Cavekit backprop | R25 bidirectional spec updating exists | REUSE | Do not create a parallel bug-to-spec protocol. |
| External orchestration framework | ADR-001 rejects framework dependency | SKIP | Avoid vendor lock-in and duplicate orchestration. |

## Proposed new `dc-dev-*` family

Only these additive artifacts should be proposed in Sketch; no implementation is authorized by Retrieve:

1. **`dc-dev-context-recovery` skill/kit** — classify content, apply bounded lossless/lossy transforms, preserve exact originals or pass through, emit redacted accounting, expose recovery handles, and test round-trip/rejection behavior.
2. **`dc-dev-memory-policy` skill/kit** — lifecycle write/read policy, private-block redaction, relevance ranking, hard injection cap, explicit forget/off, provenance, and stale-memory treatment. Storage remains an adapter, not a second orchestration system.
3. **`dc-dev-browse` skill/kit** — capability-gated snapshot/action/focused-verify/recover workflow, stale UID handling, same-origin claim boundary, and fail-closed unknown-control behavior.
4. **`dc-dev-model-routing` skill/kit** — phase-to-capability selection, Make/Check model inequality, explicit budget/concurrency limits, fallback rules, model ID receipts, and compatibility tests. It must not hardcode one provider or model.
5. **`dc-dev-recovery` skill** — bounded retry/backpropagation protocol for context overflow, tool failure, stale browser state, missing evidence, and model unavailability. It must distinguish retryable, recoverable, and human-blocked states.

### Keep out of the new family

- A replacement for `dc-dev` or any existing `cavekit-*`, `sdd-*`, or runtime plugin.
- A second public front door, parallel trace format, parallel approval store, or parallel write-scope guard.
- Caveman's provider proxy, Go engine, browser CDP implementation, or local model runtime.
- Gemma/QLoRA weights, training pipeline, or provider-specific prompt syntax.
- Unbounded memory injection, automatic semantic authority for recalled text, or silent destructive compression.
- Autonomous browser actions without capability detection, user approval where mutation is involved, and exact recovery/failure evidence.
- Numeric resource policies that are only prose; if a limit cannot be mechanically checked, it is not ready for Sketch.

## Security, context, and dependency risks

- **Secret exposure:** compression, memory, CCR records, browser snapshots, traces, and model receipts can contain credentials or personal data. Redact before persistence; never log authorization headers; test secret-containing fixtures.
- **Lossy overcompression:** compact output can remove constraints, code details, or tool arguments. Require exact recovery or pass-through, content-type exemptions, size/policy gates, and round-trip tests.
- **Context poisoning:** recalled memory and recovered page bytes are untrusted data, not instructions. Preserve provenance and isolate them from system/policy instructions.
- **Stale recovery handles:** handles and browser UIDs must be session/generation scoped; unknown or expired references fail closed with a recoverable receipt.
- **Model dependence:** model behavior, context limits, tokenizer counts, tool-call formats, and provider pricing vary. Use configured capabilities and measured evidence; never infer support from a model name.
- **Budget exhaustion:** parallel workers and large bootstrap prompts can consume provider quotas rapidly. Enforce bounded concurrency, per-phase budgets, and stop conditions mechanically.
- **Runtime drift:** Check 1–4 exposed loader/live-runtime gaps before Check 5 closed the plugin contract. Any new registration needs loader-contract and live-dispatch evidence, not import-only tests.
- **Scope bypass:** browser, memory, and recovery paths must inherit existing realpath/symlink-safe workspace scope, protected paths, Bash rules, and attributable HITL approval.

## Reusable local kits (deterministic top-K)

Scoring rubric: 0–5 each for direct capability match, complementarity, and low duplication; `score = 2×match + complementarity − duplication`, maximum 15. Ties are resolved by path order. Top-K = 8.

1. `context/kits/dc-dev-enforcement.md` — runtime evidence, scope, security, model separation (score **14**).
2. `context/kits/dc-dev-protocols.md` — routing, context protocol, skill resolution, receipts (score **13**).
3. `context/kits/dc-dev-gold-loop.md` — bounded lifecycle, TDD, delegation, verdicts (score **13**).
4. `context/kits/dc-dev-front-door.md` — one door, triage, HITL, consultation boundary (score **12**).
5. `context/kits/dc-dev-overview.md` — contract hierarchy, traceability, artifact language (score **11**).
6. `context/plans/dc-dev-unified-agent-build-site.md` — existing dependency graph and verification gates (score **10**).
7. `docs/adr/001-dc-dev-unified-agent.md` — approved architectural constraints and rejected alternatives (score **10**).
8. `plans/dc-dev-inspiration-audit.md` — prior source comparison and additive-family boundary (score **9**).

These are reuse inputs, not permission to modify them. Any new requirement must be approved, added as a delta kit with testable acceptance criteria, and mapped to the existing trace/check protocol.

## Gaps and verdict

**Gaps:** recoverable context compression; durable memory policy with bounded injection and redaction; capability-gated browser workflow; numeric model/resource budgets; explicit recovery-state taxonomy. Check 5 also records that safe execution limits/isolation remain policy-level rather than numerically/mechanically bounded.

**Verdict: PARTIAL REUSE.** Dc-Dev already owns the front door, gold loop, kits, model separation, HITL, evidence, scope enforcement, and live runtime verification. The Caveman family contributes bounded, recoverable context handling, memory policy, browser honesty, coding checkpoints, and model/budget evidence. Only the five additive `dc-dev-*` capability areas above should proceed to Sketch; existing agents/skills/config/runtime remain unchanged.

## Result Contract

- **Report:** `context/refs/caveman-reuse-report.md`
- **Sources:** six requested GitHub repositories, read-only API/raw evidence; local clone blocked literally by `DC_DEV_SCOPE_DENIED`.
- **Reusable kits:** 8 deterministic candidates; primary reuse is `dc-dev-enforcement`, `dc-dev-protocols`, `dc-dev-gold-loop`, and `dc-dev-front-door`.
- **Gaps:** context recovery, memory policy, browser workflow, model/resource budgets, recovery taxonomy.
- **Recommendation:** proceed to `/sdd-cavekit sketch` with this report mandatory context; create only additive, capability-gated `dc-dev-*` kits/skills after HITL approval.
