/** @jsxImportSource @opentui/solid */
import type { TuiPlugin } from "@opencode-ai/plugin/tui"
import { createRoot } from "solid-js"
import { registerExCommands } from "@opentui/keymap/addons"
import { execFileSync } from "node:child_process"
import * as fs from "node:fs"
import * as path from "node:path"

// ── Flow Board manager (TUI plugin) ───────────────────────────────
// Alt+t opens a menu INSIDE opencode to launch the OpenTUI agent-flow
// board in a tmux pane, choosing horizontal (-h) or vertical (-v).
// Independent of background-agents: reads the state emitted by the
// agent-flow plugin (~/.local/share/opencode/flow/flow-board.json).

const id = "flow-board"
const VIEWER = "bun run ~/.local/bin/flow-board/flow-board.tsx"
const THEME_FILE = path.join(
  process.env.HOME ?? "~",
  ".local/share/opencode/flow/theme.json",
)

function colorToString(value: unknown): unknown {
  if (value && typeof value === "object" && "toInts" in value) {
    const ints = (value as { toInts: () => [number, number, number, number] }).toInts()
    return `#${ints.slice(0, 3).map((n) => n.toString(16).padStart(2, "0")).join("")}`
  }
  return value
}

function writeThemeFile(api: Parameters<TuiPlugin>[0]) {
  try {
    const current = api.theme.current as unknown as Record<string, unknown>
    const colors = Object.fromEntries(
      Object.entries(current).map(([key, value]) => [key, colorToString(value)]),
    )
    fs.mkdirSync(path.dirname(THEME_FILE), { recursive: true })
    const tmp = `${THEME_FILE}.tmp-${process.pid}`
    fs.writeFileSync(
      tmp,
      JSON.stringify({ theme: api.theme.selected, mode: api.theme.mode(), colors }, null, 2) + "\n",
      { encoding: "utf8", mode: 0o600 },
    )
    fs.renameSync(tmp, THEME_FILE)
  } catch (e) {
    console.error("[flow-board] theme export failed:", e)
  }
}

function openBoard(orientation: "h" | "v") {
  const flag = orientation === "v" ? "-v" : "-h"
  try {
    const paneId = execFileSync(
      "tmux",
      ["split-window", "-P", "-F", "#{pane_id}", "-p", "40", flag, VIEWER],
      { encoding: "utf8" },
    ).trim()
    if (!paneId) throw new Error("tmux did not return a new pane id")
    execFileSync("tmux", ["select-pane", "-t", paneId, "-T", "Flow Manager"], {
      encoding: "utf8",
    })
  } catch (e) {
    console.error("[flow-board] tmux split failed:", e)
  }
}

const tui: TuiPlugin = async (api) => {
  createRoot((disposeRoot) => {
    api.lifecycle.onDispose(disposeRoot)

    writeThemeFile(api)
    const themeTimer = setInterval(() => writeThemeFile(api), 1000)
    api.lifecycle.onDispose(() => clearInterval(themeTimer))

    function showFlowMenu() {
      api.ui.dialog.replace(() => (
        <api.ui.DialogSelect
          title="📊 Flow Board — ¿orientación?"
          options={[
            { title: "↔  Horizontal   (opencode | board)", value: "h" },
            { title: "↕  Vertical     (opencode / board)", value: "v" },
            { title: "─────────────", value: "__sep__" },
            { title: "✕  Cancelar", value: "__cancel__" },
          ]}
          onSelect={(opt: { title: string; value: string }) => {
            api.ui.dialog.clear()
            if (opt.value === "h") openBoard("h")
            else if (opt.value === "v") openBoard("v")
            // __sep__ / __cancel__ → ya cerramos con clear()
          }}
          onCancel={() => api.ui.dialog.clear()}
        />
      ))
    }

    // Necesario para que registerLayer / dispatchCommand funcionen (mismo patrón que tts-monitor)
    const disposeEx = registerExCommands(api.keymap)
    api.lifecycle.onDispose(disposeEx)

    const disposeLayer = api.keymap.registerLayer({
      priority: 100,
      commands: [
        {
          name: ":flow-open",
          title: "📊 Flow Board (manager)",
          desc: "Open the agent-flow board in a tmux pane; choose orientation",
          category: "Flow",
          nargs: "0",
          run: () => {
            showFlowMenu()
            return true
          },
        },
      ],
      bindings: [{ key: "Alt+t", cmd: ":flow-open" }],
    })
    api.lifecycle.onDispose(disposeLayer)
  })
}

const plugin = { id, tui }
export default plugin
