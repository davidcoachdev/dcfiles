---
name: cavekit-docgen
description: >
  AI-Powered Wiki documentation generator for codebases.
  Trigger: "generate wiki", "create project docs", "update wiki", "check quality".
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## What It Does

Cavekit-docgen deeply analyzes your codebase and generates professional-grade, structured Wiki documentation with:
- Mermaid diagrams (architecture, dependency graphs)
- Cross-linked documentation network
- Code blocks that link to source
- Incremental updates (only changed files)
- Quality assessment reports

## Commands

### generate wiki
Generates Wiki documentation incrementally. Only updates files that have changed.
```
"generate wiki"
"create project docs"
```

### upgrade wiki
Detects and upgrades low-quality documentation while preserving good docs.
```
"upgrade wiki"
"improve documentation quality"
```

### refresh all wiki
Regenerates all documentation (creates backup first).
```
"refresh all wiki"
"regenerate documentation"
```

### check quality
Generates quality assessment report showing which docs need upgrading.
```
"check quality"
"quality report"
```

## Workflow

### Phase 1: Analysis
1. Detect tech stack and module structure
2. Identify entry points and public APIs
3. Map dependencies and data flows
4. Detect language (for i18n)

### Phase 2: Generation
1. Create `.mini-wiki/config.yaml` with project metadata
2. Generate `index.md` - project overview
3. Generate per-module docs in `.mini-wiki/wiki/`
4. Add Mermaid diagrams for architecture
5. Link code blocks to source files
6. **Mermaid Validation Gate**: run the `mermaid-fixer` skill's validator on every
   generated `.md`/`.mmd` and fix all reported errors before shipping. Never commit
   broken diagrams.

### Phase 3: Quality Check (optional)
- Run quality assessment
- Report sections needing improvement

## Output Structure

```
.mini-wiki/
├── config.yaml           # Project metadata
├── index.md              # Project overview
├── wiki/
│   ├── architecture.md    # System architecture
│   ├── modules/          # Per-module documentation
│   │   └── {module}.md   # 400+ lines per module
│   └── api/              # API documentation
├── cache/                # Incremental update cache
└── i18n/                 # Multi-language support
```

## Plugin System

### Built-in Plugins
| Plugin | Description |
|--------|-------------|
| code-complexity | Code health & complexity analysis |
| api-doc-enhancer | Deep semantic API documentation |
| changelog-generator | Generate changelog from git |
| diagram-plus | Enhanced Mermaid diagrams |

### Plugin Commands
```
"list plugins"                    # Show available plugins
"enable plugin <name>"            # Enable a plugin
"disable plugin <name>"           # Disable a plugin
```

## Quality Standards

### Good Documentation
- 400+ lines per core module
- At least 2 Mermaid diagrams
- Code examples that compile
- Cross-links between related sections

### Quality Check Command
Use `"check quality"` to get a report. The report shows:
- Which modules need more content
- Missing diagrams
- Outdated code examples

## Litho-Inspired Enhancements (ported from deepwiki-rs / Litho)

Ideas adapted from `sopaco/deepwiki-rs` (the Rust reimplementation of DeepWiki):

- **Mermaid Validation Gate** — see Phase 2 step 6. Ports Litho's "Mermaid Fixer":
  detect syntax errors, repair the flagged lines, re-validate until clean.
- **C4 Model Generation** — for architecture docs, invoke the `c4-architecture`
  skill to emit the 4 C4 levels (Context/Container/Component/Code), validated via
  `mermaid-fixer`; the output feeds the S1 (ARCHITECTURE) tier.
- **4-Stage Pipeline** (mental model for large repos): Input (scan + README) →
  Analysis (parse + AI) → Reasoning (overview / modules / workflow insights) →
  Orchestration (C4 + docs). Scale reads by repo size (see `context-architecture`).
- **External Knowledge Categories** — tag ingested docs with `architecture`,
  `database`, `api`, `deployment`, `adr`, `workflow`, `general` and store them via
  `context-mode_ctx_index(source: "<cat>")` so `ctx_search(source: "<cat>")`
  routes the right context to the right agent/skill.
- **Cost / Cache Awareness** — cache analysis results in the `context-mode`
  knowledge base so regeneration reuses prior work instead of re-spending tokens.

## References

- **Kit Template**: See [assets/kit-template.md](assets/kit-template.md)
- **Quality Standards**: See [references/quality-standards.md](references/quality-standards.md)
- **Cavekit Methodology**: Load `cavekit-writing` skill when writing kits

## Dependencies (Load On-Demand)

Load these skills only when needed:
- `cavekit-writing` - when writing specification kits
- `validation-first` - when validating documentation quality