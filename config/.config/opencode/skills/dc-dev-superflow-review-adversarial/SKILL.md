---
name: dc-dev-superflow-review-adversarial
description: Independently challenge Dc-Dev output and security claims.
---
# Dc-Dev Adversarial Review
Trigger: pre-publication or a quality iteration ends.
Workflow: use a separate reviewer identity → classify gaps P0-P3 → run security axis → emit PASS, REVISE, REJECT, or INCONCLUSIVE.
Failure behavior: same reviewer as builder or missing evidence is `inconclusive`.
Result Contract: reviewer, findings, security axis, verdict, next task routing.
