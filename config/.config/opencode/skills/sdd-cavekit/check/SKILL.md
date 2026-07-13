---
name: sdd-cavekit-check
description: >
  Fase Inspect — gap analysis + peer review.
  Trigger: "/sdd-cavekit check", "verify", "review", "gap analysis"
---

## Check Phase — Gap Analysis + Peer Review

Recibes: implementation + kits
Produces: verdict + gaps

### Gap Analysis

Para cada requirement en kits, verificar si acceptance criteria satisfied:

| Status | Meaning |
|--------|---------|
| **Complete** | Todos criteria pasan |
| **Partial** | Algunos pasan, otros no |
| **Missing** | Requirement no implementado |
| **Over-built** | Implement exceeds kit (possible kit gap) |

### Peer Review

Invocar segundo agente para revisar:

**Core Principle**: "The peer reviewer's job is to find what the builder missed — NOT to agree."

**6 Modos**:

| Modo | Cuándo |
|-----|--------|
| **Diff Critique** | changes vs kit requirements |
| **Design Challenge** | Antes de build (spec flaws) |
| **Threaded Debate** | Issues complejos |
| **Delegated Scrutiny** | Reviewer puede reject |
| **Deciding Vote** | Voting entre modelos |
| **Coverage Audit** | Test coverage |

### Multi-Axis Review (Security + Web Perf)

Además del peer review genérico, el check abre dos ejes especializados como fan-out
paralelo. Cada eje produce gaps que se agregan al veredicto (igual que el peer review).

- **Security axis** → usa la skill `security-auditor` (dominios estándar + sección AI/LLM:
  prompt injection, excessive agency, límites de token/rate/recursion). Cubre OWASP Top 10 + LLM Top 10.
- **Web Perf axis** → usa las skills `web-performance` + `core-web-vitals` (Metric-Honesty Rule,
  modos Quick/Deep, scorecard con fuente, anti-patrones de código generado por IA, severidad por CWV).

Ambos ejes alimentan `Critical Gaps`. Si alguno tira P0/P1 → REJECT del loop, igual que el peer review.
No agregan pasos al loop del orquestador: corren dentro de este `check`.

### Severity Levels

| Severity | Behavior |
|----------|------------|
| **P0 (critical)** | Block advancement |
| **P1 (high)** | Block advancement |
| **P2 (medium)** | Logged, no block |
| **P3 (low)** | Logged, no block |

### Fix Cycle

- Max 2 ciclos de fix por tier
- Después → advance con warning (nunca deadlock)

### Verdict

| Verdict | Meaning |
|---------|---------|
| **APPROVE** | Todos criteria pasan, quality OK |
| **REVISE** | Fixes menores, puede proceed |
| **REJECT** | Issues críticos, blockea |

### Output

Siempre incluir gaps detallados para que el orquestador pueda retry con feedback.

```
Gap Analysis:
- Complete: {n}
- Partial: {n}  
- Missing: {n}
- Over-built: {n}

Critical Gaps (blocking retry):
- R-003: Rate limiting not implemented (P0)
- R-007: Error responses don't match spec (P1)

Peer Review:
- P0: {n}, P1: {n}, P2: {n}, P3: {n}

Verdict: {APPROVE|REVISE|REJECT}
```

El orquestador lee `Critical Gaps` y `Verdict`. Si el veredicto es REJECT,
pasa los gaps al próximo make como feedback.
```

### Cavekit Auto-Load

Cargar skills:
- peer-review
- impl-tracking
- revision (para fix gaps upstream)
- security-auditor
- web-performance
- core-web-vitals