# Dc-Dev Superflow Runtime Proof

**Status:** INCONCLUSIVE / setup-required

## Safe live attempt

- Runtime: OpenCode `1.18.18` (`opencode --version`)
- Safe command: `opencode --help` completed and exposed `agent`, `debug agent`, and `run` commands.
- Safe dispatch probe: `opencode debug agent dc-dev-superflow-core` returned `Agent dc-dev-superflow-core not found`.

## Honest conclusion

This session cannot prove that the additive superflow loader resolves the new agent namespace or that coordinator dispatch executes through the runtime permission gate. No interactive/server mutation or model dispatch was attempted. Runtime publication gates T-061/T-081/T-082/T-085/T-086 remain **INCONCLUSIVE**, not PASS.

## Setup required

Run a fresh OpenCode session from the intended project context with the additive registration loaded, then capture:

1. `debug agent` resolution for the registered coordinator/child names;
2. a no-side-effect coordinator dispatch receipt;
3. pre-dispatch capability and permission admission evidence;
4. an explicit `setup-required` result if the requested model/capability is unavailable.
