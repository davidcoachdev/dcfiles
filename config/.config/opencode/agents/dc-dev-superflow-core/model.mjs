const SETUP_REQUIRED = "setup-required"

export function selectModel({ requested, phase, phaseModels = {}, available = [] }) {
  const model = requested ?? phaseModels[phase]
  if (!model) return { status: SETUP_REQUIRED, reason: "model-not-selected" }
  if (!available.includes(model)) return { status: SETUP_REQUIRED, model, reason: "model-unavailable" }
  return { status: "admitted", model }
}
