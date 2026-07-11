# React 19 Actions & useActionState

## Server Actions

Server Actions are async functions that run on the server. They're called directly from client components.

### Basic Pattern

```typescript
// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function submitForm(formData: FormData) {
  const name = formData.get("name") as string;
  
  // Validate
  if (!name) {
    throw new Error("Name is required");
  }
  
  // Save to database
  await db.users.create({ data: { name } });
  
  // Revalidate cache
  revalidatePath("/users");
}
```

### Using in Forms

```typescript
"use client";

import { submitForm } from "@/app/actions";

export function UserForm() {
  return (
    <form action={submitForm}>
      <input name="name" placeholder="Name" required />
      <button type="submit">Create User</button>
    </form>
  );
}
```

## useActionState Hook

`useActionState` provides pending state and error handling for Server Actions.

### Pattern

```typescript
"use client";

import { useActionState } from "react";
import { submitForm } from "@/app/actions";

export function UserForm() {
  const [state, action, isPending] = useActionState(submitForm, null);

  return (
    <form action={action}>
      <input name="name" placeholder="Name" required />
      <button disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </button>
      {state?.error && <p className="error">{state.error}</p>}
      {state?.success && <p className="success">User created!</p>}
    </form>
  );
}
```

### Return Value

```typescript
const [state, action, isPending] = useActionState(serverAction, initialState);

// state: Current state (initial or returned from action)
// action: Function to pass to form action
// isPending: Boolean indicating if action is running
```

## Error Handling

```typescript
"use server";

export async function updateUser(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;

    if (!name) {
      return { error: "Name is required" };
    }

    await db.users.update({ where: { id }, data: { name } });
    
    return { success: true, message: "User updated" };
  } catch (error) {
    return { error: error.message };
  }
}
```

## Progressive Enhancement

Server Actions work without JavaScript:

```typescript
// Form still submits without JavaScript
<form action={submitForm}>
  <input name="name" required />
  <button type="submit">Submit</button>
</form>
```

## Best Practices

1. **Validate input** - Always validate on server
2. **Handle errors** - Return error state
3. **Revalidate cache** - Update UI after mutation
4. **Show feedback** - Use isPending for UX
5. **Secure** - Check authentication/authorization

## References

- [Server Actions](https://react.dev/reference/react/use-server)
- [useActionState](https://react.dev/reference/react/useActionState)
- [Forms and Mutations](https://react.dev/learn/sharing-state-between-components)
