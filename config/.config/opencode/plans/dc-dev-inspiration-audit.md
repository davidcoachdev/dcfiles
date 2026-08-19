# Dc-Dev Inspiration Audit

Date: 2026-08-18
Scope: comparative research only; no existing agent or skill modified.

## Executive summary

The requested repositories are inspiration sources, not dependencies. The strongest reusable ideas are:

1. **Own orchestration boundary**: a dedicated Dc-Dev coordinator with explicit child-agent permissions and typed result contracts.
2. **Adaptive depth**: choose a lightweight, standard, or deep workflow before execution instead of running the full pipeline for every request.
3. **File-backed state**: persist plans, checkpoints, evidence, retries, and handoffs so restarts do not erase workflow state.
4. **Security before installation/execution**: scan skills, MCPs, prompts, and plugins before activation; treat prompt injection and supply-chain risk as first-class findings.
5. **Evidence bundles**: every meaningful run should produce a compact, human-reviewable proof bundle rather than only prose claims.
6. **Token-aware execution**: reduce command output and context transport before adding more agents.
7. **Research mode**: use multi-source, date-bounded research with provenance instead of unconstrained web browsing.
8. **Strict anti-overengineering gates**: explicitly reject work that is not required by the request.

The main current defect is confirmed: `dc-dev` is a primary agent with delegation enabled but no own child-agent permission graph. Existing Cavekit and Gentle-AI permissions are isolated to their own families, so Dc-Dev cannot autonomously orchestrate them or a new family.

## Current baseline

### Agents in `opencode.json`

- 10 Cavekit agents: entry, orchestrator, retrieve, sketch, map, make, check, eval, init, ship.
- 2 Gentle-AI agents: `gentle-orchestrator`, `gentleman`.
- 10 SDD agents: explore, propose, spec, design, tasks, apply, verify, archive, init, onboard.
- 3 other agents: `dc-dev`, `mentored-architect`, `obra-superpowers`.
- Total: 25 agents.

### Existing permission boundaries

- `cavekit-orchestrator`: `task(cavekit-*)` only.
- `gentle-orchestrator`: `task(sdd-*)` only.
- `dc-dev`: no explicit `task` permission graph.

### MCPs and local capabilities

- MCPs configured: CodeGraph, Context7, Engram, Lightpanda, Obscura, Serena.
- Local binaries detected: Node, Git, gh, Lightpanda, Obscura, uvx, CodeGraph, Engram, RTK.
- Not detected: `skillspector`, `agent-reach`.
- Existing skills: approximately 356.
- Existing plugins include runtime enforcement, background agents, agent flow, TTS, OpenCode review, graphify, RTK, and context-mode.

## Pattern findings by source

