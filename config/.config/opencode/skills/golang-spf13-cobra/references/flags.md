# Cobra Flags Reference

Cobra delega todo el parseo de flags a `github.com/spf13/pflag`. `cobra.Command` expone dos `*pflag.FlagSet`s:

- `cmd.Flags()` — local flags, solo en este comando.
- `cmd.PersistentFlags()` — heredados por todos los subcomandos.

## Common flag types

```go
// String
cmd.Flags().String("name", "default", "description")
cmd.Flags().StringP("name", "n", "default", "description") // con shorthand

// Con binding a puntero
var name string
cmd.Flags().StringVar(&name, "name", "default", "description")
cmd.Flags().StringVarP(&name, "name", "n", "default", "description")

// Otros siguen el mismo patrón:
cmd.Flags().Int / IntVar / IntVarP
cmd.Flags().Bool / BoolVar / BoolVarP
cmd.Flags().Float64 / Float64Var
cmd.Flags().Duration / DurationVar       // parsea "1h30m", "500ms"
cmd.Flags().StringSlice / StringSliceVar // coma-separado o repetido
cmd.Flags().StringArray / StringArrayVar // solo repetido (no split de coma)
cmd.Flags().IntSlice / IntSliceVar
cmd.Flags().StringToString               // --label key=value --label k2=v2
```

## StringSlice vs StringArray

| Flag type | Input | Result |
| --- | --- | --- |
| `StringSlice` | `--tags a,b --tags c` | `["a", "b", "c"]` — split de coma |
| `StringArray` | `--tags a,b --tags c` | `["a,b", "c"]` — NO split de coma |

Usá `StringArray` cuando los valores pueden contener comas legítimas.

## Flag constraints

```go
// Falla si no se provee
cmd.MarkFlagRequired("output")

// Falla si ambos se dan
cmd.MarkFlagsMutuallyExclusive("json", "yaml", "table")

// Falla si ninguno se da
cmd.MarkFlagsOneRequired("file", "stdin")
```

## Custom flag value types

Implementá `pflag.Value` (métodos `String()`, `Set(string) error`, `Type() string`) para flags con parseo propio:

```go
type logLevel string

func (l *logLevel) String() string { return string(*l) }
func (l *logLevel) Set(v string) error {
    switch v {
    case "debug", "info", "warn", "error":
        *l = logLevel(v)
        return nil
    default:
        return fmt.Errorf("invalid level: %s", v)
    }
}
func (l *logLevel) Type() string { return "level" }

var level logLevel
cmd.Flags().Var(&level, "level", "log level (debug|info|warn|error)")
```

## Viper binding

Para resolver config con precedencia flag → env → file → default, bindeá el flag de cobra a viper en `PersistentPreRunE`:

```go
viper.BindPFlag("port", serveCmd.Flags().Lookup("port"))
viper.BindEnv("port", "APP_PORT")
```

→ See golang-spf13-viper para el lado completo de viper.
