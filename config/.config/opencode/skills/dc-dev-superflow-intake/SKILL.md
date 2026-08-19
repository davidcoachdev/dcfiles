---
name: dc-dev-superflow-intake
description: Normalize Dc-Dev requests and approval boundaries.
---
# Dc-Dev Superflow Intake
Trigger: a new user request enters the primary Dc-Dev boundary.
Workflow: classify intent → bind request hash → require attributable expiring approval for mutation → emit receipt.
Failure behavior: ambiguous or unapproved mutation becomes `approval-required`, never inferred approval.
Result Contract: route, request hash, approval state, receipt, next action.
