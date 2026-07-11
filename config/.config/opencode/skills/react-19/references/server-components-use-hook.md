# React 19 Server Components & use() Hook

## Server Components (Default)

Server Components are the default in React 19 with frameworks like Next.js. They run only on the server.

### Benefits

- **Direct database access** - No API layer needed
- **Secure secrets** - API keys stay on server
- **Reduced bundle size** - No client-side code
- **Better performance** - Less JavaScript to download

### Pattern

```typescript
// ✅ Server Component (default) - no directive
export default async function Page() {
  const data = await fetchData();
  return <ClientComponent data={data} />;
}

// ✅ Client Component - only when needed
"use client";
export function Interactive() {
  const [state, setState] = useState(false);
  return <button onClick={() => setState(!state)}>Toggle</button>;
}
```

## When to Use "use client"

Use `"use client"` directive when you need:
- `useState`, `useEffect`, `useRef`, `useContext`
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`window`, `localStorage`)
- Interactivity

## use() Hook

The `use()` hook allows you to read promises and context in components.

### Reading Promises

```typescript
import { use } from "react";

function Comments({ promise }) {
  const comments = use(promise);
  return comments.map(c => <div key={c.id}>{c.text}</div>);
}

// Usage
<Suspense fallback={<Loading />}>
  <Comments promise={fetchComments()} />
</Suspense>
```

### Conditional Context

```typescript
import { use } from "react";
import { ThemeContext } from "@/context/theme";

function Theme({ showTheme }) {
  if (showTheme) {
    const theme = use(ThemeContext);
    return <div style={{ color: theme.primary }}>Themed</div>;
  }
  return <div>Plain</div>;
}
```

### Why use() Over useContext?

- **Conditional** - Can use inside if statements
- **Loops** - Can use inside loops
- **Try/catch** - Can use inside try/catch
- **Dynamic** - Can use with dynamic imports

## Mixing Server & Client Components

```typescript
// Server Component
export default async function Page() {
  const data = await db.query();
  
  return (
    <div>
      <ServerContent data={data} />
      <ClientInteractive />
    </div>
  );
}

// Client Component
"use client";
function ClientInteractive() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## References

- [Server Components](https://react.dev/reference/rsc/server-components)
- [use() Hook](https://react.dev/reference/react/use)
- [Suspense](https://react.dev/reference/react/Suspense)
