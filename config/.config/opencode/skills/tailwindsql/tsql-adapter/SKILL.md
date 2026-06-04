---
name: tsql-adapter
description: >
  Crear adapters para TailwindSQL: Prisma adapter o custom adapter.
  Trigger: Cuando necesitás conectar TailwindSQL a tu base de datos.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Qué es un Adapter

Adapter es una función que recibe el SQL generado por TailwindSQL y lo ejecuta contra tu base de datos.

```typescript
type Adapter = (sql: string) => Promise<unknown[]>
```

## Adapter Prisma

```typescript
// 1. Crear el adapter
import { createPrismaAdapter } from "@repo/tailwindsql";
import { prisma } from "./db";

export const prismaAdapter = createPrismaAdapter(prisma);

// 2. Usar en QueryBlock
<QueryBlock 
  query="select-all from-[User]"
  adapter={prismaAdapter}
>
  {(users) => <ul>{users.map(u => <li>{u.name}</li>)}</ul>}
</QueryBlock>
```

## Custom Adapter

```typescript
// Adapter personalizado para cualquier DB
const myAdapter = async (sql: string) => {
  const result = await myDatabase.execute(sql);
  return result.rows;
};

// O para testing
const mockAdapter = async (sql: string) => {
  if (sql.includes("User")) {
    return [{ id: 1, name: "Test User" }];
  }
  return [];
};
```

## Adapter Config (global)

```typescript
// tailwindsql.config.ts - configurar una vez
import { configTailwindSQL } from "@repo/tailwindsql";
import { executeSQL } from "./app/actions";

export const { QueryBlock } = configTailwindSQL({
  adapter: executeSQL,
});

// Ahora no necesitás pasar adapter en cada QueryBlock
<QueryBlock query="select-all from-[User]">
  {(users) => <ul>{users.map(u => <li>{u.name}</li>)}</ul>}
</QueryBlock>
```

## Adapter con Server Actions

```typescript
// app/actions.ts
"use server";
import { prisma } from "./db";

export async function executeSQL(sql: string) {
  return prisma.$queryRawUnsafe(sql);
}
```

## Docs

- https://github.com/ptaberg/tailwindsql#adapters