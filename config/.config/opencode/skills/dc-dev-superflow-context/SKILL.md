---
name: dc-dev-superflow-context
description: Assemble bounded context capsules owned by the orchestrator.
---
# Dc-Dev Context
Trigger: a child needs project context.
Workflow: select relevant sources → record context ledger → cap size → preserve authority labels.
Failure behavior: missing or conflicting context yields `inconclusive` and requests clarification.
Result Contract: capsule, ledger, source provenance, truncation state, recovery state.
