---
name: adr
description: "Trigger: ADR, architecture decision, decision record, por qué elegimos X, documentar decisión. Teach agents how to find, read, create, and update Architecture Decision Records across all workflows."
license: MIT
metadata:
  author: gentleman-programming
  version: "1.0"
---

# ADR - Architecture Decision Records

## Activation Contract

Use this skill when:
- Creating a new architecture decision record
- Consulting existing ADRs before making a decision
- Updating an ADR's status (accepted, deprecated, superseded)
- Linking ADRs to specs, designs, or implementation tasks

Do not use for:
- Trivial decisions (ESLint vs Prettier, tab size)
- Implementation details that don't affect architecture
- Personal preferences without team impact

## Hard Rules

- ADRs live in `docs/adr/` at the project root
- Every ADR must be listed in `docs/adr/index.md`
- When creating an ADR, you MUST update the index
- Use the template from `assets/template.md` exactly — do not deviate
- ADRs are numbered sequentially: `001-short-name.md`, `002-another-decision.md`
- When superseding an ADR, you MUST add a `Superseded by` link in both the old and new ADR

## Decision Gates

| Situation | Action |
|-----------|--------|
| New architectural decision with real tradeoffs | Create ADR |
| Decision affects multiple workflows or teams | Create ADR |
| Trivial tooling or style choice | Skip ADR |
| Decision already documented in an existing ADR | Reference it, don't duplicate |
| Previous ADR is now wrong or outdated | Create new ADR, mark old as superseded |

## Execution Steps

### Finding Existing ADRs

1. Read `docs/adr/index.md` to see all ADRs with their status and keywords
2. Identify ADRs relevant to your current task by:
   - Scanning titles for domain match
   - Checking keywords column for specific terms
   - Looking at status (prefer `Accepted`, avoid `Superseded` unless tracing history)
3. Read only the relevant ADR files — do not load all ADRs

### Creating a New ADR

1. Determine the next ADR number by reading `docs/adr/index.md`
2. Copy `assets/template.md` to `docs/adr/{NNN}-{short-name}.md`
3. Fill in all sections:
   - **Title**: Number + short descriptive name
   - **Status**: Start with `Proposed`
   - **Context**: What problem are we solving? What options did we consider?
   - **Decision**: What did we choose and WHY? (the why is critical)
   - **Consequences**: What changes? What becomes easier? What becomes harder?
   - **Superseded by**: Leave empty unless this replaces another ADR
4. Update `docs/adr/index.md` by adding a row to the table
5. Run `bash {skill-dir}/scripts/update-index.sh` to verify the index is complete

### Updating an ADR

1. **Status changes**: Update the `Status` field (Proposed → Accepted, Accepted → Deprecated, etc.)
2. **Superseding**: When creating ADR-NNN that replaces ADR-MMM:
   - In ADR-MMM: change Status to `Superseded`, add `Superseded by: [ADR-NNN](./NNN-name.md)`
   - In ADR-NNN: add `Supersedes: [ADR-MMM](./MMM-name.md)` in the header
3. **Content updates**: If the decision rationale changes, update the ADR and add a revision date

### Linking ADRs to Work

- **In specs/kits**: Reference ADRs that constrain the design: `See [ADR-002](../docs/adr/002-hexagonal.md)`
- **In designs**: Link ADRs that informed the visual/UX decisions
- **In implementation tasks**: Reference ADRs that explain why the code is structured a certain way
- **In code comments**: For critical architectural choices, add a comment: `// See docs/adr/001-auth-jwt.md`

### Regenerating the Index

If the index is out of sync or you want to verify it:

```bash
bash {skill-dir}/scripts/update-index.sh
```

This script:
- Scans `docs/adr/*.md` (excluding `index.md`)
- Extracts title, status, and keywords from each ADR
- Regenerates `docs/adr/index.md` with a complete table
- Reports any ADRs that are missing required fields

## Output Contract

When creating an ADR, return:
- The path to the new ADR file
- Confirmation that the index was updated
- Any warnings about missing fields or formatting issues

When consulting ADRs, return:
- Which ADRs were consulted
- Key decisions that affect the current task
- Any conflicts or outdated decisions found

## References

- `assets/template.md` — The ADR template (use exactly)
- `scripts/update-index.sh` — Script to regenerate the index from ADR files
