# Design Prototype Agent

**Global agent for creating HTML/CSS prototypes that can be converted to production code.**

## Installation

This agent is installed globally in `.config/opencode/`.

### Structure

```
~/.config/opencode/
├── commands/
│   └── design-prototype.md          # Command entry point
└── skills/
    └── design-prototype/             # Agent + subagents
        ├── SKILL.md                  # Main orchestrator
        ├── discovery/                # Subagent 1: Question form
        ├── direction/                # Subagent 2: Visual direction
        ├── prototype/                # Subagent 3: HTML builder
        ├── check/                    # Subagent 4: Critique
        └── templates/
            ├── html-seeds/           # Base templates
            └── design-systems/       # Design tokens
```

---

## Usage

### Invoke the agent

```bash
/design-prototype "your brief here"
```

### Examples

**Landing page:**
```bash
/design-prototype "landing page for SaaS project management tool"
```

**Dashboard with auth:**
```bash
/design-prototype "dashboard with login and register for analytics app"
```

**Auth flow only:**
```bash
/design-prototype "login and register pages"
```

---

## Workflow

The agent orchestrates 4 subagents sequentially:

### 1. Discovery (30s)
Asks questions to lock down the brief:
- Surface type (landing, dashboard, auth, mobile, email)
- Sections needed (hero, features, sidebar, forms, etc.)
- Visual tone (professional, playful, minimal, bold, editorial)
- Brand assets (have brand / no brand)
- Complexity (simple, medium, complex)

**Output:** `context/discovery.json`

---

### 2. Direction (10s, if no brand)
Shows 5 curated visual directions:
1. Modern Minimal (Linear)
2. Soft Warm (Notion)
3. Tech Utility (Vercel)
4. Editorial (Stripe)
5. Brutalist

User picks one. Agent generates CSS tokens.

**Output:** `context/direction.json`

---

### 3. Prototype (60s)
Generates HTML/CSS using:
- Discovery answers
- Direction tokens
- Seed templates
- Existing skills (ui-design-tips, ui-anti-ai, interface-design)

**Output:** `output/prototype-*.html`

---

### 4. Check (30s)
Runs 5-dimensional critique:
- Philosophy (matches direction?)
- Hierarchy (clear visual hierarchy?)
- Detail (polished micro-interactions?)
- Function (everything works?)
- Innovation (something distinctive?)

Plus accessibility + responsive checks.

**Verdict:** APPROVE / REVISE

If REVISE → loops back to Phase 3.

---

## Output

After approval, you get:
- `output/prototype-login.html` (if auth)
- `output/prototype-register.html` (if auth)
- `output/prototype-dashboard.html` (if dashboard)
- `context/discovery.json`
- `context/direction.json`
- `context/critique.json`

---

## Next Steps: Convert to Production

After prototype is approved, use **gentleman-sdd** to convert to production code:

```bash
opencode --agent gentleman-sdd
> "convert prototype-dashboard.html to Next.js + shadcn + Tailwind"
```

Gentleman-SDD will:
1. **Sketch** — read HTML, generate kits (R1: Auth, R2: Dashboard, etc.)
2. **Map** — create task graph
3. **Make** — build Next.js App Router with shadcn components
4. **Check** — peer review

---

## Templates Included

### HTML Seeds
- `landing.html` — Hero + features + pricing + footer
- `dashboard.html` — Sidebar + header + stats + content
- `auth-login.html` — Login form with social auth
- `auth-register.html` — Register form with social auth

### Design Systems (to be added)
- `linear.md` — Modern Minimal tokens
- `stripe.md` — Editorial tokens
- `vercel.md` — Tech Utility tokens

---

## Export to Another Machine

### Option 1: Copy entire folder
```bash
# On source machine
tar -czf design-prototype.tar.gz ~/.config/opencode/skills/design-prototype ~/.config/opencode/commands/design-prototype.md

# On target machine
tar -xzf design-prototype.tar.gz -C ~/
```

### Option 2: Git repo
```bash
cd ~/.config/opencode/skills/design-prototype
git init
git add .
git commit -m "Initial design-prototype agent"
git remote add origin <your-repo>
git push -u origin main

# On target machine
cd ~/.config/opencode/skills/
git clone <your-repo> design-prototype
```

### Option 3: Dotfiles
Add to your dotfiles repo:
```bash
# In your dotfiles
dotfiles/
└── opencode/
    ├── commands/
    │   └── design-prototype.md
    └── skills/
        └── design-prototype/
```

---

## Dockerfile Integration

```dockerfile
# Copy OpenCode config
COPY .config/opencode /home/user/.config/opencode

# Or install from git
RUN git clone https://github.com/youruser/design-prototype.git \
    /home/user/.config/opencode/skills/design-prototype
```

---

## Skills Used

This agent reuses your existing skills:
- `ui-design-tips` — 16 logic-driven UI tips
- `ui-anti-ai` — prevent generic AI patterns
- `interface-design` — consistency rules
- `critique` — 5-dimensional framework
- `design-system-picker` — if user has brand

---

## Customization

### Add new templates
```bash
# Create new seed
cat > templates/html-seeds/my-template.html << 'EOF'
<!DOCTYPE html>
...
EOF
```

### Add new design systems
```bash
# Create new system
cat > templates/design-systems/my-brand.md << 'EOF'
# My Brand Design System
...
EOF
```

---

## Troubleshooting

**Agent not found:**
```bash
# Check installation
ls ~/.config/opencode/commands/design-prototype.md
ls ~/.config/opencode/skills/design-prototype/SKILL.md
```

**Subagents not spawning:**
- Ensure OpenCode supports `call_omo_agent`
- Check subagent names match exactly

**Templates not loading:**
```bash
# Check templates exist
ls ~/.config/opencode/skills/design-prototype/templates/html-seeds/
```

---

## Version

- **v1.0.0** — Initial release
- Supports: landing, dashboard, auth flows
- 4 subagents: discovery, direction, prototype, check
- 4 HTML seed templates
- Integration with gentleman-sdd for production conversion

---

## License

Same as your OpenCode config (typically MIT or personal use).

---

## Credits

- Inspired by Open Design (nexu-io/open-design)
- Uses SDD methodology from gentleman-sdd
- Reuses existing OpenCode skills
