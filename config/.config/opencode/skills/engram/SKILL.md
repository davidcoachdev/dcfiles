---
name: engram
description: >
  Engram — memoria persistente para agentes. CLI y MCP son COMPLEMENTARIOS con routing dinámico:
  CLI cubre 80% (search/save/context/stats/timeline/export/sync), MCP cubre 20% exclusivo
  (save_prompt, session lifecycle, suggest_topic_key, capture_passive). Skill con routing dinámico
  CLI→MCP según capacidad. Trigger: When saving/recalling memories, session lifecycle, or using engram from terminal vs agent.
license: MIT
metadata:
  author: dc-dev
  version: "1.0"
  cli_version: "1.10.0"
  mcp_command: "engram mcp --tools=agent"
  mcp_profiles: "agent=11, all=14, admin=3"
---

## What is Engram?

Memoria persistente que sobrevive a sessions y compactions — 660 sessions / 1217 obs en este host:

- **SQLite local** — `~/.engram/engram.db` + sync a `.engram/` chunks para git
- **Projects** — dcfiles, tts-control, wsl-bridge, etc. (filtro por `--project`)
- **No es grep** — FTS5 + topic_keys para decisiones evolutivas

## CLI vs MCP — Routing Dinámico (NO 1:1)

**Engram es dinámico: CLI hace 80%, MCP hace 20% exclusivo. No elijas uno — rutea según la operación.**

| Operación | CLI (`engram <cmd>`) | MCP (`mem_*`) | Ruta recomendada |
|---|---|---|---|
| **Buscar** | `engram search "query" --project X --limit 10` | `mem_search` | ✅ **CLI** — más rápido en terminal, mismo FTS5 |
| **Guardar** | `engram save "Título" "What:..." --type bugfix` | `mem_save` | ✅ **CLI** en terminal, MCP `mem_save` dentro de agente |
| **Contexto** | `engram context [project]` | `mem_context` | ✅ CLI |
| **Timeline** | `engram timeline <obs_id>` | `mem_timeline` (solo `--tools=all`) | ✅ CLI (MCP agent NO lo tiene) |
| **Stats** | `engram stats` | `mem_stats` (solo `--tools=all`) | ✅ CLI (MCP agent NO lo tiene) |
| **Export/Import/Sync** | `engram export/sync --status` | ❌ | **CLI only** |
| **TUI** | `engram tui` | ❌ | CLI only |
| **Save prompt** | ❌ | `mem_save_prompt` | **MCP only** — no hay `engram save-prompt` |
| **Session start/end** | ❌ | `mem_session_start`, `mem_session_end` | MCP only |
| **Session summary** | ❌ | `mem_session_summary` | MCP only — el que usas al cerrar sesión |
| **Suggest topic_key** | ❌ | `mem_suggest_topic_key` | MCP only |
| **Capture passive** | ❌ | `mem_capture_passive` | MCP only — auto-extrae `## Key Learnings` |
| **Get observation** | ❌ (usa `search` + lee) | `mem_get_observation` | MCP only para ID puntual |
| **Update/Delete** | ❌ | `mem_update`, `mem_delete` (all) | MCP only |

**Regla de routing:**
```bash
if operacion in [search, save, context, timeline, stats, export, sync, tui]:
  → usa CLI directo: engram <cmd>
else if operacion in [save_prompt, session_start/end/summary, suggest_topic_key, capture_passive, get_observation]:
  → usa MCP: mem_*
else:
  → CLI no puede, MCP sí → usa MCP
```

> Verificado `engram mcp --tools=agent` → 11 tools, `--tools=all` → 14 tools. `agent` NO incluye `mem_timeline`/`mem_stats`/`mem_delete` — para esos usa CLI o `--tools=all`.

## CLI Workflow (terminal — 80%)

```bash
# Buscar y contexto (lo que más usarás en terminal)
engram search "lightpanda" --project tts-control --limit 10
engram search "codegraph" --type architecture
engram context tts-control        # últimas 20 obs
engram context --limit 30         # global

# Guardar (formato What/Why/Where/Learned obligatorio)
engram save "Fixed N+1 in user list" "**What**: ... **Why**: ... **Where**: src/..." --type bugfix --project tts-control

# Timeline y stats (solo CLI en perfil agent)
engram timeline 695 --before 5 --after 5  # contexto alrededor de obs 695
engram stats                              # 660 sessions, 1217 obs

# Sync / export (solo CLI)
engram sync --status
engram sync              # exporta chunk a .engram/
engram export backup.json
engram import backup.json

# TUI
engram tui

# HTTP API (alternativa a CLI)
engram serve 7437  # http://127.0.0.1:7437
```

## MCP Workflow (agente — 20% exclusivo)

**Config en opencode.json:**
```json
{
  "mcp": {
    "engram": {
      "command": ["engram", "mcp", "--tools=agent"],
      "type": "local"
    }
  }
}
```

**Usa MCP solo para lo que CLI no puede:**

```javascript
// 1. Save prompt (registrar lo que pidió el usuario)
mem_save_prompt({ content: "haz un TTS bridge", project: "tts-control" })

// 2. Session lifecycle (obligatorio al iniciar/cerrar)
mem_session_start({ id: "sess-123", project: "tts-control", directory: "/home/..." })
mem_session_end({ id: "sess-123", summary: "hecho X" })
mem_session_summary({ project: "tts-control", content: "## Goal\n...\n## Accomplished\n..." })

// 3. Topic keys (decisiones evolutivas)
mem_suggest_topic_key({ title: "Auth model", type: "architecture" })
// → architecture/auth-model
mem_save({ title: "Auth model", content: "...", topic_key: "architecture/auth-model" })

// 4. Capture passive (auto-extrae Key Learnings)
mem_capture_passive({ content: "## Key Learnings:\n- item 1\n- item 2", project: "tts-control" })

// 5. Get/Update/Delete por ID
mem_get_observation({ id: 695 })
mem_update({ id: 695, title: "nuevo título" })
```

**No uses MCP para lo que CLI ya hace:** `mem_search`/`mem_save`/`mem_context` en agente sí están bien, pero en terminal es más rápido `engram search/save/context`.

## Comparativa Final — Por qué Engram es dinámico

```bash
# TERMINAL — rápido, sin JSON-RPC
engram search "serena" --limit 5
engram save "Decision X" "What: ..." --project dcfiles

# AGENTE — para lo exclusivo de MCP
mem_save_prompt({ content: userPrompt })
mem_session_summary({ content: "## Goal\n..." })
```

| Escenario | Ruta |
|---|---|
| Estoy en terminal y quiero buscar/guardar | `engram search/save` (CLI) |
| Estoy en terminal y quiero stats/timeline/sync | `engram stats/timeline/sync` (CLI only) |
| Agente necesita registrar prompt del usuario | `mem_save_prompt` (MCP only) |
| Agente inicia/cierra sesión | `mem_session_start/end/summary` (MCP only) |
| Necesito topic_key para decisión evolutiva | `mem_suggest_topic_key` (MCP only) |
| Quiero ver memoria por ID | `mem_get_observation` (MCP) o `engram search` + filtrar |

## Instalación

```bash
engram --version  # 1.10.0 (update a 1.20.0: brew upgrade engram)
engram setup opencode --help
# DB: ~/.engram/engram.db — no requiere init por proyecto (a diferencia de CodeGraph)
```

## Resources

- CLI help: `engram --help`, `engram <cmd> --help`
- MCP: `engram mcp --tools=agent` (stdio), `engram mcp --tools=all` para mem_stats/timeline
- TUI: `engram tui`
- HTTP: `engram serve`
