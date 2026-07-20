---
name: golang-error-handling
description: "Idiomatic Golang error handling — creation, wrapping with %w, errors.Is/As, errors.Join, custom error types, sentinel errors, panic/recover, the single handling rule, structured logging with slog, HTTP request logging middleware, and samber/oops for production errors. Built to make logs usable at scale with log aggregation 3rd-party tools. Apply when creating, wrapping, inspecting, or logging errors in Go code. For samber/oops specifics → See golang-samber-oops; for slog handler ecosystem → See golang-samber-slog."
user-invocable: true
license: MIT
compatibility: Designed for OpenCode or similar AI coding agents, and for projects using Golang.
metadata:
  author: gentleman-programming
  version: "1.0.0"
  openclaw:
    emoji: "⚠"
    homepage: https://github.com/gentleman-programming
    requires:
      bins:
        - go
    install: []
allowed-tools: Read Edit Write Glob Grep Bash(go:*) Bash(golangci-lint:*) Bash(git:*) Agent
---

**Persona:** Sos un engineer de confiabilidad en Go. Tratás cada error como un evento que debe manejarse o propagarse con contexto — los fallos silenciosos y los logs duplicados son igual de inaceptables.

**Modos:**

- **Coding mode** — escribiendo código nuevo de manejo de errores. Seguí las best practices en orden; opcionalmente lanzá un sub-agente en background para grepear violaciones en código adyacente (errores tragados, log-and-return) sin bloquear la implementación.
- **Review mode** — revisando una PR. Enfocate en el diff: errores tragados, falta de contexto en wrapping, pares log-and-return, mal uso de panic.
- **Audit mode** — auditando manejo de errores en todo el codebase. Usá hasta 5 sub-agentes en paralelo, cada uno en una categoría (creación, wrapping, single-handling, panic/recover, logging estructurado).

# Go Error Handling Best Practices

Esta skill guía la creación de manejo de errores robusto e idiomático en Go. Sigue estos principios para escribir código mantenible, depurable y production-ready.

## Best Practices Summary

1. **Los errores retornados SIEMPRE se chequean** — NUNCA descartar con `_`
2. **Los errores se envuelven con contexto** usando `fmt.Errorf("{context}: %w", err)`
3. **Los strings de error van en minúsculas**, sin puntuación final
4. **Usá `%w` internamente, `%v` en los límites del sistema** para controlar la exposición de la cadena
5. **Usá `errors.Is` para sentinels y `errors.As`/`errors.AsType` para inspección tipada** en vez de comparación directa. Para Go 1.26+ preferí `errors.AsType[T](err)`.
6. **Usá `errors.Join`** (Go 1.20+) para combinar errores independientes
7. **Los errores se loguean O se retornan, NUNCA ambos** (single handling rule)
8. **Usá sentinel errors** para condiciones esperadas, tipos custom para llevar data
9. **NUNCA uses `panic` para errores esperados** — reservalo para estados verdaderamente irrecuperables
10. **Usá `slog`** (Go 1.21+) para logging estructurado de errores
11. **Usá `samber/oops`** para errores de producción que necesitan stack traces y contexto
12. **Logueá requests HTTP** con middleware estructurado (method, path, status, duration)
13. **Usá log levels** para indicar severidad
14. **Nunca expongas errores técnicos al usuario** — traducí a mensajes amigables, logueá lo técnico aparte
15. **Mantené el log grouping de baja cardinalidad** — en los límites de logging/APM, mantené los templates de mensaje estables y pegá IDs, paths y counts como atributos estructurados.

## Detailed Reference

- **[Error Creation](./references/error-creation.md)** — cómo crear errores que cuenten la historia: lowercase, sin puntuación, describen qué pasó sin prescribir acción. Sentinels (prealocados para performance) y custom types.
- **[Error Wrapping and Inspection](./references/error-wrapping.md)** — por qué `fmt.Errorf("{context}: %w", err)` gana a `%v` (cadenas vs concatenación). Inspección con `errors.Is`, `errors.As`, `errors.AsType`, y `errors.Join`.
- **[Error Handling Patterns and Logging](./references/error-handling.md)** — la single handling rule, panic/recover, `samber/oops`, integración con `slog`.

## Parallelizing Error Handling Audits

Para auditar un codebase grande, usá hasta 5 sub-agentes en paralelo (vía Agent tool), cada uno en una categoría:

- Sub-agent 1: Creación — `errors.New`/`fmt.Errorf`, mensajes de baja cardinalidad, custom types
- Sub-agent 2: Wrapping — auditar `%w` vs `%v`, verificar `errors.Is`/`errors.As`
- Sub-agent 3: Single handling rule — log-and-return, errores tragados, `_` descartados
- Sub-agent 4: Panic/recover — uso de `panic`, verificar recovery en bordes de goroutines
- Sub-agent 5: Logging estructurado — `slog` en sitios de error, PII en mensajes

## Cross-References

- → See golang-samber-oops para la API completa de samber/oops
- → See golang-observability para setup de logging estructurado y middleware de requests
- → See golang-safety para la trampa de nil interface y comparación de nil error
- → See golang-naming para convenciones de naming de errores (ErrNotFound, PathError)
- → See golang-continuous-integration para revisión automática de estas guías en CI

## References

- [lmittmann/tint](https://github.com/lmittmann/tint)
- [samber/oops](https://github.com/samber/oops)
- [samber/slog-multi](https://github.com/samber/slog-multi)
- [samber/slog-sampling](https://github.com/samber/slog-sampling)
- [samber/slog-formatter](https://github.com/samber/slog-formatter)
- [samber/slog-http](https://github.com/samber/slog-http)
- [log/slog package](https://pkg.go.dev/log/slog)
