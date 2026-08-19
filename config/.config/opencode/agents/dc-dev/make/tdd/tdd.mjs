const steps = ["red", "green", "refactor"]
export function createTddTrace() { const seen = []; return { add(step) { if (step !== steps[seen.length]) return { ok: false }; seen.push(step); return { ok: true } }, complete() { return seen.join(",") === steps.join(",") } } }
