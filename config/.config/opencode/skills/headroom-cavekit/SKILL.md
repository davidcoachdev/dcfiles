---
name: headroom-cavekit
description: >
  Integración de headroom context compression en el flujo Cavekit.
  Comprime contexto antes de sketch, optimiza make loops, y aprende de errores en check.
  Usa herramientas nativas y hooks (sin proxy).
  Trigger: "headroom cavekit", "comprimir contexto cavekit", "headroom con cavekit",
  "reducir tokens cavekit", "integrar headroom flow"
---

# Headroom + Cavekit Integration (Native Tools & Hooks)

Comprime el contexto de cada fase del flujo Cavekit para reducir tokens y mejorar velocidad, sin proxy persistente.

## Cómo funciona con Cavekit

```
Sketch → Map → Make → Check
  │         │       │       │
  ▼         ▼       ▼       ▼
headroom  headroom  headroom  headroom
compress  compress  compress  learn
```

Las herramientas `headroom-compress` y `headroom-retrieve` se ejecutan bajo demanda. Los hooks de OpenCode comprimen automáticamente el contexto antes de cada llamada al LLM.

## Fase por fase

### Sketch (escribir kits)

Comprimí el contexto del proyecto antes de pedirle al LLM que escriba kits. Esto reduce el ruido de tool outputs y logs en la conversación.

```bash
# Comprimir el contexto del proyecto antes de sketch
headroom-compress kimi-k3-free < mensajes.json

# O usar el comando de OpenCode
opencode headroom-compress kimi-k3-free
```

**Cuándo usarlo:**
- Proyectos grandes con muchos archivos
- Cuando el contexto incluye outputs de herramientas largos
- Cuando RAG chunks o documentación externa se inyectan en el prompt

### Map (generar task graph)

Comprimí los resultados de exploración antes de generar el grafo de tareas. Los outputs de `sdd-explore` y `sdd-propose` pueden ser muy largos.

```bash
headroom-compress kimi-k3-free < explore_output.json
```

### Make (iteración loop)

Esta es la fase donde más se beneficia. Cada iteración de make genera tool outputs, test results, y logs que se acumulan rápido.

**El hook `on-before-llm-call` comprime automáticamente el contexto antes de cada llamada al LLM.** No necesitas hacer nada manualmente.

Si necesitas comprimir manualmente en una iteración específica:

```bash
headroom-compress kimi-k3-free < turn_messages.json
```

Para recuperar el original comprimido:

```bash
headroom-retrieve <compression_key>
```

### Check (gap analysis + peer review)

Usá `headroom learn` para minar las sesiones fallidas y mejorar los kits automáticamente.

```bash
# Después de un Check con REJECT o REVISE
headroom learn --agent opencode --apply
```

**Flujo completo de Check con headroom:**

```bash
# 1. Verificar que headroom está disponible
/home/dcdebian/.local/share/uv/tools/headroom-ai/bin/python -c "from headroom import compress; print('OK')"

# 2. Comprimir el contexto para la siguiente iteración si hay gaps
headroom-compress kimi-k3-free < check_output.json

# 3. Minar errores y escribir correcciones
headroom learn --agent opencode --apply
```

## Configuración para Cavekit

### Sin proxy (enfoque actual)

Este enfoque usa herramientas nativas y hooks de OpenCode — no hay proxy persistente.

1. **Herramientas** en `~/.local/bin/headroom-tools/`:
   - `headroom-compress` — comprimir mensajes
   - `headroom-retrieve` — recuperar mensajes comprimidos por clave

2. **Hooks** en `~/.config/opencode/hooks/`:
   - `on-session-start/02-headroom.sh` — inicializa almacenamiento
   - `on-before-llm-call/01-headroom-compress.sh` — comprime contexto automáticamente
   - `on-session-end/01-headroom-cleanup.sh` — limpia archivos temporales

3. **Comandos** en `opencode.json`:
   - `headroom-compress` — comprimir contexto
   - `headroom-retrieve` — recuperar contexto por clave

### Variables de entorno para Cavekit

```bash
# TokenRouter upstream
export OPENAI_API_KEY=REDACTED-OPENAI-KEY

# Headroom config
export HEADROOM_STORAGE_DIR="$HOME/.local/share/headroom/compress"
export HEADROOM_MODEL=kimi-k3-free

# Evitar check de updates en cada sesión
export HEADROOM_UPDATE_CHECK=off
```

## Commands de headroom útiles en Cavekit

| Command | Cuándo usarlo |
|---|---|
| `headroom-compress kimi-k3-free` | Comprimir contexto antes de sketch/map |
| `headroom-retrieve <key>` | Recuperar original comprimido |
| `headroom learn --agent opencode --apply` | Después de Check con fallos |

## Troubleshooting específico para Cavekit

**`headroom-compress: command not found`**
Los scripts están en `~/.local/bin/headroom-tools/`. Usá la ruta completa o agregá `~/.local/bin` al PATH.

**Hook no ejecuta**
OpenCode auto-descubre hooks desde `~/.config/opencode/hooks/`. Verificá que los archivos sean ejecutables (`chmod +x`).

**La compresión no reduce tokens**
Mensajes pequeños pueden no comprimirse bien. Headroom es más efectivo con historiales de conversación largos y outputs de herramientas.

## Integración con tus agentes existentes

Tu `opencode.json` ya tiene estos agentes que se benefician de headroom:

| Agente | Beneficio |
|---|---|
| `cavekit-orchestrator` | Contexto comprimido en cada delegación |
| `cavekit-make` | Tool outputs comprimidos en cada iteración |
| `cavekit-check` | Stats y learn automático |
| `sdd-explore` | Outputs de exploración comprimidos |
| `sdd-apply` | Diffs y test outputs comprimidos |
| `mentored-architect` | Menos tokens, misma calidad |
| `obra-superpowers` | Compression en todo el flujo SDD |

## Recursos

- Repo: https://github.com/headroomlabs-ai/headroom
- Skill de instalación: `headroom-integration`
