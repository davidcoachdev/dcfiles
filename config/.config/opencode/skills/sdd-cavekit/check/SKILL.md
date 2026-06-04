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

```
Gap Analysis:
- Complete: {n}
- Partial: {n}  
- Missing: {n}
- Over-built: {n}

Peer Review:
- P0: {n}, P1: {n}, P2: {n}, P3: {n}

Verdict: {APPROVE|REVISE|REJECT}
```

### Cavekit Auto-Load

Cargar skills:
- peer-review
- impl-tracking
- revision (para fix gaps upstream)