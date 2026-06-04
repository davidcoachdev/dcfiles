---
name: arch-patterns
description: Senior Fullstack Architect. Define architecture patterns, component patterns, and coding standards. Enforces Clean Architecture, hexagonal layers, and reusable component patterns across the stack.
---

# Architecture Patterns Skill

## 1. BASELINE
* ARCHITECTURE_MODE: 6 (1=Flat, 10=Hexagonal/Clean)
* COMPLEXITY_LEVEL: 5 (1=MVP, 10=Enterprise)
* CODE_QUALITY: 8 (1=Prototype, 10=Production-Ready)
* PATTERN_DENSITY: 7 (1=Minimal, 10=Heavily Patterned)

## 2. ARCHITECTURE CONVENTIONS

### Dependency Rule (MANDATORY)
* Check package.json before importing any 3rd party
* Dependency Direction: domain ← application ← infrastructure ← presentation
* Interface Segregation: Define interfaces in domain, implement in infrastructure

### Layer Architecture (Clean/Hexagonal)
```
src/
├── domain/           # Business logic, entities, interfaces (NO dependencies)
├── application/     # Use cases, DTOs
├── infrastructure/  # Repository implementations, API clients
└── presentation/    # UI, Controllers
```

### Component Pattern (Container/Presentational)
* Container: Logic, state, data fetching. NO UI rendering.
* Presentational: UI only, receives props. NO business logic.

### Repository Pattern
* Interface in Domain: `interface UserRepository { findById(id): Promise<User> }`
* Implementation in Infrastructure: `class PostgresUserRepository implements UserRepository`

## 3. ARCHITECTURE DIRECTIVES

### Rule 1: Explicit API Contracts
* Request/Response DTOs explicit
* Error Responses standardized
* Versioning: `/api/v1/resource`

### Rule 2: State Management Boundaries
* Client State: useState/useReducer (modals, forms)
* Server State: React Query/SWR (API data)
* NEVER mix

### Rule 3: Error Handling Layers
* Domain Errors: Business rule violations
* Application Errors: Use case failures
* Infrastructure Errors: DB failures, API timeouts
* Presentation Errors: User feedback

### Rule 4: Configuration
* Environment Variables: All config via env
* Schema Validation: Validate env vars at startup (zod, valibot)
* Secrets: Never commit secrets

### Rule 5: Testing Strategy
* Unit Tests: Domain services, pure functions
* Integration Tests: Repository, API endpoints
* E2E Tests: Critical user flows
* Test Location: Alongside source

### Rule 6: Component Patterns
* Atomic Design: atoms → molecules → organisms → templates → pages
* Compound Components: For flexible APIs
* Render Props / Hooks: For logic reuse

## 4. CREATIVE PROACTIVITY

### Advanced Data Patterns
* Cursor Pagination: For large datasets
* Optimistic Updates: UI updates before server confirms
* Debounced Search: Prevent API spam
* Infinite Scroll: With intersection observer

### Advanced Architecture
* Event-Driven: Cross-service communication
* CQRS: Complex read/write scenarios
* Saga Pattern: Distributed transactions
* Retry with Backoff: Resilient API calls

### Advanced Component
* Slot Pattern: Flexible composition
* Context: Theme, auth, settings
* Compound State: Multiple related state
* Reducer Pattern: Complex state logic

## 5. PERFORMANCE GUARDRAILS

### Backend
* N+1 Prevention: Joins or batch queries
* Connection Pooling: Reuse DB connections
* Caching: Redis or in-memory
* Indexing: For query patterns

### Frontend
* Code Splitting: Route-based and component-based
* Memoization: React.memo, useMemo, useCallback
* Lazy Loading: Images, components, routes
* Virtualization: For lists > 100 items

## 6. DIAL DEFINITIONS

### ARCHITECTURE_MODE (1-10)
* 1-3: Flat - Simple MVC
* 4-6: Layered - Standard 3-layer
* 7-9: Clean - Domain-driven boundaries
* 10: Hexagonal - Ports and adapters

### COMPLEXITY_LEVEL (1-10)
* 1-3: MVP
* 4-7: Standard
* 8-10: Enterprise

### CODE_QUALITY (1-10)
* 1-3: Prototype
* 4-7: Production
* 8-10: Excellence

### PATTERN_DENSITY (1-10)
* 1-3: Minimal
* 4-7: Standard
* 8-10: Heavy

## 7. FORBIDDEN PATTERNS

### Architecture
* God Objects: 1000+ lines in single file
* Circular Dependencies
* Spaghetti Code
* Hardcoded Config

### Components
* Prop Drilling: Use context
* Memory Leaks: Always cleanup
* Uncontrolled State
* Inline Styles

### Data
* SQL Injection: Parameterized queries
* Exposing Secrets
* Race Conditions
* Missing Validation

## 8. PRE-FLIGHT

- [ ] Architecture follows layer boundaries
- [ ] Dependencies flow correctly
- [ ] Interfaces defined before implementations
- [ ] Error handling at all layers
- [ ] Tests for domain logic
- [ ] No hardcoded config