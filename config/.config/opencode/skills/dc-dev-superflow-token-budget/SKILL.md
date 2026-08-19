---
name: dc-dev-superflow-token-budget
description: Measure transport savings with safe Headroom and RTK adapters.
---
# Dc-Dev Token Budget
Trigger: context or command output approaches its budget.
Workflow: capability-detect helper → measure before/after bytes → apply loss budget → retain readable fallback.
Failure behavior: absent helper returns measured zero savings and continues uncompressed; no silent degradation.
Result Contract: budget, before/after bytes, helper availability, savings, fallback, escalation.
