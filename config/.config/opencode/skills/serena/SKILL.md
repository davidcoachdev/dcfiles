---
name: serena
description: >
  Serena — LSP-powered coding agent with 52 total tools (29 exposed in agent context).
  Terminal vs MCP are COMPLEMENTARY, not 1:1. CLI (uvx serena) manages projects/memories/config;
  MCP (29 tools) does code intelligence (find_symbol, rename, diagnostics, edits). Covers
  full CLI vs MCP mapping, when to use terminal vs agent.
  Trigger: When doing semantic code edits, symbol search/rename, LSP diagnostics, or managing Serena projects/memories.
license: MIT
metadata:
  author: dc-dev
  version: "1.0"
  cli: "uvx --from git+https://github.com/oraios/serena serena"
  mcp_command: "uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context agent --transport stdio"
  mcp_version: "1.7.1.dev0"
---

## What is Serena?

Agente coding con backend LSP (no grep) — 52 tools totales, 29 expuestos en contexto `agent`:

- **LSP real** — find_symbol, find_declaration, rename_symbol, diagnostics vía language server
- **Project-aware** — `activate_project` + `.serena/project.yml` + dashboard en http://127.0.0.1:24284
- **Memories** — `write_memory` / `read_memory` para persistir decisiones del proyecto
- **Exposed 29 en agent** (verificado `tools/list`): `activate_project`, `create_text_file`, `find_symbol`, `find_declaration`, `get_symbols_overview`, `rename_symbol`, etc. (full list abajo)

> Instalada vía `uvx --from git+https://github.com/oraios/serena` — no hay binario `serena` en PATH, se invoca siempre con `uvx`.

## CLI vs MCP — COMPLEMENTARIOS (no 1:1)

**No intentes `serena find_symbol` en terminal — no existe.** Son dos superficies distintas:

| Capacidad | CLI (`uvx ... serena <cmd>`) | MCP (`serena start-mcp-server` → 29 tools) | ¿Igual? |
|---|---|---|---|
| **Gestión proyectos** | `serena project create/index/health-check` | `activate_project`, `get_current_config`, `onboarding` | ⚠️ Parcial — CLI crea/indexa, MCP activa |
| **Memories** | `serena memories list/read/write/delete/edit/rename` | `write_memory`, `read_memory`, `list_memories`, `delete_memory`, `rename_memory`, `edit_memory` | ✅ Sí — mismo pero CLI es file-ops, MCP es tool |
| **Config/context/mode** | `serena config/mode/context/prompts` | `get_current_config` | ⚠️ Parcial |
| **Code intelligence** | ❌ **No existe** — `serena tools list` solo LISTA, no ejecuta | `find_symbol`, `find_declaration`, `find_referencing_symbols`, `find_implementations`, `get_symbols_overview`, `get_diagnostics_for_file`, `search_for_pattern` | **MCP only** |
| **Edición semántica** | ❌ No hay `serena rename_symbol` | `rename_symbol`, `replace_symbol_body`, `insert_after_symbol`, `insert_before_symbol`, `safe_delete_symbol` | MCP only |
| **Edición texto** | ❌ | `create_text_file`, `replace_content`, `replace_in_files` | MCP only (en terminal usa `edit`/`write` nativo) |
| **FS / shell** | ❌ (usa `ls`/`cat` nativo) | `list_dir`, `find_file`, `read_file`, `execute_shell_command` | Duplicado — en terminal usa bash/read nativo |
| **Dashboard** | `serena dashboard-viewer` | `open_dashboard` | ✅ Similar |

**Regla de oro:**
- **En terminal → usa CLI solo para `project` y `memories`**; para código usa `grep`/`read`/`edit` nativos o CodeGraph
- **Dentro de agente → usa MCP `find_symbol`/`rename_symbol`/`get_symbols_overview`** — es donde brilla Serena (LSP)
- **No hay CLI para operaciones de símbolos** — `serena find_symbol` no existe, solo `serena tools list` para ver la descripción

## CLI Workflow (terminal — gestión)

```bash
# Versión y ayuda
uvx --from git+https://github.com/oraios/serena serena --version  # 1.7.1.dev0
uvx --from git+https://github.com/oraios/serena serena --help

# Proyectos
uvx --from git+https://github.com/oraios/serena serena project create --help
uvx --from git+https://github.com/oraios/serena serena project health-check 2>&1 | head
uvx --from git+https://github.com/oraios/serena serena project index 2>&1 | head  # indexa símbolos a LSP cache

# Memories (equiv MCP write_memory etc)
uvx --from git+https://github.com/oraios/serena serena memories list 2>&1 | head
uvx --from git+https://github.com/oraios/serena serena memories read <name> 2>&1 | head
uvx --from git+https://github.com/oraios/serena serena memories write <name> "content" 2>&1

# Tools — solo descripción, no ejecución
uvx --from git+https://github.com/oraios/serena serena tools list 2>&1 | head -n 50
uvx --from git+https://github.com/oraios/serena serena tools description find_symbol 2>&1 | head

# Config
uvx --from git+https://github.com/oraios/serena serena config edit 2>&1 | head
uvx --from git+https://github.com/oraios/serena serena print-system-prompt 2>&1 | head
```

