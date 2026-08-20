---
name: repowise-cli
description: "Codebase intelligence via repowise CLI — code health, change risk, dead code, refactoring plans, decision mining, distill, security. Zero LLM, zero cloud. Trigger: repowise, code health, change risk, dead code, refactoring plan, codebase intelligence, triage file, hotspot, risk score, distill, impacted tests."
---

# Repowise CLI Skill

Codebase intelligence layer wrapping `repowise` CLI. Zero LLM calls for core features. Indexes once, answers forever.

## Prerequisites

```bash
repowise --version                    # verify installed
cd /path/to/repo
repowise init --no-prose -y           # first index, no LLM, no questions
```

## Full Command Reference

### Indexing & Sync

```bash
repowise init [PATH]                  # index a codebase (one-time; --no-prose -y = no LLM)
repowise update [PATH]                # incremental update (seconds; --workspace for every repo)
repowise watch                        # auto-sync daemon, re-index on file change
repowise hook install                 # post-commit hook for auto-sync
repowise hook status                  # check if hook is installed
repowise hook uninstall               # remove the hook
repowise reindex                      # rebuild vector search index from existing pages
repowise status                       # wiki sync state and page statistics
repowise doctor                       # health checks on setup, API keys, index drift
repowise doctor --repair              # attempt to fix detected mismatches
```

### Init Options (important flags)

```bash
repowise init --no-prose -y           # free, no API key, no questions
repowise init --prose -y              # model-written wiki, cost shown before confirm
repowise init --mode fast             # quick graph + essential git only (large repos)
repowise init --provider gemini       # specify LLM provider
repowise init --wiki-style caveman    # token-condensed, AI-first docs
repowise init --language es           # output language for wiki pages
repowise init --skip-tests            # skip test files
repowise init --no-claude-md          # skip generating CLAUDE.md
repowise init --no-editor-setup      # index without writing editor configs
repowise init -x vendor/ -x dist/     # exclude patterns (repeatable)
```

### Generate (upgrade wiki to LLM prose)

```bash
repowise generate [PATH]              # write unwritten subsystem pages
repowise generate --path src/api      # just one area
repowise generate --all               # rewrite all prose
```

### Triage & Context (use BEFORE editing files)

```bash
repowise context <files...>           # triage card: layer, hotspot, fix history
repowise context src/auth.py src/api/routes.py
```

Returns per file: module, layer, hotspot bit, recent bug fixes, ownership %, governing decisions, symbol IDs.

### Code Health

```bash
repowise health                       # KPIs + lowest-scoring files
repowise health --refactoring-targets # ranked concrete plans (Extract Class, Move Method, etc.)
repowise health --trend               # snapshots + declining-health alerts
repowise health --file <path>         # single file deep dive
repowise health --module <prefix>     # restrict to files under prefix
repowise health --format json         # structured output
repowise health --badge               # README badge (Markdown)
```

Health score: 1-10, three lenses: **defect risk**, **maintainability**, **performance**.
49 deterministic detectors, ROC AUC 0.737, zero LLM.

### Change Risk

```bash
repowise risk main..HEAD              # score a branch/PR range 0-10
repowise risk main..HEAD --json       # structured output with directives
repowise risk                         # score uncommitted work (or HEAD if clean)
repowise risk -t <file>               # what history says about touching a file
repowise risk -t src/auth.py          # hotspot, bug history, co-change partners
repowise risk -t <file> --changed-file <pr-file>  # PR mode with directives
repowise risk --full                  # complete payload as JSON
```

Directives: `will_break`, `missing_cochanges`, `missing_tests`, `tests_to_run`.

### Dead Code

```bash
repowise dead-code                    # full report, confidence-tiered
repowise dead-code --json             # structured output
```

### Search & Ask

```bash
repowise search "<query>"             # hybrid search (fulltext + semantic)
repowise search "auth" --mode symbol  # mode: fulltext|semantic|symbol|path|hybrid
repowise search "auth" --limit 10     # max results
repowise search "auth" --format json  # structured output
repowise ask "<question>"             # synthesized answer with citations
repowise symbol <id>                  # one symbol's body with verified line bounds
repowise symbol auth.py::login_user
```

### Decisions (ADR management)

