---
name: dc-dev-superflow-evidence-bundle
description: Assemble publication evidence with ordered validation gates.
---
# Dc-Dev Evidence Bundle
Trigger: a task or run requests completion or publication.
Workflow: collect artifacts → attach receipts/provenance → run ordered gates → publish only a literal pass.
Failure behavior: missing, stale, partial, or unverified evidence yields `inconclusive` or `blocked`.
Result Contract: artifacts, gates, provenance, verification, publication verdict.
