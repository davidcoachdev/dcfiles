# Dc-Dev Configuration Design

The public `cavekit` entry delegates to the existing Cavekit orchestrator.
Phase agents remain hidden sub-agents. Model assignments are explicit in
`opencode.json`; defaults are not used to erase a phase assignment.

| Phase | Agent | Configuration authority |
|---|---|---|
| Make | `cavekit-make` | `agent.cavekit-make.model` |
| Check | `cavekit-check` | `agent.cavekit-check.model` |

Consultation never mutates implementation files. Build routing requires an
attributable approval and preflight receipt before delegation.
