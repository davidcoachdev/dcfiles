# Next.js 16 App Router Skill

## Structure

```
nextjs-16/
├── SKILL.md                 # Main skill definition (229 lines)
├── references/              # Supporting documentation
│   ├── app-router-fundamentals.md
│   ├── server-actions.md
│   └── caching-data-fetching.md
├── assets/                  # Code examples
│   └── nextjs-16-complete-example.tsx
└── scripts/                 # Utility scripts (empty)
```

## Quick Start

1. **Read SKILL.md** - Understand Next.js 16 App Router patterns
2. **Study references/** - Deep dive into specific techniques
3. **Review assets/** - Real-world code examples

## Key Concepts

- **App Router** - File-based routing system
- **Server Components** - Default, async by default
- **Server Actions** - Secure server-side operations
- **Caching** - Static by default, control with revalidate
- **Streaming** - Suspense for progressive rendering
- **Partial Prerendering** - Mix static and dynamic content

## When to Use

- Building Next.js applications
- Setting up routing and layouts
- Creating Server Actions
- Implementing data fetching
- Configuring caching strategies
- Building API routes

## File Structure

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── loading.tsx         # Loading UI (Suspense)
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── (auth)/             # Route group
│   ├── login/page.tsx  # /login
│   └── signup/page.tsx # /signup
├── api/
│   └── route.ts        # API handler
└── _components/        # Private folder
```

## Key Patterns

### Server Components (Default)

```typescript
export default async function Page() {
  const data = await db.query();
  return <Component data={data} />;
}
```

### Server Actions

```typescript
"use server";

export async function createUser(formData: FormData) {
  await db.users.create({ data: formData });
  revalidatePath("/users");
}
```

### Caching

```typescript
export const revalidate = 3600; // Revalidate every hour
```

### Streaming with Suspense

```typescript
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
```

## Common Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter
```

## Related Skills

- `architect-nextjs` - Next.js architecture and project structure
- `react-19` - React 19 patterns and hooks
- `typescript-pro` - TypeScript advanced patterns
