---
name: audit-verify-explain
description: >
  Systematic audit → verify → explain workflow. Audits changes or claims,
  verifies with concrete evidence (tests, logs, artifacts, code inspection),
  and explains results in plain language. Use when reviewing work, verifying
  fixes, summarizing test results, translating technical findings, or checking
  whether something actually works before reporting it as done.
  Trigger: code review, verify fix, audit changes, validate results, explain
  test output, check if something works, summarize findings for non-technical
  readers.
license: Apache-2.0
metadata:
  author: gentleman-programming (adapted from MengTo/Skills audit-verify-explain-grade-5)
  version: "1.0"
---

## When to Use

- User asks "does this work?" or "verify this fix"
- Need to audit code changes, test results, or performance claims
- Need to communicate technical findings to non-technical stakeholders
- Before reporting something as "done" or "verified"
- After implementing a fix, before claiming it's resolved

---

## Core Rule

Treat every answer as **three jobs**:

1. **Audit** — what changed or what is being claimed
2. **Verify** — confirm with direct evidence
3. **Explain** — say it so anyone smart but new to the topic understands

Do NOT skip verification when local files, commands, logs, tests, or source data are available. Do NOT pretend something was verified if it was only inferred.

---

## Workflow

### 1. Audit

Start by finding the real source of truth:

- **For code changes**: inspect the diff, touched files, related call sites, existing tests
- **For bug fixes**: identify before/after behavior and the user-facing path
- **For performance claims**: separate measured evidence from likely improvement
- **For release/app behavior**: check the packaged/running artifact when possible
- **For documents/content**: compare the request against the actual produced artifact

Look for:

- Obvious bugs or regressions
- Missing edge cases
- Stale assumptions
- Unverified claims
- Mismatches between implementation and user intent
- Risks a simplified explanation might accidentally hide

### 2. Verify

Prefer evidence in this order:

1. **Automated tests, builds, linters, typechecks, validators** — strongest signal
2. **Running the actual app or workflow** — confirms real behavior
3. **Logs, process checks, screenshots, generated artifacts, live output** — observable proof
4. **Static code inspection** — when execution is impractical
5. **Clearly labeled inference** — when nothing stronger is available; say "inferred, not measured"

Rules:

- When verification **fails**, report the blocker and what it means
- When verification is **partial**, say exactly what was and was not checked
- For performance: say "this removes repeated work" only when the code clearly does so; say "should improve" only when no timing trace was captured; say "measured faster" only when before/after measurements exist
- Prefer `git diff`, `git log`, test output, and build artifacts over hand-waving

### 3. Explain Simply

Use plain language without talking down. Short sentences. Define terms. One analogy only if it genuinely helps.

| Technical term | Plain language |
|----------------|----------------|
| cache | remember the answer so we don't ask the same question again |
| metadata | small facts about a file, like size or modified date |
| regression | something that used to work but broke |
| artifact | the actual file or app that was created |
| static inspection | reading the code without running it |

Output shape:

```markdown
**What changed:**
- ...

**Why it matters:**
- ...

**How I verified it:**
- ...

**What is still not proven:**
- ...
```

For very small answers, a short paragraph is fine instead of headings.

---

## Output Rules

1. **Lead with the answer.** The conclusion first, evidence second.
2. **Include evidence.** File paths, commands, commit hashes, test names, log snippets — keep them brief but specific.
3. **Separate facts from judgment.**
   - Fact: "The tests passed."
   - Judgment: "That gives confidence in the timeline planner, but not the full editor UI."
4. **Do NOT say "everything works"** unless the full workflow was tested. Say "the checked parts work" when verification covered only part of the system.
5. **End with the most useful next test** — only when another test would materially improve confidence.

---

## Quick Checks

- ✓ Did I run the relevant tests / commands, or am I guessing?
- ✓ Did I check the actual output, or am I assuming it works?
- ✓ Can the reader understand the result without knowing the codebase?
- ✓ Did I separate what I verified from what I inferred?
- ✓ Would a non-technical stakeholder understand why this matters?
