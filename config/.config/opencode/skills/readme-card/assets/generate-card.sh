#!/bin/bash
set -euo pipefail

# ─── README Card Generator ──────────────────────────────────────────────
# Generates a self-contained SVG card with project stats for your README.
# No dependencies besides bash, git, and optionally cloc.
#
# Usage:
#   ./generate-card.sh                    # writes to stdout
#   ./generate-card.sh > assets/card.svg  # save to file
#
# Config via env vars:
#   CARD_ACCENT="#6366f1"     # accent color (default: indigo)
#   CARD_WIDTH=420             # card width in px
#
# ──────────────────────────────────────────────────────────────────────────

ACCENT="${CARD_ACCENT:-"#6366f1"}"
CARD_WIDTH="${CARD_WIDTH:-420}"

# ─── Gather data ─────────────────────────────────────────────────────────

REPO_NAME=$(basename "$(git rev-parse --show-toplevel 2>/dev/null)" 2>/dev/null || echo "project")
REPO_NAME_XML=$(echo "$REPO_NAME" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')

LICENSE=$(head -5 LICENSE 2>/dev/null | grep -ioE 'mit|apache|gpl|bsd|mpl|isc' | head -1 | tr '[:lower:]' '[:upper:]' || echo "MIT")

TOTAL_COMMITS=$(git rev-list --count HEAD 2>/dev/null || echo "0")
COMMITS_FMT=$(echo "$TOTAL_COMMITS" | sed ':a;s/\B[0-9]\{3\}\>/,&/;ta')

LAST_COMMIT=$(git log -1 --format="%ad" --date=short 2>/dev/null || echo "-")

TOTAL_FILES=$(git ls-files 2>/dev/null | wc -l)
TOTAL_FILES=${TOTAL_FILES:-0}

# ─── Language breakdown ──────────────────────────────────────────────────

# Try cloc first (best data)
LOC_JSON=""
if command -v cloc &>/dev/null; then
  LOC_JSON=$(cloc . --quiet --json \
    --exclude-dir=node_modules,.git,dist,build,.cavekit,coverage,.next,target 2>/dev/null || true)
fi

LANGS_DATA=""
if command -v jq &>/dev/null && [ -n "$LOC_JSON" ] && echo "$LOC_JSON" | jq -e '.header' &>/dev/null 2>&1; then
  # Parse cloc JSON for top 5 languages by code lines
  LANGS_DATA=$(echo "$LOC_JSON" | jq -r '
    [to_entries[] | select(.key != "header" and .key != "SUM" and .key != "./." and .key != "") 
    | {name: .key, code: .value.code}] 
    | sort_by(.code) | reverse[:5][] | "\(.name)|\(.code)"' 2>/dev/null || true)
fi

# Fallback if cloc didn't work: count files by extension
if [ -z "$LANGS_DATA" ]; then
  LANGS_DATA=$(git ls-files 2>/dev/null \
    | sed -n 's/.*\.//p' \
    | sort | uniq -c | sort -rn | head -5 \
    | while read -r count ext; do
        case "$ext" in
          ts|tsx) echo "TypeScript|$count";;
          js|jsx) echo "JavaScript|$count";;
          rs)     echo "Rust|$count";;
          go)     echo "Go|$count";;
          py)     echo "Python|$count";;
          rb)     echo "Ruby|$count";;
          vue)    echo "Vue|$count";;
          svelte) echo "Svelte|$count";;
          c|cpp|h|hpp) echo "C/C++|$count";;
          java)   echo "Java|$count";;
          kt|kts) echo "Kotlin|$count";;
          swift)  echo "Swift|$count";;
          css|scss|sass) echo "CSS|$count";;
          html|xhtml) echo "HTML|$count";;
          sh|bash|zsh|fish) echo "Shell|$count";;
          ex|exs) echo "Elixir|$count";;
          dart)   echo "Dart|$count";;
          php)    echo "PHP|$count";;
          lua)    echo "Lua|$count";;
          md|mdx) echo "Markdown|$count";;
          json)   echo "JSON|$count";;
          yaml|yml) echo "YAML|$count";;
          zig)    echo "Zig|$count";;
          *)      echo "$ext|$count";;
        esac
      done)
fi

# ─── Calculate totals for bars ──────────────────────────────────────────

# Find max value for scaling
MAX_VAL=1
while IFS='|' read -r name val; do
  [ -z "$name" ] && continue
  val=$((val + 0))
  [ "$val" -gt "$MAX_VAL" ] && MAX_VAL=$val
done <<< "$LANGS_DATA"

# ─── SVG layout ─────────────────────────────────────────────────────────