```bash
repowise decision list                # all architectural decisions
repowise decision show <id>           # full details of a decision
repowise decision add                 # add interactively
repowise decision add --title "..." --status active --source pr
repowise decision confirm <id>        # set status to active
repowise decision deprecate <id>      # deprecate a decision
repowise decision dismiss <id>        # dismiss a proposal (tombstone)
repowise decision health              # stale decisions, proposed, ungoverned files
repowise why <query|path>             # why code is shaped this way
repowise why "why do we use sessions" # decision search
repowise why src/auth.py              # decisions governing this file
```

### Distill (token compression)

```bash
repowise distill <command>            # compact, errors-first, reversible
repowise distill pytest               # 61% fewer tokens
repowise distill git log -50          # 89% fewer tokens
repowise distill npm run build        # works with any command
repowise expand <ref>                 # reverse a distill omission
repowise saved                        # total tokens/dollars saved
```

### Test Intelligence

```bash
repowise impacted-tests HEAD~1        # tests a diff actually exercises
repowise coverage add                 # ingest coverage (auto-discovers reports)
repowise coverage add lcov.info       # ingest specific report
repowise coverage status              # show currently ingested coverage
```

### Security

```bash
repowise security scan                # scan for security signals, persist findings
```

### Export & Architecture

```bash
repowise export --format structurizr  # C4 architecture as Structurizr DSL
repowise export --format markdown     # wiki pages as markdown files
repowise export --format html         # wiki pages as HTML
repowise export --format json         # full JSON export
repowise export --format structurizr --standalone  # complete workspace DSL
repowise export --format structurizr --components  # include component level
```

### Serve (Dashboard + MCP)

```bash
repowise serve [PATH]                 # MCP server + local dashboard (localhost:7337)
repowise mcp [PATH]                   # MCP server only (stdio, for agents)
repowise mcp --transport streamable-http --port 7338  # HTTP transport
repowise mcp --tools lean             # six-tool agent-lean profile
repowise mcp --all                    # every available tool
repowise mcp --tools "+get_execution_flows"  # add opt-in tools
```

### Workspace (multi-repo)

```bash
repowise workspace add                # add a repo to workspace + index
repowise workspace list               # all repos with status
repowise workspace scan               # detect new repos not yet in config
repowise workspace remove <repo>      # remove from workspace
repowise workspace set-default <repo> # change primary repo
repowise workspace check              # architecture lint (dependency violations)
repowise workspace metrics            # propagation cost, core, architecture score
repowise workspace diagnostics        # explain cross-repo contract link count
```

### Agent Management

```bash
repowise agents                       # list all known agents + tiers
repowise agents add --target=claude-code  # wire agent to repo
repowise agents print-config claude-code  # print config snippet
repowise agents refresh               # rewrite configs of wired agents
repowise agents remove --target=claude-code
```

### CLAUDE.md Generation

```bash
repowise generate-claude-md           # generate/update CLAUDE.md
repowise generate-claude-md --stdout  # print to stdout instead of file
repowise generate-claude-md --output .claude/AGENTS.md  # custom output path
```

### Corrections (agent transcript mining)

```bash
repowise corrections                  # show recurring command fumbles
repowise corrections --days 7         # last 7 days only
repowise corrections --write          # maintain corrections block in CLAUDE.md
repowise corrections --min-count 3    # minimum occurrences to include
```

### Hooks (agent hooks for distill)

```bash
repowise hook install                 # post-commit auto-sync
repowise hook status                  # check installation
repowise hook uninstall               # remove hooks
repowise hook rewrite                 # distill command-rewrite hook
repowise hook read-skeleton           # skeleton-served Reads
repowise hook read-reread             # collapsed re-reads
repowise hook search-digest            # digest-served searches
repowise hook stats                   # what hooks fired + efficacy
repowise hook backfill                # replay transcripts into efficacy ledger
```

### Wiki & Style

```bash
repowise wiki-styles                  # list available documentation styles
repowise restyle <style>              # switch style and regenerate (comprehensive|caveman|reference|tutorial)
```

### Account & Telemetry

```bash
repowise login                        # sign in to Repowise account
repowise logout                       # sign out
repowise whoami                       # show current account
repowise telemetry disable            # disable anonymous telemetry
repowise costs                        # show LLM cost history
repowise costs --by model             # group by: operation|model|day
repowise whats-new                    # recent releases
repowise delete                       # delete repo and all generated data
repowise uninstall                    # remove repowise from repo
```

---

## MCP Tools Reference

Repowise exposes MCP tools for agents. These mirror the CLI but as structured JSON-RPC.

