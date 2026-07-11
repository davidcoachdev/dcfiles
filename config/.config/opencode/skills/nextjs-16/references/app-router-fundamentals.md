# Next.js 16 App Router Fundamentals

## Overview

Next.js 16 uses the App Router (introduced in Next.js 13) as the default routing system. It's file-based, supports Server Components by default, and provides powerful data fetching patterns.

## File Conventions

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── loading.tsx         # Loading UI (Suspense fallback)
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── (auth)/             # Route group (no URL impact)
│   ├── login/page.tsx  # /login
│   └── signup/page.tsx # /signup
├── api/
│   └── route.ts        # API handler
└── _components/        # Private folder (not routed)
```

## Key Concepts

### Server Components (Default)

All components are Server Components by default. No `"use client"` directive needed:

```typescript
export default async function Page() {
  const data = await db.query();
  return <Component data={data} />;
}
```

### Client Components

Use `"use client"` directive at the top of the file:

```typescript
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Params & SearchParams (Promises in Next.js 15+)

Both `params` and `searchParams` are now Promises:

```typescript
export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { id } = await params;
  const { sort } = await searchParams;
  
  const product = await getProduct(id);
  return <Product product={product} sort={sort} />;
}
```

## Route Groups

Route groups allow you to organize routes without affecting the URL structure:

```
app/
├── (auth)/
│   ├── login/page.tsx      # /login
│   ├── signup/page.tsx     # /signup
│   └── layout.tsx          # Shared layout for auth routes
├── (dashboard)/
│   ├── dashboard/page.tsx  # /dashboard
│   └── settings/page.tsx   # /settings
```

## References

- [Next.js App Router](https://nextjs.org/docs/app)
- [File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions)
- [Routing](https://nextjs.org/docs/app/building-your-application/routing)
