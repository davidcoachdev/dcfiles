// R19-R25: read-only triage classifier. Pure, deterministic, zero side effects
// (no writes, no scope changes, no dispatch, no approvals).

const RED_PATTERNS = [
  /\bsecret/i,
  /\bpassword/i,
  /\bapi[_-]?key/i,
  /\btoken/i,
  /\bcredential/i,
  /\bauth\b/i,
  /\boauth/i,
  /\brbac/i,
  /\bpermission/i,
  /\brole\b/i,
  /\bmigration/i,
  /\bschema\b/i,
  /\barchitecture/i,
  /\bsecurity/i,
  /\bdatabase\b/i,
  /\bdb\b/i,
  /\bencrypt/i,
  /\bssl\b/i,
  /\bpii\b/i,
]
const YELLOW_PATTERNS = [
  /\bfeature\b/i,
  /\bimplement\b/i,
  /\bmulti[- ]?file/i,
  /\brefactor\b/i,
  /\badd\b.*\bmodule/i,
  /\bmultiple files/i,
]
const GREEN_PATTERNS = [
  /\bcolor\b/i,
  /\bbutton label/i,
  /\btypo/i,
  /\bconfig (value|setting)|single config/i,
  /\bcosmetic/i,
  /\bcopy\b/i,
  /\btext\b/i,
  /\bstyle\b/i,
]
const AMBIGUOUS_PATTERNS = [
  /^\s*$/,
  /\b(fix it|do it|do something|help|update the thing|not sure|maybe|idk|do the)\b/i,
]

export function isAmbiguous(text) {
  if (typeof text !== "string") return true
  if (AMBIGUOUS_PATTERNS.some((re) => re.test(text))) return true
  if (text.trim().length < 6 && !/[a-z]{4,}/.test(text)) return true
  return false
}

export function classify(request, ctx = {}) {
  const text = request && typeof request.text === "string" ? request.text : String(request || "")

  if (isAmbiguous(text)) {
    return {
      tier: "ambiguous",
      reason: "low-confidence-or-vague",
      recommendedExperienceMode: "interactive",
      recommendedDepth: "deep",
      needsQuestion: true,
      readOnly: true,
    }
  }

  let tier
  let reason
  if (RED_PATTERNS.some((re) => re.test(text))) {
    tier = "red"
    reason = "matches-security/data/architecture/permissions pattern"
  } else if (YELLOW_PATTERNS.some((re) => re.test(text))) {
    tier = "yellow"
    reason = "matches-multi-file-feature pattern"
  } else if (GREEN_PATTERNS.some((re) => re.test(text))) {
    tier = "green"
    reason = "matches-pointwise-cosmetic-config pattern"
  } else {
    // default: no clear signal -> treat as yellow (needs review) to avoid false-green
    tier = "yellow"
    reason = "no-clear-signal-default-review"
  }

  let recommendedExperienceMode
  if (tier === "red") {
    recommendedExperienceMode = "interactive" // forced, never automatic
  } else if (tier === "green") {
    recommendedExperienceMode = ctx.approvedScope ? "automatic" : "minimal"
  } else {
    recommendedExperienceMode = "interactive"
  }

  const recommendedDepth = tier === "red" ? "deep" : tier === "yellow" ? "standard" : "shallow"

  return {
    tier,
    reason,
    recommendedExperienceMode,
    recommendedDepth,
    needsQuestion: false,
    readOnly: true,
    forcedInteractive: tier === "red",
  }
}

// R25: after the human answers the single clarification, re-classify deterministically.
export function clarify(triage, answer) {
  return classify({ text: answer })
}
