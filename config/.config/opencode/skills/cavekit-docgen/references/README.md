# Cavekit-DocGen References

## Load On-Demand Dependencies

- **cavekit-writing**: Load when writing Kit specifications with acceptance criteria
- **validation-first**: Load when validating documentation meets testable criteria

## Reference Files

| File | Purpose |
|------|---------|
| [prompts.md](prompts.md) | AI prompt templates for generating each section |
| [templates.md](templates.md) | Wiki page templates (homepage, module, API, etc.) |
| [quality-standards.md](quality-standards.md) | Quality requirements and checklist |
| [plugin-registry.md](plugin-registry.md) | Plugin system and hooks |

## Usage

Load only what you need:
- "generate module docs" → load prompts.md + templates.md
- "check quality" → load quality-standards.md
- "manage plugins" → load plugin-registry.md

## Related Skills
- `documentation-inversion`: For machine-readable docs for agents