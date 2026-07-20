---
name: golang-spf13-cobra
description: "Golang CLI command tree library using spf13/cobra — cobra.Command, RunE vs Run, PersistentPreRunE hook chain, Args validators (NoArgs, ExactArgs, MatchAll, custom), persistent vs local flags, command groups, ValidArgsFunction, RegisterFlagCompletionFunc, ShellCompDirective, usage/help template customization, man-page and markdown doc generation, and testing with SetArgs/SetOut/SetErr. Apply when using or adopting spf13/cobra, or when the codebase imports github.com/spf13/cobra. For configuration layering alongside cobra, see golang-spf13-viper. For general CLI architecture, see golang-cli."
user-invocable: true
license: MIT
compatibility: Designed for OpenCode or similar AI coding agents, and for projects using Golang.
metadata:
  author: gentleman-programming
  version: "1.0.0"
  openclaw:
    emoji: "🐍"
    homepage: https://github.com/gentleman-programming
    requires:
      bins:
        - go
    install: []
allowed-tools: Read Edit Write Glob Grep Bash(go:*) Bash(golangci-lint:*) Bash(git:*) Agent WebFetch
---

**Persona:** Sos un engineer de CLI en Go que construye árboles de comandos que se sienten nativos en la shell Unix. Diseñás la superficie orientada al usuario primero, y después cableás el comportamiento en el hook correcto.

**Modos:**

- **Build** — creando una CLI desde cero: seguí command tree setup, hook wiring y flag sections en orden.
- **Extend** — agregando subcomandos/flags/completions a una CLI existente: leé el árbol actual primero.
- **Review** — auditando una CLI: chequeá la tabla de Common Mistakes, verificá `RunE`, `OutOrStdout()`, orden de hooks y args validation.

# Using spf13/cobra for CLI command trees in Go

Cobra es el estándar de facto para CLIs en Go. Provee el árbol command/subcommand, parseo de flags (vía `pflag`), validación de args, generación de shell completions y documentación. **No** maneja config layering — eso es trabajo de viper.

**Official Resources:**

