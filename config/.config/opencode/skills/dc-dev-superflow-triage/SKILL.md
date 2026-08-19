---
name: dc-dev-superflow-triage
description: Choose fast, standard, or deep execution paths deterministically.
---
# Dc-Dev Triage
Trigger: a request enters before planning.
Workflow: detect risk and ambiguity → select depth → require HITL for ambiguity → route to owned graph.
Failure behavior: ambiguity or unsafe scope stops with one clarification or `blocked` result.
Result Contract: intent, depth, risk, approval requirement, route, rationale.
