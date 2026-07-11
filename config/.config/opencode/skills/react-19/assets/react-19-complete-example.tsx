import { useState, use } from "react";
import { Suspense } from "react";

// Server Component - no directive needed
export default async function Page() {
  const data = await fetchData();

  return (
    <div>
      <h1>React 19 Example</h1>
      <Suspense fallback={<Loading />}>
        <ServerContent data={data} />
      </Suspense>
      <ClientInteractive />
    </div>
  );
}

// Server Component - fetches data
async function ServerContent({ data }: { data: any }) {
  return (
    <div>
      <h2>Server Content</h2>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
}

// Client Component - interactive
function ClientInteractive() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Client Interactive</h2>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

// Component using use() hook
function CommentsSection({ commentsPromise }: { commentsPromise: Promise<any[]> }) {
  const comments = use(commentsPromise);

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id}>{comment.text}</div>
      ))}
    </div>
  );
}

// Client Component with useActionState
"use client";

import { useActionState } from "react";
import { submitForm } from "@/app/actions";

export function UserForm() {
  const [state, action, isPending] = useActionState(submitForm, null);

  return (
    <form action={action}>
      <input name="name" placeholder="Name" required />
      <input name="email" placeholder="Email" type="email" required />
      <button disabled={isPending}>
        {isPending ? "Saving..." : "Create User"}
      </button>
      {state?.error && <p className="error">{state.error}</p>}
      {state?.success && <p className="success">User created!</p>}
    </form>
  );
}

// Component with ref as prop (no forwardRef needed)
function Input({ ref, ...props }: any) {
  return <input ref={ref} {...props} />;
}

// Optimized component - no useMemo/useCallback needed
function OptimizedList({ items }: { items: any[] }) {
  const filtered = items.filter((x) => x.active);
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

  const handleClick = (id: string) => {
    console.log("Clicked:", id);
  };

  return (
    <div>
      <h3>Optimized List</h3>
      {sorted.map((item) => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

// Helper functions
async function fetchData() {
  return { message: "Hello from server" };
}

function Loading() {
  return <div>Loading...</div>;
}
