# Dc-Dev Model Routing

`opencode.json` is authoritative for phase model assignments. A phase-specific
model wins over a global default. Missing or invalid assignments fail closed;
the orchestrator must report the routing error rather than silently inheriting
the wrong phase model.

Make resolves to `opencode-go/gpt-5.6-luna` and Check resolves to
`opencode-go/glm-5.3`. Equality is a blocking configuration error because Check
must challenge Make with an independent model.
