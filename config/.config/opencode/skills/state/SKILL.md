---
name: state
description: State management - server vs client state, React Query, Zustand.
---

# State - Gestión

## Server State (API Data)
```typescript
// Use React Query / SWR / TanStack Query
function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.get(`/users/${userId}`)
  });
  
  if (isLoading) return <Skeleton />;
  return <Profile user={data} />;
}
```

## Client State (UI)
```typescript
// Zustand
interface UIStore {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
}

const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: true,
  theme: 'light',
  toggleSidebar: () => set(s => ({ isSidebarOpen: !s.isSidebarOpen }))
}));
```

## NEVER MIX
- ❌ Server state para modals, themes (client)
- ❌ Client state para data from API

## Optimistic Updates
```typescript
const mutation = useMutation({
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

## Forbidden
- ❌ Prop drilling > 2 levels
- ❌ Server state para UI-only