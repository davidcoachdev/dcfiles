export function syncDecision({ requirement, decision, test }) { return { ok: Boolean(requirement && decision && test) } }
