# Dc-Dev Superflow: Context and Caveman Transport

## Goal

Deliver bounded, retrievable context capsules with measured Caveman compression while preserving meaning, evidence, and security.

## Constraints

- Compression is transport optimization, not permission to omit requirements or evidence.
- Reuse context-mode, Engram, Headroom, RTK, and Caveman ideas only through adapters and capability checks.
- No compression for security findings, approvals, secrets, irreversible confirmations, receipts, or final verification evidence.

## Requirements

### R9: Context ledger and capsule selection
**Description:** The orchestrator selects only relevant kits, ADR sections, plans, memory, and evidence for each child.
**Acceptance Criteria:**
- [ ] Every capsule lists source path/ID, requirement IDs, inclusion reason, creation time, and byte/token estimate.
- [ ] A capsule excludes full transcripts, full graphs, secrets, and unrelated source content.
- [ ] Missing or stale sources are marked in the capsule and cannot be represented as current facts.
**Dependencies:** Intake R5–R8; existing context architecture plans.

### R10: Caveman modes and loss budget
**Description:** Compression mode is explicit, measurable, and reversible.
**Acceptance Criteria:**
- [ ] Each compressed capsule records mode, original size, compressed size, ratio, loss budget, and retrieval key.
- [ ] `literal` mode is used for security/approval/irreversible evidence; `safe` mode preserves all requirement IDs and verdicts; `aggressive` mode is allowed only for non-authoritative prose.
- [ ] Exceeding the loss budget or failing round-trip key retrieval forces uncompressed fallback and records the reason.
**Dependencies:** R9, token kit R38–R41.

### R11: Clarity escape hatch and retrieval
**Description:** Any child or reviewer can request authoritative uncompressed context by key.
**Acceptance Criteria:**
- [ ] A clarity request returns the original capsule or an explicit unavailable result within the configured timeout.
- [ ] Security, receipt, provenance, and test evidence remain byte-identifiable after compression and retrieval.
- [ ] Retrieval failure does not cause a child to infer missing content; it returns `blocked` or `inconclusive`.
**Dependencies:** R10, recovery R34–R37.

### R12: Memory/context failure behavior
**Description:** Context-mode or Engram outages degrade safely without becoming completion authorities.
**Acceptance Criteria:**
- [ ] Timeout/offline memory operations produce a typed risk and continue only when the required capsule is independently available.
- [ ] A required missing capsule blocks the dependent phase and records the missing source.
- [ ] Memory writes include provenance and deduplicate identical observations without overwriting conflicting authoritative facts.
**Dependencies:** Research R13–R16; recovery R36–R37.

## Security Gates

- [ ] Security findings, approvals, secrets, irreversible confirmations, and final evidence are never compressed.
- [ ] Untrusted context is labeled data and cannot become control instructions.
- [ ] Compression logs contain metadata only, not secret payloads.

## Verification Plan

- Capsule schema, redaction, mode/loss-budget, round-trip, timeout, and offline tests.
- Gate 2 deterministic transport tests and Gate 4 compression measurements.

## Out of Scope

- Creating a second compressor, replacing context-mode/Engram/RTK/Headroom, or storing full transcripts by default.

## Cross-References

- Depends on intake R5–R8 and token-efficiency R38–R41.
- Supplies authoritative context to research R13–R16, architecture R17–R20, and evidence R30–R33.

## Definition of Done (Result Contract)

`ok` requires capsule provenance, measured loss, retrieval, and safe-degradation tests. Artifact: context ledger/capsule contract. Next: `/sdd-cavekit map`.
