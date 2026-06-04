---
description: Switch between gentleman-sdd and obra-superpowers agents
---

Current workflow options:

**gentleman-sdd** (SDD-first, Engram persistence)
- Formal specifications
- Cross-session persistence (Engram)
- Large, complex changes
- Team coordination
- Use: `opencode --agent gentleman-sdd`

**obra-superpowers** (Superpowers-first, filesystem persistence)
- Rapid iteration
- TDD-first development
- Filesystem-first (git-friendly)
- Code review workflows
- Use: `opencode --agent obra-superpowers`

**gentleman** (Default, SDD-first)
- Same as gentleman-sdd
- Use: `opencode --agent gentleman`

Which agent do you want to use? Specify with:
- `/sdd-new <feature-name>` → Uses gentleman-sdd
- `/superpowers-new <feature-name>` → Uses obra-superpowers
- `opencode --agent <agent-name>` → Start session with specific agent
