---
name: tsql-queryblock
description: >
  Componente React QueryBlock de TailwindSQL.
  Trigger: Cuando usás el componente QueryBlock en React.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## QueryBlock - Componente Principal

```tsx
import { QueryBlock } from "../tailwindsql.config";

function UsersPage() {
  return (
    <QueryBlock query="select-all from-[User]">
      {(users) => (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </QueryBlock>
  );
}
```

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `query` | string | Sí | Query TailwindSQL |
| `adapter` | function | No* | Función que ejecuta SQL |
| `children` | function | Sí | Render function |
| `fallback` | ReactNode | No | Loading state |
| `loadingDelay` | number | No | Delay antes de mostrar loading |

*Si no se pasa, usa el adapter global configurado.

## Render Function

```tsx
// children es una función que recibe los datos
{(users) => <ul>{users.map(u => <li>{u.name}</li>)}</ul>}

// Con estado de loading
{(users, isLoading, error) => (
  <>
    {isLoading && <Spinner />}
    {error && <Error msg={error.message} />}
    <ul>{users.map(u => <li>{u.name}</li>)}</ul>
  </>
)}
```

## Configuración Global

```typescript
// tailwindsql.config.ts
import { configTailwindSQL } from "@repo/tailwindsql";
import { executeSQL } from "./app/actions";

export const { QueryBlock } = configTailwindSQL({
  adapter: executeSQL,
  loadingDelay: 200,  // ms
  defaultFallback: <div>Cargando...</div>
});
```

## Docs

- https://github.com/ptaberg/tailwindsql#quick-start