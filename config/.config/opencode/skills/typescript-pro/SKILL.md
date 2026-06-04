---
name: typescript-pro
description: >
  TypeScript expert for advanced type systems, large-scale applications, and type-safe development.
  Trigger: When writing TypeScript code - types, interfaces, generics, advanced patterns.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.1"
---

## When to Use

- TypeScript development (any level)
- Advanced type systems and type-level programming
- Large-scale TypeScript applications
- Type-safe code patterns
- Writing types, interfaces, generics
- Strict mode development

## Core Expertise

### Foundational Patterns (REQUIRED)

#### Const Types Pattern (REQUIRED)

```typescript
// ✅ ALWAYS: Create const object first, then extract type
const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];

// ❌ NEVER: Direct union types
type Status = "active" | "inactive" | "pending";
```

**Why?** Single source of truth, runtime values, autocomplete, easier refactoring.

#### Flat Interfaces (REQUIRED)

```typescript
// ✅ ALWAYS: One level depth, nested objects → dedicated interface
interface UserAddress {
  street: string;
  city: string;
}

interface User {
  id: string;
  name: string;
  address: UserAddress;  // Reference, not inline
}

interface Admin extends User {
  permissions: string[];
}

// ❌ NEVER: Inline nested objects
interface User {
  address: { street: string; city: string };  // NO!
}
```

#### Never Use `any`

```typescript
// ✅ Use unknown for truly unknown types
function parse(input: unknown): User {
  if (isUser(input)) return input;
  throw new Error("Invalid input");
}

// ✅ Use generics for flexible types
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// ❌ NEVER
function parse(input: any): any { }
```

#### Utility Types Quick Reference

```typescript
Pick<User, "id" | "name">     // Select fields
Omit<User, "id">              // Exclude fields
Partial<User>                 // All optional
Required<User>                // All required
Readonly<User>                // All readonly
Record<string, User>          // Object type
Extract<Union, "a" | "b">     // Extract from union
Exclude<Union, "a">           // Exclude from union
NonNullable<T | null>         // Remove null/undefined
ReturnType<typeof fn>         // Function return type
Parameters<typeof fn>         // Function params tuple
```

#### Type Guards

```typescript
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}
```

#### Import Types

```typescript
import type { User } from "./types";
import { createUser, type Config } from "./utils";
```

### Advanced Type System

- Conditional types and mapped types
- Template literal types
- Recursive types and type inference
- Discriminated unions and exhaustive checking
- Generic constraints and variance

### Type-Level Programming

- DeepPartial, DeepReadonly
- ReturnType inference
- Template literal types for events
- Mapped type utilities

### Design Patterns

- Repository pattern with generics
- Dependency injection
- Event-driven architectures
- Factory patterns with type safety

## Best Practices

1. Use strict mode (enable all checks)
2. Prefer interfaces over types for objects
3. Use satisfies operator for inference
4. Implement proper error handling
5. Extract types to single source of truth
6. Keep interfaces flat (no nesting)

## Resources

See `references/` for detailed guides:

- **`references/advanced-types.md`** - Const types, flat interfaces, utility types, conditional types
- **`references/generics-type-safety.md`** - Generic functions, interfaces, constraints, type inference

Code examples in `assets/`:
- **`assets/typescript-patterns-example.ts`** - Complete working examples with const types, interfaces, generics, type guards, mapped types, template literal types

## External Resources

- **Main Docs**: https://www.typescriptlang.org/docs
- **Handbook**: https://www.typescriptlang.org/docs/handbook/intro.html
- **TypeScript 5.5**: https://devblogs.microsoft.com/typescript/announcing-typescript-5-5/