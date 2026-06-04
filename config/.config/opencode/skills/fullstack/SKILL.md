---
name: fullstack
description: Fullstack integration - shared types, API client.
---

# Fullstack - Integración

## Shared Types (SINGLE SOURCE)
```typescript
// packages/shared/types/user.ts
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string()
});

export type User = z.infer<typeof UserSchema>;
```

## API Client Type-Safe
```typescript
class ApiClient {
  async get<T>(path: string): Promise<T> {
    const res = await fetch(this.baseUrl + path);
    if (!res.ok) throw new ApiError(res);
    return res.json();
  }
}

// Usage
const user = await api.get<User>('/users/1');
```

## Error Handling
```typescript
interface ApiError {
  code: string;
  message: string;
  details?: ValidationError[];
}

async function loadUser() {
  try {
    return [await api.get('/user'), null] as [User, null];
  } catch (e) {
    return [null, e as ApiError] as [null, ApiError];
  }
}
```

## Environment Config
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
```

## Forbidden
- ❌ Duplicated types
- ❌ Using `any` for API
- ❌ Hardcoded URLs