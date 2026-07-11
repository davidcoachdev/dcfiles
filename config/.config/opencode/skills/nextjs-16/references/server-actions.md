# Server Actions in Next.js 16

## Overview

Server Actions are asynchronous functions that run on the server. They enable secure server-side operations directly from client components.

## Basic Pattern

```typescript
// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  // Validate
  if (!name || !email) {
    throw new Error("Name and email required");
  }

  // Create in database
  const user = await db.users.create({
    data: { name, email },
  });

  // Revalidate cache
  revalidatePath("/users");

  // Redirect
  redirect(`/users/${user.id}`);
}
```

## Using in Forms

```typescript
"use client";

import { createUser } from "@/app/actions";

export function CreateUserForm() {
  return (
    <form action={createUser}>
      <input name="name" placeholder="Name" required />
      <input name="email" placeholder="Email" type="email" required />
      <button type="submit">Create User</button>
    </form>
  );
}
```

## Using with useTransition

```typescript
"use client";

import { useTransition } from "react";
import { createUser } from "@/app/actions";

export function CreateUserForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await createUser(formData);
    });
  }

  return (
    <form action={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" placeholder="Email" type="email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
```

## Error Handling

```typescript
"use server";

export async function updateUser(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;

    if (!name) {
      throw new Error("Name is required");
    }

    await db.users.update({
      where: { id },
      data: { name },
    });

    revalidatePath("/users");
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}
```

## Security Considerations

1. **Always validate input** - Never trust client data
2. **Use authentication** - Check user permissions
3. **Sanitize data** - Prevent injection attacks
4. **Rate limit** - Prevent abuse
5. **Log actions** - Track important operations

## References

- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [useTransition](https://react.dev/reference/react/useTransition)
- [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
