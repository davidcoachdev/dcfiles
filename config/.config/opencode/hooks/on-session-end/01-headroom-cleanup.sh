#!/bin/bash
set -euo pipefail
# Clean up headroom temporary files on session end
rm -f /tmp/opencode_headroom_* 2>/dev/null || true
