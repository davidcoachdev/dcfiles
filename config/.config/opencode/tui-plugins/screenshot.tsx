/** @jsxImportSource @opentui/solid */
import type { TuiPlugin } from "@opencode-ai/plugin/tui"
import { createSignal, createRoot, createEffect } from "solid-js"

const id = "screenshot"

// ─── Paths ──────────────────────────────────────
const CLIPBOARD_DIR = "/tmp/clipboard"
const LOG_FILE = "/tmp/clipboard/screenshot.log"

// ─── Logger ──────────────────────────────────────
function log(level: string, msg: string) {
  const ts = new Date().toISOString()
  const line = `[${ts}] [${level}] ${msg}\n`
  try {
    const { execSync } = require("child_process")
    execSync(`mkdir -p "${CLIPBOARD_DIR}"`, { encoding: "utf8", timeout: 3000 })
    execSync(`echo ${JSON.stringify(line)} >> "${LOG_FILE}"`, {
      encoding: "utf8",
      timeout: 3000,
    })
  } catch {
    // silent
  }
  if (level === "ERROR") console.error(`[screenshot] ${msg}`)
  else if (level === "WARN") console.warn(`[screenshot] ${msg}`)
  else console.log(`[screenshot] ${msg}`)
}

// ─── Plugin ──────────────────────────────────────────────

