#!/bin/bash
set -euo pipefail
# Headroom context compression hook
# Reads conversation messages from stdin (JSON array), compresses them, and outputs compressed result
PYTHON=/home/dcdebian/.local/share/uv/tools/headroom-ai/bin/python
HEADROOM_COMPRESS=/home/dcdebian/.local/bin/headroom-tools/headroom-compress
MODEL="${HEADROOM_MODEL:-kimi-k3-free}"

# Read messages from stdin if available, otherwise skip
if [ -t 0 ]; then
    # No stdin data, exit silently
    exit 0
fi

INPUT=$(cat)
if [ -z "$INPUT" ]; then
    exit 0
fi

# Validate it's JSON
if ! echo "$INPUT" | python3 -c "import json,sys; json.load(sys.stdin)" 2>/dev/null; then
    # Not valid JSON, pass through unchanged
    echo "$INPUT"
    exit 0
fi

# Compress the messages
echo "$INPUT" | "$HEADROOM_COMPRESS" "$MODEL"
