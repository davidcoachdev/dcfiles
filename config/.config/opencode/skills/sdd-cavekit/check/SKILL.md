---
name: sdd-cavekit-check
description: >
  Fase Check — gap analysis + peer review + security axis. Trigger: "/sdd-cavekit check", "verify", "review", "gap analysis"
---

## Check Phase — Gap Analysis + Peer Review (Gold)

Recibes: implementation + kits.
Produces: verdict + gaps + Result Contract.

### Principios gold
- **Security es gate de bloqueo**: el eje security (`security-auditor`) corre SIEMPRE. P0/P1 → REJECT del loop.
- **Human-in-the-Loop**: el verdict final lo decide el humano. El orchestrator presenta gaps; el user aprueba.
- **Anti-patterns**: revisá patrones/anti-patterns (referencia `refactoring`, `design-patterns`).
- **Strict TDD check**: confirmá que los tests cubren los AC y la cobertura no bajó.

### Gap Analysis
Para cada requirement: Complete / Partial / Missing / Over-built.

### Peer Review
Segundo agente. *"Find what the builder missed, NOT agree."*
6 modos: Diff Critique, Design Challenge, Threaded Debate, Delegated Scrutiny, Deciding Vote, Coverage Audit.

### Multi-Axis Review (Security + Web Perf)
- **Security axis** → `security-auditor` (OWASP Top 10 + LLM Top 10: prompt injection, excessive agency, límites de token/rate/recursion). Cubre los Security Gates de la plantilla gold.
- **Web Perf axis** → `web-performance` + `core-web-vitals` (Metric-Honesty Rule, severidad por CWV).

P0/P1 → REJECT.

### Severity Levels
| Severity | Behavior |
|----------|----------|
| P0 (critical) | Block advancement |
| P1 (high) | Block advancement |
| P2 (medium) | Logged, no block |
| P3 (low) | Logged, no block |

### Result Contract (Output)
```
Gap Analysis: Complete {n}, Partial {n}, Missing {n}, Over-built {n}
Critical Gaps (blocking retry):
- R-003: Rate limiting not implemented (P0)
Peer Review: P0 {n}, P1 {n}, P2 {n}, P3 {n}
Security Gates: PASS / FAIL
Verdict: APPROVE | REVISE | REJECT
```
El orchestrator lee `Verdict` + `Critical Gaps` y feedback al próximo make.

### Auto-Load
- peer-review
- impl-tracking
- revision (fix gaps upstream)
- security-auditor
- web-performance
- core-web-vitals
