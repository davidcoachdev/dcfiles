# Dc-Dev Superflow Dispatch Adapter — Live Report

**Status:** setup-required / live parent delegation not proven

## Implementation

- The new plugin registers `dc_dev_superflow_dispatch` for the existing `dc-dev` parent and the additive coordinator registration.
- The adapter calls OpenCode's real `client.session.prompt` API with a `type: "subtask"` part and an explicit registered child identity.
- It verifies the child registration through `client.app.agents()`, inspects the parent children and child user message identity, and writes a JSONL receipt under the new superflow implementation namespace.
- It has no shell, CLI, Kiro, Cavekit, Gentle, SDD, or external-agent fallback.

## Evidence

- OpenCode SDK `@opencode-ai/sdk` exposes `session.prompt` and `SubtaskPartInput { agent, prompt, description }`.
- Focused adapter suite: **5/5 pass**.
- Existing new-superflow suite: **25/25 pass**.
- `opencode debug agent dc-dev-superflow-coordinator` and `dc-dev-superflow-security`: registered subagents resolve.
- `opencode run --agent dc-dev`: direct CLI primary-agent selection is distinct from delegation. The parent exposed and invoked `dc_dev_superflow_dispatch`, but live attempts produced only blocked receipts for malformed/missing child arguments or timed out before a selected child identity was observed.

## Honest verdict

Live parent-to-subagent delegation is **not proven**. The platform API is available; the remaining setup-required condition is a fresh interactive parent session that invokes the registered tool with the exact child identity and captures a receipt with `status: "dispatched"` and `selectedChild: "dc-dev-superflow-security"` (or another requested owned child). No success receipt was fabricated.

## Failure contract

- Unowned child, missing parent admission, missing model/capability/write scope, unavailable SDK subtask methods, unregistered child, dispatch exception, or unproven selected identity returns `blocked` or `setup-required` and writes a receipt.
- Direct `opencode run --agent ...` selection is not counted as delegation proof.
