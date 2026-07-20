# Error Creation

Errores que cuentan la historia: lowercase, sin puntuación final, describen qué pasó sin prescribir acción.

## Mensajes

```go
// ✓ correcto
return fmt.Errorf("failed to open config file: %w", err)

// ✗ incorrecto — mayúscula, punto final, prescribe acción
return errors.New("Failed to open config file. Please check the path.")
```

Reglas:
- Minúsculas, sin `.` final.
- Sin prescribir acción ("please retry") — eso lo decide el caller.
- Wrapping siempre con `%w` para preservar la cadena.

## Sentinel errors

Para condiciones esperadas, usá sentinels prealocados (una sola vez, fuera de cualquier función):

```go
// prealocado a nivel package — sin alloc en hot path
var (
    ErrNotFound  = errors.New("not found")
    ErrForbidden = errors.New("forbidden")
)

func GetUser(id int64) (*User, error) {
    if !exists(id) {
        return nil, ErrNotFound
    }
    // ...
}
```

Uso: `if errors.Is(err, ErrNotFound) { ... }`. NUNCA compares con `==` contra un error envuelto.

## Custom error types

Para llevar data rica, definí un tipo que implemente `error`:

```go
type ValidationError struct {
    Field string
    Reason string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed on %s: %s", e.Field, e.Reason)
}

// inspección tipada en el caller
var ve *ValidationError
if errors.As(err, &ve) {
    log.Printf("field %s invalid: %s", ve.Field, ve.Reason)
}
```

## Decisión: sentinel vs custom

| Necesitás... | Usá |
| --- | --- |
| Señalizar una condición esperada, sin data extra | sentinel (`errors.New`) |
| Llevar campos (field, code, id) para inspección | custom type |
| Ambos | custom type que envuelva un sentinel |
