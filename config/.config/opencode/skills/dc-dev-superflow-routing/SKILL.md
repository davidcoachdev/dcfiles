---
name: dc-dev-superflow-routing
description: Route Dc-Dev work to owned children after admission.
---
# Dc-Dev Superflow Routing
Trigger: intake requires adaptive depth or child dispatch.
Workflow: normalize receipt → select depth → admit model/capability → route only to `dc-dev-superflow-*` children.
Failure behavior: return `blocked` or `setup-required`; never substitute Cavekit, Gentle, SDD, kiro, or external agents.
Result Contract: status, target, parent receipt, model, capability admission, write scope, requirement IDs.
