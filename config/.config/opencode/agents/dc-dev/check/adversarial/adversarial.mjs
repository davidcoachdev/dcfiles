export function verifyAdversarial({ makeModel, checkModel, evidence }) { if (makeModel === checkModel || !evidence) return { verdict: "REJECT" }; return { verdict: "REVISE" } }
