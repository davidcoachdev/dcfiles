---
description: Create HTML/CSS prototype with discovery → direction → prototype → check
---

Launch design-prototype agent to create visual prototype.

User provides brief. Agent orchestrates 4 subagents:
1. **discovery** → question form (surface, sections, tone, brand, complexity)
2. **direction** → visual direction picker (if no brand)
3. **prototype** → generate HTML/CSS using existing skills
4. **check** → 5-dim critique + peer review

Output: `prototype.html` (ready for gentleman-sdd conversion)

## Usage

```bash
# Landing page
/design-prototype "landing page for SaaS project management tool"

# Dashboard with auth
/design-prototype "dashboard with login and register for analytics app"

# Auth flow only
/design-prototype "login and register pages for existing dashboard"
```

## Next Steps

After prototype is approved:
```bash
opencode --agent gentleman-sdd
> "convert prototype.html to Next.js + shadcn + Tailwind"
```

Gentleman-SDD will:
- Read prototype.html
- Generate kits (sketch phase)
- Create task graph (map phase)
- Build production code (make phase)
- Peer review (check phase)
