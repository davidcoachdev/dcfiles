import { classify, clarify } from "./triage.mjs"
import { resolveExperienceMode, requiresHumanPrompt } from "./experience-mode.mjs"
import { dispatchToWorker } from "./dispatch.mjs"
import { safeReceipt, appendReceiptLine } from "./receipt.mjs"

// The single visible agent `dc-dev` runs every phase in-process:
//   triage (R19) -> experience-mode resolve (R5) -> admission gate (R6/R7/R8)
//   -> dispatch (R9/R11) -> receipt (R14/R16/R17).
// All collaborators are injected so the vertical flow is testable without a live runtime.
export async function runDcDevCore({
  request,
  client,
  sessionId,
  modeInput,
  approvedScope,
  receiptWriter,
  hitl,
  requestId,
  fallbackStatus = "setup-required",
}) {
  // PHASE 1 — triage (read-only precondition). R19.
  const originalTriage = classify(request, { approvedScope })
  let triage = originalTriage
  if (triage.needsQuestion) {
    // R25 / Gap 3: exactly one question, halt until answered. No dispatch and no
    // continuation prompt happen until the human responds.
    const q = hitl.askOne(triage)
    hitl.prompts.push(q)
    if (!q || !q.answered) {
      // Halt. Preserve the original ambiguous triage's needsQuestion in the result.
      return {
        status: "setup-required",
        reason: "triage-ambiguous-awaiting-human",
        triage: originalTriage,
        needsQuestion: originalTriage.needsQuestion,
      }
    }
    triage = clarify(triage, q.text)
  }
  if (!triage.tier) {
    return { status: "blocked", reason: "no-triage-verdict", triage: originalTriage }
  }

  // PHASE 2 — resolve experience mode (fail-closed). R5.
  const mode = resolveExperienceMode(modeInput, { approvedScope, downgradeTo: "setup-required" })

  // Gap 2: automatic without an approved-scope document resolves to setup-required.
  // HALT here — before any admission prompt (which could allow continuation) and
  // before any SDK dispatch. No receipt is written (setup-required is a status,
  // not a valid experienceMode, so it must not be serialized into a receipt).
  if (mode === "setup-required") {
    return { status: "setup-required", reason: "no-approved-scope", triage: originalTriage, mode }
  }

  // PHASE 3 — admission gate. R6/R7/R8.
  if (requiresHumanPrompt(mode, "admission")) {
    const decision = hitl.requestApproval("dispatch-admission")
    if (!decision.approved) {
      return { status: "blocked", reason: "admission-denied", triage: originalTriage, mode }
    }
  }

  // PHASE 4 — dispatch via real SDK. R9/R11.
  const dispatch = await dispatchToWorker({ client, sessionId, prompt: request.text, agent: "dc-dev-worker" })

  const status = dispatch.status === "dispatched" ? "done" : dispatch.status
  const receipt = safeReceipt({
    status,
    selectedChild: dispatch.selectedChild,
    requestId,
    resultRef: dispatch.resultRef,
    evidenceRef: dispatch.evidenceRef,
    verdict: dispatch.status === "dispatched" ? "APPROVE" : dispatch.reason,
    experienceMode: mode,
  })
  appendReceiptLine(receiptWriter, receipt)

  return { status, triage: originalTriage, mode, dispatch, receipt }
}