| Source | Verified useful pattern | Dc-Dev recommendation |
|---|---|---|
| mattpocock/skills | Router skills, triage state machines, domain-model grilling, architecture improvement reports | Adapt as `dc-dev-intake`, `dc-dev-triage`, and `dc-dev-architecture-review` |
| obra/superpowers | Brainstorming gate, TDD, systematic debugging, verification-before-completion, parallel agents, review checkpoints | Adapt the discipline; do not duplicate the whole skill library |
| Kaddo | Deterministic CLI knowledge artifacts, modules, capsules, global standards, human approval | Adapt artifact registry and external-knowledge capsules |
| uber/ADR | Sensor, telemetry normalization, detection benchmark, detector layer | Adapt event schema and security telemetry; avoid copying benchmark infrastructure wholesale |
| block/buzz | Hive-mind communication concept | Investigate only as an optional coordination/event-bus idea; low immediate ROI |
| architecture-decision-record | ADR templates, decision guardrails, fitness functions, PR integration | Adapt ADR lifecycle and decision fitness checks |
| NVIDIA SkillSpector | Static + semantic skill scanning, 69 vulnerability patterns, OSV lookup, SARIF/JSON/Markdown, baselines | High priority: add pre-install/pre-activation skill and MCP scanning |
| Agent-Reach | Capability discovery across many internet sources with explicit authorization and doctor command | Adapt capability registry and `doctor`; do not install all channels by default |
| last30days-skill | Date-bounded multi-source research with attributable synthesis | Adapt as an optional research mode with source provenance and time windows |
| repo-harness | File-backed repeatable sessions, hooks, state/checkpoints | High priority: add restart-safe run state and checkpoint recovery |
| agent-os | Standards and spec injection from repository context | Adapt standards loading and project-local conventions |
| gstack | Opinionated role tools: CEO, design, engineering, release, docs, QA | Adapt role lenses as temporary review modes, not permanent agent sprawl |
| addyosmani/agent-skills | Production-oriented reusable engineering skills | Use as quality reference; avoid adding skills without a trigger and test |
| claude-code-best-practice | Agentic engineering practices and operational conventions | Mine for conventions; validate every practice against OpenCode behavior |
| maestro-threat-modeling-skill | Boundary-first threat model with fixed output order | High priority: make threat modeling a Dc-Dev security phase |
| pro-workflow | Corrections-as-memory, context engineering, worktrees, agent teams | Adapt correction capture and worktree strategy; Engram already covers part of memory |
| gnhf | Bounded autonomous iterations, max tokens, worktree mode | Adapt explicit iteration/token budgets and clean-tree gates |
| autoresearch | Fixed experiment loop: modify, run, measure, keep/discard, log | Adapt for eval/optimization experiments only; not general feature development |
| RTK | Command rewriting and 60–90% output reduction, OpenCode plugin support | High priority: verify current plugin integration and measure token savings |
| navigation-agent-mcp | Navigation MCP install pattern for OpenCode | Optional; only add if a concrete navigation gap exists |
| memex | File-system wiki maintained by an agent | Adapt bounded project knowledge surfaces; avoid duplicating Engram blindly |
| beads | Distributed graph issue tracker and agent memory upgrade | Consider only if current task graph needs durable dependency queries; high integration cost |
| gastown | Git-backed multi-agent workspace, Mayor/worker roles, persistent hooks | Strong inspiration for orchestration roles; too heavy as an initial dependency |
| BMAD-METHOD | Adaptive delivery depth, explicit briefs/specs/architecture, learn-adjust loop | High priority: use adaptive depth and explicit phase transitions |
| DocMason | Repo-native local knowledge base for office/document sources | Optional document ingestion mode; not core to every coding task |
| minutes | Privacy-first searchable conversation memory with MCP | Optional meeting/context ingestion; separate from core execution memory |
| call.md | Live meeting intelligence, MCP auto-triggering, action items | Out of core scope unless meeting-driven development becomes a requirement |
| omlx | Apple Silicon LLM inference server | Not relevant to this Linux OpenCode runtime; skip |
| pretext | Text measurement/layout engine | Not relevant to agent orchestration; skip |
| proofshot | Browser/session proof bundles, screenshots, logs, timeline, visual diff | High priority for UI/browser work and optional verification evidence |
| gsd-core | Lightweight cross-runtime context engineering and spec-driven phases | Adapt lightweight path and cross-runtime installer lessons; do not replace Cavekit |
| prompt-master | Prompt generation/context retention skill | Low priority; prefer deterministic templates and contracts over prompt rewriting |
| ponytail | Laziness/YAGNI guard: avoid unnecessary code | High priority as a mandatory scope gate |
| humanizer | Removes AI-writing signals | Optional documentation polish; not a core engineering capability |

## Cross-source conclusions

### Adopt first

1. **Dc-Dev own family** with explicit permissions and no dependence on `kiroExplore`.
2. **Adaptive routing**: fast path, standard path, deep/security path.
3. **File-backed run ledger**: request ID, phase, model, inputs, outputs, retries, evidence, and recovery checkpoint.
4. **Skill/MCP/plugin scanner gate** inspired by SkillSpector + MAESTRO.
5. **Evidence bundle contract** inspired by repo-harness and ProofShot.
6. **Token budget and command-output reduction** using RTK where measurable.
7. **Correction-to-memory loop** using Engram with explicit provenance and conflict handling.

### Adapt later

- Role lenses from gstack.
- Kaddo-style knowledge capsules and module maps.
- Beads-style graph issue state if the current Markdown task graph becomes insufficient.
- Agent-Reach/last30days research mode after capability discovery is reliable.
- Autoresearch-style keep/discard experiments for performance or prompt evaluation.

### Do not adopt now

- Gas Town as a runtime dependency: high operational complexity and Git/worktree assumptions.
- Block Buzz as a coordination substrate: insufficient immediate evidence of ROI.
- omlx and pretext: unrelated to this Linux orchestration problem.
- Humanizer and prompt-master as core control-plane components: cosmetic or high-risk abstraction.
- Minutes/call.md/DocMason as core flow components: useful only if those product requirements appear.

## Proposed new Dc-Dev architecture (no implementation yet)

This is a new family, not a rename or modification of existing agents:

### Agents

