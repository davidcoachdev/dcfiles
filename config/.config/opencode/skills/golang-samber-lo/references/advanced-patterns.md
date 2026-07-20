# Advanced Patterns

## Composing Transformations

Encadená funciones lo para armar pipelines multi-step. Cada función devuelve una colección nueva que alimenta la siguiente.

```go
// Pipeline: emails de usuarios activos agrupados por rol
emailsByRole := lo.GroupBy(
    lo.Map(
        lo.Filter(users, func(u User, _ int) bool {
            return u.Active && u.EmailVerified
        }),
        func(u User, _ int) UserEmail {
            return UserEmail{Role: u.Role, Email: u.Email}
        },
    ),
    func(ue UserEmail, _ int) string {
        return ue.Role
    },
)
```

Para cadenas largas, rompelo en variables intermedias con nombre para legibilidad:

```go
active := lo.Filter(users, func(u User, _ int) bool {
    return u.Active
})
names := lo.Map(active, func(u User, _ int) string {
    return u.Name
})
unique := lo.Uniq(names)
```

## lo + stdlib Interop

Preferí stdlib cuando cubra la operación — `lo` suma valor para transforms funcionales que el stdlib no ofrece.

| Operation | stdlib (prefer) | lo (usá cuando falte) |
| --- | --- | --- |
| Contains | `slices.Contains(s, v)` | `lo.ContainsBy(s, fn)` — por predicado |
| Sort | `slices.SortFunc(s, cmp)` | — (lo no provee sort) |
| Keys | `maps.Keys(m)` (iterator en 1.23+) | `lo.UniqKeys(m)` — keys deduplicadas |
| Clone | `slices.Clone(s)` | `lo.Map(s, fn)` — cuando transformás al clonar |
| Min/Max | `slices.Min(s)` | `lo.MinBy(s, fn)` — por extractor |

**Regla de dedo:** si `slices.*` o `maps.*` hace lo que necesitás, usalo. Reach for `lo` cuando necesitás predicados, transforms, grouping o error variants.

## lo + samber/mo Integration

`samber/mo` provee tipos monádicos (Option, Result, Either). Componen naturalmente con lo:

```go
// Filtrá usuarios con emails opcionales válidos
validEmails := lo.FilterMap(users, func(u User, _ int) (string, bool) {
    email, ok := u.Email.Get() // mo.Option[string]
    return email, ok
})
```

For samber/mo API → see golang-samber-mo.
