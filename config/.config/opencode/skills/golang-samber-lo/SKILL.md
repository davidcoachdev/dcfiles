---
name: golang-samber-lo
description: "Functional programming helpers for Golang using samber/lo — 500+ type-safe generic functions for slices, maps, channels, strings, math, tuples, and concurrency (Map, Filter, Reduce, GroupBy, Chunk, Flatten, Find, Uniq, etc.). Core immutable package (lo), concurrent variants (lo/parallel aka lop), in-place mutations (lo/mutable aka lom), lazy iterators (lo/it aka loi for Go 1.23+), and experimental SIMD (lo/exp/simd). Apply when using or adopting samber/lo, when the codebase imports github.com/samber/lo, or when implementing functional-style data transformations in Go. Not for streaming pipelines (→ See golang-samber-ro)."
user-invocable: true
license: MIT
compatibility: Designed for OpenCode or similar AI coding agents, and for projects using Golang.
metadata:
  author: gentleman-programming
  version: "1.0.0"
  openclaw:
    emoji: "🧰"
    homepage: https://github.com/gentleman-programming
    requires:
      bins:
        - go
    install: []
allowed-tools: Read Edit Write Glob Grep Bash(go:*) Bash(golangci-lint:*) Bash(git:*) AskUserQuestion
---

**Persona:** Sos un engineer de Go que prefiere transforms declarativos de colecciones por sobre loops manuales. Usás `lo` para eliminar boilerplate, pero sabés cuándo el stdlib alcanza y cuándo subir a `lop`, `lom` o `loi`.

# samber/lo — Functional Utilities for Go

Librería utility inspirada en Lodash, generics-first, con 500+ helpers type-safe para slices, maps, strings, math, channels, tuples y concurrencia. Cero dependencias externas. Immutable por defecto.

**Official Resources:**

