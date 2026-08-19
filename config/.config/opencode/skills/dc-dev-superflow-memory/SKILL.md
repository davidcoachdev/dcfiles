---
name: dc-dev-superflow-memory
description: Persist deduplicated, conflict-aware, provenance-bearing run memory.
---
# Dc-Dev Memory
Trigger: a decision, receipt, recovery, or durable discovery must persist.
Workflow: normalize observation → attach provenance → deduplicate → surface conflicts → preserve offline fallback.
Failure behavior: timeout degrades to a visible non-authoritative memory state.
Result Contract: observation, provenance, deduplication result, conflict state, storage status.
