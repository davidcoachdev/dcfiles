export function createIteration(max) {
  let iteration = 0; let stopped = false
  return { next() { if (stopped) return { ok: false, reason: "stopped" }; if (iteration >= max) return { ok: false, reason: "max-iterations" }; iteration += 1; return { ok: true, iteration } }, stop() { stopped = true } }
}
