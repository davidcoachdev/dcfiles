---
name: codegraph
description: >
  CodeGraph — SQLite knowledge graph for any codebase. 18 CLI commands vs 1 MCP tool.
  Terminal-first skill: use CLI directly, MCP only inside agents. Covers init/index/sync,
  query/explore/node/files/callers/callees/impact/affected and the single codegraph_explore MCP tool.
  Trigger: When exploring code, tracing calls, analyzing impact, or using codegraph from terminal or MCP.
license: MIT
metadata:
  author: dc-dev
  version: "1.0"
  cli_version: "1.5.0"
  mcp_command: "codegraph serve --mcp"
---

## What is CodeGraph?

Knowledge graph SQLite para cualquier codebase — 190 nodes / 480 edges en tts-control en 485ms:

- **No es grep** — grafo de símbolos + edges (CALLS, IMPORTS, EXTENDS) con blast-radius
- **Verbatim source** — devuelve código line-numbered byte-for-byte igual a Read
- **Per-project** — cada repo necesita `codegraph init` que crea `.codegraph/` (0.85 MB en tts-control)
- **Sin default project** — si el server arranca sin índice, MCP exige `projectPath`

> Probado en `tts-control` (tts-control: 13 files, 190 nodes, 67 functions, 9 TS + 3 TSX) y en `lightpanda` skill. Sin `init`, tanto CLI como MCP devuelven `Not initialized`.

## CLI vs MCP — The Key Insight

**MCP tiene SOLO 1 tool. CLI tiene 18 comandos.** No son 1:1.

| MCP (via `codegraph serve --mcp`) | CLI (`codegraph <cmd> -p <path>`) | ¿Mismo? |
|---|---|---|
| `codegraph_explore` (PRIMARY — la única) | `codegraph explore <query>` | ✅ Idéntico — "same output as the codegraph_explore MCP tool" |
| — | `codegraph query <search>` | ❌ CLI only — MCP no lo expone (explore ya hace search interno) |
| — (explore puede hacer lo mismo) | `codegraph node [name]` / `--file` | ⚠️ Parcial — MCP explore cubre el caso, pero node da caller/callee trail más fino |
| — | `codegraph files` | ❌ CLI only |
| — | `codegraph callers <symbol>` | ❌ CLI only |
| — | `codegraph callees <symbol>` | ❌ CLI only |
| — | `codegraph impact <symbol>` | ❌ CLI only |
| — | `codegraph affected [files...]` | ❌ CLI only |
| — | `codegraph status / init / sync / index / uninit` | ❌ CLI only (gestión del índice) |

**Regla de oro:**
- **En terminal → usa CLI directo** — es más granular y no necesita JSON-RPC
- **Dentro de agente (OpenCode) → usa MCP `codegraph_explore`** — es la única disponible y ya reemplaza grep+Read en un call

No intentes `codegraph_explore` en terminal ni `codegraph callers` vía MCP — no existen.

## CLI Workflow (PREFERRED en terminal)

### 1. Inicializar (una vez por proyecto)

```bash
codegraph init /home/dcdebian/Proyects/tts-control
# ◆ Indexed 13 files — 190 nodes, 480 edges en 485ms

codegraph status /home/dcdebian/Proyects/tts-control
# Files: 13, Nodes: 190, Edges: 480, DB: 0.85 MB, ✓ Index is up to date

codegraph sync /home/dcdebian/Proyects/tts-control   # tras git pull / edits
codegraph index /home/dcdebian/Proyects/tts-control  # rebuild from scratch
codegraph uninit /home/dcdebian/Proyects/tts-control # borra .codegraph/
```

### 2. Buscar y Explorar

```bash
# query = search rápido (grep inteligente)
codegraph query -p ./tts-control "tts" --json | head
codegraph query -p ./tts-control "TtsTui" -k class -l 5

# explore = PRIMARY — source verbatim + call paths + blast radius
codegraph explore -p ./tts-control "tts-monitor"
# Found 25 symbols across 1 file — notifyTts (2 callers), showTtsConfig...

codegraph explore -p ./tts-control "chunkText splitByParagraph" --max-files 5
codegraph explore -p ./tts-control "how does TTS auto-read work?"  # natural language OK

# node = un símbolo o un archivo con line numbers
codegraph node -p ./tts-control "TtsTui"
codegraph node -p ./tts-control --file src/tts-bridge.ts
codegraph node -p ./tts-control --file src/tts-bridge.ts --offset 40 --limit 50
codegraph node -p ./tts-control --file src/tts-bridge.ts --symbols-only

# files = estructura
codegraph files -p ./tts-control --format tree
codegraph files -p ./tts-control --pattern "*.tsx" --json
```