- `dc-dev-entry`: conversational boundary and HITL.
- `dc-dev-router`: deterministic tier/depth selection.
- `dc-dev-research`: repository/web research with provenance.
- `dc-dev-context`: context pack, capsules, memory, and standards assembly.
- `dc-dev-architect`: architecture/options/ADR/fitness-function output.
- `dc-dev-planner`: dependency graph, waves, budgets, and checkpoints.
- `dc-dev-builder`: implementation executor under strict TDD.
- `dc-dev-verifier`: tests, evidence bundle, and completion verification.
- `dc-dev-security`: SkillSpector/MAESTRO-inspired security gate.
- `dc-dev-reviewer`: adversarial review and gap analysis.
- `dc-dev-evaluator`: pairwise/effectiveness/efficiency evaluation.
- `dc-dev-recovery`: restart, retry, checkpoint, and failed-agent recovery.

### New skills

- `dc-dev-intake`
- `dc-dev-routing`
- `dc-dev-context-ledger`
- `dc-dev-research-provenance`
- `dc-dev-adaptive-depth`
- `dc-dev-security-gate`
- `dc-dev-evidence-bundle`
- `dc-dev-recovery`
- `dc-dev-token-budget`
- `dc-dev-yagni-guard`

### Control-plane rules

- Existing Cavekit/Gentle/SDD agents remain untouched.
- Dc-Dev can call only its own `dc-dev-*` children by default.
- Every child has a narrow role and a machine-checkable Result Contract.
- Security and verification are mandatory gates, not optional skills.
- No child may silently fall back to an external agent family.
- Model selection must be explicit and observable; if `deepseek-v4-flash-free` is unavailable, fail with a setup-required result rather than silently substituting.

## Open blockers discovered

1. The current delegation interface did not expose model selection for the requested subagent calls.
2. The active `dc-dev` context could not invoke `kiroExplore` because no permission relationship was configured.
3. `skillspector` and `agent-reach` are not installed locally, so their local runtime behavior is not yet verified.
4. `opencode.json` and `custom-agents.json` duplicate agent configuration, creating drift risk.

## Decision gate

No implementation should begin until the new architecture is approved. The next artifact should be a focused design/spec for the new Dc-Dev family, followed by a Cavekit-style map and implementation loop. Existing systems are out of scope for modification.

## Deep clone audit status

The 34 unique repositories were cloned with shallow, blob-filtered clones under `auditoria/repo-clones` for read-only inspection. The audit inspected repository structure, manifests, skill/agent files, hooks, security analyzers, workflow code, and test layout. All temporary clones were deleted after inspection.

Code-level confirmations that materially changed the recommendations:

- `nvidia/skillspector`: concrete analyzer modules exist for prompt injection, system-prompt leakage, rogue agents, agent snooping, semantic security discovery, AST analysis, and inspection-ledger tests. This is more than a documentation pattern; it is a viable reference for a Dc-Dev scanner gate.
- `addyosmani/agent-skills`: includes executable skill validation and tests for versions, commands, reference links, artifact paths, and evals, plus separate code-reviewer, test-engineer, security-auditor, and performance-auditor personas. This supports a lint/eval gate and narrow reviewer roles.
- `Kaddo`: has CLI modules for installed skills, context packs, agents, modules, lifecycle tests, knowledge levels, responsibility tests, and reports. The useful idea is deterministic context-pack assembly with tests, not its full CLI.
- `repo-harness`: is a substantial file-backed harness with repo-local contract files, plans/tasks, hook adapters, setup checks, and a large test surface. It validates the checkpoint/recovery direction, but its installation model is too broad to copy directly.
- `claude-code-best-practice`: contains explicit agent-team prompts, cross-model workflows, implementation docs, and skills. It validates role separation and cross-model review as a design pattern, but must be translated to OpenCode contracts.
- `gstack`: contains executable role tooling plus opt-in telemetry and a hash-chained egress receipt ledger. The egress receipt pattern is valuable for Dc-Dev auditability; telemetry itself should remain off by default.
- `block/buzz`: is a real multi-package application with agent/remote-agent material and substantial tests, but its hive-mind product architecture is not a direct fit for the Dc-Dev control plane.
- `gastown` and `beads`: contain concrete Git/worktree-backed coordination, hooks, formulas, agent workflows, and durable graph issue state. They are strong references for a later multi-worktree mode, not an initial dependency.
- `proofshot`: has an implementation-level proof pipeline with session lifecycle, screenshot/video capture, log/error detection, timestamps, and viewer artifacts. Adopt the evidence-bundle contract, not necessarily the whole browser stack.
- `rtk`: has real OpenCode integration through a plugin and command rewriting/file-reading primitives. Measure the existing local RTK plugin before adding another token-reduction layer.
- `mattpocock/skills`, `obra/superpowers`, `agent-os`, `BMAD-METHOD`, and `gsd-core`: contain concrete workflow/skill structures that reinforce routing, adaptive depth, standards injection, TDD, and explicit phase transitions. They overlap strongly with existing skills, so the new Dc-Dev skills should be smaller and compositional.
- `maestro-threat-modeling-skill`: is intentionally small and artifact-focused (`SKILL.md` plus report templates), making it a good model for a bounded security skill rather than a large security framework.
- `Agent-Reach` and `last30days-skill`: have meaningful source/capability discovery implementations, but both depend on external channels and environment setup. They belong behind an optional research capability gate.
- `gnhf` and `autoresearch`: provide concrete bounded iteration/experiment loops with limits and keep/discard logging. Adapt the budget and experiment ledger, not autonomous unrestricted mutation.
- `omlx`: shallow clone checkout timed out and the project targets Apple Silicon/macOS, so it is excluded from code-level conclusions.

