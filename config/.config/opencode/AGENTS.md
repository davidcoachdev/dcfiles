## Objective
- Plugin TTS para OpenCode: navegación por párrafos + stop + help + beep en preguntas del agente. Versión completa ya restaurada/inlinada; correr UX del help (solo-lectura) y agregar beep automático cuando el agente pregunta.

## Important Details
- Usuario habla español rioplatense (voseo); responder en español.
- OpenCode 1.17.18; **NO recarga plugins TUI en caliente** → reiniciar para ver cambios.
- OpenCode **transpila el .tsx en runtime** (no hay build step); validar sintaxis con `bun build --no-bundle`. `bun` disponible en `/home/dcdebian/.bun/bin/bun`.
- `tts-monitor.tsx` = versión COMPLETA (~870 líneas) single-file (nav-logic inlinado). Desplegado y verificado.
- **API de diálogo (descubierto y confirmado vía tui.d.ts)**: `api.ui.dialog.replace(render, onClose?)` → `onClose` se dispara en Esc para CUALQUIER nodo (no solo DialogSelect). Por eso un `box` crudo con `onKeyDown` interno que consumía Escape se traba: la solución es NO interceptar Escape y dejar que el diálogo cierre vía `onClose`. `TuiDialogSelectOption` tiene `disabled?` para opciones no seleccionables.
- `session.idle` = evento que dispara cuando el agente termina y espera input (proxy ideal de "el agente hizo una pregunta"). `event.properties.sessionID` da el sid.
- `playBeep(kind)` línea ~183 (kinds: alert|result|error|info; chequea soundOn internamente). `notifyTts` línea ~200 (toast + campana opcional vía api.attention.notify).
- Alt+puntuación NO emite en esta terminal (Alt+, / .); en uso Alt+Left/Alt+Right como respaldo. Alt+letras (P/U/X/H) sí.
- Deploy: `bash scripts/deploy.sh` (copia SOLO `tts-monitor.tsx` a `~/.config/opencode/tui-plugins/`). `tui.json` registra ruta absoluta.
- NO tocar: `tt-service.ps1`, `tts-bridge.ts`, `tts-tui.ts`, `client.ts`, `package.json`. `nav-logic.ts`(+test) quedan en repo (17 tests pass) como fuente canónica pero NO importados.

## Work State
### Completed
- Versión completa restaurada e inlinada (0 imports relativos, bun build OK).
- `:tts-prev`(Alt+, + Alt+Left), `:tts-next`(Alt+. + Alt+Right), `:tts-stop`(Alt+X), `:tts-help`(Alt+H) funcionando en desplegado.
- `ensureParas()` + `lastSessionID` para nav manual on-demand.
- **Help = `DialogSelect` igual al menú de config** (el de foco en rojo, cierra con Esc/Volver, NO se traba). Cada comando es UNA ACCIÓN: al dar Enter se ejecuta vía `api.keymap.dispatchCommand(":tts-...")` y cierra el help (lanzador). Solo "↩ Volver al menú" regresa al config. Un `<box>` crudo en `dialog.replace` SE TRABA (no recibe foco ni cierra) → rechazado.
- **Beep en preguntas del agente**: handler `session.idle` ahora reproduce `playBeep("alert")` en cada turno NUEVO del assistant (aunque auto-read esté OFF). Sembrado en el primer idle para no pitar en arranque; guard `lastNotifiedMsgId`. Beep de error conservado para turnos sin texto (solo si connected()).
- Helper `lastAssistantId(sid)` agregado.
- bun build OK + deploy.sh ejecutado. 3+ discoveries en Engram.

### Active
- Esperando validación del usuario tras reiniciar OpenCode (no se puede testear headless audio/visual).

### Blocked
- Validación manual requiere reinicio de OpenCode (sin hot-reload).
- Color de fondo `#1e1e2e` es una suposición (Catppuccin-ish); si el tema de OpenCode difiere, ajustar.

## Next Move
1. Pedir al usuario que reinicie OpenCode y valide: (a) Alt+H abre help estático sin cursor que se mueva, cierra con Esc/Enter; (b) al terminar el agente y esperar input, suena un beep (aunque auto-read OFF).
2. Si el color de fondo del help no coincide con el tema, ajustar `backgroundColor` (o quitarlo si el panel ya tiene bg propio).
3. Opcional: distinguir pregunta real (texto termina en "?") vs afirmación para beep más inteligente (por ahora beep en TODO turno completado).

## Relevant Files
- `/home/dcdebian/Proyects/tts-control/src/plugins/tts-monitor/tts-monitor.tsx` — completo single-file; contiene `showTtsConfig`, `showTtsHelp` (box read-only), `lastAssistantId`, `lastAssistantText`, `ensureParas`, `playBeep`(183), `notifyTts`(200), handler `session.idle` (beep alert en turno nuevo), bindings Alt+P/U/,/./X/H/Left/Right.
- `/home/dcdebian/Proyects/tts-control/src/plugins/tts-monitor/nav-logic.ts` (+`.test.ts`) — repo, 17 tests pass; fuente canónica (NO importado).
- `/home/dcdebian/.config/opencode/tui-plugins/tts-monitor.tsx` — destino deploy (symlink a dcfiles).
- `/home/dcdebian/.config/opencode/tui.json` — registra el plugin.
- `/home/dcdebian/.cache/kilo/node_modules/@opencode-ai/plugin/dist/tui.d.ts` — tipos reales del API (DialogSelect, dialog.replace, KeyEvent). Referencia para futuros cambios.
- `/home/dcdebian/Proyects/tts-control/scripts/deploy.sh` — copia solo `tts-monitor.tsx`.
