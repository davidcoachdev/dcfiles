# Dc-Dev Context Protocol

The orchestrator owns the context envelope and passes only task-relevant,
redacted data to phase agents. The envelope preserves requirement IDs, evidence,
risks, and artifact paths. Significant discoveries are persisted before a
handoff returns. Missing skills resolve to `partial`, never fabricated success.
