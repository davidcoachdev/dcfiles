---
name: software-architect
description: >
  System design expert specializing in architectural decisions, domain-driven design,
  trade-off analysis, and architecture evolution strategy. Focuses on software architecture
  decisions and their long-term consequences.
  Trigger: When designing system architecture, making architectural decisions, evaluating
  trade-offs, choosing patterns, or planning architecture evolution.
---

## When to Use

- Designing new system architecture
- Making architectural decisions (monolith vs microservices, SQL vs NoSQL, etc.)
- Evaluating trade-offs between approaches
- Domain-driven design and bounded context mapping
- Architecture evolution strategy (strangler fig, incremental migration)
- Choosing patterns (CQRS, Event Sourcing, Saga, etc.)

## Architecture Decision Records (ADRs)

Every significant architectural decision gets an ADR:

```markdown
# ADR-[NUMBER]: [TITLE]

## Status: [Proposed | Accepted | Deprecated | Superseded by ADR-X]

## Context
[What is the issue that we're seeing that is motivating this decision?]

## Decision
[What is the change that we're proposing/making?]

## Consequences
### Positive
- [Benefits of this decision]

### Negative
- [Costs and risks of this decision]

### Risks
- [What could go wrong? Mitigations?]

## Alternatives Considered
1. [Alternative A] — [Why rejected]
2. [Alternative B] — [Why rejected]
```

## Trade-off Analysis Framework

When choosing between approaches, evaluate on these axes:

| Factor | Monolith | Microservices | Serverless |
|--------|----------|---------------|------------|
| Complexity | Low | High | Medium |
| Deploy speed | Slow (whole app) | Fast (per service) | Instant |
| Operational cost | Low | High | Variable |
| Team scaling | Hard | Easy | Easy |
| Debugging | Easy | Hard (distributed) | Hard |
| Data consistency | Strong | Eventual | Varies |
| Best for | Small-medium teams, early stage | Large teams, complex domains | Event-driven, variable load |

**Rule**: Don't choose architecture for where you ARE, choose for where you'll be in 6-12 months. But don't over-engineer for 5 years out.

## Architecture Patterns Decision Guide

### When to Use What

| Pattern | Use When | Don't Use When |
|---------|----------|----------------|
| Layered | Simple CRUD, <5 devs, MVP | Complex domain logic, >10 devs |
| Hexagonal/Clean | Domain complexity, testability critical | Simple CRUD, prototype |
| CQRS | Read/write asymmetry, complex queries | Simple CRUD, read=write patterns |
| Event Sourcing | Audit trail required, temporal queries | Simple state, eventual consistency unacceptable |
| Saga | Distributed transactions, long-lived processes | Single DB, short transactions |
| Strangler Fig | Migrating legacy, incremental rewrite | Greenfield, tight deadline |
| BFF (Backend for Frontend) | Multiple client types with different needs | Single client type, simple API |

## Domain-Driven Design Quick Reference

### Strategic Patterns
```
Bounded Context: Linguistic boundary where a term has ONE meaning
  ┆ Example: "Product" means different things in Catalog vs Inventory context

Context Map: How bounded contexts relate to each other
  ┆ Upstream/Downstream: Who depends on whom
  ┆ Anti-Corruption Layer: Protect downstream from upstream changes
  ┆ Conformist: Accept upstream model as-is
  ┆ Open-Host Protocol: Published language for integration

Ubiquitous Language: ONE shared vocabulary within a bounded context
  ┆ Code reflects language, language reflects domain experts' words
```

### Tactical Patterns
```
Entity: Has identity (User, Order) — equality by ID
Value Object: No identity (Money, Address) — equality by value
Aggregate: Consistency boundary (Order + OrderLines) — one transaction
Domain Event: Something that happened (OrderPlaced, PaymentReceived)
Repository: Persist and retrieve aggregates by ID
Factory: Create complex objects, encapsulate construction logic
```

## Architecture Evolution Strategy

### Strangler Fig Pattern (Migration)
```
Phase 1: Route new feature to new service, proxy everything else to legacy
Phase 2: Move read paths (easier) to new service
Phase 3: Move write paths (harder) to new service
Phase 4: Remove legacy when all traffic routes to new service
```

### Incremental Architecture
```
Rule of 3: First time — just do it. Second time — similar pattern? Consider extracting.
  Third time — EXTRACT the pattern. Don't abstract before you've seen it 3 times.

Rule of 1: Can this work with 1 instance? 1 user? 1 feature?
  If not, your architecture is over-engineered for the current stage.
```

## Common Anti-Patterns

| Anti-Pattern | Symptom | Fix |
|-------------|---------|-----|
| Big Ball of Mud | No clear structure, everything depends on everything | Bounded contexts, layered architecture |
| Distributed Monolith | Microservices that must deploy together | Loose coupling, async communication |
| Inner-Platform Effect | Your framework does everything the platform does | Use platform features, reduce abstraction |
| Magic | Implicit behavior, "it just works" | Make the implicit explicit |
| Premature Abstraction | Interfaces for everything, 1 implementation per IF | Rule of 3: abstract after 3 examples |

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]