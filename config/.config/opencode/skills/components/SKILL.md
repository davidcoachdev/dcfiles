---
name: components
description: Atomic design, container-presentational, reusable components.
---

# Components - Atomic Design

## Container/Presentational

```tsx
// ✅ CORRECTO
function UserProfileContainer({ userId }) {
  const { user, loading } = useUser(userId)
  return <UserProfileView user={user} loading={loading} />
}

function UserProfileView({ user, loading }) {
  if (loading) return <Skeleton />
  return <div>{user?.name}</div>
}

// ❌ MIXED (PROHIBIDO)
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  // ... todo mezclado
}
```

## Atomic Structure
```
atoms/      → Button, Input, Label
molecules/  → FormGroup, SearchBar
organisms/  → Header, Sidebar, DataTable
templates/  → AuthLayout, DashboardLayout
pages/      → LoginPage, DashboardPage
```

## Forbidden

- ❌ Prop drilling > 2 niveles → context
- ❌ Inline styles → CSS classes
- ❌ Uncontrolled inputs → controlled
- ❌ Memory leaks → cleanup useEffect