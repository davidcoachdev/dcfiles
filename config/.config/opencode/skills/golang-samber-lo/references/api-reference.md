# API Reference

Catálogo de funciones para `samber/lo` organizado por dominio. Para firmas actualizadas, consultá [pkg.go.dev/github.com/samber/lo](https://pkg.go.dev/github.com/samber/lo) o `go doc github.com/samber/lo <Symbol>`.

## Slice Transformations

| Function | Description |
| --- | --- |
| `lo.Map(s, fn)` | Transform each element. `fn(item T, index int) R` |
| `lo.MapErr(s, fn)` | Map with error — stops on first error |
| `lo.UniqMap(s, fn)` | Map + deduplicate in one pass |
| `lo.Filter(s, fn)` | Keep where predicate is true |
| `lo.FilterErr(s, fn)` | Filter with error propagation |
| `lo.Reject(s, fn)` | Remove where predicate is true (inverse of Filter) |
| `lo.FilterMap(s, fn)` | Filter + map in one pass. `fn(T) (R, bool)` |
| `lo.Reduce(s, fn, init)` | Fold left into accumulator |
| `lo.ReduceRight(s, fn, init)` | Fold right into accumulator |
| `lo.ForEach(s, fn)` | Iterate with side effects |
| `lo.Chunk(s, size)` | Split into batches of `size` |
| `lo.Flatten(s)` | Flatten `[][]T` → `[]T` (one level) |
| `lo.Concat(slices...)` | Concatenate multiple slices |
| `lo.Reverse(s)` | Reverse order (new slice) |
| `lo.Shuffle(s)` | Random shuffle (new slice) |
| `lo.Clone(s)` | Shallow copy of slice |

### Slice-to-map conversions

| Function | Description |
| --- | --- |
| `lo.KeyBy(s, fn)` | Slice to map by key extractor. `fn(T) K` |
| `lo.SliceToMap(s, fn)` | Slice to map. `fn(T) (K, V)` |
| `lo.GroupBy(s, fn)` | Group into `map[K][]V` by key function |
| `lo.FilterSliceToMap(s, fn)` | Filter + slice-to-map. `fn(T) (K, V, bool)` |

### Error variants

La mayoría de las funciones de transform tienen sufijos `Err`: `MapErr`, `FlatMapErr`, `FilterErr`, `ReduceErr`, `GroupByErr`, `UniqByErr`, etc. Frenan en el primer error y devuelven `(result, error)`.

## Slice Queries

| Function | Description |
| --- | --- |
| `lo.Contains(s, v)` | Membership test |
| `lo.Every(s, fn)` | True if all match |
| `lo.Some(s, fn)` | True if any match |
| `lo.Find(s, fn)` | First match or zero value |
| `lo.FindOrElse(s, fn, def)` | First match or default |
| `lo.Uniq(s)` / `lo.UniqBy(s, fn)` | Remove duplicates |
| `lo.PartitionBy(s, fn)` | Group into buckets by key |

## Map helpers

| Function | Description |
| --- | --- |
| `lo.Keys(m)` | Slice of keys |
| `lo.Values(m)` | Slice of values |
| `lo.PickBy(m, fn)` | Keep entries where predicate |
| `lo.OmitBy(m, fn)` | Remove entries where predicate |
| `lo.MapValues(m, fn)` | Transform values, keep keys |
| `lo.MapEntries(m, fn)` | Transform both key and value |

## Tuple / misc

| Function | Description |
| --- | --- |
| `lo.Zip2(a, b)` | Pair two slices into `[]Tuple2[A, B]` |
| `lo.Unzip2(tuples)` | Split back into `(a, b)` |
| `lo.Ternary(cond, a, b)` | Inline conditional (no else branch eval) |
| `lo.If(cond)` | Chainable conditional builder |
| `lo.ToPtr(v)` / `lo.FromPtr(p)` | Pointer helpers |
| `lo.Must(v, err)` | Panic on error — tests/init only |
| `lo.Try(fn)` | Returns bool instead of panicking |

For the concurrent (`lop`), mutable (`lom`), lazy (`loi`) and SIMD packages, see the package guide in the SKILL.md "Choose the Right Package" table.
