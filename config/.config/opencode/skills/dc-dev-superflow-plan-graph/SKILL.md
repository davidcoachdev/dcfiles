---
name: dc-dev-superflow-plan-graph
description: Build owned dependency waves and checkpointed handoffs.
---
# Dc-Dev Plan Graph
Trigger: an admitted request needs planning.
Workflow: map requirements → assign owners → form conflict-free waves → checkpoint graph and handoff.
Failure behavior: cycles, missing owners, or empty graph become `blocked`.
Result Contract: graph, waves, owners, dependencies, checkpoint receipt.
