# React 19 Skill

## Structure

```
react-19/
├── SKILL.md                 # Main skill definition (131 lines)
├── references/              # Supporting documentation
│   ├── compiler-optimization.md
│   ├── server-components-use-hook.md
│   └── actions-useactionstate.md
├── assets/                  # Code examples
│   └── react-19-complete-example.tsx
└── scripts/                 # Utility scripts (empty)
```

## Quick Start

1. **Read SKILL.md** - Understand React 19 patterns
2. **Study references/** - Deep dive into specific techniques
3. **Review assets/** - Real-world code examples

## Key Concepts

- **React Compiler** - Automatic optimization, no useMemo/useCallback needed
- **Server Components** - Default in Next.js, run only on server
- **use() Hook** - Read promises and context conditionally
- **Server Actions** - Async functions that run on server
- **useActionState** - Pending state and error handling
- **ref as Prop** - No forwardRef needed

## When to Use

- Building React 19 applications
- Writing Server Components
- Creating interactive forms
- Optimizing performance
- Using Server Actions
- Handling async operations

## Key Patterns

### No Manual Memoization

```typescript
function Component({ items }) {
  const filtered = items.filter(x => x.active);
  const handleClick = (id) => console.log(id);
  return <List items={filtered} onClick={handleClick} />;
}
```

### Server Components

```typescript
export default async function Page() {
  const data = await db.query();
  return <Component data={data} />;
}
```

### use() Hook

```typescript
const comments = use(commentsPromise);
const theme = use(ThemeContext);
```

### Server Actions

```typescript
"use server";
export async function submitForm(formData: FormData) {
  await db.save(formData);
}
```

### useActionState

```typescript
const [state, action, isPending] = useActionState(submitForm, null);
```

## Common Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter
```

## Related Skills

- `nextjs-16` - Next.js 16 App Router patterns
- `typescript-pro` - TypeScript advanced patterns
- `react-hook-form` - Form handling with React
