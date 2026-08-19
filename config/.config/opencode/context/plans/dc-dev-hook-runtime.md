# Dc-Dev OpenCode Hook Runtime Probe

## Scope

This artifact records the runtime check used before adding Dc-Dev enforcement
hooks. The probe runs against the installed OpenCode binary and its installed
plugin type surface; it does not infer unsupported wildcard event names.

## Probe command

```text
node context/fixtures/hooks/runtime-probe.mjs
```

## Real probe output

```json
{
  "runtime": {
    "version": "1.18.18",
    "server_smoke": true
  },
  "hooks": {
    "supported": [
      "chat.message",
      "chat.params",
      "chat.headers",
      "permission.ask",
      "command.execute.before",
      "tool.execute.before",
      "shell.env",
      "tool.execute.after",
      "experimental.chat.messages.transform",
      "experimental.chat.system.transform",
      "experimental.provider.small_model",
      "experimental.session.compacting",
      "experimental.compaction.autocontinue",
      "experimental.text.complete",
      "tool.definition"
    ],
    "unsupported_desired": [
      "command.executed",
      "permission.*"
    ]
  },
  "enforcement_fallback": "check-phase"
}
```

## Enforcement decision

- Register only the supported hook keys listed by the installed plugin API.
- Use `command.execute.before`, not the undocumented `command.executed` name.
- Use `permission.ask`, not a wildcard `permission.*` hook.
- Treat generic `session.*` event handling as a separate event-channel concern;
  no direct session hook key is registered by the plugin API.
- Any desired enforcement point without a confirmed dispatch path falls back to
  deterministic Check-phase verification and remains a reported risk.

## Verification evidence

The probe test passed with the following real output:

```text
✔ runtime probe records only supported hook registrations (5738.550054ms)
ℹ tests 1
ℹ suites 0
ℹ pass 1
ℹ fail 0
```
