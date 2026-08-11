---
description: Open the agent-flow manager board (OpenTUI) in a tmux pane next to opencode
---

Launch the OpenTUI flow board in a tmux split so you can watch agent phases live,
without leaving the opencode environment.

The board reads `~/.local/share/opencode/flow/flow-board.json`, emitted by the
`agent-flow` plugin (independent of `background-agents`).

## Workflow

From opencode, you have two ways to open the viewer:

### A) Quick key (recommended) — dentro de opencode
Press **`Alt+t`** while in opencode. A menu opens **inside the opencode TUI**
(not tmux) to pick orientation:
- **`h`** → abre el board en split **horizontal** (opencode a la izquierda, board a la derecha)
- **`v`** → abre el board en split **vertical** (opencode arriba, board abajo)
- `Esc` o "Cancelar" → cierra el menú

Esto está cableado por el TUI plugin `tui-plugins/flow-board.tsx` (registrado en
`tui.json`), que usa `api.keymap.registerLayer` + `api.ui.DialogSelect`.
Requiere reiniciar opencode una vez para cargar el plugin.

### B) Manual
Run the viewer in a tmux pane (keeps opencode running):

```bash
tmux split-window -h -t 0 'bun run ~/.local/bin/flow-board/flow-board.tsx'
```

- Split horizontal: opencode a la izquierda, board a la derecha
- Split vertical:  opencode arriba,    board abajo

Inside the board press `q` to quit and return to opencode.

## Notes
- Requires: `bun install` in `~/.local/bin/flow-board` (needs `@opentui/core` + `@opentui/react`).
- The `agent-flow` plugin must be loaded (restart opencode once after adding it).
- Adjust phase columns via `AGENT_PHASE` in `plugins/agent-flow.ts`.
