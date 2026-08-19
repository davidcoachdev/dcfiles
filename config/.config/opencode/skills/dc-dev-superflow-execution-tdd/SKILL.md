---
name: dc-dev-superflow-execution-tdd
description: Execute bounded tasks with mechanical red-green-refactor receipts.
---
# Dc-Dev Execution TDD
Trigger: an owned task is unblocked.
Workflow: write failing test → minimal implementation → refactor → validate gates → record receipt.
Failure behavior: missing phase, timeout, or tool failure stops the task and preserves evidence.
Result Contract: task ID, RED/GREEN/REFACTOR receipts, tests, artifacts, gate results.
