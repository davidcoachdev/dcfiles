---
name: tsql-syntax
description: >
  Sintaxis básica de TailwindSQL: select, from, where, orderby, limit, etc.
  Trigger: Cuando necesitás escribir queries TailwindSQL.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Sintaxis TailwindSQL → SQL

| Token TailwindSQL | SQL Generado |
|-------------------|--------------|
| `select-all` | `SELECT *` |
| `select-[col1,col2]` | `SELECT col1, col2` |
| `from-[tabla]` | `FROM tabla` |
| `from-[usuarios as u]` | `FROM usuarios AS u` |
| `where-[campo=valor]` | `WHERE campo=valor` |
| `where-[age>18]` | `WHERE age>18` |
| `where-[name LIKE "%john%"]` | `WHERE name LIKE "%john%"` |
| `orderby-[campo]` | `ORDER BY campo` |
| `orderby-[created_at desc]` | `ORDER BY created_at DESC` |
| `limit-[n]` | `LIMIT n` |
| `offset-[n]` | `OFFSET n` |
| `join-[otra_tabla]` | `JOIN otra_tabla` |
| `on-[a.id=b.user_id]` | `ON a.id=b.user_id` |
| `groupby-[campo]` | `GROUP BY campo` |
| `having-[count>5]` | `HAVING count>5` |

## Ejemplos

```tsx
// Todos los campos
<QueryBlock query="select-all from-[User]" />

// Campos específicos
<QueryBlock query="select-[id,name,email] from-[User]" />

// Con condición
<QueryBlock query="select-all from-[User] where-[age>18]" />

// Con límite y orden
<QueryBlock query="select-[name] from-[User] where-[active=true] orderby-[created_at desc] limit-[10]" />

// JOIN
<QueryBlock query="select-[u.name,p.title] from-[User as u] join-[Posts as p] on-[u.id=p.user_id]" />
```

## Notas

- Los nombres de tablas/columnas van entre `-[...]`
- Los valores no necesitan comillas para strings simples
- Para valores con espacios, usar comillas: `where-[name="Juan Perez"]`

## Resources

- **Main Source**: https://tailwindsql.com [TailwindSQL Official]
- **GitHub**: https://github.com/ptaberg/tailwindsql