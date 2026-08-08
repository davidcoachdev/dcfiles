/** @jsxImportSource @opentui/solid */
import type { TuiPlugin } from "@opencode-ai/plugin/tui"

const id = "opencode-restart"

// Mismo puerto que usa tts-monitor para su bridge TTS local.
const BRIDGE_PORT = 9877
const BRIDGE_URL = `http://127.0.0.1:${BRIDGE_PORT}`

const tui: TuiPlugin = async (api) => {
  // Habla por el TTS local (silencia fallo si el bridge está offline).
  async function speak(text: string) {
    try {
      await fetch(`${BRIDGE_URL}/speak`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
    } catch {
      /* bridge offline o texto inválido: ignorar */
    }
  }

  const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

  async function restartOpencode() {
    const cwd = api.state.path.directory || (typeof process !== "undefined" ? process.cwd() : ".")
    const bin =
      typeof Bun !== "undefined" && Bun.which
        ? (Bun.which("opencode")?.path ?? "opencode")
        : "opencode"
    const child = await spawnDetached(bin, cwd)
    const pid = (child as unknown as { pid?: number })?.pid
    if (!pid) {
      api.ui.toast({
        variant: "error",
        title: "No se pudo reiniciar opencode",
        message: String("No se pudo lanzar el binario de opencode (" + bin + ")"),
      })
      return
    }
    // Salimos tras una pausa breve para que el hijo (desacoplado) se quede con la TTY.
    setTimeout(() => process.exit(0), 120)
  }

  async function spawnDetached(bin: string, cwd: string) {
    if (typeof Bun !== "undefined") {
      return Bun.spawn([bin], {
        cwd,
        stdio: ["inherit", "inherit", "inherit"],
        detached: true,
      })
    }
    const { spawn } = await import("node:child_process")
    return spawn(bin, [], {
      cwd,
      stdio: ["inherit", "inherit", "inherit"],
      detached: true,
    })
  }

  // Cuenta regresiva hablada y reinicia.
  async function countdownAndRestart() {
    api.ui.toast({
      variant: "info",
      title: "↻ Reiniciando opencode…",
      message: "3 · 2 · 1",
    })
    await speak("reiniciando opencode")
    await wait(600)
    await speak("3")
    await wait(700)
    await speak("2")
    await wait(700)
    await speak("1")
    await wait(700)
    void restartOpencode()
  }

  const disposeLayer = api.keymap.registerLayer({
    priority: 100,
    commands: [
      {
        name: ":opencode-restart",
        title: "↻ Reiniciar opencode",
        desc: "Cuenta regresiva por TTS y relanza opencode (Alt+Q)",
        category: "OpenCode",
        nargs: "0",
        run: () => {
          void countdownAndRestart()
          return true
        },
      },
    ],
    bindings: [{ key: "Alt+q", cmd: ":opencode-restart" }],
  })
  api.lifecycle.onDispose(disposeLayer)
}

const plugin = { id, tui }
export default plugin
