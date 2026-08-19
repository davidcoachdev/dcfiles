# Quick Reference — Cavekit Mermaid Pipeline

> Pretty-Mermaid is the **renderer** in the Cavekit mermaid stack. Use it *after* validation.

## Skill paths

```bash
PRETTY_MERMAID=/home/dcdebian/.config/opencode/skills/pretty-mermaid
MERMAID_FIXER=/home/dcdebian/.config/opencode/skills/mermaid-fixer
```

## 1-command pipeline: generate → validate → render

```bash
# From any .mmd file produced by c4-architecture / omm-scan / editorial-diagrams
# 1. Validate (exit 0 = all clear)
node "$MERMAID_FIXER/assets/validate-mermaid.mjs diagram.mmd"

# 2. Render to SVG (docs, presentations)
node "$PRETTY_MERMAID/scripts/render.mjs" \
  --input diagram.mmd --output docs/diagram.svg --theme tokyo-night --transparent

# 3. Render to ASCII (README, terminal)
node "$PRETTY_MERMAID/scripts/render.mjs" \
  --input diagram.mmd --format ascii --use-ascii
```

## Batch: render entire C4 set

```bash
node "$PRETTY_MERMAID/scripts/batch.mjs" \
  --input-dir .c4 \
  --output-dir docs/architecture \
  --theme github-dark \
  --workers 4
```

## Available themes

```bash
node "$PRETTY_MERMAID/scripts/themes.mjs"
```

| Dark | Light |
|---|---|
| `tokyo-night` (rec) | `github-light` |
| `dracula` | `zinc-light` |
| `github-dark` | `solarized-light` |
| `nord` | `catppuccin-latte` |
| `tokyo-night-storm` | `tokyo-night-light` |

## Caveat

Pretty-Mermaid requires `npm install beautiful-mermaid` (1 dep: `@dagrejs/dagre`).
This breaks the "local-first / zero external packages" principle of `c4-architecture`.
Use it as an **output enhancement** during docgen, not during architecture analysis.
