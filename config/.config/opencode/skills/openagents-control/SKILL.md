---
name: openagents-control
description: >
  Pattern-first AI framework with approval gates, context-aware code generation, and token-efficient execution.
  Teaches agents your coding patterns upfront. Code matches your project from the start.
  Trigger: When building production features, need approval-based workflows, or want pattern-controlled code generation.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
  inspired_by: darrenhinde/OpenAgentsControl
---

## When to Use

- Production development with approval gates
- Pattern-first code generation (teach patterns, generate matching code)
- Token-efficient agent workflows (MVI principle)
- Team standards enforcement (repeatable patterns)
- Complex features requiring validation steps
- Building with context-aware agents

## Core Concepts

### Pattern-First Philosophy

**Problem:** AI generates generic code. You spend hours refactoring to match your patterns.

**Solution:** Teach patterns upfront. Agents load YOUR standards before generating code.

**Result:** Production-ready code that ships without refactoring.

### The Workflow (6 Steps)

```
1. Discover Patterns (ContextScout)
   ↓ Find relevant standards from your context
2. Propose Plan (Agent)
   ↓ Create detailed implementation using YOUR patterns
3. Approve (You)
   ↓ Human gate: Review and approve before execution
4. Execute (Agent)
   ↓ Implement incrementally with YOUR patterns
5. Validate (Automated)
   ↓ Type check, lint, tests, code review
6. Ship (Ready)
   ↓ Production code, no refactoring needed
```

### Key Principles

**🎯 Context-Aware:** ContextScout discovers relevant patterns. Agents load YOUR standards. Code matches from start.

**✋ Approval Gates:** Agents propose plans. YOU approve before execution. No surprises. Human-guided workflow.

**⚡ Token Efficient (MVI):** Minimal Viable Information. Only load what's needed. 80% token reduction vs full-context approach.

**📝 Editable Agents:** Control agent behavior via markdown files. No vendor lock-in. Full transparency.

**🔁 Repeatable:** Same patterns → Same quality. Configure once, use forever. Perfect for teams.

## How to Use

### Step 1: Add Your Patterns (10-15 min)

Use `/add-context` interactive wizard:

```bash
/add-context
# Answer 6 questions:
# 1. Tech stack? (Next.js + TypeScript + PostgreSQL)
# 2. API example? (paste your endpoint)
# 3. Component example? (paste your React component)
# 4. Naming conventions? (kebab-case, PascalCase, camelCase)
# 5. Code standards? (Zod validation, strict TypeScript, etc.)
# 6. Security requirements? (input validation, parameterized queries)
```

**Result:** Agents now understand YOUR patterns.

### Step 2: Start a Feature Request

```bash
opencode --agent OpenCoder
> "Create a user authentication system"
```

**What happens:**

1. **Discover** (~1-2 min) - ContextScout finds your patterns
2. **Propose** (~2-3 min) - Agent shows detailed plan
3. **Approve** - You review and approve
4. **Execute** (~10-15 min) - Implement with YOUR patterns
5. **Validate** (~2-3 min) - Tests, type checking, review
6. **Ship** - Production-ready code

### Step 3: Approve Before Execution

**Agent proposes:**

```
## Proposed Implementation

**Components:**
- user-dashboard.tsx (main page)
- profile-settings.tsx (settings component)
- auth-guard.tsx (authentication wrapper)

**API Endpoints:**
- /api/user/profile (GET, POST)
- /api/auth/session (GET)

**Database:**
- users table (Drizzle schema)
- sessions table (Drizzle schema)

All code will follow YOUR patterns from context.

Approve? [y/n]
```

**You approve** → Agent executes with YOUR patterns.

### Step 4: Keep Patterns Updated

After each feature:

```bash
/add-context --update
# Add new patterns you discovered
# Update naming conventions if they changed
# Document new standards
```

**Result:** Your context evolves with your project.

## The ContextScout Pattern (Your Secret Weapon)

### What ContextScout Does

Before generating ANY code, ContextScout:

1. **Discovers** - Finds relevant patterns from your context files
2. **Ranks** - Orders by priority (Critical → High → Medium)
3. **Loads** - Agent uses YOUR standards for generation
4. **Prevents** - Stops wasted work on irrelevant patterns

### How It Works

```
Your Request
    ↓
ContextScout searches .opencode/context/
    ↓
Find: tech-stack, api-patterns, component-patterns, naming, standards
    ↓
Rank by relevance to your request
    ↓
Agent loads TOP patterns (not all—only needed)
    ↓
Generate using YOUR patterns
    ↓
Code matches project from start ✅
```

