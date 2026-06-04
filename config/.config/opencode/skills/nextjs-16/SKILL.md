---
name: nextjs-16
description: >
  Next.js 16 App Router patterns.
  Trigger: When working with Next.js - routing, Server Actions, data fetching.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "2.0"
---

## App Router File Conventions

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── loading.tsx         # Loading UI (Suspense)
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── (auth)/             # Route group (no URL impact)
│   ├── login/page.tsx  # /login
│   └── signup/page.tsx # /signup
├── api/
│   └── route.ts        # API handler
└── _components/        # Private folder (not routed)
```

## Server Components (Default)

```typescript
// No directive needed - async by default
export default async function Page() {
  const data = await db.query();
  return <Component data={data} />;
}
```

## Params & SearchParams (Next.js 15 - Promise)

```typescript
// params is now a Promise
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  return <Product product={product} />;
}

// searchParams is also a Promise
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const { q } = await searchParams;
  const results = await search(q);
  return <Results results={results} />;
}
```

## Server Actions

```typescript
// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;

  await db.users.create({ data: { name } });

  revalidatePath("/users");
  redirect("/users");
}

// Usage
<form action={createUser}>
  <input name="name" required />
  <button type="submit">Create</button>
</form>
```

## Data Fetching

```typescript
// Parallel
async function Page() {
  const [users, posts] = await Promise.all([
    getUsers(),
    getPosts(),
  ]);
  return <Dashboard users={users} posts={posts} />;
}

// Streaming with Suspense
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
```

## Caching (Next.js 15)

```typescript
// Static by default - cached until invalidation
export const revalidate = 3600; // seconds

// Dynamic
export const dynamic = "force-dynamic";

// No cache
export const fetchCache = "force-no-store";

// Tag-based revalidation
export async function getData() {
  "use cache";
  return db.query();
}

export async function revalidateData() {
  revalidateTag("users");
}
```

## Partial Prerendering

```typescript
// app/page.tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <header>Cached Header</header>
      <Suspense fallback={<Skeleton />}>
        <DynamicContent />
      </Suspense>
    </>
  );
}
```

## Route Handlers (API)

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await db.users.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await db.users.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}
```

## Middleware

```typescript
// middleware.ts (root level)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

## Metadata

```typescript
// Static
export const metadata = {
  title: "My App",
  description: "Description",
};

// Dynamic
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product.name };
}
```

## server-only Package

```typescript
import "server-only";

// This will error if imported in client component
export async function getSecretData() {
  return db.secrets.findMany();
}
```

## Cookies (Next.js 15)

```typescript
import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value;
}
```

## Resources

See `references/` for detailed guides:

- **`references/app-router-fundamentals.md`** - File conventions, Server Components, route groups
- **`references/server-actions.md`** - Server Actions patterns, forms, error handling
- **`references/caching-data-fetching.md`** - Caching strategies, data fetching, Suspense, PPR

Code examples in `assets/`:
- **`assets/nextjs-16-complete-example.tsx`** - Complete working example with layouts, pages, API routes, Server Actions, middleware

## External Resources

- **Main Docs**: https://nextjs.org/docs
- **App Router**: https://nextjs.org/docs/app
- **Server Actions**: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
- **Server Components**: https://nextjs.org/docs/app/building-your-application/rendering/server-components

