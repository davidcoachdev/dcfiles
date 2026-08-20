---
name: obscura
description: >
  Obscura — headless browser unificado (CLI + MCP) con routing dinámico. CLI para lectura batch stateless (fetch/scrape), MCP para interacción stateful (click/fill/tabs/cookies). 35 MCP tools + 4 comandos CLI + stealth/CDP.
  Trigger: obscura, headless browser, web scraping, scraping, fetch page, scrape urls, browser automation, stealth browser, CDP, browser_navigate, browser_click
license: Apache-2.0
metadata:
  author: h4ckf0r0day
  version: "1.0"
  supersedes: obscura-browser
---

# Obscura — Skill Unificada (CLI + MCP con Routing Dinámico)

> Réplica de la fórmula `repowise` (skills + CLI) para Obscura. **Una sola skill** que decide en runtime si usa terminal o MCP. Binary en `/home/dcdebian/obscura` (77 MB, v0.1.0).

## 0. Routing — LEER ESTO PRIMERO (obligatorio para el agente)

```text
if tarea == lectura one-shot / batch / sin login / sin estado:
    → USA CLI (más barato, sin sesión)
elif tarea == interacción multi-paso / login / form / scroll infinito / tabs / cookies / espera:
    → USA MCP (stateful)
elif híbrido (scrape + necesita click):
    → Intenta CLI primero; si falla (bot detection / JS pesado / auth) → fallback MCP --stealth
```

**Regla de oro:** CLI es preferido por costo. MCP es fallback por capacidad.

| Señal en el prompt | Ruta |
|---|---|
| "dame el markdown/html/links de esta URL" "scrapea 20 URLs" "extrae h1 con JS" | **CLI** `fetch`/`scrape` |
| "logueate" "rellena formulario" "clickea" "scrollea infinito" "paginación con click" "tabs" "cookies" "storage_state" | **MCP** `browser_*` |
| "scrapea pero hay Cloudflare/bot detection" | **CLI --stealth** → si bloquea → **MCP --stealth** |

## 1. CLI Workflow — Stateless (preferir)

### Prerrequisitos
```bash
obscura --version
obscura --help
```

### Fetch — 1 URL
```bash
obscura fetch https://example.com --dump markdown --stealth
obscura fetch https://example.com --dump html --eval "document.title"
obscura fetch https://example.com --dump text --output page.txt
obscura fetch https://example.com --dump links
obscura fetch https://example.com --dump assets    # sub-recursos (script/img/iframe)
obscura fetch https://example.com --dump original  # raw binary (json/img)
obscura fetch https://example.com --selector "h1" --wait 5 --wait-until networkidle0
```

### Scrape — N URLs en paralelo
```bash
obscura scrape url1 url2 url3 --concurrency 25 --eval "document.querySelector('h1').textContent" --format json
obscura scrape $(cat urls.txt) --concurrency 10 --format json > out.jsonl
# flags: --concurrency 10 (default) --timeout 60 --format json --proxy --allow-private-network -q/--quiet
```

### Serve — CDP server (usar cuando CLI no alcanza pero no quieres MCP)
```bash
obscura serve --port 9222 --stealth --allow-private-network --workers 1 --host 127.0.0.1
# Conectar desde Puppeteer/Playwright:
# puppeteer.connect({browserWSEndpoint:'ws://127.0.0.1:9222/devtools/browser'})
```

### Flags Globales CLI
`--stealth --proxy <url> --user-agent <ua> --storage-dir <dir> --allow-private-network --v8-flags "--max-old-space-size=4096" -v/--verbose`

### Cuándo CLI NO alcanza (pasar a MCP)
- Necesitas `click`/`fill`/`type`/`press_key`/`select_option` secuenciales
- Necesitas tabs, back/forward, cookies granulares, storage_state
- Necesitas `wait_for`/`wait_for_text` con DOM vivo
- Necesitas `fill_form` batch con submit
- Página con infinite-scroll que requiere `scroll` repetido

## 2. MCP Workflow — Stateful (35 tools verificados)

> Fuente: `obscura mcp` tools/list (protocol 2024-11-05, server obscura-mcp 0.1.0)

### 2.1 Navegación y Lectura
| Tool | Params | Uso |
|------|--------|-----|
| `browser_navigate` | `url*`, `waitUntil?: load|domcontentloaded|networkidle0` | Navega. Siempre primer paso |
| `browser_snapshot` | — | Título+URL+body texto (debug rápido) |
| `browser_markdown` | `max_chars?:4000` | **Preferir sobre snapshot** para contenido denso |
| `browser_links` | `limit?:100`, `internal_only?:bool` | Enumera anclas |
| `browser_interactive_elements` | `limit?:100` | **Obligatorio antes de click/fill** — retorna refs estables `e3` |
| `browser_extract` | `schema*` | `{"title":"h1","urls[]":"a@href"}` — `[]` = array, `@attr` = atributo |
| `browser_search` | `query*`, `limit?=10`, `context_chars?=80` | Busca substring con contexto |
| `browser_count` | `selector*` | Probe barato paginación |
| `browser_get_attribute` | `ref|selector`, `attribute*` | Lee href/src/value/class |

