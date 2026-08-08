/** @jsxImportSource @opentui/solid */
import type { TuiPlugin, TuiThemeCurrent } from "@opencode-ai/plugin/tui"
import { createSignal, createRoot, createEffect, onCleanup, Show } from "solid-js"

const id = "headroom-stats"

// ─── Plugin ──────────────────────────────────────────────

const tui: TuiPlugin = async (api) => {
  createRoot((disposeRoot) => {
    api.lifecycle.onDispose(disposeRoot)

    // ── State ──────────────────────────────────────────
    // Headline store size (always available).
    const [dbSize, setDbSize] = createSignal("—")
    // Total memories stored by Headroom.
    const [memCount, setMemCount] = createSignal("—")
    // Compression savings % (only available while the proxy is routed).
    const [savings, setSavings] = createSignal("—")
    // Proxy reachable = plugin "active".
    const [connected, setConnected] = createSignal(false)
    // Collapse state: collapsed (default) shows only the total;
    // expanded shows every metric (db size, memories, savings).
    const [expanded, setExpanded] = createSignal(false)

    // ── Fetch stats from headroom ─────────────────────
    async function refreshStats() {
      try {
        const { execSync } = await import("child_process")

        // Memory stats are always available, even with the proxy down.
        const mem = execSync("headroom memory stats 2>/dev/null", {
          encoding: "utf8",
          timeout: 5000,
        })
        const sizeMatch = mem.match(/Database Size:\s*([\d.]+\s*[KMG]?B)/i)
        const memMatch = mem.match(/Total Memories:\s*(\d+)/i)
        if (sizeMatch) setDbSize(sizeMatch[1])
        if (memMatch) setMemCount(memMatch[1])

        // Proxy status + best-effort savings from doctor.
        // `doctor` exits non-zero when any check fails, so capture its
        // stdout from the thrown error instead of letting it crash.
        let doc = ""
        try {
          doc = execSync("headroom doctor 2>/dev/null", {
            encoding: "utf8",
            timeout: 8000,
          })
        } catch (e) {
          doc = (e && (e as { stdout?: string }).stdout) || ""
        }
        const proxyUp = /proxy\s*│\s*✓/.test(doc)
        setConnected(proxyUp)

        const savPct = doc.match(/savings[^\n]*?(\d+(?:\.\d+)?)\s*%/)
        if (savPct) setSavings(savPct[1] + "%")
        else if (/savings[^\n]*no savings/i.test(doc)) setSavings("—")
      } catch {
        // memory stats unavailable — leave connected at its default (false)
      }
    }

    // ── Poll every 15 seconds ─────────────────────────
    const timer = setInterval(refreshStats, 15000)
    refreshStats()
    onCleanup(() => clearInterval(timer))

    // ── Slot: sidebar_content (right panel only, quota style) ─
    const disposeSidebar = api.slots.register({
      id,
      order: 96,
      slots: {
        sidebar_content(ctx) {
          const theme = ctx.theme.current
          const toggle = () => setExpanded((e) => !e)
          return (
            <box gap={0}>
              {/* Clickable header (quota-style): toggles collapse */}
              <box
                flexDirection="row"
                gap={1}
                alignItems="center"
                focusable
                onMouseDown={toggle}
              >
                <text fg={theme.textMuted} wrapMode="none">
                  {expanded() ? "▾" : "▸"}
                </text>
                <text fg={theme.text}>
                  <b>headroom</b>
                </text>
                <text
                  fg={connected() ? theme.success : theme.textMuted}
                  wrapMode="none"
                >
                  {connected() ? "●" : "○"}
                </text>
              </box>
              <box gap={0}>
                <Show when={!connected()}>
                  <text fg={theme.textMuted} wrapMode="none">
                    {"—"}
                  </text>
                </Show>
                {/* Collapsed: total store size only */}
                <Show when={connected() && !expanded()}>
                  <text fg={theme.success} wrapMode="none">
                    {dbSize()}
                  </text>
                </Show>
                {/* Expanded: every metric */}
                <Show when={connected() && expanded()}>
                  <box flexDirection="row" gap={1} alignItems="center">
                    <text fg={theme.textMuted} wrapMode="none">
                      {"store:"}
                    </text>
                    <text fg={theme.success} wrapMode="none">
                      {dbSize()}
                    </text>
                  </box>
                  <box flexDirection="row" gap={1} alignItems="center">
                    <text fg={theme.textMuted} wrapMode="none">
                      {"memories:"}
                    </text>
                    <text fg={theme.success} wrapMode="none">
                      {memCount()}
                    </text>
                  </box>
                  <Show when={savings() !== "—"}>
                    <box flexDirection="row" gap={1} alignItems="center">
                      <text fg={theme.textMuted} wrapMode="none">
                        {"saved:"}
                      </text>
                      <text fg={theme.success} wrapMode="none">
                        {savings()}
                      </text>
                    </box>
                  </Show>
                </Show>
              </box>
            </box>
          )
        },
      },
    })
    api.lifecycle.onDispose(disposeSidebar)
  })
}

const plugin = { id, tui }
export default plugin
