# Cobra Commands, Hooks, and Args Validators

## The Run\* lifecycle

Cobra tiene cinco run hooks, ejecutados en este orden fijo:

```
PersistentPreRunE → PreRunE → RunE → PostRunE → PersistentPostRunE
```

Cada hook `*E` devuelve `error`. Las variantes sin `E` (`Run`, `PreRun`, etc.) tienen firma `func(cmd, args []string)` — no pueden señalar fallo sin `os.Exit` o panic. **Siempre usá las variantes `*E`.**

### Which hook to use

| Hook | Scope | When to use |
| --- | --- | --- |
| `PersistentPreRunE` | Parent + descendientes | Config init, auth check, telemetry — antes de cada subcommand |
| `PreRunE` | Solo este comando | Validación que corre solo acá antes de `RunE` |
| `RunE` | Solo este comando | Main handler — la lógica de negocio |
| `PostRunE` | Solo este comando | Cleanup que corre solo si `RunE` tuvo éxito |
| `PersistentPostRunE` | Parent + descendientes | Cleanup global (cerrar conexiones, flush buffers) |

### Inheritance rules

`PersistentPreRunE` en el root corre antes de cada subcommand. Pero si un hijo define **su propio** `PersistentPreRunE`, lo **reemplaza** (no encadena) al del parent. Llamalo explícitamente si necesitás ambos:

```go
var childCmd = &cobra.Command{
    PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
        if err := rootCmd.PersistentPreRunE(cmd, args); err != nil {
            return err
        }
        // lógica específica del hijo
        return nil
    },
}
```

### Execution stops on first error

Si `PersistentPreRunE` devuelve error, cobra frena — `RunE` y los hooks siguientes nunca corren. Usalo para fail-fast auth checks.

## Args validators

Los validators corren antes de `RunE`. Cobra imprime un error claro y sale sin llamar `RunE` cuando la validación falla.

### Built-in validators

| Validator | Meaning |
| --- | --- |
| `cobra.NoArgs` | Cero args posicionales |
| `cobra.ExactArgs(n)` | Exactamente n args |
| `cobra.MinimumNArgs(n)` | Al menos n args |
| `cobra.MaximumNArgs(n)` | A lo sumo n args |
| `cobra.RangeArgs(min,max)` | Entre min y max |
| `cobra.OnlyValidArgs` | Solo los de `ValidArgs` |
| `cobra.ExactValidArgs(n)` | Exactamente n y todos válidos |

### Composing with MatchAll

```go
Args: cobra.MatchAll(
    cobra.ExactArgs(2),
    cobra.OnlyValidArgs,
)
```

### Custom validator

```go
Args: func(cmd *cobra.Command, args []string) error {
    if len(args) == 0 {
        return fmt.Errorf("requires at least one resource name")
    }
    return nil
}
```