Cleanup result: temporary clones removed successfully; no external repository was modified.

## Gentleman-AI v2.4.0 audit

Repository: `Gentleman-Programming/gentle-ai`
Observed tag: `v2.4.0`
Observed commit: `301fb2a` (2026-08-17, lineage-scope test fix merge)
Runtime: Go 1.25.10

The current release is materially richer than the older Gentle-AI assumptions in the existing Dc-Dev ADR. Useful concrete patterns:

- receipt-driven development and release verification;
- explicit OpenCode SDD profiles;
- persistent Engram integration;
- backup metadata and restore flows;
- preflight reasons and governing-authority checks;
- review lineage, named continuations, revision conflicts, and new-lineage gates;
- transport admission/capability checks;
- scope-change recovery and convergence recovery;
- final-verification retry and inconclusive-validation handling;
- artifact provenance, empty-file evidence, and publication defaults;
- extensive CLI tests for authority damage, cross-version mode, consent relay, path guidance, status, and recovery.

### What Dc-Dev should absorb

1. **Receipt/lineage ledger** for every run, not only a free-form trace.
2. **Authority model**: identify who/what can approve, revise, continue, or invalidate a run.
3. **Transport admission**: verify subagent/model/tool capability before dispatch.
4. **Recovery state machine**: distinguish retry, resume, new lineage, abandon, and inconclusive validation.
5. **Artifact provenance**: every result must identify source, generation step, timestamp, and verification status.
6. **Backup/restore metadata** for configuration changes.
7. **Final verification retry** when evidence is incomplete, without silently converting inconclusive to pass.

### Verification limitation

The cloned repository's test run could not complete in this environment because Go dependencies started downloading and the command timed out. This is an environment verification limitation, not a claim that the upstream test suite fails.

## Local stack audit

The local plugins and tools were inspected at source/configuration level:

- **Headroom**: `headroom-cavekit` defines compression before Sketch/Map/Make and learning after Check; installed CLI is `headroom 0.33.0`. The documented `headroom-compress` and `headroom-retrieve` helper commands were not found on the active PATH, so Dc-Dev must use capability discovery and degrade safely.
- **context-mode**: active local persistence contains content/session SQLite stores and many session stats files. It should remain the context transport/index layer, not become an unbounded source of raw transcript injection.
- **RTK**: existing plugin and local binary were found in the normal shell environment; RTK has native OpenCode `tool.execute.before` rewriting. Avoid adding a second token proxy; measure current savings first.
- **agent-flow**: state/status helpers and tests exist; useful for run graph/state visibility, but must not become the source of truth for completion.
- **agent-flow-tts**: local HTTP bridge calls are bounded by a 2-second timeout and expose health/speak/beep. TTS must remain notification-only, never a workflow dependency or approval channel.
- **Engram**: plugin contains session/tool/compaction hooks and local service lifecycle behavior; use it for durable memory/provenance, with timeout and offline degradation.
- **OpenCode Review**: plugin spawns an external review process with timeout/kill handling; integrate as optional evidence, never as the sole security gate.
- **Graphify/CodeGraph**: use for structural context and dependency evidence before planning; do not inject full graphs into every prompt.
- **Background agents/service manager/skill tracker**: useful infrastructure, but new Dc-Dev needs explicit health, ownership, and failure contracts because previous delegation failures returned empty results.
- **Lightpanda/Obscura**: both are configured MCPs; choose based on task (Lightpanda for lightweight agent extraction, Obscura for stealth/anti-detection), with capability checks before use.

## Updated recommendation

The new Dc-Dev should absorb the strongest Gentleman-AI and local-stack ideas as first-class controls: receipt/lineage, authority, transport admission, recovery state machine, provenance, capability discovery, adaptive Headroom compression, evidence bundles, and TTS isolation. These become new Dc-Dev skills and agents; existing systems remain untouched.
