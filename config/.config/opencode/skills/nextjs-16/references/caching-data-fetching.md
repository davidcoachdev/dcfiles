# Next.js 16 Caching & Data Fetching

## Caching Strategy

Next.js 16 caches by default. Control caching with these options:

### Static (Cached)

```typescript
// Default - cached until revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
  const data = await db.query();
  return <Component data={data} />;
}
```

### Dynamic (Not Cached)

```typescript
export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await db.query();
  return <Component data={data} />;
}
```

### No Cache

```typescript
export const fetchCache = "force-no-store";

export default async function Page() {
  const data = await db.query();
  return <Component data={data} />;
}
```

## Tag-Based Revalidation

```typescript
// app/actions.ts
"use server";

import { revalidateTag } from "next/cache";

export async function updateUser(id: string, data: any) {
  await db.users.update({ where: { id }, data });
  revalidateTag("users");
}

// app/page.tsx
export default async function Page() {
  const users = await db.users.findMany();
  return <UserList users={users} />;
}
```

## Parallel Data Fetching

```typescript
async function Page() {
  // Fetch in parallel
  const [users, posts, comments] = await Promise.all([
    getUsers(),
    getPosts(),
    getComments(),
  ]);

  return (
    <>
      <Users data={users} />
      <Posts data={posts} />
      <Comments data={comments} />
    </>
  );
}
```

## Streaming with Suspense

```typescript
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </Suspense>
      <Footer />
    </>
  );
}
```

## Partial Prerendering (PPR)

Combine static and dynamic content:

```typescript
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

## Cookies (Next.js 15+)

Cookies are now async:

```typescript
import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value;
}

export async function setSession(value: string) {
  const cookieStore = await cookies();
  cookieStore.set("session", value);
}
```

## References

- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
