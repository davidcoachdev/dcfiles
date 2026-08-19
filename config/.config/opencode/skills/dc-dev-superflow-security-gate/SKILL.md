---
name: dc-dev-superflow-security-gate
description: Scan inputs and enforce P0/P1 blocking security decisions.
---
# Dc-Dev Security Gate
Trigger: before activation, dispatch, execution, or publication.
Workflow: scan skill/MCP/plugin/prompt → check authority and transport → run independent review → issue literal verdict.
Failure behavior: P0/P1, unknown authority, or missing independent reviewer returns `blocked`.
Result Contract: findings, reviewer identity, protected paths, transport decision, verdict, provenance.
