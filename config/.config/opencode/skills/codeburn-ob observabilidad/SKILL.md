# CodeBurn Observabilidad Skill

Track AI coding costs para OpenCode con CodeBurn.

## Cuando Usar

Cuando user pregunt sobre:
- "cuánto gasté", "costo", "tokens", "presupuesto"
- "optimizar", "waste", "eficiencia"
- Observabilidad, metrics, costos

## Comandos

### Dashboard Interactivo
```bash
codeburn report --provider opencode
```

### Estado Rápido (1-liner)
```bash
codeburn status --provider opencode
codeburn status --provider opencode --format json
```

### Por Período
```bash
codeburn today --provider opencode
codeburn month --provider opencode
```

### Optimize (detectar waste)
```bash
codeburn optimize --provider opencode
codeburn optimize -p week --provider opencode
```

### Exportar
```bash
codeburn export --provider opencode
codeburn export -f json --provider opencode
```

### Currency
```bash
codeburn currency              # ver actual
codeburn currency ARS        # cambiar a pesos
codeburn currency --reset    # volver a USD
```

## Categorías de Actividad

CodeBurn clasifica en 13 categorías:
- **Coding** — Edit, Write tools
- **Debugging** — error/fix keywords + tool usage  
- **Feature Dev** — "add", "create", "implement"
- **Refactoring** — "refactor", "rename", "simplify"
- **Testing** — pytest, vitest, jest in Bash
- **Exploration** — Read, Grep sin edits
- **Planning** — EnterPlanMode, TaskCreate
- **Delegation** — Agent tool spawns
- **Git Ops** — git push/commit/merge
- **Build/Deploy** — npm build, docker
- **Brainstorming** — "brainstorm", "what if"
- **Conversation** — no tools, pure text
- **General** — Skill tool

## One-Shot Rate

Percentage de turns que acertaron en el primer try.
- 90%+ = Excelente
- 70-89% = Normal
- <70% = Agent struggles

## Patterns de Waste (optimize)

- Archivos re-leídos entre sesiones
- Low Read:Edit ratio (edits sin leer = retries)
- MCP servers sin usar (pagan tool-schema overhead)
- Ghost skills/commands definidas pero nunca usadas
- CLAUDE.md bloated

## Integración Tmux

Abrir en floating window:
```bash
# New window flotante
tmux new-window -d -n codeburn 'codeburn report --provider opencode'

# or con floating pane
tmux split-window -h -p 30 -t $SESSION:main 'codeburn status --provider opencode'
```

## Aliases Útiles

Agregar a.zshrc:
```bash
alias cb='codeburn report --provider opencode'
alias cbs='codeburn status --provider opencode'
alias cbo='codeburn optimize --provider opencode'
```