- [github.com/samber/lo](https://github.com/samber/lo)
- [lo.samber.dev](https://lo.samber.dev)
- [pkg.go.dev/github.com/samber/lo](https://pkg.go.dev/github.com/samber/lo)

## Why samber/lo

El stdlib `slices` y `maps` cubre ~10 helpers básicos. Todo el resto — Map, Filter, Reduce, GroupBy, Chunk, Flatten, Zip — requiere loops manuales. `lo` llena ese gap:

- **Type-safe generics** — sin `interface{}`, sin reflection, chequeo en compile-time
- **Immutable por defecto** — devuelve colecciones nuevas, seguro para reads concurrentes
- **Composable** — las funciones toman y devuelven slices/maps, encadenan sin wrapper types
- **Cero dependencias** — solo stdlib de Go
- **Progressive complexity** — arrancá con `lo`, subí a `lop`/`lom`/`loi` solo cuando el profiling lo demande
- **Error variants** — la mayoría tienen sufijos `Err` que frenan en el primer error

## Installation

```bash
go get github.com/samber/lo
```

| Package | Import | Alias | Go version |
| --- | --- | --- | --- |
| Core (immutable) | `github.com/samber/lo` | `lo` | 1.18+ |
| Parallel | `github.com/samber/lo/parallel` | `lop` | 1.18+ |
| Mutable | `github.com/samber/lo/mutable` | `lom` | 1.18+ |
| Iterator | `github.com/samber/lo/it` | `loi` | 1.23+ |
| SIMD (experimental) | `github.com/samber/lo/exp/simd` | — | 1.25+ (amd64 only) |

## Choose the Right Package

Arrancá con `lo`. Movete a otros packages solo cuando el profiling muestre un bottleneck.

| Package | Use when | Trade-off |
| --- | --- | --- |
| `lo` | Default para todos los transforms | Aloja nuevas colecciones (seguro, predecible) |
| `lop` | CPU-bound en datasets grandes (1000+ items) | Goroutine overhead; no para I/O ni slices chicas |
| `lom` | Hot path confirmado por `pprof -alloc_objects` | Muta el input — el caller debe entender side effects |
| `loi` | Datasets grandes con transforms encadenados (Go 1.23+) | Lazy evaluation ahorra memoria pero suma complejidad |
| `simd` | Ops numéricas bulk tras benchmark (experimental) | API inestable |

**Key rules:**

- `lop` es para paralelismo de CPU, no concurrencia de I/O — para I/O fan-out usá `errgroup`
- `lom` rompe inmutabilidad — solo usalo cuando la presión de alloc está medida
- `loi` elimina allocs intermedias en cadenas `Map → Filter → Take`

## Core Patterns

### Transform a slice

```go
// ✓ lo — declarativo, type-safe
names := lo.Map(users, func(u User, _ int) string {
    return u.Name
})

// ✗ Manual — boilerplate, propenso a errores
names := make([]string, 0, len(users))
for _, u := range users {
    names = append(names, u.Name)
}
```

### Filter + Reduce

```go
total := lo.Reduce(
    lo.Filter(orders, func(o Order, _ int) bool {
        return o.Status == "paid"
    }),
    func(sum float64, o Order, _ int) float64 {
        return sum + o.Amount
    },
    0,
)
```

### GroupBy

```go
byStatus := lo.GroupBy(tasks, func(t Task, _ int) string {
    return t.Status
})
```

### Error variant — stop on first error

```go
results, err := lo.MapErr(urls, func(url string, _ int) (Response, error) {
    return http.Get(url)
})
```

## Common Mistakes

| Mistake | Why it fails | Fix |
| --- | --- | --- |
| Usar `lo.Contains` cuando `slices.Contains` existe | Dependencia innecesaria | Preferí `slices.Contains`/`slices.Sort` (Go 1.21+) |
| Usar `lop.Map` en 10 items | El overhead de goroutine supera el costo | Usá `lo.Map` — `lop` rinde con 1000+ items CPU-bound |
| Asumir que `lo.Filter` modifica el input | `lo` es immutable por defecto | Usá `lom.Filter` si necesitás mutación in-place |
| Usar `lo.Must` en paths de producción | `Must` paniquea en error | Usá la variante non-Must y maneja el error |

## Best Practices

1. **Preferí stdlib cuando alcance** — `slices.Contains`/`slices.Sort` (1.21+) no suman dependencia; `lo` para transforms que el stdlib no ofrece
2. **Componé funciones lo** — encadená `lo.Filter` → `lo.Map` → `lo.GroupBy`
3. **Profileá antes de optimizar** — pasá de `lo` a `lom`/`lop` solo tras `go tool pprof`
4. **Usá error variants** — `lo.MapErr` sobre `lo.Map` + recolección manual de errores
5. **`lo.Must` solo en tests e init** — en producción maneja errores explícitamente

## Quick Reference

| Function | What it does |
| --- | --- |
| `lo.Map` | Transform each element |
| `lo.Filter` / `lo.Reject` | Keep / remove by predicate |
| `lo.Reduce` | Fold into single value |
| `lo.ForEach` | Side-effect iteration |
| `lo.GroupBy` | Group by key |
| `lo.Chunk` | Split into batches |
| `lo.Flatten` | Flatten one level |
| `lo.Uniq` / `lo.UniqBy` | Remove duplicates |
| `lo.Find` / `lo.FindOrElse` | First match or default |
| `lo.Keys` / `lo.Values` | Map keys or values |
| `lo.Zip2` / `lo.Unzip2` | Pair/unpair |
| `lo.Ternary` / `lo.If` | Inline conditionals |
| `lo.ToPtr` / `lo.FromPtr` | Pointer helpers |
| `lo.Must` / `lo.Try` | Panic-on-error / recover-as-bool |

For the complete function catalog, see [API Reference](./references/api-reference.md).
For composition patterns and stdlib interop, see [Advanced Patterns](./references/advanced-patterns.md).

## Cross-References

- → See golang-samber-ro para pipelines reactivos/streaming (samber/ro)
- → See golang-samber-mo para tipos monádicos (Option, Result, Either) que componen con lo
- → See golang-data-structures para elegir la estructura subyacente
- → See golang-performance para la metodología de profiling antes de switch a `lom`/`lop`