const tui: TuiPlugin = async (api) => {
  createRoot((disposeRoot) => {
    api.lifecycle.onDispose(disposeRoot)

    // ── State ──────────────────────────────────────
    const [lastCapture, setLastCapture] = createSignal("")
    const [capturing, setCapturing] = createSignal(false)
    const [status, setStatus] = createSignal("ready")
    const [pollCount, setPollCount] = createSignal(0)

    // ── Ensure clipboard dir exists ──────────────
    async function ensureClipboardDir() {
      try {
        const { execSync } = require("child_process")
        execSync(`mkdir -p "${CLIPBOARD_DIR}"`, { encoding: "utf8" })
        log("INFO", `Clipboard dir ready: ${CLIPBOARD_DIR}`)
      } catch (e: any) {
        log("ERROR", `Failed to create clipboard dir: ${e.message}`)
      }
    }
    void ensureClipboardDir()

    // ── Clear old log ────────────────────────────
    void (async () => {
      try {
        const { execSync } = require("child_process")
        execSync(`rm -f "${LOG_FILE}"`, { encoding: "utf8" })
        log("INFO", "=== Screenshot plugin started ===")
      } catch {
        // ignore
      }
    })()

    // ── Check clipboard for image ────────────────
    async function checkClipboardForImage(): Promise<string | null> {
      try {
        const { execSync } = require("child_process")

        const hasImage = execSync(
          `powershell.exe -Command "Add-Type -AssemblyName System.Windows.Forms; \$img = [System.Windows.Forms.Clipboard]::GetImage(); if (\$img) { Write-Host 'YES' } else { Write-Host 'NO' }" 2>&1`,
          { encoding: "utf8", timeout: 10000 }
        ).trim()

        log("DEBUG", `Clipboard has image: ${hasImage}`)

        if (hasImage !== "YES") return null

        // Save clipboard image to file
        const ts = Date.now()
        const dest = `${CLIPBOARD_DIR}/capture-${ts}.png`
        const winPath = dest.replace("/mnt/c/", "C:/")

        const saveResult = execSync(
          `powershell.exe -Command "Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; Add-Type -AssemblyName System.IO; \$img = [System.Windows.Forms.Clipboard]::GetImage(); if (\$img) { \$bmp = New-Object System.Drawing.Bitmap(\$img); \$bmp.Save('${winPath}', [System.Drawing.Imaging.ImageFormat]::Png); Write-Host 'SAVED' } else { Write-Host 'FAIL' }" 2>&1`,
          { encoding: "utf8", timeout: 15000 }
        ).trim()

        log("INFO", `Clipboard save result: ${saveResult}`)

        if (saveResult === "SAVED" || saveResult.includes("SAVED")) {
          return dest
        }

        log("WARN", "Clipboard has image but save failed")
        return null
      } catch (e: any) {
        log("ERROR", `Clipboard check failed: ${e.message}`)
        return null
      }
    }

    // ── Open Snipping Tool ───────────────────────
    async function openSnippingTool() {
      log("INFO", "Opening Snipping Tool...")
      try {
        const { execSync } = require("child_process")
        execSync(
          `powershell.exe -Command "Start-Process 'ms-screenclip:' -Verb Open" 2>&1`,
          { encoding: "utf8", timeout: 10000 }
        )
        log("INFO", "Snipping Tool opened")
      } catch (e: any) {
        log("WARN", `ms-screenclip failed: ${e.message}`)
        try {
          const { execSync } = require("child_process")
          execSync(
            `powershell.exe -Command "Start-Process 'SnippingTool' -Verb Open" 2>&1`,
            { encoding: "utf8", timeout: 10000 }
          )
          log("INFO", "SnippingTool.exe opened")
        } catch (e2: any) {
          log("ERROR", `SnippingTool.exe also failed: ${e2.message}`)
          api.ui.toast({
            variant: "error",
            title: "Screenshot",
            message: "Could not open Snipping Tool",
          })
        }
      }
    }

    // ── Non-blocking capture with interval ──────
    let pollIntervalId: number | null = null
    let captureResolve: ((value: string | null) => void) | null = null
    let captureReject: ((reason: any) => void) | null = null

    async function startCapture(): Promise<string | null> {
      return new Promise((resolve, reject) => {
        captureResolve = resolve
        captureReject = reject

        setCapturing(true)
        setStatus("waiting")
        setPollCount(0)

        const beforeMs = Date.now()
        log("INFO", "=== Screenshot capture started ===")

        // Open Snipping Tool
        void openSnippingTool()

        // Non-blocking poll with setInterval
        let polls = 0
        const maxPolls = 45 // 45 polls × 2s = 90s max
        const pollMs = 2000

        pollIntervalId = window.setInterval(async () => {
          polls++
          setPollCount(polls)
          log("DEBUG", `Poll #${polls}`)

          // Check clipboard first
          const clipPath = await checkClipboardForImage()
          if (clipPath) {
            clearInterval(pollIntervalId!)
            pollIntervalId = null
            log("INFO", `Screenshot found on clipboard after ${polls * pollMs}ms`)
            setCapturing(false)
            setStatus("done")
            resolve(clipPath)
            return
          }

          // Check Snips folder
          try {
            const { execSync } = require("child_process")
            const snipsPaths = [
              "/mnt/c/Users/Dc Laptop/AppData/Local/Packages/Microsoft.ScreenSketch_8wekyb3d8bbwe/TempState/Snips",
              "/mnt/c/Users/Dc Laptop/Pictures/Screenshots",
              "/mnt/c/Users/Dc Laptop/OneDrive/Pictures/Screenshots",
            ]

            for (const snipsDir of snipsPaths) {
              try {
                const out = execSync(
                  `ls -1t "${snipsDir}"/*.png 2>/dev/null | head -1`,
                  { encoding: "utf8", timeout: 3000 }
                ).trim()
                if (!out) continue

                const statOut = execSync(`stat -c %Y "${out}"`, {
                  encoding: "utf8",
                  timeout: 3000,
                }).trim()
                const mtimeMs = parseInt(statOut, 10) * 1000

                if (mtimeMs > beforeMs) {
                  clearInterval(pollIntervalId!)
                  pollIntervalId = null
                  log("INFO", `Screenshot found in Snips after ${polls * pollMs}ms`)
                  setCapturing(false)
                  setStatus("done")
                  resolve(out)
                  return
                }
              } catch {
                continue
              }
            }
          } catch (e: any) {
            log("WARN", `Snips check error: ${e.message}`)
          }

          // Timeout check
          if (polls >= maxPolls) {
            clearInterval(pollIntervalId!)
            pollIntervalId = null
            log("WARN", `Timeout after ${maxPolls} polls`)
            setCapturing(false)
            setStatus("ready")
            resolve(null)
          }
        }, pollMs)
      })
    }

    // ── Capture and process (non-blocking) ──────
    async function captureAndProcess() {
      if (capturing()) return

      log("INFO", "Alt+C pressed — starting capture")

      api.ui.toast({
        variant: "info",
        title: "Screenshot",
        message:
          "Snipping Tool abierto — hacé la captura y guardala (Ctrl+S o ícono de disquete). El plugin detectará la imagen automáticamente.",
        duration: 15000,
      })

      const result = await startCapture()

      if (!result) {
        api.ui.toast({
          variant: "warning",
          title: "Screenshot",
          message:
            "No se detectó captura. Asegurate de guardar la imagen (Ctrl+S) y que aparezca en el portapapeles.",
        })
        return
      }

      // Copy to tmp/clipboard if not already there
      let dest = result
      if (!result.startsWith("/tmp/clipboard/")) {
        log("INFO", `Copying ${result} to clipboard dir...`)
        dest = await copyToClipboardDir(result)
      }

      if (!dest) {
        api.ui.toast({
          variant: "error",
          title: "Screenshot",
          message: "Failed to process screenshot",
        })
        return
      }

      setLastCapture(dest)
      setStatus("done")

      const relPath = dest.replace("/mnt/c/", "C:/")
      log("INFO", `Screenshot ready: ${dest}`)

      api.ui.toast({
        variant: "success",
        title: "Screenshot",
        message: `Listo: ${relPath}`,
        duration: 5000,
      })

      // Insert into OpenCode prompt
      log("INFO", "Inserting into prompt...")
      void insertFileIntoPrompt(dest, relPath)
    }

    // ── Copy to clipboard dir ────────────────────
    async function copyToClipboardDir(src: string): Promise<string | null> {
      try {
        const { execSync } = require("child_process")
        const ts = Date.now()
        const ext = src.endsWith(".png") ? ".png" : ".png"
        const dest = `${CLIPBOARD_DIR}/capture-${ts}${ext}`
        log("INFO", `Copying ${src} → ${dest}`)
        execSync(`cp "${src}" "${dest}"`, { encoding: "utf8", timeout: 10000 })
        log("INFO", `Copy successful: ${dest}`)
        return dest
      } catch (e: any) {
        log("ERROR", `Copy failed: ${e.message}`)
        return null
      }
    }

    // ── Insert into OpenCode prompt ──────────────
    async function insertFileIntoPrompt(filePath: string, relPath: string) {
      try {
        const filename = filePath.split("/").pop() || "screenshot.png"
        const promptInfo = {
          input: `[Screenshot: ${filename}]`,
          mode: "normal" as const,
          parts: [
            {
              type: "file" as const,
              mime: "image/png",
              filename: filename,
              url: `file://${relPath}`,
            },
          ],
        }

        log("INFO", `Inserting ${filename} into prompt`)

        const dispose = api.slots.register({
          id: "screenshot-prompt-ref",
          order: 999,
          slots: {
            session_prompt: {
              session_id: "",
              visible: true,
              ref: (ref: any) => {
                if (ref && ref.set && typeof ref.set === "function") {
                  try {
                    ref.set(promptInfo)
                    log("INFO", "Inserted into prompt successfully!")
                  } catch (e: any) {
                    log("WARN", `prompt.set failed: ${e.message}`)
                  }
                  setTimeout(() => {
                    try {
                      dispose()
                    } catch {
                      // ignore
                    }
                  }, 500)
                } else {
                  log("WARN", "No prompt ref available")
                }
              },
            },
          },
        })

        // Fallback toast after 3s
        setTimeout(() => {
          api.ui.toast({
            variant: "info",
            title: "Screenshot",
            message: `Path: ${relPath}\nPegá esta ruta en tu mensaje.`,
            duration: 10000,
          })
        }, 3000)
      } catch (e: any) {
        log("ERROR", `insertFileIntoPrompt failed: ${e.message}`)
      }
    }

    // ── Keymap: Alt+C ────────────────────────────
    const disposeLayer = api.keymap.registerLayer({
      priority: 100,
      commands: [
        {
          name: ":screenshot",
          title: "Screenshot Capture",
          desc: "Open Windows Snipping Tool and insert screenshot into prompt",
          category: "Screenshot",
          nargs: "0",
          run: () => {
            void captureAndProcess()
            return true
          },
        },
      ],
      bindings: [
        {
          key: "Alt+c",
          cmd: ":screenshot",
        },
      ],
    })
    api.lifecycle.onDispose(disposeLayer)

    // ── Status indicator ─────────────────────────
    const disposeSlot = api.slots.register({
      id: "screenshot-status",
      order: 85,
      slots: {
        home_prompt_right: () => (
          <box flexDirection="row" gap={1}>
            <text
              fg={
                capturing()
                  ? "yellow"
                  : status() === "done"
                    ? "green"
                    : "dim"
              }
              bold
              wrapMode="none"
            >
              {capturing()
                ? `📷 capturing... (${pollCount()} polls)`
                : status() === "done"
                  ? "📷 screenshot ready"
                  : "📷 alt+c"}
            </text>
          </box>
        ),
        session_prompt_right: () => (
          <box flexDirection="row" gap={1}>
            <text
              fg={
                capturing()
                  ? "yellow"
                  : status() === "done"
                    ? "green"
                    : "dim"
              }
              bold
              wrapMode="none"
            >
              {capturing()
                ? `📷 capturing... (${pollCount()} polls)`
                : status() === "done"
                  ? "📷 screenshot ready"
                  : "📷 alt+c"}
            </text>
          </box>
        ),
      },
    })
    api.lifecycle.onDispose(disposeSlot)
  })
}

const plugin = { id, tui }
export default plugin
