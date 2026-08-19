export function createPreflight(identity) {
  let stopped = false
  return {
    approve() {
      if (stopped) return { approved: false, reason: "stopped" }
      return { approved: true, ...identity }
    },
    stop() {
      stopped = true
      return { stopped: true }
    },
  }
}
