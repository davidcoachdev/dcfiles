---
name: dc-dev-superflow-capability-gate
description: Admit explicit CLI, MCP, plugin, browser, TTS, and model capabilities.
---
# Dc-Dev Capability Gate
Trigger: before any capability-dependent dispatch.
Workflow: read registry → verify availability and authorization → verify isolation → issue admission.
Failure behavior: unavailable capability or model returns `setup-required`; no silent substitution.
Result Contract: capability, availability, authorization, isolation, admission status.