## MCP Workflow (agente — code intelligence)

**Config en opencode.json:**
```json
{
  "mcp": {
    "serena": {
      "command": ["uvx","--from","git+https://github.com/oraios/serena","serena","start-mcp-server","--project-from-cwd","--context","agent","--open-web-dashboard","False"],
      "type": "local",
      "enabled": true
    }
  }
}
```

**29 tools expuestos en contexto `agent` (verificado `tools/list`):**
```
activate_project, create_text_file, delete_memory, edit_memory,
execute_shell_command, find_declaration, find_file, find_implementations,
find_referencing_symbols, find_symbol, get_current_config,
get_diagnostics_for_file, get_symbols_overview, insert_after_symbol,
insert_before_symbol, list_dir, list_memories, onboarding, open_dashboard,
read_file, read_memory, rename_memory, rename_symbol, replace_content,
replace_in_files, replace_symbol_body, safe_delete_symbol, search_for_pattern,
write_memory
```
*Total disponible 52, filtrado a 29 por context=agent (edición+interactive modes).*

**Uso MCP (dentro de agente):**
```javascript
// Buscar símbolos (LSP, no grep)
find_symbol({ name_path_pattern: "MyClass/my_method", relative_path: "src/foo.ts" })
find_declaration({ relative_path: "src/foo.ts", regex: "obj\\.(process)\\(" })
get_symbols_overview({ relative_path: "src/foo.ts" })

// Edición semántica (preferir sobre replace_content para símbolos)
rename_symbol({ relative_path: "src/foo.ts", name_path: "oldName", new_name: "newName" })
replace_symbol_body({ relative_path: "src/foo.ts", name_path: "MyClass/method", body: "new body..." })
insert_after_symbol({ relative_path: "src/foo.ts", name_path: "MyClass", body: "new method..." })

// Diagnósticos
get_diagnostics_for_file({ relative_path: "src/foo.ts" })

// Memories (persistir decisiones)
write_memory({ memory_name: "decision/auth", content: "..." })
```

**CLI equivalente NO existe para lo anterior** — en terminal usarías `grep`/`astGrep`/`read` nativos.

## Comparativa Terminal vs MCP — Qué usar dónde

```bash
# TERMINAL — gestión
uvx --from git+https://github.com/oraios/serena serena project index
uvx --from git+https://github.com/oraios/serena serena memories list

# TERMINAL — código (NO uses serena, usa nativo)
grep_search("pattern", "src/**/*.ts")  # o astGrep
read("src/foo.ts")                     # nativo
edit("src/foo.ts", old, new)           # nativo

# MCP (agente) — código semántico
find_symbol({ name_path_pattern: "pattern", relative_path: "src/foo.ts" })
rename_symbol({ relative_path: "src/foo.ts", name_path: "old", new_name: "new" })
```

## Instalación y Dashboard

```bash
# Ya instalado vía uvx (cache en ~/.cache/uv/)
uvx --from git+https://github.com/oraios/serena serena --version
# Dashboard corre en http://127.0.0.1:24284/dashboard/index.html cuando MCP inicia
# Logs: ~/.serena/logs/2026-08-19/mcp_*.txt
# Config: ~/.serena/serena_config.yml — proyectos: Trust-Work-Escrow, dcfiles, s03-26-e21-wad-crm...
```

## Cuándo usar qué

| Escenario | Recomendación |
|---|---|
| Crear/indexar proyecto Serena | CLI `serena project create/index` |
| Gestionar memories | CLI `serena memories ...` o MCP `write_memory` |
| Buscar símbolo por nombre LSP | MCP `find_symbol` (terminal: usa CodeGraph `query`) |
| Renombrar símbolo en todo el codebase | MCP `rename_symbol` (terminal: `kiroRenameSymbol`) |
| Ver overview de símbolos de un archivo | MCP `get_symbols_overview` (terminal: `serena_get_symbols_overview` no existe, usa `read` + `grep`) |
| Diagnósticos de archivo | MCP `get_diagnostics_for_file` |
| Editar cuerpo de símbolo | MCP `replace_symbol_body` |
| Listar archivos / leer archivo en agente | MCP `list_dir`/`read_file` (terminal: `glob`/`read` nativo) |
| Ejecutar shell desde agente | MCP `execute_shell_command` (terminal: `bash` nativo) |

## Resources

- CLI help: `uvx --from git+https://github.com/oraios/serena serena --help`
- MCP serve: `uvx ... serena start-mcp-server --context agent --help`
- Tools list: `uvx ... serena tools list`
- Dashboard: http://127.0.0.1:24284 (cuando MCP corre)
- Docs: https://oraios.github.io/serena
