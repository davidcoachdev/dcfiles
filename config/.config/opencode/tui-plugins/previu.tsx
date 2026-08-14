/** @jsxImportSource @opentui/solid */
import type { TuiPlugin } from "@opencode-ai/plugin/tui"
import { createRoot } from "solid-js"
import { registerExCommands } from "@opentui/keymap/addons"
import { execFileSync } from "node:child_process"

// ── previu (TUI plugin) ──────────────────────────────────────
// Alt+v abre un menú DENTRO de opencode para lanzar un "manager visual"
// en un pane nuevo de tmux al 40%:
//   paso 1: herramienta → nvim | fzf+bat preview
//   paso 2: dirección   → a la derecha | abajo
//
// BUGS corregidos:
// - Ya no abre "otra terminal": chequea que exista el servidor tmux
// - Pane nuevo con PATH completo de fish (fish -lc)
// - Usa el mismo tunneado del abbr `fp` (height 100%, preview abajo, Ctrl+flechas)
// - Si el usuario cancela fzf, el pane queda en una shell fish interactiva

const id = "previu"

// Colores dc-studio para fzf (inline — no dependemos de que el pane cargue fzf.fish)
const FZF_COLORS =
  '--color=fg:#ffcccc,bg:#0d0d0d,hl:#ff9999,fg+:#000000,bg+:#ff3333 ' +
  '--color=hl+:#ff4d4d,info:#ff6666,prompt:#ff6666,pointer:#ff3333 ' +
  '--color=marker:#ff4d4d,spinner:#ff9999,header:#262626,border:#404040,gutter:#262626 '

// fzf con tema dc-studio inline (garantiza consistencia con los alias de fish).
// Ctrl+P / Ctrl+F → toggle del preview.
// Modo "derecha" (h): preview abajo, lista arriba (layout vertical).
// Modo "abajo" (v): horizontal — lista a la DERECHA, preview a la IZQUIERDA.
const VIEWER_FZF_RIGHT =
  'set -l sel (fzf --height=100% ' +
  '--preview="bat --theme=gruvbox-dark --color=always --style=numbers {}" ' +
  '--preview-window=down,50% ' +
  FZF_COLORS +
  '--bind "ctrl-p:toggle-preview,' +
  'ctrl-down:preview-down,ctrl-up:preview-up,ctrl-right:preview-page-down,ctrl-left:preview-page-up"' +
  '); and nvim "$sel"; or exec fish'

const VIEWER_FZF_DOWN =
  'set -l sel (fzf --layout=reverse --height=100% ' +
  '--preview="bat --theme=gruvbox-dark --color=always --style=numbers {}" ' +
  '--preview-window=left,50% ' +
  FZF_COLORS +
  '--bind "ctrl-p:toggle-preview,' +
  'ctrl-down:preview-down,ctrl-up:preview-up,ctrl-right:preview-page-down,ctrl-left:preview-page-up"' +
  '); and nvim "$sel"; or exec fish'

function openPanel(
  mode: "nvim" | "fzf",
  orientation: "h" | "v",
  cwd: string,
  api: Parameters<TuiPlugin>[0],
) {
  const flag = orientation === "v" ? "-v" : "-h"

  // 1. Chequear que exista servidor tmux
  try {
    execFileSync("tmux", ["list-sessions"], { stdio: "ignore" })
  } catch {
    api.ui.toast({
      variant: "error",
      title: "previu",
      message: "No hay servidor tmux. Abrí opencode dentro de tmux (ej. `ti`) y reintentá.",
    })
    return
  }

  // 2. split-window con PATH completo en el pane nuevo
  const args = ["split-window", "-p", "40", flag, "-c", cwd]
  if (mode === "nvim") {
    args.push("fish", "-lc", "nvim .")
  } else {
    const cmd = orientation === "v" ? VIEWER_FZF_DOWN : VIEWER_FZF_RIGHT
    args.push("fish", "-lc", cmd)
  }

  try {
    execFileSync("tmux", args, { stdio: "ignore" })
    api.ui.toast({
      variant: "info",
      title: "✔ previu",
      message: `${mode} → panel ${orientation === "h" ? "derecha" : "abajo"} (40%)`,
    })
  } catch (e) {
    console.error("[previu] tmux split falló:", e)
    api.ui.toast({
      variant: "error",
      title: "previu falló",
      message: String(e),
    })
  }
}

const tui: TuiPlugin = async (api) => {
  createRoot((disposeRoot) => {
    api.lifecycle.onDispose(disposeRoot)

    function showDirectionMenu(mode: "nvim" | "fzf") {
      const cwd =
        (api.state.path && api.state.path.directory) ||
        (typeof process !== "undefined" ? process.cwd() : ".")

      api.ui.dialog.replace(() => (
        <api.ui.DialogSelect
          title={`previu — ${mode === "nvim" ? "nvim" : "fzf+bat"} · ¿dónde abrir?`}
          options={[
            { title: "→  A la derecha (40%)", value: "h" },
            { title: "↓  Abajo        (40%)", value: "v" },
            { title: "─────────────", value: "__sep__" },
            { title: "✕  Cancelar", value: "__cancel__" },
          ]}
          onSelect={(opt: { title: string; value: string }) => {
            api.ui.dialog.clear()
            if (opt.value === "h" || opt.value === "v") {
              openPanel(mode, opt.value as "h" | "v", cwd, api)
            }
          }}
          onCancel={() => api.ui.dialog.clear()}
        />
      ))
    }

    function showToolMenu() {
      api.ui.dialog.replace(() => (
        <api.ui.DialogSelect
          title="previu — ¿cómo abrir el proyecto?"
          options={[
            { title: "  nvim — editor en pane nuevo", value: "nvim" },
            { title: "  fzf  — buscar archivo + preview bat", value: "fzf" },
            { title: "─────────────", value: "__sep__" },
            { title: "✕  Cancelar", value: "__cancel__" },
          ]}
          onSelect={(opt: { title: string; value: string }) => {
            if (opt.value === "nvim" || opt.value === "fzf") {
              showDirectionMenu(opt.value as "nvim" | "fzf")
            } else {
              api.ui.dialog.clear()
            }
          }}
          onCancel={() => api.ui.dialog.clear()}
        />
      ))
    }

    const disposeEx = registerExCommands(api.keymap)
    api.lifecycle.onDispose(disposeEx)

    const disposeLayer = api.keymap.registerLayer({
      priority: 100,
      commands: [
        {
          name: ":previu",
          title: "previu (manager visual)",
          desc: "Abre nvim o fzf+bat en un pane tmux al 40% (derecha/abajo)",
          category: "previu",
          nargs: "0",
          run: () => {
            showToolMenu()
            return true
          },
        },
      ],
      bindings: [{ key: "Alt+v", cmd: ":previu" }],
    })
    api.lifecycle.onDispose(disposeLayer)
  })
}

const plugin = { id, tui }
export default plugin
