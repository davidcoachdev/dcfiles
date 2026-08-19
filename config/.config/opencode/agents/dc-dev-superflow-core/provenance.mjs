export function createProvenance({ source, content, confidence = 0, hash = null }) {
  return { source, content, confidence, hash, authority: "data-only", capturedAt: new Date().toISOString() }
}

export function isTrusted(item) {
  return item?.authority === "authority" && item.confidence >= 0.9 && Boolean(item.hash)
}
