---
name: architecture-intelligence
description: "Trigger: architecture analysis, dependency graph, blast radius, codebase health, code ownership, dependency map, analyze codebase, repo analysis. Run CLI-based architecture intelligence on any codebase — dependency graphs, blast radius, health scoring, code ownership, pattern detection. No browser, no GUI — agent-first."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Core Philosophy

CodeFlow is great for visual exploration. This skill is the **agent-native equivalent**: same insights (dependency graph, blast radius, health score, ownership) but via CLI tools an agent can run, parse, and act on.

## Quick Dependency Graph

### JS/TS (dependency-cruiser)

```bash
# One-shot, no install needed
npx depcruise src --output-type json > .cavekit/depgraph.json

# Filter to a single file's dependencies
npx depcruise src --output-type json \
  | jq '.modules[] | select(.source | contains("auth/service")) | {source: .source, deps: [.dependencies[].resolved]}'
```

### All languages (grep-based quick map)

```bash
# Find all imports in a file
rg "^import |^from |^require\(" src/auth/service.ts

# Find all files that import from a module
rg "from ['\"]\.\.\/auth\/service" src/ --type-add 'web:*.{ts,tsx,js,jsx}' -t web

# Find all files that import a specific symbol
rg "import.*\{.*AuthService" src/ -l
```

## Blast Radius Analysis

Given a file, find ALL files that depend on it (direct and transitive):

```bash
# 1. Generate full dependency graph
npx depcruise src --output-type json > .cavekit/depgraph.json

# 2. Find direct dependents
jq '[.modules[] | select(.dependencies[].resolved | test("target/file")) | .source]' .cavekit/depgraph.json

# 3. Full transitive blast radius (helper script)
#    → Create scripts/blast-radius.sh in the project
```

### Blast radius helper script

Save as `scripts/blast-radius.sh`:

```bash
#!/bin/bash
# Usage: blast-radius.sh src/auth/service.ts
TARGET="$1"
DEPGRAPH=".cavekit/depgraph.json"

if [ ! -f "$DEPGRAPH" ]; then
  echo "Generating dependency graph first..."
  npx depcruise src --output-type json > "$DEPGRAPH"
fi

echo "=== Direct dependents ==="
jq -r "[.modules[] | select(.dependencies[].resolved | test(\"$TARGET\")) | .source] | .[]" "$DEPGRAPH" 2>/dev/null || echo "None found"

echo ""
echo "=== Total transitive graph ==="
jq -r "[.modules[] | select(.dependencies[].resolved | test(\"$TARGET\")) | .source] | length" "$DEPGRAPH"
echo "files directly depend on $TARGET"
```

## Health Score

Run these metrics and aggregate into an A-F grade:

```bash
# 1. Lines of code by language
npx cloc src/ --json 2>/dev/null || cloc src/ --json

# 2. Circular dependencies
npx depcruise src --output-type json \
  | jq '[.modules[] | select(.circular == true)] | length'
echo "circular dependencies found"

# 3. File size outliers (God objects)
find src/ -name '*.ts' -o -name '*.tsx' \
  | xargs wc -l \
  | sort -rn \
  | head -20

# 4. Dependency count per module (coupling)
npx depcruise src --output-type json \
  | jq '[.modules[] | {file: .source, deps: (.dependencies | length)}] | sort_by(.deps) | reverse[:20]'

# 5. Dead code indicators (files with 0 dependents)
npx depcruise src --output-type json \
  | jq '[.modules[] | select(.dependencies == null or (.dependencies | length) == 0) | .source]'
```

### Health scoring rubric

| Metric | A | B | C | D | F |
|--------|---|---|---|---|---|
| Circular deps | 0 | 1-2 | 3-5 | 6-10 | 10+ |
| God objects (>500 lines) | 0 | 1 | 2-3 | 4-5 | 5+ |
| Avg deps per module | <5 | 5-10 | 10-15 | 15-25 | 25+ |
| Dead files (>50 lines, 0 dependents) | 0 | 1 | 2-3 | 4-5 | 5+ |
| Tests present | 80%+ | 60-80% | 40-60% | 20-40% | <20% |

## Code Ownership (from git)

```bash
# Top contributors for a file
git log --pretty=format:"%an" -- src/auth/service.ts \
  | sort | uniq -c | sort -rn

# Churn: most frequently changed files
git log --name-only --pretty=format: --since="6 months ago" \
  | sort | uniq -c | sort -rn | head -20

# Hot spots: files with BOTH high churn AND high complexity
# (combine churn output with file size)
```

## Pattern Detection (heuristic)

```bash
# Singleton detection
rg "static\s+(private\s+)?instance" src/ -l

# Factory detection
rg "create\w+\(|build\w+\(|make\w+\(" src/ -l

# God object candidates (files over 500 lines)
find src/ -name '*.ts' -o -name '*.tsx' | xargs wc -l \
  | awk '$1 > 500' | sort -rn

# Anti-pattern: console.log in production
rg "console\.(log|warn|error)" src/ --no-filename | wc -l
echo "console.* calls in src/"
```

## Export Formats for Agent Consumption

```bash
# Generate comprehensive report as JSON
{
  depgraph: $(npx depcruise src --output-type json),
  loc: $(npx cloc src/ --json 2>/dev/null || echo '{}'),
  churn: $(git log --name-only --pretty=format: --since="6 months ago" | ...)
} > .cavekit/arch-report.json
```

The agent should write the report to `.cavekit/arch-report.json` and reference it in subsequent analysis.

## Critical Rules

- Always run `npx depcruise` from project root with the correct source directory
- `cloc` must be installed: `brew install cloc` or `apt install cloc` or `npx cloc`
- For non-JS/TS projects, fall back to `rg`-based dependency analysis
- Git-based metrics require the repo to be cloned locally with full history
- Blast radius is heuristic — dynamic imports and re-exports may be missed
- Generate the depgraph ONCE and cache it in `.cavekit/` — regeneration is slow on large codebases
