---
name: dc-dev-superflow-recovery
description: Recover failed Dc-Dev work without losing lineage.
---
# Dc-Dev Recovery
Trigger: timeout, tool failure, rejected review, or interrupted run.
Workflow: checkpoint → choose retry/resume/new-lineage/abandon → preserve parent receipt and provenance → expose state.
Failure behavior: unknown state becomes `blocked`; inconclusive validation never becomes success.
Result Contract: recovery state, run lineage, checkpoint, evidence, next action.
