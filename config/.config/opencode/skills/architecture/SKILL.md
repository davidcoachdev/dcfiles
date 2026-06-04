---
name: architecture
description: Clean Architecture, hexagonal layers, dependency injection.
---

# Architecture - Capas

## Clean Layers

```
domain/        → Entities, interfaces (CERO dependencies)
application/  → Use cases, DTOs
infrastructure/→ Repositories, API handlers
presentation/ → UI, Controllers
```

## Dependency Rule
```
domain ← application ← infrastructure ← presentation
```

**PROHIBIDO:**
- ❌ Domain importa infrastructure
- ❌ Entities en presentation

## Repository Pattern

```typescript
// Interface en domain
interface UserRepository {
  findById(id: string): Promise<User | null>;
  create(user: CreateUserDTO): Promise<User>;
}

// Implementation en infrastructure
class PostgresUserRepository implements UserRepository {
  async findById(id: string) { ... }
}
```

## Forbidden

- ❌ Circular dependencies
- ❌ God classes (500+ lines)
- ❌ Domain importa infrastructure