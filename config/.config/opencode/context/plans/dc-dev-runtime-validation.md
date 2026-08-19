# Runtime Validation

OpenCode 1.18.18 passed the declaration probe and server smoke test. Supported
hooks are recorded in `dc-dev-hook-runtime.md`; unsupported desired names use
Check-phase fallback. Iteration 3 validated the adapter, scope, protected
paths, and Bash handling on disk. Live plugin dispatch after restarting
OpenCode was attempted in Check 3 but failed because the serving process was
older than the final Make artifacts. A fresh restart and Check 4 remain
required.

## Restart and boot-integrity procedure

Runtime validation is invalid until the OpenCode process serving the session
has restarted after Make finishes. Stop that process and start it again; do
not rely on a tool call, config reload, or a bootstrap in another process.

1. Finish Make and record final artifact mtimes.
2. Restart the process serving the session.
3. Before any native tool probe, verify the runtime trace contains
   `event: plugin.loaded`, `version: dc-dev-runtime-4`, and an ISO
   `timestamp:` newer than the final Make artifact mtime.
4. Probe native `write`/`edit` with absolute `filePath` values: one allowed
   workspace path, one outside path, one protected path, and one symlink path.
   Capture actual tool outputs and trace records.
5. Missing `plugin.loaded` means **boot/load failure**. A present self-test
   with no tool records means **dispatch failure**. Neither is a pass.

The self-test distinguishes stale or missing plugin boot from a plugin that
booted but does not receive tool events; it does not itself prove enforcement.