### 2.2 Interacción
| Tool | Params | Uso |
|------|--------|-----|
| `browser_click` | `ref|selector` | Click |
| `browser_fill` | `ref|selector`, `value*` | Set value |
| `browser_type` | `ref|selector`, `text*` | Append text |
| `browser_press_key` | `key*`, `selector?` | Enter/Tab/Escape/Arrow* |
| `browser_select_option` | `selector*`, `value*` | Select |
| `browser_fill_form` | `fields*: [{ref|selector,value,type?:text|check|uncheck|select}]`, `submit_ref|submit_selector?` | **Batch** — ahorra N round-trips |
| `browser_detect_forms` | — | Inspecciona forms antes de fill |
| `browser_scroll` | `direction?:top|bottom|up|down`, `amount?`, `ref|selector?` | `bottom` dispara loaders infinitos |

### 2.3 Espera y Observabilidad
| Tool | Params |
|------|--------|
| `browser_wait_for` | `selector*`, `timeout?:30s` |
| `browser_wait_for_text` | `text*`, `timeout?:30s` |
| `browser_network_requests` | — |
| `browser_console_messages` | — |

### 2.4 Estado y Sesión
| Tool | Params |
|------|--------|
| `browser_get_cookies` | `domain?` |
| `browser_set_cookie` | `name*`, `value*`, `domain*`, `path?`, `secure?`, `http_only?` |
| `browser_clear_cookies` | — |
| `browser_storage_state` | — |  # export {cookies, origins}
| `browser_set_storage_state` | `state*` |  # import
| `browser_tab_new` | `url?` | # retorna tab_id
| `browser_tab_list` | — |
| `browser_tab_switch` | `tab_id*` |
| `browser_tab_close` | `tab_id?` |
| `browser_back` | — |
| `browser_forward` | — |
| `browser_reload` | — |
| `browser_close` | — |
| `browser_evaluate` | `expression*` | # JS en página

### MCP Config
```json
{"mcpServers":{"obscura":{"command":"obscura","args":["mcp"]}}}
```
```bash
obscura mcp --http --port 3000 --stealth
```

### Pattern MCP Recomendado
```
1. browser_navigate(url, waitUntil:load)
2. browser_interactive_elements()  → obtener refs
3. browser_detect_forms()          → si hay form
4. browser_fill_form({fields:[...], submit_selector}) o browser_click/browser_fill
5. browser_wait_for(selector) o browser_wait_for_text(text)
6. browser_extract(schema) o browser_markdown()
7. browser_storage_state()         → guardar si hubo login
```

## 3. Matriz de Decisión y Ejemplos

| Tarea del usuario | Ruta | Comando |
|---|---|---|
| "dame el markdown de https://example.com" | CLI | `obscura fetch https://example.com --dump markdown` |
| "scrapea estas 50 URLs y saca el h1" | CLI | `obscura scrape $(cat urls.txt) --concurrency 25 --eval "document.querySelector('h1').textContent"` |
| "logueate en site.com y saca el dashboard" | MCP | `navigate` → `fill_form` → `wait_for` → `extract` |
| "scrollea infinito y cuenta productos" | MCP | `navigate` → loop `scroll(bottom)` + `count` |
| "hay Cloudflare, no me deja fetchear" | CLI stealth → MCP stealth | `fetch --stealth` → si 403 → `mcp --stealth` + `navigate` |

## 4. Stealth, CDP, Instalación

**Stealth:** `--stealth` activa fingerprint random (GPU/screen/canvas/audio), userAgentData Chrome 145, `webdriver=undefined`, 3,520 trackers bloqueados. Requiere build `--features stealth`.

**CDP Coverage:** Target (create/close/attach), Page (navigate/getFrameTree), Runtime (evaluate), DOM (querySelector), Network/Fetch/Storage/Input, LP.getMarkdown — compatible Puppeteer/Playwright via `ws://127.0.0.1:9222`.

**Instalación:**
```bash
curl -LO https://github.com/h4ckf0r0day/obscura/releases/latest/download/obscura-x86_64-linux.tar.gz
tar xzf obscura-x86_64-linux.tar.gz && sudo mv obscura /usr/local/bin/
# Docker: docker run -d -p 127.0.0.1:9222:9222 h4ckf0r0day/obscura
# Source: cargo build --release --features stealth
```

**Recursos:** https://obscura.sh | https://github.com/h4ckf0r0day/obscura | Docker: h4ckf0r0day/obscura

## 5. Obscura vs Playwright

| Escenario | Usar |
|---|---|
| Agente AI, scraping con bot detection, alto throughput | **Obscura** |
| E2E testing complejo con tracing/debug | **Playwright** |