- [pkg.go.dev/github.com/spf13/cobra](https://pkg.go.dev/github.com/spf13/cobra)
- [github.com/spf13/cobra](https://github.com/spf13/cobra)
- [cobra.dev](https://cobra.dev)

```bash
go get github.com/spf13/cobra@latest
```

## Cobra vs. viper

Estas libs hacen cosas fundamentalmente distintas y pueden usarse por separado.

| Concern | cobra | viper |
| --- | --- | --- |
| Owns | Árbol de comandos, flags, arg validation, completions | Resolución de valores de config |
| User-facing? | Sí — subcomandos, flags, help | No — solo un key-value resolver |
| Integration seam | Pasa `pflag.Flag` a viper vía `BindPFlag` | Trata el flag de cobra como la capa de mayor precedencia |

**Usá cobra solo** cuando tu binario toma flags/args pero no necesita config file ni env. **Usá viper solo** para un daemon que lee YAML + env sin subcomandos. Usá ambos cuando los necesites — bindealos en `PersistentPreRunE` del root command.

→ See golang-spf13-viper para el lado viper de esta integración.

## Command tree

Cada CLI cobra tiene un root command más cero o más subcomandos registrados con `AddCommand`.

```go
var rootCmd = &cobra.Command{
    Use:           "myapp",
    Short:         "One-line summary",
    SilenceUsage:  true,  // ✓ previene el usage wall en cada error
    SilenceErrors: true, // ✓ dejás vos el formato del error
}
```

Usá `AddGroup` para etiquetar subcomandos en el help — registrá los groups **antes** de los `AddCommand` que los referencian.

## The Run\* family

Cobra tiene cinco run hooks ejecutados en orden:

```
PersistentPreRunE → PreRunE → RunE → PostRunE → PersistentPostRunE
```

Siempre usá variantes `*E` — las formas sin `E` no pueden retornar error. Reglas clave:

- `PersistentPreRunE` en el root corre antes de **cada** subcommand — usalo para config init y auth checks.
- Un `PersistentPreRunE` hijo **reemplaza** al del parent — llamalo explícitamente si necesitás ambos.
- `PostRunE` corre solo si `RunE` tuvo éxito.

For the full lifecycle, see [commands-and-args.md](references/commands-and-args.md).

## Args validators

Cobra valida args posicionales antes de `RunE`. NUNCA escribas checks de `len(args)` dentro de `RunE` — eso bypassa los mensajes estándar de cobra.

Built-ins: `NoArgs`, `ExactArgs(n)`, `MinimumNArgs(n)`, `MaximumNArgs(n)`, `RangeArgs(min,max)`, `OnlyValidArgs`, `ExactValidArgs(n)`. Componé con `MatchAll(v1, v2)`. Custom validator: `func(cmd *cobra.Command, args []string) error`.

## Flags primer

Cobra delega el parseo a `pflag`. **Persistent flags** (`PersistentFlags()`) se heredan a todos los subcomandos; **local flags** (`Flags()`) solo al comando que los declara.

```go
rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file path")
serveCmd.Flags().IntVar(&port, "port", 8080, "listen port")
serveCmd.MarkFlagRequired("port")
serveCmd.MarkFlagsMutuallyExclusive("json", "yaml")
```

For pflag types, custom flag values y viper binding, see [flags.md](references/flags.md).

## Completions primer

Cobra genera shell completions automáticamente. Extendelas con:

- **`ValidArgs []string`** — completión estática de args posicionales
- **`ValidArgsFunction`** — dinámica: `func(cmd, args, toComplete string) ([]string, ShellCompDirective)`
- **`RegisterFlagCompletionFunc(name, fn)`** — completión de valores de flags

For `ShellCompDirective` values, see [completions.md](references/completions.md).

## Testing commands

Testeá comandos ejecutándolos programáticamente. **NUNCA uses `os.Stdout`/`os.Stderr` directamente** en los handlers — usá `cmd.OutOrStdout()`/`cmd.ErrOrStderr()` para que los tests redirijan.

```go
func TestServeCmd(t *testing.T) {
    buf := new(bytes.Buffer)
    rootCmd.SetOut(buf)
    rootCmd.SetArgs([]string{"serve", "--port", "9090"})
    require.NoError(t, rootCmd.Execute())
    assert.Contains(t, buf.String(), "listening on :9090")
}
```

Cobra acumula flag state entre `Execute()` calls — construí un árbol fresco por test.

## Best Practices

1. **Siempre `RunE`, nunca `Run`** — `Run` no puede retornar error
2. **Config init en `PersistentPreRunE`** — corre antes de cada subcommand
3. **Validá args posicionales con `Args`, no dentro de `RunE`** — `Args` da los mensajes estándar de cobra
4. **Usá `cmd.OutOrStdout()`/`cmd.ErrOrStderr()` para todo output** — `os.Stdout` no se captura en tests
5. **Re-creá el árbol de comandos por test** — cobra acumula flag state

## Common Mistakes

| Mistake | Why it fails | Fix |
| --- | --- | --- |
| `Run` en vez de `RunE` | No puede retornar error | Usá `RunE` |
| `len(args)` checks en `RunE` | Bypassa los mensajes estándar de cobra | Declarás `Args: cobra.ExactArgs(1)` |
| Escribir a `os.Stdout` directo | Tests no capturan | `cmd.OutOrStdout()` |
| `PersistentPreRunE` hijo tira el del parent | Cobra no encadena | Llamá al parent explícitamente |
| Reusar root entre tests | Cobra acumula flag state | Árbol fresco por test |

## Further Reading

- [commands-and-args.md](references/commands-and-args.md) — PreRun\*/PostRun\* chain, todos los Args validators, reglas de herencia
- [flags.md](references/flags.md) — pflag types, required/exclusive groups, custom value types, viper binding
- [completions.md](references/completions.md) — ShellCompDirective, anotaciones, testing completions
- [generators.md](references/generators.md) — man page, markdown, YAML doc gen; `cobra-cli` scaffolder
- [testing.md](references/testing.md) — isolation patterns, golden files

## Cross-References

- → See golang-cli para arquitectura general de CLI (layout, exit codes, signal handling, I/O)
- → See golang-spf13-viper para config layering (flag → env → file → default)
- → See golang-testing para patrones generales de testing en Go

If you find a bug in spf13/cobra, open an issue at <https://github.com/spf13/cobra/issues>.