### 3. Grafos (solo CLI)

```bash
codegraph callers -p ./tts-control "notifyTts" --json
codegraph callees -p ./tts-control "speakText" -l 20
codegraph impact -p ./tts-control "CONFIG" -d 2 --json
codegraph affected -p ./tts-control src/tts-bridge.ts src/client.ts --json
codegraph affected -p ./tts-control --stdin < changed-files.txt
```

### 4. Sistema

```bash
codegraph version              # 1.5.0
codegraph upgrade              # update
codegraph install --print-config opencode  # snippet MCP
codegraph daemon               # ver daemons corriendo
codegraph unlock ./tts-control # si hay lock stale
```

## MCP Workflow (solo dentro de agentes)

**Config en opencode.json:**
```json
{
  "mcp": {
    "codegraph": {
      "command": ["codegraph", "serve", "--mcp"],
      "type": "local",
      "enabled": true
    }
  }
}
```

**Uso:**
```javascript
// La ÚNICA tool disponible es codegraph_explore
codegraph_explore({
  query: "tts-monitor",  // o "AuthService loginUser session-manager" o pregunta natural
  projectPath: "/home/dcdebian/Proyects/tts-control",  // OBLIGATORIO si no hay default index
  maxFiles: 12
})
// Retorna: verbatim source line-numbered + call paths + blast radius
// Trátalo como Read ya hecho — no re-abras esos archivos
```

**Cuándo NO usar MCP:**
- Estás en terminal → usa `codegraph query/explore` directo (más rápido, sin JSON-RPC)
- Necesitas `callers/callees/impact/affected/files` → solo existen en CLI
- Necesitas `status/init/sync` → solo CLI

## Terminal vs MCP — Comparativa Terminal

```bash
# TERMINAL (recomendado) — directo, texto plano
codegraph explore -p ./tts-control "tts-monitor" | head -n 100
codegraph query -p ./tts-control "TtsStatus" --json | jq .

# MCP vía terminal (posible pero innecesario — solo para debug)
# codegraph serve --mcp es stdio, no HTTP — necesitas hablar JSON-RPC por stdin
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}' | codegraph serve --mcp
# Luego: {"jsonrpc":"2.0","id":2,"method":"tools/list"} → solo 1 tool: codegraph_explore
```

**Prueba viva en tts-control:** CLI `explore "tts-monitor"` y MCP `codegraph_explore {query:"tts-monitor"}` dieron **mismo output byte-for-byte** (25 symbols, blast radius notifyTts/showTtsConfig, source `tts-monitor.tsx` con chunkText/splitByParagraph/navigate).

## Cuándo usar qué

| Escenario | Recomendación |
|---|---|
| Explorar "cómo funciona X" en terminal | `codegraph explore -p ./proyecto "X"` |
| Buscar símbolo rápido | `codegraph query -p ./proyecto "Symbol"` |
| Leer un archivo con line numbers + dependents | `codegraph node -p ./proyecto --file path.ts` |
| Ver impacto antes de editar | `codegraph impact -p ./proyecto "Symbol"` |
| Encontrar callers/callees | `codegraph callers/callees -p ./proyecto "Sym"` |
| Agente OpenCode necesita contexto | `codegraph_explore` con `projectPath` |
| Indexar nuevo proyecto | `codegraph init <path>` |
| CI / git hook | `codegraph sync -q` o `affected --stdin` |

## Instalación

```bash
# Via fnm / brew (ya instalado 1.5.0 en /run/user/.../bin/codegraph)
codegraph --version
codegraph install --target opencode --location global --yes
codegraph telemetry off  # opcional
```

## Indexed Example (tts-control)

```
Project: tts-control — 13 files, 190 nodes, 480 edges, 0.85 MB
Nodes: function 67, constant 37, property 28, method 16, import 15, class 2
Files: src/tts-tui.ts (31 symbols), src/plugins/tts-monitor/tts-monitor.tsx (34), src/tts-bridge.ts (14)
```

## Resources

- CLI help: `codegraph --help`, `codegraph <cmd> --help`
- MCP: `codegraph serve --mcp` (stdio only, no HTTP)
- Docs: `codegraph install --print-config <agent>`
