#!/bin/bash
set -euo pipefail
export HEADROOM_STORAGE_DIR="$HOME/.local/share/headroom/compress"
mkdir -p "$HEADROOM_STORAGE_DIR"
echo "headroom: storage initialized at $HEADROOM_STORAGE_DIR" >> /tmp/opencode_session_vars
