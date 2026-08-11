import { describe, expect, test } from "bun:test"
import { applySessionStatus, type FlowNode } from "./agent-flow"

const node = (overrides: Partial<FlowNode> = {}): FlowNode => ({
  id: "child",
  phase: "Implementar",
  status: "running",
  startedAt: "now",
  updatedAt: "now",
  ...overrides,
})

describe("agent-flow session status", () => {
  test("marks child idle sessions complete while root idle remains waiting", () => {
    expect(applySessionStatus(node({ parent: "root" }), "idle").status).toBe("complete")
    expect(applySessionStatus(node({ id: "root" }), "idle").status).toBe("idle")
  })

  test("preserves explicit completion, errors, and busy/retry transitions", () => {
    expect(applySessionStatus(node({ parent: "root" }), "complete").status).toBe("complete")
    expect(applySessionStatus(node({ parent: "root" }), "error").status).toBe("error")
    expect(applySessionStatus(node({ parent: "root", status: "idle" }), "busy").status).toBe("running")
    expect(applySessionStatus(node({ parent: "root", status: "idle" }), "retry").status).toBe("running")
  })
})
