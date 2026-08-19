#!/usr/bin/env bun
/**
 * service-manager — Auto-start local dev services when OpenCode opens.
 *
 * Extensible pattern: agregar una entrada al array SERVICES. Cada entrada
 * define:
 *   - name:   identificador legible
 *   - check:  función async que resuelve true si el servicio está sano
 *   - start:  función que arranca el servicio (no bloqueante)
 *
 * On OpenCode startup: todos los checks corren en paralelo. Cualquier
 * servicio caído se arranca en background. Resultados en:
 *   ~/.local/share/opencode/service-manager.log
 */

import type { Plugin } from "@opencode-ai/plugin"
import * as fs from "node:fs/promises"
import * as path from "node:path"
import * as os from "node:os"

// ─── Service definitions ───────────────────────────────────────────

interface ServiceConfig {
  /** Short name for logging */
  name: string
  /** Health check: resolve true if running and responding */
  check: () => Promise<boolean>
  /** Start command — MUST be non-blocking (fire-and-forget) */
  start: () => Promise<void>
}

const TTS_DIR = path.join(os.homedir(), "Proyects", "tts-control")

const SERVICES: ServiceConfig[] = [
  {
    name: "tts",
    check: async () => {
      try {
        const res = await fetch("http://127.0.0.1:9877/health", {
          signal: AbortSignal.timeout(2000),
        })
        return res.ok
      } catch {
        return false
      }
    },
    start: async () => {
      const script = path.join(TTS_DIR, "scripts", "start-all.sh")
      log("INFO", `Arrancando TTS: bash ${script}`)
      // Fire-and-forget: start-all.sh already detaches the bridge
      // (setsid) and the Windows service (Start-Process hidden).
      // We use Bun.spawn with detached:true so the process survives
      // even after the plugin function returns (event loop drain).
      Bun.spawn(["bash", script], {
        stdin: "ignore",
        stdout: "ignore",
        stderr: "ignore",
        detached: true,
      })
    },
  },
  // ─── Agregá más servicios aquí ───
  // Para añadir un nuevo servicio, copiá este bloque y modificá:
  // {
  //   name: "mi-servicio",
  //   check: async () => {
  //     try {
  //       const res = await fetch("http://127.0.0.1:PUERTO/health", { signal: AbortSignal.timeout(2000) })
  //       return res.ok
  //     } catch { return false }
  //   },
  //   start: async () => {
  //     const script = path.join(os.homedir(), "Proyects", "mi-servicio", "start.sh")
  //     Bun.$`bash ${script} &`.quiet().catch(() => {})
  //   },
  // },
]

// ─── Logging ───────────────────────────────────────────────────────

const LOG_FILE = path.join(
  os.homedir(),
  ".local",
  "share",
  "opencode",
  "service-manager.log",
)

async function log(level: "INFO" | "OK" | "DOWN" | "ERROR", msg: string): Promise<void> {
  const ts = new Date().toISOString()
  const line = `[${ts}] [${level}] ${msg}\n`
  try {
    await fs.mkdir(path.dirname(LOG_FILE), { recursive: true })
    await fs.appendFile(LOG_FILE, line)
  } catch {
    // Silent — never crash the plugin on log errors
  }
}

// ─── Plugin ────────────────────────────────────────────────────────

export const ServiceManager: Plugin = async () => {
  await log("INFO", "Service Manager: arrancando checks de auto-arranque...")

  // Check all services in parallel (max ~2s total due to timeout)
  const checks = await Promise.all(SERVICES.map((s) => s.check()))

  // Start any that are down — fire-and-forget so we don't block
  for (let i = 0; i < SERVICES.length; i++) {
    const svc = SERVICES[i]
    if (checks[i]) {
      await log("OK", `${svc.name} ya está activo`)
    } else {
      await log("DOWN", `${svc.name} no responde — arrancando...`)
      // No await — the start() function spawns a detached process
      svc.start().catch((e: unknown) => log("ERROR", `Error arrancando ${svc.name}: ${String(e)}`))
    }
  }

  const active = checks.filter(Boolean).length
  await log("INFO", `Service Manager: ${active}/${SERVICES.length} servicios activos, resto arrancando en background`)

  return {} // No hooks needed — work is done at load time
}

export default ServiceManager
