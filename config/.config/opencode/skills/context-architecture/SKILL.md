---
name: context-architecture
description: |
  Progressive disclosure architecture for organizing project context as a DAG (directed acyclic graph).
  Agents enter at the root and traverse only the subgraph relevant to their task.
  Covers the 4-tier information flow (refs → kits → plans → impl), CLAUDE.md hierarchy
  across context/ and source tree, index files as DAG hub nodes, nesting rules, and backward compatibility.
  Trigger phrases: "context architecture", "progressive disclosure", "organize context for agents",
  "context directory structure", "how to structure docs for AI", "context hierarchy"
---

# Context Architecture: DAG-Based Progressive Disclosure

## Core Principle

**Agents should only read what they need.** Documents are organized as a directed acyclic graph (DAG) where index files act as hub nodes. An agent reads the index, identifies relevant edges, and follows only those to leaf documents. No agent ever loads the full tree.

---

## The 4-Tier Information Flow

```
refs/ (what IS)  -->  kits/ (what MUST BE)  -->  plans/ (HOW)  -->  impl/ (what WAS DONE)
     Tier 1                  Tier 2                     Tier 3              Tier 4
```

Each tier consumes the previous tier's output. Cross-references between tiers create the DAG edges that agents traverse.

---

## The Second Axis: Knowledge Stability

The 4-tier flow above answers **"where did this knowledge come from?"**. It does not answer **"how fast does it rot?"**. These are orthogonal axes — a `refs/` document and an `impl/` document can each be stable or volatile.

Classify every piece of project knowledge on the stability axis as well:

| Tier | Knowledge | Cadence | Budget | Owner |
|------|-----------|---------|--------|-------|
| **S0** | Essence — what the project is, why it exists, who it serves | Quarterly / major version | ~500 tk | `sdd-init` |
| **S1** | Architecture — components, data flow, patterns | Monthly / sprint | ~1000 tk | `sdd-init`, `architecture-intelligence` |
| **S2** | Decisions — tradeoffs and their rationale | Per decision | ~800 tk | `ck:adr` (canonical) |
| **S3** | Dynamics — active issues, standing constraints, workarounds | As they arise | ~600 tk | graduated from `ck:impl-tracking` |

**Total budget: ~2,900 tokens.** Loading the entire project knowledge base should cost under 3k. Exceeding a tier's budget is a signal to split or prune — never to expand the budget.

### Never write a bare "Tier N"

Flow tiers are `1-4`. Stability tiers are `S0-S3`. "Tier 2" is ambiguous — it means `kits/` on one axis and decisions on the other. Always qualify: **"Tier 2 (kits)"** or **"S2 (decisions)"**.

### Where each tier lives

The `artifact_store` mode chosen at SDD preflight decides persistence — do not introduce a separate switch:

| Mode | S0 / S1 / S3 | S2 |
|------|--------------|-----|
| `engram` | topic_keys only | pointer to `docs/adr/` |
| `openspec` | files under `openspec/` | `docs/adr/` |
| `hybrid` | files canonical, Engram as decaying index | `docs/adr/` + Engram pointer |

Engram topic_keys and their decay:

```
S0  sdd-init/{project}                review_after: quarterly
S1  architecture/{project}/overview   review_after: monthly
S2  → docs/adr/index.md               (file-canonical, pointer only)
S3  dynamics/{project}/active         review_after: short
```

**S2 is always file-canonical.** ADRs get reviewed in pull requests; Engram holds a pointer, never a copy. Duplicating ADR content into `context/` guarantees drift.

### Static knowledge complements exploration — it does not replace it

Write S0-S3 to help an agent orient faster, not to describe everything. If an agent can learn it in one `grep`, it does not belong here. The test: **would a competent new contributor still be confused after reading the code?** If no, leave it out.

---

## Operating the Knowledge Tiers

### Session-start protocol (ported from Litho's `.ai-context`)
On any session that touches a project, an agent should:
1. Read **S0** (`PROJECT-ESSENCE` / `sdd-init/{project}`) — always.
2. Scan **S3** (`DYNAMICS` / `dynamics/{project}/active`) for active issues and standing constraints.
3. Read **S1** (`ARCHITECTURE`) only when working across components.
4. Read **S2** (`DECISIONS` / `docs/adr`) only when changing established patterns.

