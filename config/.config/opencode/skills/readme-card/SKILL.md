---
name: readme-card
description: "Trigger: readme card, svg card, project stats, repo badge, readme stats card, repo card, generate card. Generate a self-contained SVG stats card for any project README — language breakdown, file count, commits, license, last update. Dark/light mode aware. Zero external dependencies."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Concept

A lightweight SVG card that shows project stats at a glance — like GitHub's own stats cards but self-hosted, no API calls, no third-party services. Just bash + git.

The card:
- Shows top 5 languages with proportional bars
- Total files, total commits, last update date
- License badge
- Auto-adapts to dark/light mode via `prefers-color-scheme`
- Fits in a README with one line of Markdown
- Regenerates on every deploy (CI) or commit hook

## Quick Start

```bash
# Generate card and save to assets/
bash skills/readme-card/assets/generate-card.sh > assets/card.svg
```

Then in your README:

```markdown
![Project Stats](assets/card.svg)
```

## Configuration

Set these env vars before running:

```bash
CARD_ACCENT="#6366f1"     # accent color (default: indigo)
CARD_WIDTH=420             # card width in px (default: 420)
```

Example:

```bash
CARD_ACCENT="#06b6d4" bash skills/readme-card/assets/generate-card.sh > assets/card.svg
```

## GitHub Actions Integration

Create `.github/workflows/card.yml`:

```yaml
name: Update README Card
on:
  push:
    branches: [main]
jobs:
  card:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0   # full history for accurate commit count
      - run: sudo apt-get install -y cloc jq 2>/dev/null || true
      - name: Generate card
        run: bash .github/scripts/generate-card.sh > assets/card.svg
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore: update readme stats card"
          file_pattern: assets/card.svg
```

## Pre-commit Hook (local)

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash
bash .github/scripts/generate-card.sh > assets/card.svg
git add assets/card.svg
```

Then `chmod +x .git/hooks/pre-commit`.

## Script Location

The generator script lives at `skills/readme-card/assets/generate-card.sh` in the skills directory. Copy it to your project:

```bash
cp skills/readme-card/assets/generate-card.sh .github/scripts/generate-card.sh
chmod +x .github/scripts/generate-card.sh
```

## Requirements

| Tool | Required | Notes |
|------|----------|-------|
| `bash` | ✅ | Standard on any *nix/macOS |
| `git` | ✅ | Must run inside a git repo |
| `cloc` | ⚠️ optional | Better language breakdown via lines of code |
| `jq` | ⚠️ optional | Only needed if `cloc` is used |

Fallback: if cloc isn't available, the script counts files by extension from `git ls-files`.

## Output

The SVG is a self-contained card:

```
┌──────────────────────────────────────┐
│  project-name                   MIT  │
│  ─────────────────────────────────── │
│  TypeScript  ████████████░░░   12.4k │
│  CSS         ██████░░░░░░░░░    2.1k │
│  HTML        ███░░░░░░░░░░░░      5  │
│                                      │
│  142 files · 1,247 commits          │
│                         updated      │
│                          2024-03-15  │
└──────────────────────────────────────┘
```

- Responsive to dark/light mode
- ~1.2kB gzipped
- No external API calls, no tracking, no dependencies

## Critical Rules

- The script MUST run inside a git repo — it uses `git rev-parse` and `git ls-files`
- For accurate commit counts, use `fetch-depth: 0` in GitHub Actions
- If cloc is installed, results are more accurate (lines of code vs file count)
- The card auto-updates on every CI run — no manual maintenance
- Place the script somewhere stable in the project (`.github/scripts/` or `scripts/`)
