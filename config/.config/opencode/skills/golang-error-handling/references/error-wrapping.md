# Error Wrapping and Inspection

## %w vs %v

```go
// ✓ %w — preserva la cadena, permitiendo errors.Is/As
return fmt.Errorf("reading config: %w", err)

// ✗ %v — concatena el mensaje, ROMPE la inspección de la cadena
return fmt.Errorf("reading config: %v", err)
```

Con `%w` podés hacer `errors.Is(err, os.ErrNotExist)` incluso varios niveles arriba. Con `%v`, la cadena original se pierde.

## Inspección de la cadena

```go
// sentinels
if errors.Is(err, os.ErrNotExist) {
    // manejo específico
}

// tipos custom (Go < 1.26 o interface no-error)
var pathErr *os.PathError
if errors.As(err, &pathErr) {
    log.Printf("path: %s", pathErr.Path)
}

// Go 1.26+ — type-safe, sin variable target
if pe, ok := errors.AsType[*os.PathError](err); ok {
    log.Printf("path: %s", pe.Path)
}
```

Regla: usá `errors.Is` para sentinels y `errors.As`/`AsType` para tipos. NUNCA compares con `==` o hagas type assertions crudas sobre un error envuelto.

## Combinar errores independientes

```go
// Go 1.20+ — junta errores que no dependen uno del otro
err := errors.Join(
    validateInput(in),
    writeOutput(out),
)
if err != nil {
    // err.Error() contiene ambos, separados por \n
    return err
}
```

`errors.Join(nil, e)` devuelve `e` — es seguro pasar nils. Útil en funciones que acumulan errores de varias operaciones.

## En los límites del sistema

- Internamente: `%w` siempre, para poder inspeccionar.
- En el límite (HTTP response, CLI output, user-facing): `%v` o un mensaje traducido, para no filtrar stack traces internos al usuario.