Reading order: **S0 → S1 → S2 → S3**. Activate the full base when starting a session, hitting unfamiliar code/architecture, planning structural changes, or debugging unexpected behavior. Do **not** activate for simple mechanical edits with clear context.

### Tier Drift Audit & S3 Stale Audit (ported from Litho's `check-drift` / `audit-dynamics`)
Knowledge rots. Run periodically (monthly recommended) or before a release:
- **Drift audit** — verify each tier still matches reality: S0/S1 reflect the current stack and architecture; S2 entries match actual `docs/adr`; S3 items are still true. Mismatch = stale tier → refresh or delete.
- **S3 stale audit** — flag any S3 item whose `review_after` passed without re-validation. A standing constraint that silently expired is worse than none. If still true, bump the date; if resolved, move it to "Recently Resolved".

These procedures operationalize the `review_after` decay above — decay without an audit is just forgotten knowledge.

### Scaling knowledge discovery (ported from Litho's `litho-documents-skill`)
Scale the scan to project size to avoid context bloat:

| Size | Criterion | Strategy |
|------|-----------|----------|
| Small | <100 source files | README + entry points + config; list dirs |
| Medium | 100–500 files | README + entry + config + semantic search for concepts |
| Large | >500 files | README + main config + entry outline + targeted grep; delegate deep reads to sub-agents |

Persist intermediate findings to Engram (or a temp `.litho-agent/`-style dir) so long analyses don't lose data to context pressure. Use progressive depth: analyze core modules deeply, supporting modules standard, generic modules briefly.