### Example: Adding API Endpoint

**Request:** "Add a user profile endpoint"

**ContextScout discovers:**
- ✅ Your API pattern (Zod validation, error handling)
- ✅ Your response format (200/201/error)
- ✅ Your database ORM (Drizzle)
- ✅ Your security (parameterized queries)
- ❌ NOT loading: Component patterns (not relevant)
- ❌ NOT loading: UI standards (not relevant)

**Result:** Agent generates endpoint using ONLY relevant patterns. Token efficient.

## MVI Principle: Token Efficiency (80% Reduction)

### Traditional Approach (Wasteful)

```
Load entire codebase context
    ↓ 50KB context
    ↓ 15,000 tokens
    ↓ Slow response
    ↓ High cost
```

### OAC Approach (MVI - Minimal Viable Information)

```
Load only RELEVANT patterns
    ↓ 5KB context
    ↓ 1,500 tokens
    ↓ Fast response
    ↓ Low cost
```

**Real benefits:**

- **80% token reduction:** Fewer tokens per request
- **Faster responses:** Smaller context = quicker processing
- **Lower costs:** Fewer tokens = cheaper API calls
- **Better quality:** Focused context = better code matching

### How MVI Works

**File design:**

- **Concepts:** <100 lines (quick to load)
- **Guides:** <150 lines (digestible)
- **Examples:** <80 lines (specific, not verbose)

**Lazy loading:**

- Load patterns on-demand (not all at once)
- Cache frequently used patterns
- Discover only relevant ones per request

**Result:** Fast, efficient, token-lean workflow.

## For Teams: Repeatable Patterns

### The Team Problem

Every developer writes code differently:
- Inconsistent naming conventions
- Different error handling
- Various component patterns
- Hard to maintain

### The OAC Solution

Store team patterns in `.opencode/context/project/`. Commit to repo. Everyone uses same standards.

### Team Workflow

```bash
# Team lead adds patterns once
/add-context
# Answers questions with team standards

# Commit to repo
git add .opencode/context/
git commit -m "Add team coding standards"
git push

# All team members now use same patterns automatically
# New developers inherit standards on day 1
```

**Result:** 
- ✅ Consistent code across entire team
- ✅ No style debates
- ✅ No refactoring PRs
- ✅ Onboarding faster (patterns included)

## Approval Gates: Human-Guided AI

### Why Approval Gates Matter

**Without approval gates:**
```
AI generates code
    ↓ You don't know what's coming
    ↓ "Oh no, what did it just do?"
    ↓ Wasted tokens
    ↓ Unexpected bugs
```

**With approval gates:**
```
AI proposes plan
    ↓ You review
    ↓ You approve or refine
    ↓ AI executes exactly what you approved
    ↓ No surprises
    ↓ Quality gates built-in
```

### Gate Points

Agents always request approval before:

1. **Writing/Editing Files** - Major changes need human sign-off
2. **Running Bash Commands** - Execution safety
3. **Delegating to Subagents** - Complex workflows
4. **Database Schema Changes** - Critical operations
5. **Security-Related Code** - Auth, permissions, validation

### Example Gate Flow

```
Agent: "I'll create 3 new API endpoints. Approve?"
You: Review proposal
You: "Approve" → Agent executes with YOUR patterns
```

## Real-World Example: Building User Auth

### Request
```
"Create a user authentication system with login, register, logout"
```

### Step 1: Discover (ContextScout finds your patterns)

Found patterns:
- Tech stack: Next.js + TypeScript + PostgreSQL
- API pattern: Zod validation + error handling
- Component: Functional React + Tailwind
- Naming: kebab-case files, PascalCase components
- Standards: Strict TypeScript, parameterized queries

### Step 2: Propose (Agent shows plan)

```
## Proposed User Authentication System

**Files to create:**
- lib/auth.ts - Authentication utilities
- lib/schemas/auth.ts - Zod validation schemas
- app/auth/login/page.tsx - Login component
- app/auth/register/page.tsx - Register component
- app/api/auth/login/route.ts - Login endpoint
- app/api/auth/register/route.ts - Register endpoint
- app/api/auth/logout/route.ts - Logout endpoint
- middleware.ts - Protected route middleware

**Database:**
- users table with password hashing
- sessions table for token storage

**All code will follow YOUR patterns:**
- Zod validation on all endpoints
- Error handling with your standards
- Component pattern matching your examples
- Naming conventions as specified

Approve? [y/n]
```

### Step 3: Approve

You review and approve (or ask for changes).

### Step 4: Execute (Agent implements with YOUR patterns)

