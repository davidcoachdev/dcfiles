---
name: mermaid-fixer
description: >
  Validate and auto-fix Mermaid diagrams before they ship. Ports the
  "Mermaid Fixer" idea from deepwiki-rs / Litho: detect syntax errors with a
  dependency-free JS sandbox check, then have the agent repair the flagged
  lines and re-validate until clean. Use after generating or editing ANY
  Mermaid (docs, architecture diagrams, wiki, PR descriptions).
  Trigger: "validate mermaid", "mermaid fix", "broken diagram", "mermaid
  syntax error", after generating diagrams, before committing .mmd/.md with
  mermaid code blocks.
license: MIT
metadata:
  author: adapted-from-deepwiki-rs
  version: "1.0"
---

# Mermaid Fixer

Every Mermaid diagram we generate must be validated before it ships. Broken
diagrams (unbalanced brackets, unknown diagram types, edges with missing
endpoints) silently fail to render in GitHub, VS Code, and mermaid.live.

This skill ports the **Mermaid Fixer** concept from `sopaco/deepwiki-rs`
(Litho): precise syntax-error detection + AI-powered repair.

## Bundled validator

`assets/validate-mermaid.mjs` — a zero-dependency Node/Bun script that scans a
file for ```` ```mermaid ```` blocks and reports concrete errors with line
numbers.

```bash
# human-readable (default)
node <this-skill-dir>/assets/validate-mermaid.mjs docs/architecture.md

# multiple files
node <this-skill-dir>/assets/validate-mermaid.mjs a.md b.md c.mmd

# JSON output (for programmatic loops)
node <this-skill-dir>/assets/validate-mermaid.mjs --json docs/architecture.md

# pipe via stdin
cat docs/architecture.md | node <this-skill-dir>/assets/validate-mermaid.mjs
```

Exit code `0` = all blocks valid; `1` = at least one error.

> The heuristic checker catches the common breakages (unknown diagram type,
> unbalanced `() [] {}`, unterminated quotes, edges with a missing endpoint).
> For gold-standard validation, install `@mermaid-js/mermaid` + `jsdom` and run
> `mermaid.parse()` on each block; the heuristic is the portable default.

## Workflow (the "Fixer" loop)

1. **Generate** the diagram(s) as usual (oh-my-mermaid, cavekit-docgen, or inline).
2. **Validate**: run the bundled validator on the file.
3. **Repair**: for each reported error, fix ONLY the flagged line(s) — do not
   rewrite the whole diagram. Common fixes:
   - *Unbalanced bracket* → close the missing `)`, `]`, or `}`.
   - *Unknown diagram type* → correct the header (`graph TD`, `flowchart LR`,
     `sequenceDiagram`, `classDiagram`, `stateDiagram-v2`, `erDiagram`,
     `journey`, `gantt`, `pie`, `gitgraph`, `mindmap`, `timeline`, `C4Context`…).
   - *Edge with no endpoint* → add the missing node on either side of `-->`,
     `---`, `-.->`, or `==>`.
4. **Re-validate** until exit code `0`. Loop at most 3 times; if it still fails,
   simplify the diagram (split a complex flowchart into two).
5. **Ship** only after a clean run.

## Integration points

| Skill | How it uses this |
|-------|------------------|
| `oh-my-mermaid` | Runs the validator on `.mmd` output before publishing. |
| `cavekit-docgen` | Mandatory validation gate after generating architecture diagrams. |
| `editorial-diagrams` / `diagram-plus` | Validate before embedding in artifacts. |

## Why this matters

Litho's own README notes diagrams are the #1 thing that breaks documentation
quality. A 5-second validation pass prevents every broken diagram from reaching
a reader — exactly the kind of cheap, high-leverage check our context-mode
philosophy favors.
