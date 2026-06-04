---
name: tailwindsql
description: >
  Índice de TailwindSQL - SQL con sintaxis estilo Tailwind CSS. Carga la skill específica según lo que necesites.
  Trigger: Cuando trabajes con TailwindSQL, queries SQL estilo Tailwind, o bases de datos.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Qué es TailwindSQL

Librería que permite escribir queries SQL usando una sintaxis de clases utilitarias estilo Tailwind CSS.

```tsx
// En lugar de:
const sql = "SELECT * FROM User WHERE age > 18 ORDER BY name LIMIT 10"

// Escribes:
<QueryBlock query="select-all from-[User] where-[age>18] orderby-[name] limit-[10]" />
```

## Skills Específicas - Carga Solo Lo Que Necesitás

| Lo que necesitás | Skill a cargar |
|-------------------|----------------|
| Sintaxis básica (select, from, where) | `tsql-syntax` |
| Cómo funciona el parser | `tsql-parser` |
| Crear adapter (Prisma, custom) | `tsql-adapter` |
| Componente React QueryBlock | `tsql-queryblock` |
| Ejemplos completos | `tsql-examples` |

## Sintaxis Quick Reference

```
select-all         → SELECT *
select-[id,name]    → SELECT id, name
from-[users]        → FROM users
where-[age>18]      → WHERE age>18
orderby-[name]      → ORDER BY name
limit-[10]          → LIMIT 10
offset-[5]         → OFFSET 5
join-[posts]        → JOIN posts
on-[users.id=posts.user_id] → ON users.id=posts.user_id
groupby-[status]    → GROUP BY status
having-[count>5]    → HAVING count>5
```

## Cuándo Usar TailwindSQL

- ✅ Componentes React que necesitan datos inline
- ✅ Queries simples a medianos
- ✅ Prototyping rápido
- ❌ Queries complejos con subqueries
- ❌ Production (draft - no stable)

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]