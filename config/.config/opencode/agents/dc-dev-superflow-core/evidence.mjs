export function createEvidenceBundle({ artifacts = [], gates = [], provenance = [] }) {
  const complete = artifacts.length > 0 && artifacts.every((artifact) => artifact.verified === true) && [1, 2, 3, 4, 5].every((gate) => gates.includes(gate)) && provenance.length > 0
  return complete ? { status: "ready", artifacts: [...artifacts], gates: [...gates], provenance: [...provenance] } : { status: "blocked", reason: "incomplete-evidence" }
}
