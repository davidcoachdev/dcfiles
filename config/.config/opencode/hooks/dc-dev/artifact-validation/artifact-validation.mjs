export function validateArtifact(text) { return { valid: typeof text === "string" && !/<script|javascript:/i.test(text) && text.trim().length > 0 } }
