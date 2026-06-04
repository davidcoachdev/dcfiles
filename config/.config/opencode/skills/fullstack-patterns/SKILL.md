---
name: fullstack-patterns
description: Senior Fullstack Engineer. Builds end-to-end applications connecting frontend and backend.
---

# Fullstack Patterns Skill

## 1. BASELINE
* INTEGRATION_MODE: 7 (1=Loose, 10=Strict/Type-Safe)
* API_CONTRACT: 8 (1=Implicit, 10=Explicit/Versioned)
* SHARED_TYPES: 9 (1=Duplicated, 10=Single-Source)
* REAL_TIME: 5 (1=Polling, 10=WebSockets)

## 2. STRUCTURE

### Monorepo
```
packages/
├── ui/           # Frontend app
├── api/          # Backend API
└── shared/       # Shared types (SINGLE SOURCE)
```

### Non-Monorepo
```
src/
├── client/       # Frontend
├── server/       # Backend
└── shared/       # Extracted types
```

## 3. SHARED TYPES (SINGLE SOURCE)

```typescript
// packages/shared/types/user.ts
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string()
});

export type User = z.infer<typeof UserSchema>;
export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
```

## 4. API CLIENT

```typescript
class ApiClient {
  async get<T>(path: string): Promise<T> {
    const res = await fetch(this.baseUrl + path);
    if (!res.ok) throw new ApiError(res);
    return res.json();
  }
}

// Type-safe usage
const user = await api.get<User>('/users/1');
```

## 5. STATE MANAGEMENT

### Server State (React Query)
```typescript
function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.get(`/users/${userId}`)
  });
  if (isLoading) return <Skeleton />;
  return <Profile user={data} />;
}
```

### Client State (Zustand)
```typescript
interface UIStore {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
}

const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set(s => ({ isSidebarOpen: !s.isSidebarOpen }))
}));
```

## 6. REAL-TIME

### Polling
```typescript
useQuery({ refetchInterval: 30000 }) // 30s
```

### WebSockets
```typescript
useEffect(() => {
  const ws = new WebSocket(url);
  ws.onmessage = (e) => setMessages(prev => [...prev, JSON.parse(e.data)]);
  return () => ws.close();
}, [url]);
```

### Optimistic Updates
```typescript
useMutation({
  mutationFn: updateUser,
  onMutate: async (newData) => {
    await queryClient.cancelQueries(['user', newData.id]);
    const prev = queryClient.getQueryData(['user', newData.id]);
    queryClient.setQueryData(['user', newData.id], newData);
    return { prev };
  },
  onError: (err, newData, context) => {
    queryClient.setQueryData(['user', newData.id], context.prev);
  }
});
```

## 7. ERROR HANDLING

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: ValidationError[];
}

async function apiRequest<T>(fn: () => Promise<T>): Promise<[T, null] | [null, ApiError]> {
  try {
    return [await fn(), null];
  } catch (e) {
    return [null, e as ApiError];
  }
}
```

## 8. DIAL DEFINITIONS

### INTEGRATION_MODE (1-10)
* 1-3: Loose coupling
* 4-7: Type-safe client
* 8-10: Contract-first

### SHARED_TYPES (1-10)
* 1-3: Duplicated
* 4-7: Some shared
* 8-10: Single source

### REAL_TIME (1-10)
* 1-3: Polling
* 4-7: WebSockets
* 8-10: Full real-time

## 9. FORBIDDEN

* Duplicated types
* Using `any` for API responses
* Server state for UI-only
* No loading/error states
* Hardcoded URLs

## 10. PRE-FLIGHT
- [ ] Types shared (single source)
- [ ] Client type-safe
- [ ] Error handling consistent
- [ ] Server vs client separated
- [ ] No hardcoded URLs