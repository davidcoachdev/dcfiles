# Dc-Dev Contract Boundary

## Port boundary

Dc-Dev coordinates the existing Cavekit agent factory. It does not create a
second sub-agent factory or implement delegated work inline.

## Adapt boundary

- Cavekit phases remain Retrieve, Sketch, Map, Make, and Check.
- Gentle-orchestrator preflight and Result Contract rules are adapted to the
  Dc-Dev front door.
- Enforcement uses OpenCode-native plugin hooks only when runtime-confirmed.
- Unsupported enforcement points are deterministic Check-phase gates.

## Artifact contract

Technical artifacts use neutral English and JSON schemas. User-facing
conversation remains in the user's language. Every completion artifact exposes
status, executive summary, artifact paths, next recommendation, risks, and
skill resolution.

## Non-goals

- Replacing OpenCode permissions or test runners.
- Inventing lifecycle events.
- Treating prompts, sentinels, or self-reported receipts as enforcement.