### Tier templates
Minimal starting shapes (full versions: Litho's `ai-context-generator/templates`):
- **S0 PROJECT-ESSENCE** — What / Why / Who / Key features / Core constraints.
- **S1 ARCHITECTURE** — system diagram + component responsibilities + data flow + key dependencies + patterns.
- **S2 DECISIONS (ADR)** — non-obvious choice + trade-off + constraints accepted + revisit condition.
- **S3 DYNAMICS** — see `ck:impl-tracking` graduation format (Quick Scan + Active Issues + Known Constraints + Recently Resolved).

---

## Directory Layout

```
context/
├── CLAUDE.md                              # Root entry node: describes all tiers + design layer
├── refs/                                  # Tier 1: Source material (read-only input)
│   ├── CLAUDE.md                          # "Source of truth. Organized by source. Read-only."
│   └── {source}/                          # Subdirs per source (e.g., prd/, api-spec/)
│       └── ...
├── kits/                            # Tier 2: WHAT to build
│   ├── CLAUDE.md                          # "Start at cavekit-overview.md. R-numbered reqs."
│   ├── cavekit-overview.md              # Index node (DAG hub)
│   ├── cavekit-{domain}.md              # Leaf — simple domain (single file)
│   └── {domain}/                          # Complex domain gets a subdirectory
│       ├── cavekit-{domain}.md          # Domain index (becomes hub node)
│       └── cavekit-{domain}-{sub}.md    # Sub-domain leaves
├── designs/                               # Cross-cutting: visual design system
│   ├── CLAUDE.md                          # "DESIGN.md at project root is canonical."
│   └── design-changelog.md               # Append-only change log
├── plans/                                 # Tier 3: HOW to build (task graphs)
│   ├── CLAUDE.md                          # "Start at plan-overview.md. Task dependency tiers."
│   ├── plan-overview.md                   # Index node
│   ├── build-site.md                      # Primary build site
│   ├── build-site-{feature}.md            # Feature-specific build sites
│   └── {domain}/                          # Complex plans get subdirectories
│       └── plan-{domain}-{area}.md
├── impl/                                  # Tier 4: What WAS DONE
│   ├── CLAUDE.md                          # "Start at impl-overview.md. Update after every session."
│   ├── impl-overview.md                   # Index node
│   ├── impl-{domain}.md                   # Per-domain tracking
│   ├── impl-review-findings.md            # Codex review findings ledger
│   ├── dead-ends.md                       # Failed approaches (shared across domains)
│   └── archive/                           # Compacted/archived tracking
```

> **Note:** `designs/` is a **cross-cutting constraint layer**, not a fifth tier. DESIGN.md (at project root) is read by agents at every Hunt phase — Draft reads it to constrain visual decisions, Architect references tokens in task descriptions, Build uses it for implementation, Inspect validates against it. It parallels how CLAUDE.md files provide conventions, but for visual design.

### Backward Compatibility: sites/ → plans/

Build sites previously lived in `context/sites/`. All Cavekit commands check both locations:

1. Look in `context/plans/`
2. If not found, fall back to `context/sites/`
3. If found in `sites/`, use it — no auto-migration, no breakage

`/ck:init` offers optional migration. Declining is permanent — the system works with either layout.

---

## CLAUDE.md Hierarchy

### Scope: Full Repository

`CLAUDE.md` files extend beyond `context/` into the source code tree. They form the connective tissue between code and the context DAG.

```
project/
├── CLAUDE.md                          # Project root: build/test commands,
│                                      #   "context/ has the full hierarchy"
├── context/
│   ├── CLAUDE.md                      # Root context node: 4 tiers described
│   ├── refs/CLAUDE.md                 # Tier 1 conventions
│   ├── kits/CLAUDE.md           # Tier 2 conventions
│   ├── plans/CLAUDE.md                # Tier 3 conventions
│   └── impl/CLAUDE.md                 # Tier 4 conventions
│
├── src/
│   ├── CLAUDE.md                      # Source code conventions
│   ├── auth/
│   │   ├── CLAUDE.md                  # "implements cavekit-auth.md R1-R3"
│   │   └── ...
│   └── parser/
│       ├── CLAUDE.md                  # "implements cavekit-grammar.md R1-R4,
│       │                              #   see plans/build-site.md T-012 through T-018"
│       └── ...
│
├── tests/
│   ├── CLAUDE.md                      # Test conventions, how to run
│   └── ...
└── scripts/
    ├── CLAUDE.md                      # Utility script conventions
    └── ...
```

### Loading Behavior

When an agent works in `src/auth/`, it loads hierarchically:
1. `project/CLAUDE.md` — project-level conventions
2. `project/src/CLAUDE.md` — source code conventions
3. `project/src/auth/CLAUDE.md` — **"implements cavekit-auth.md R1-R3"**

The third file bridges to the context DAG. The agent knows which cavekit to load without loading the entire `context/kits/` directory.

### CLAUDE.md Design Principles

- **Minimal** — 3-10 lines for source-tree files. Never duplicate cavekit content.
- **Connective** — each one names the cavekit requirements and plan tasks it relates to.
- **Contextual** — includes module-specific conventions (error handling patterns, test fixture locations).
- **Honest** — `/ck:make` only writes mappings it is certain about (tasks it completed, files it created).

---

## Progressive Disclosure: The DAG Traversal

### How Agents Navigate

1. **Enter at root** — read `context/CLAUDE.md` to understand the 4 tiers
2. **Select tier** — based on current task, navigate to the relevant tier's `CLAUDE.md`
3. **Read index** — the tier's overview file is the DAG hub, listing all domains with one-line summaries
4. **Follow edges** — read only the domain files relevant to the current task
5. **Cross-reference** — if a domain references another, follow that edge only if needed
6. **Nest deeper** — if a domain has subdirectories, its root file is the sub-index; spider from there

### Index File Format

Every overview file follows the same format:

```markdown
# Cavekit Overview

| Domain | File | Summary | Status |
|--------|------|---------|--------|
| Authentication | cavekit-auth.md | Registration, login, sessions, OAuth | DRAFT |
| Data Models | cavekit-data-models.md | Core entities, relationships, validation | DRAFT |
| Type System | cavekit-type-system.md | Effects lattice, tagged values (see type-system/) | DRAFT |
```

An agent reads this table, identifies "I need Authentication," and loads only `cavekit-auth.md`.

### Cross-Reference Edges

```markdown
**Dependencies:** cavekit-auth.md R2 (session tokens required for API auth)
**See also:** cavekit-api.md R4 (rate limiting uses auth identity)
```

Agents follow these only when the cross-referenced content is needed for the current task.

---

## Nesting Rule

A domain stays flat (single file) by default. When a file covers multiple independent concerns that could be understood separately, it becomes an index file pointing to a subdirectory.

**Trigger:** Cohesion, not line count. If a file has sections that an agent working on one section would never need to read the others, decompose it.

**Example:** `cavekit-type-system.md` covers effects lattice, tagged values, and inference rules:

```
kits/
├── cavekit-type-system.md                        # Now an index
└── type-system/
    ├── cavekit-type-system-effects.md
    ├── cavekit-type-system-tagged.md
    └── cavekit-type-system-inference.md
```

The original file stays in place as the index — no reference breakage.

---

## Backpropagation via CLAUDE.md

When a bug is found, source-tree CLAUDE.md files provide the reverse traversal:

```
Bug in src/auth/login.ts
    |
    v
src/auth/CLAUDE.md says "implements cavekit-auth.md R2"
    |
    v
cavekit-auth.md R2 — check acceptance criteria
    |
    |-- Criteria missing?  --> update cavekit (spec gap)
    |-- Criteria wrong?    --> fix cavekit (spec bug)
    |-- Criteria present but code violates? --> fix code (impl bug)
    |
    v
If cavekit changed --> propagate to plans/ --> flag affected tasks
```

### Forward Propagation

When a cavekit changes via `/ck:revise`:
1. Scan all `src/*/CLAUDE.md` files for references to the changed requirement
2. Flag those modules as potentially affected
3. New requirements with no source-tree CLAUDE.md references are unimplemented

---

## Bootstrapping

Run `/ck:init` to create the full hierarchy. It:
1. Scans existing project structure
2. Creates context directories (refs/, kits/, plans/, impl/)
3. Creates CLAUDE.md files using standard templates
4. Creates empty index files (cavekit-overview.md, plan-overview.md, impl-overview.md)
5. Offers migration if legacy `context/sites/` exists

Properties: idempotent, non-destructive, no questions asked.

---

## Build-Time Updates

After `/ck:make` completes, source-tree CLAUDE.md files are generated/updated:
- New source directories get a CLAUDE.md with cavekit/plan references
- Existing CLAUDE.md files get new references appended (never removed)
- `impl-overview.md` and `plan-overview.md` are updated with current status

---

## Multi-Repo Strategy

For shared kits across implementations, use git submodules:

```
Tier 1-2 (shared): shared-context/ (submodule)
    └── refs/ + kits/

Tier 3-4 (per-repo): context/
    └── plans/ + impl/
```

Each framework repo includes the shared context as a submodule. Updates propagate via `git submodule update`.

---

## Integration with Other Skills

| Skill | Integration |
|-------|------------|
| `ck:cavekit-writing` | Kits go in `context/kits/` following naming conventions |
| `ck:design-system` | DESIGN.md lives at project root; `context/designs/` has CLAUDE.md and changelog |
| `ck:impl-tracking` | Tracking lives in `context/impl/`, compacted when exceeding ~500 lines |
| `ck:validation-first` | Validation results recorded in impl tracking within the hierarchy |
| `ck:revision` | `/ck:revise` traverses CLAUDE.md edges in reverse to trace bugs to specs |
| `ck:methodology` | Context structure established during Draft phase, maintained throughout the Hunt |

---

## Anti-Patterns

| Anti-Pattern | Why It's Wrong | Fix |
|-------------|---------------|-----|
| Flat file dump | No progressive disclosure, agents load everything | Use standard directory structure with indexes |
| Missing CLAUDE.md files | No convention guidance, no DAG edges | Run `/ck:init` or add manually |
| Monolithic documents | Defeats progressive disclosure | Decompose into domains with overview indexes |
| Stale archives in active dirs | Wastes context window | Move to `impl/archive/` |
| Duplicating cavekit content in CLAUDE.md | Content drifts, double maintenance | CLAUDE.md files only contain references |
