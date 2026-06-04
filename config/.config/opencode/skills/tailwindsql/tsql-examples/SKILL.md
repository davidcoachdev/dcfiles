---
name: tsql-examples
description: >
  Ejemplos completos de uso de TailwindSQL en diferentes escenarios.
  Trigger: Cuando necesitás ver ejemplos prácticos de implementación.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Ejemplo 1: Lista de Usuarios

```tsx
// Mostrar todos los usuarios
export function UserList() {
  return (
    <QueryBlock query="select-all from-[User]">
      {(users) => (
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user.id} className="p-3 bg-gray-100 rounded">
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </QueryBlock>
  );
}
```

## Ejemplo 2: Filtrar y Ordenar

```tsx
// Usuarios activos ordenados por fecha
export function ActiveUsers() {
  return (
    <QueryBlock query="select-[id,name,email] from-[User] where-[active=true] orderby-[created_at desc]">
      {(users) => (
        <table>
          <thead>
            <tr><th>Nombre</th><th>Email</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}><td>{u.name}</td><td>{u.email}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </QueryBlock>
  );
}
```

## Ejemplo 3: Pagination

```tsx
// Página de usuarios con limit y offset
export function UserPage({ page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;
  
  return (
    <QueryBlock query={`select-all from-[User] orderby-[name] limit-[${limit}] offset-[${offset}]`}>
      {(users) => (
        <>
          <UserTable users={users} />
          <Pagination page={page} />
        </>
      )}
    </QueryBlock>
  );
}
```

## Ejemplo 4: JOIN

```tsx
// Posts con nombre del autor
export function PostList() {
  return (
    <QueryBlock query="select-[p.title,u.name as author] from-[Post as p] join-[User as u] on-[p.user_id=u.id]">
      {(posts) => (
        <ul>
          {posts.map(post => (
            <li>{post.title} - by {post.author}</li>
          ))}
        </ul>
      )}
    </QueryBlock>
  );
}
```

## Ejemplo 5: Con Custom Adapter

```typescript
// Para testing
const mockAdapter = async (sql: string) => {
  if (sql.includes("User")) return [{ id: 1, name: "Test" }];
  return [];
};

export function TestComponent() {
  return (
    <QueryBlock query="select-all from-[User]" adapter={mockAdapter}>
      {(users) => <div>{users[0].name}</div>}
    </QueryBlock>
  );
}
```

## Docs

- https://tailwindsql.com/