LANG_COUNT=$(echo "$LANGS_DATA" | grep -c '|' 2>/dev/null || echo 1)
[ "$LANG_COUNT" -eq 0 ] && LANG_COUNT=1
HEADER_HEIGHT=70
FOOTER_HEIGHT=50
ROW_HEIGHT=28
CONTENT_HEIGHT=$((LANG_COUNT * ROW_HEIGHT))
CARD_HEIGHT=$((HEADER_HEIGHT + CONTENT_HEIGHT + FOOTER_HEIGHT))

# ─── Generate language bars SVG ─────────────────────────────────────────

COLORS=("#6366f1" "#06b6d4" "#10b981" "#f59e0b" "#ef4444" "#8b5cf6" "#ec4899" "#84cc16")
BARS=""
IDX=0
ROW_Y=$((HEADER_HEIGHT - 20))

while IFS='|' read -r name val; do
  [ -z "$name" ] && continue
  COLOR="${COLORS[$((IDX % 8))]}"
  val=$((val + 0))
  
  PCT=$(( (val * 100) / MAX_VAL ))
  [ "$PCT" -gt 100 ] && PCT=100
  [ "$PCT" -lt 3 ] && PCT=3
  TOTAL_BAR=$((CARD_WIDTH - 170))
  BAR_W=$(( (TOTAL_BAR * PCT) / 100 ))
  [ "$BAR_W" -lt 6 ] && BAR_W=6

  # Format value
  if [ "$val" -ge 1000000 ]; then
    VAL_DISPLAY="$(awk "BEGIN {printf \"%.1f\", $val/1000000}")M"
  elif [ "$val" -ge 1000 ]; then
    VAL_DISPLAY="$(awk "BEGIN {printf \"%.1f\", $val/1000}")k"
  else
    VAL_DISPLAY="$val"
  fi

  NAME_XML=$(echo "$name" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')

  BARS="${BARS}
  <text x=\"20\" y=\"${ROW_Y}\" font-family=\"system-ui,-apple-system,sans-serif\" font-size=\"12\" fill=\"var(--fg)\">${NAME_XML}</text>
  <rect x=\"150\" y=\"$((ROW_Y - 10))\" width=\"${BAR_W}\" height=\"6\" rx=\"3\" fill=\"${COLOR}\" opacity=\"0.85\"/>
  <text x=\"$((CARD_WIDTH - 20))\" y=\"${ROW_Y}\" font-family=\"system-ui,-apple-system,sans-serif\" font-size=\"11\" fill=\"var(--muted)\" text-anchor=\"end\">${VAL_DISPLAY}</text>"

  ROW_Y=$((ROW_Y + ROW_HEIGHT))
  IDX=$((IDX + 1))
done <<< "$(echo "$LANGS_DATA")"

# ─── Output SVG ─────────────────────────────────────────────────────────

cat << SVGEOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" width="${CARD_WIDTH}" height="${CARD_HEIGHT}">
  <style>
    :root {
      --bg: #ffffff;
      --border: #e5e7eb;
      --fg: #111827;
      --muted: #6b7280;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #1a1b23;
        --border: #2d2f3a;
        --fg: #e5e7eb;
        --muted: #9ca3af;
      }
    }
    .bg { fill: var(--bg); }
    .border { stroke: var(--border); stroke-width: 1; fill: none; }
    .title { font-family: system-ui,-apple-system,sans-serif; font-size: 15px; font-weight: 700; fill: var(--fg); }
    .muted { font-family: system-ui,-apple-system,sans-serif; font-size: 11px; fill: var(--muted); }
    .accent { fill: ${ACCENT}; font-weight: 600; }
  </style>

  <rect class="bg" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="10" />
  <rect class="border" x="0.5" y="0.5" width="$((CARD_WIDTH - 1))" height="$((CARD_HEIGHT - 1))" rx="10" />

  <!-- Header -->
  <text x="20" y="38" class="title">${REPO_NAME_XML}</text>
  <text x="$((CARD_WIDTH - 20))" y="38" class="muted" text-anchor="end">${LICENSE}</text>
  <line x1="20" y1="52" x2="$((CARD_WIDTH - 20))" y2="52" stroke="var(--border)" stroke-width="1" />

  <!-- Language bars -->
  ${BARS}

  <!-- Footer -->
  <line x1="20" y1="$((CARD_HEIGHT - 42))" x2="$((CARD_WIDTH - 20))" y2="$((CARD_HEIGHT - 42))" stroke="var(--border)" stroke-width="1" />
  <text x="20" y="$((CARD_HEIGHT - 17))" class="muted">${TOTAL_FILES} files</text>
  <text x="110" y="$((CARD_HEIGHT - 17))" class="muted">${COMMITS_FMT} commits</text>
  <text x="$((CARD_WIDTH - 20))" y="$((CARD_HEIGHT - 17))" class="muted" text-anchor="end">updated ${LAST_COMMIT}</text>
</svg>
SVGEOF
