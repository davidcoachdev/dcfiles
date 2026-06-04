# sidecar

TUI dashboard que corre al lado de AI coding agents (OpenCode, Claude Code, Codex, etc.).

## Install

```bash
brew install marcus/tap/sidecar    # macOS
# Linux/WSL: curl -fsSL https://raw.githubusercontent.com/marcus/sidecar/main/scripts/setup.sh | bash
```

## Uso

```bash
sidecar                    # Run desde cualquier proyecto
sidecar --project /path    # Specify project root
sidecar --debug            # Enable debug logging
```

## Setup recomendado

```
┌─────────────────────────────┬─────────────────────┐
│   OpenCode / Claude Code   │      Sidecar       │
│                             │                     │
│   $ opencode                │   [Git] [Files]     │
│   > fix the auth bug...     │   [Tasks] [Workspaces]│
└─────────────────────────────┴─────────────────────┘
```

Run sidecar en un panel de tu terminal (tmux/Zellij) al lado de tu agent.

## Plugins

| Plugin | Shortcut | Qué hace |
|--------|----------|----------|
| **Git Status** | `g` | Stage/unstage files, view diffs, commit history |
| **Conversations** | `c` | Browse history de Claude Code, OpenCode, Codex, Gemini CLI |
| **TD Monitor** | `t` | Task management - integracion con td |
| **File Browser** | `f` | Tree view + syntax highlighted preview |
| **Workspaces** | `w` | Crear branches aislados, launch agents, merge workflow |

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `tab` / `shift+tab` | Navigate plugins |
| `1-9` | Focus plugin by number |
| `g` | Git Status |
| `c` | Conversations |
| `t` | TD Monitor |
| `f` | File Browser |
| `w` | Workspaces |
| `q` / `ctrl+c` | Quit |
| `?` | Toggle help |

## Git shortcuts

| Key | Action |
|-----|--------|
| `s` | Stage file |
| `u` | Unstage file |
| `d` | View diff (full-screen) |
| `v` | Toggle side-by-side diff |
| `c` | Commit staged changes |

## Config

`~/.config/sidecar/config.json`:

```json
{
  "plugins": {
    "git-status": { "enabled": true },
    "td-monitor": { "enabled": true },
    "conversations": { "enabled": true },
    "file-browser": { "enabled": true },
    "workspaces": { "enabled": true }
  },
  "ui": {
    "showClock": true,
    "theme": { "name": "default" }
  }
}
```

## Trigger

- User quiere visibilidad de lo que el agent hace
- Necesita revisar diffs sin salir de la terminal
- Quiere trackear tareas (TD integration)
- Browse conversations history