Generates:
- ✅ Components using your React pattern
- ✅ APIs using your endpoint pattern
- ✅ Database schemas using your ORM
- ✅ Validation using your Zod standards
- ✅ Error handling your way
- ✅ Naming matching your conventions

### Step 5: Validate

- ✅ TypeScript strict mode passes
- ✅ Tests generated and passing
- ✅ Security review done
- ✅ Code review passed

### Step 6: Ship

Production-ready authentication system that:
- Matches your project exactly
- No refactoring needed
- Ready to commit and deploy
- Team can extend following same patterns

## Integration with Your OpenCode Setup

### Works With Current Agents

- **systematic-debugging** - Uses approval gates for validation
- **technical-writer** - Documents patterns for team
- **code-reviewer** - Validates generated code
- **test-engineer** - Creates tests from patterns

### Synergies

**Systematic Debugging** + **OpenAgents Control:**
- Approval gates align with debugging phases
- Proposal review = evidence gathering
- Execution = implementation phase

**Technical Writer** + **OpenAgents Control:**
- Documents team patterns
- Creates context files from documentation
- Ensures consistency

**Code Reviewer** + **OpenAgents Control:**
- Reviews all generated code before shipping
- Validates pattern adherence
- Quality gate automation

## Pro Tips

### Tip 1: Start Simple

First pattern file = Your current code. Answer the 6 questions from `/add-context` using what you already do.

```bash
/add-context
# Use your ACTUAL code as examples
# Document your REAL conventions
# List your ACTUAL standards
```

Result: Agents match what you already do. No friction.

### Tip 2: Update Patterns Regularly

After each major feature:

```bash
/add-context --update
```

Keep patterns fresh as project evolves.

### Tip 3: Use for Onboarding

New team member?

```bash
git clone <repo>
cd <repo>
# Context files already committed!
# New dev automatically uses team patterns
```

### Tip 4: Review Before Approving

Always:
1. Read the proposed plan
2. Check it uses YOUR patterns
3. Ask for changes if needed
4. Only approve when satisfied

### Tip 5: Combine with Other Skills

```bash
# Use systematic-debugging for error handling patterns
# Use technical-writer for documentation patterns
# Use code-reviewer for quality validation
# Use test-engineer for testing patterns
```

## When to Use (vs When Not To)

### Use OpenAgents Control When:

✅ Building production features (approval gates help)
✅ You have established coding patterns (pattern-first works best)
✅ You want code that ships without refactoring (that's the whole point)
✅ Your team needs consistent standards (repeatable patterns)
✅ You care about token efficiency (MVI saves 80%)
✅ You want human-guided AI (approval gates matter)

### Don't Use When:

❌ You're exploring ideas (too much overhead)
❌ You have no established patterns (learn first, then use this)
❌ You want maximum speed (approval gates add time)
❌ You trust AI fully (gates require review)

## Architecture Decision

### Why Skill Instead of Framework Replacement?

OpenAgents Control could be:
1. Full framework replacement (rewrite entire system)
2. Skill (integrated as specialized agent)

**We chose: Skill** because:

✅ **Modularity** - Works with existing OpenCode setup
✅ **Composability** - Combine with other skills (systematic-debugging, code-reviewer, etc.)
✅ **Optionality** - Use when needed, not forced
✅ **Low friction** - Load skill, use workflow, done
✅ **Flexibility** - Teams choose adoption level

## Summary: Pattern-First AI

### Before OpenAgents Control

```
Your request
    ↓
Generic AI code
    ↓
You refactor hours to match patterns
    ↓
Tokens burned, time wasted
```

### After OpenAgents Control

```
Your request
    ↓
ContextScout discovers YOUR patterns
    ↓
AI generates using YOUR standards
    ↓
You approve
    ↓
Production code, zero refactoring
```

## Commands

```bash
# Trigger this skill
opencode --skill openagents-control

# Add your patterns (interactive wizard)
/add-context

# Update patterns
/add-context --update

# Use with OpenCoder agent
opencode --agent OpenCoder
> "Create a user dashboard"
```

## External Resources

- [OpenAgents Control GitHub](https://github.com/darrenhinde/OpenAgentsControl)
- [Pattern-First Development](https://github.com/darrenhinde/OpenAgentsControl/blob/main/docs/CONTEXT_SYSTEM_GUIDE.md)
- [MVI Principle](https://github.com/darrenhinde/OpenAgentsControl/blob/main/docs/MVI_GUIDE.md)
- [Team Workflows](https://github.com/darrenhinde/OpenAgentsControl#for-teams-repeatable-patterns)
