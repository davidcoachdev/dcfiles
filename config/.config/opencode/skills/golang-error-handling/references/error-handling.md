# Error Handling Patterns and Logging

## La single handling rule

Un error se **logea O se retorna, NUNCA ambos**.

```go
// ✗ log-and-return — duplica el log en el aggregator
if err != nil {
    log.Errorf("failed: %v", err)
    return err
}

// ✓ retornás, y quien te llama decide si loguea
if err != nil {
    return fmt.Errorf("processing order: %w", err)
}
```

El caller de más arriba (o el middleware) es quien debe loguear una sola vez. Esto evita la tormenta de logs duplicados en Datadog/Sentry.

## Panic / Recover

`panic` es solo para estados irrecuperables (corrupción de invariantes, init fallido). NUNCA para errores de dominio esperados.

```go
func safeHandler(fn func() error) (err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic recovered: %v", r)
        }
    }()
    return fn()
}
```

Siempre recuperá en el borde de goroutines — un panic en una goroutine mata el proceso entero si no lo atrapás.

## samber/oops para errores de producción

Cuando necesitás stack trace + contexto (user ID, tenant, request ID):

```go
import "github.com/samber/oops"

err := oops.
    With("user_id", userID).
    With("tenant", tenant).
    Wrapf(err, "failed to charge card")
```

`oops` adjunta atributos estructurados y el stack trace automático. Para la API completa → see golang-samber-oops.

## Logging estructurado con slog

```go
logger.Error("request failed",
    slog.String("path", r.URL.Path),
    slog.Int("status", status),
    slog.Duration("duration", dur),
    slog.Any("error", err), // el error se serializa con su cadena
)
```

Reglas:
- Template de mensaje estable (baja cardinalidad) → `"request failed"` no `"request to /api/v1/users failed"`.
- IDs, paths, counts van como atributos, no dentro del mensaje.
- Nunca pongas PII (emails, tokens) en el mensaje ni en atributos.
