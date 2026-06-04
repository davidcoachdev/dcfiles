---
name: codebase-onboarding
description: >
  Helps developers quickly understand unfamiliar codebases by reading code, tracing paths,
  and explaining structure factually. Specializing in code exploration, dependency mapping,
  and onboarding documentation.
  Trigger: When onboarding to a new project, exploring an unfamiliar codebase, understanding
  architecture, or explaining code structure to new team members.
---

## When to Use

- Onboarding to a new project or codebase
- Understanding unfamiliar code structure
- Explaining codebase architecture to new team members
- Navigating large monorepos
- Auditing code before taking ownership

## Core Principles

1. **Read code, not docs** — Docs lie, code doesn't. Start from source.
2. **Trace, don't assume** — Follow execution paths, don't guess what happens
3. **State facts, not opinions** — "This module handles auth" not "This module is messy"
4. **Map before diving** — Understand the forest before examining trees

## Onboarding Workflow

### Phase 1: Map the Territory (First 30 minutes)
```
1. Find entry points: main.ts, index.ts, app.ts, server.ts
2. Identify architecture: monolith? microservices? monorepo?
3. Locate config: package.json, tsconfig, docker-compose, .env.example
4. Trace dependency graph: who imports whom?
5. Identify data flow: where does user input enter? where does data persist?
```

### Phase 2: Trace Critical Paths (Next 1-2 hours)
```
1. Auth flow: login → middleware → session → protected route
2. Data flow: request → controller → service → repository → DB
3. Error flow: where do errors surface? how are they handled?
4. Test flow: what's tested? what's not? where are fixtures?
```

### Phase 3: Build Mental Model (Ongoing)
```
1. Module boundaries: what belongs together? what's coupled?
2. Naming patterns: how are files/classes/functions named?
3. Convention over configuration: what's implicit?
4. Pain points: what's complex? what's fragile? what's legacy?
```

## Quick Orientation Commands

```bash
# Project structure overview
find . -type f -name "*.ts" -o -name "*.tsx" | head -50
ls -la src/

# Find entry points
grep -r "main\|bootstrap\|start" --include="*.ts" -l

# Dependency tree (who imports what)
grep -r "import.*from" src/ | sort | uniq -c | sort -rn | head -20

# Find the most-changed files (hotspots)
git log --oneline --name-only | grep -v "^$" | sort | uniq -c | sort -rn | head -20

# Find TODOs and FIXMEs (known issues)
grep -rn "TODO\|FIXME\|HACK\|XXX" src/

# Identify API endpoints
grep -rn "router\.\|app\.\(get\|post\|put\|delete\|patch\)" src/

# Find configuration
cat package.json | grep -A 5 '"scripts"'
cat tsconfig.json 2>/dev/null || cat jsconfig.json 2>/dev/null
```

## Codebase Assessment Template

```markdown
# Codebase: [Name]

## Architecture
- **Pattern**: [MVC / Clean / Hexagonal / Monolith / Microservices]
- **Language**: [Primary + versions]
- **Framework**: [Framework + version]
- **DB**: [Database + ORM]

## Entry Points
- [URL/Port] → [Handler] → [Service]

## Key Modules
| Module | Responsibility | Coupling Level |
|--------|---------------|----------------|
| auth/ | Authentication & authorization | High (used everywhere) |
| api/ | REST API handlers | Medium |
| db/ | Data access layer | Low |

## Critical Paths
1. **Auth**: `POST /login` → AuthController → AuthService → UserRepository
2. **Data**: `GET /users` → UserController → UserService → UserRepository
3. **Events**: [Message queue?] → [Handler?] → [Side effect?]

## Conventions
- File naming: [kebab-case / camelCase / PascalCase]
- Folder structure: [by-feature / by-layer]
- Error handling: [exceptions / Result type / error codes]
- Testing: [Jest / Vitest / Pytest] — [unit / integration / e2e]

## Hotspots (Most Changed Files)
1. [file] — [why it changes often]
2. [file] — [why it changes often]

## Unknowns / Questions
- [What I still don't understand]
- [What I need to ask the team]
```

## Key Questions to Ask

```
Architecture:
- What's the deployment model? (containers, serverless, VMs)
- What's the CI/CD pipeline? How does code get to production?
- What are the main external dependencies? (databases, APIs, services)

Team:
- Who are the domain experts for each module?
- What's the review process? Who approves PRs?
- What are the team's biggest pain points?

History:
- What's the oldest code? What's legacy vs modern?
- Are there any known tech debt items?
- What recent refactorings have happened?
```

## Anti-Patterns

- ❌ Don't read every file sequentially
- ❌ Don't start by running all tests
- ❌ Don't assume naming conventions — verify
- ❌ Don't modify code during onboarding (read-only first)
- ❌ Don't skip the dependency graph — it's the architecture

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]