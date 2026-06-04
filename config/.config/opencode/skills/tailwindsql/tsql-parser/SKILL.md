---
name: tsql-parser
description: >
  Parser de TailwindSQL - convertir syntax TailwindSQL a SQL.
  Trigger: Cuando necesitás usar el parser directamente sin React.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Usar Parser Directamente

```typescript
import { parseTailwindSQL } from "@repo/tailwindsql";

// Convertir query TailwindSQL a SQL
const sql = parseTailwindSQL("select-all from-[User] where-[id=1]");
// → "SELECT * FROM User WHERE id=1"
```

## Ejemplos de Parsing

```typescript
parseTailwindSQL("select-all from-[User]")
// → "SELECT * FROM User"

parseTailwindSQL("select-[id,name] from-[users] where-[age>18] orderby-[name]")
// → "SELECT id, name FROM users WHERE age>18 ORDER BY name"

parseTailwindSQL("select-[u.name,p.title] from-[User as u] join-[Posts as p] on-[u.id=p.user_id]")
// → "SELECT u.name, p.title FROM User AS u JOIN Posts AS p ON u.id=p.user_id"
```

## Uso en Server Actions

```typescript
// app/actions.ts
"use server";
import { parseTailwindSQL } from "@repo/tailwindsql";
import { prisma } from "./db";

export async function executeQuery(query: string) {
  const sql = parseTailwindSQL(query);
  return prisma.$queryRawUnsafe(sql);
}
```

## Uso en Edge Functions

```typescript
// Netlify Edge Function
export default async function handler(req) {
  const { query } = req;
  const sql = parseTailwindSQL(query);
  const result = await drizzle.execute(sql);
  return Response.json(result);
}
```

## Docs

- https://github.com/ptaberg/tailwindsql#parser-only