### Default tools (11, single-repo)

| Tool | CLI equivalent | What it answers |
|---|---|---|
| `get_overview()` | `repowise status` + context | Architecture summary, module map, entry points |
| `get_answer(q)` | `repowise ask` | RAG-synthesized answer with citations |
| `get_context(targets)` | `repowise context` | Triage card with docs, symbols, ownership |
| `get_symbol(id)` | `repowise symbol` | One symbol's source with line bounds |
| `search_codebase(q)` | `repowise search` | Hybrid search across wiki |
| `get_risk(targets)` | `repowise risk -t` | Hotspot, dependents, co-change, blast radius |
| `get_change_risk(revspec)` | `repowise risk` | Pre-merge defect score for a diff |
| `get_why(q\|targets)` | `repowise why` | Decisions + git archaeology |
| `get_dead_code()` | `repowise dead-code` | Unreachable code by confidence tier |
| `get_health(targets)` | `repowise health` | Per-file marker scores across 3 signals |
| `list_repos()` | `repowise workspace list` | Enumerate indexed repos |

### Workspace tools (+2, auto in workspace mode)

| Tool | What it answers |
|---|---|
| `get_blast_radius()` | Cross-repo impact of a change |
| `get_architecture()` | Whole-system coupling + architecture score |

### Opt-in tools (+3, off by default)

| Tool | Enable with | What it answers |
|---|---|---|
| `get_dependency_path()` | `--tools "+get_dependency_path"` | Shortest dependency path between two files |
| `get_execution_flows()` | `--tools "+get_execution_flows"` | Entry points + call traces |
| `generate_refactoring_code()` | `--tools "+generate_refactoring_code"` | Turn refactoring plan into code + diff (needs LLM) |

### MCP vs CLI — when to use which

| Use MCP when... | Use CLI when... |
|---|---|
| Agent calls tools directly | Skill wraps commands |
| Structured JSON needed | Shell output is fine |
| Host supports MCP natively | Any environment with shell |

**The data is identical.** MCP is JSON-RPC over stdio/HTTP. CLI is shell. Same index, same answers.

---

## Integration with Existing Skills

### → code-review-plus / requesting-code-review

```bash
repowise risk main..HEAD --json
repowise context $(git diff --name-only HEAD)
repowise impacted-tests HEAD~1
```

### → sdd-cavekit check

```bash
repowise health --refactoring-targets
repowise dead-code
repowise risk main..HEAD
```

### → adr

```bash
repowise decision list
repowise decision health
repowise why <path-or-query>
```

### → context-budget

```bash
repowise distill pytest
repowise distill git log -20
repowise saved
```

### → security-auditor

```bash
repowise security scan
```

---

## Workflow Patterns

### Pre-edit triage
```bash
repowise context src/target_file.py
# → hotspot, bug history, ownership, governing decisions
```

### Post-edit verification
```bash
repowise risk main..HEAD
repowise health --file src/changed_file.py
repowise dead-code
```

### PR review assist
```bash
repowise risk main..HEAD --json
repowise impacted-tests HEAD~1
repowise context $(git diff --name-only main)
```

### Codebase exploration
```bash
repowise search "payment processing"
repowise ask "what is the auth flow"
repowise symbol payments.py::process_payment
```

### Refactoring cycle
```bash
repowise health --refactoring-targets    # find what to fix
repowise risk -t src/target.py           # assess risk of touching it
repowise context src/target.py           # understand context
# ... make changes ...
repowise risk main..HEAD                 # verify change risk
```

---

## Output Handling

- `--json` or `--format json` for structured parsing
- `--format table` (default) for human-readable
- `--format md` for markdown (health)
- `--full` for complete JSON payload (risk, search)
- Pipe large outputs through `ctx_execute` to avoid context burn
- `repowise distill` before reading any large command output
- `repowise expand <ref>` to reverse distill omissions

## Notes

- First `init` is the slow part (30s-6min). Updates are seconds.
- All core features are **zero LLM, zero cloud**.
- `--no-prose` = no API key needed. Upgrade later with `repowise generate`.
- Index lives in `.repowise/` inside the repo. Add to `.gitignore`.
- Auto-sync via `repowise watch` or `repowise hook install`.
- `repowise serve` gives dashboard at `localhost:7337` + MCP server.
- `repowise mcp` is stdio by default (for Claude Code, Codex, Cursor).
