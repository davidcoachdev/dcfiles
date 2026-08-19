const next = { retrieve: "sketch", sketch: "map", map: "make", make: "check", check: "make" }
export function transition(from, to) { return { ok: next[from] === to, from, to } }
