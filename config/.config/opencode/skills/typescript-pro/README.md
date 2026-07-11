# TypeScript Pro Skill

## Structure

```
typescript-pro/
├── SKILL.md                 # Main skill definition
├── references/              # Supporting documentation
│   ├── advanced-types.md
│   └── generics-type-safety.md
├── assets/                  # Code examples
│   └── typescript-patterns-example.ts
└── scripts/                 # Utility scripts (empty)
```

## Quick Start

1. **Read SKILL.md** - Understand TypeScript patterns
2. **Study references/** - Deep dive into specific techniques
3. **Review assets/** - Real-world code examples

## Key Concepts

- **Const Types** - Single source of truth for enums
- **Flat Interfaces** - One level depth, reference nested types
- **Generics** - Reusable, type-safe code
- **Utility Types** - Readonly, Partial, Pick, Record
- **Conditional Types** - Type-level if/else
- **Type Guards** - Runtime type checking
- **Mapped Types** - Transform types dynamically
- **Template Literal Types** - String literal types

## When to Use

- Writing TypeScript code
- Advanced type systems
- Large-scale applications
- Type-safe patterns
- Generic functions/interfaces
- Strict mode development

## Key Patterns

### Const Types

```typescript
const STATUS = { ACTIVE: "active", INACTIVE: "inactive" } as const;
type Status = (typeof STATUS)[keyof typeof STATUS];
```

### Generics

```typescript
function first<T>(arr: T[]): T | undefined { return arr[0]; }
interface Container<T> { value: T; }
```

### Type Guards

```typescript
function isUser(value: unknown): value is User {
  return typeof value === "object" && "id" in value;
}
```

### Utility Types

```typescript
type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
type UserPreview = Pick<User, "id" | "name">;
```

## Related Skills

- `react-19` - React 19 with TypeScript
- `nextjs-16` - Next.js with TypeScript
- `angular-core` - Angular with TypeScript
