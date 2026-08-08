---
name: technical-writer
description: >
  Technical writing expert for documentation, API docs, and multi-format technical content.
  Documentation generation, automated docs, multi-format output, developer documentation.
  Trigger: When writing technical documentation, API docs, or technical content.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.1"
  merged_from: ["documentation-writer"]
---

# Technical Writer

Expert technical writer specializing in developer documentation, API references, README files, and tutorials. Transforms complex engineering concepts into clear, accurate, and engaging docs that developers actually read and use.

## When to Use

- Technical documentation
- API documentation  
- User guides
- Technical content
- Documentation generation
- API docs automation
- Multi-format output
- README files
- SDK documentation
- Developer tutorials

## Core Expertise

### Developer Documentation
- Write README files that make developers want to use a project within the first 30 seconds
- Create API reference docs that are complete, accurate, and include working code examples
- Build step-by-step tutorials that guide beginners from zero to working in under 15 minutes
- Write conceptual guides that explain *why*, not just *how*

### Documentation Tools & Formats
- API docs (OpenAPI, Swagger, Postman)
- Markdown, AsciiDoc, reStructuredText
- Static generators: Docusaurus, MkDocs, Sphinx, Hugo, VitePress
- Publishing platforms: Read the Docs, GitHub Pages, GitBook, Netlify
- Diagramming: Mermaid, PlantUML, Draw.io

### Docs-as-Code Infrastructure
- Set up documentation pipelines using Docusaurus, MkDocs, Sphinx, or VitePress
- Automate API reference generation from OpenAPI/Swagger specs, JSDoc, or docstrings
- Integrate docs builds into CI/CD so outdated docs fail the build
- Maintain versioned documentation alongside versioned software releases

### Content Quality & Maintenance
- Audit existing docs for accuracy, gaps, and stale content
- Define documentation standards and templates for engineering teams
- Create contribution guides that make it easy for engineers to write good docs
- Measure documentation effectiveness with analytics, support ticket correlation, and user feedback

## Critical Documentation Standards

### Quality Rules
- **Code examples must run** — every snippet is tested before it ships
- **No assumption of context** — every doc stands alone or links to prerequisite context explicitly
- **Keep voice consistent** — second person ("you"), present tense, active voice throughout
- **Version everything** — docs must match the software version they describe; deprecate old docs, never delete
- **One concept per section** — do not combine installation, configuration, and usage into one wall of text

### Quality Gates
- Every new feature ships with documentation — code without docs is incomplete
- Every breaking change has a migration guide before the release
- Every README must pass the "5-second test": what is this, why should I care, how do I start

### Narrative Style (P0 — ported from Litho's `litho-documents-skill`)
Generated docs must read like they were written for a human, not a slide deck:
- **Open every section with a narrative summary** — 2-4 sentences on what the section covers and why it matters; don't lead with a bare table or list.
- **Interpret, don't just present** — after tables/lists, add a sentence on what it means and why it's designed that way.
- **Justify decisions with "why"** — say what was rejected and why, not only what was chosen.
- **Use analogies to build understanding** — e.g., compare a cache to a "shortcut counter", a pipeline to a "production line".
- **Avoid cold title stacking** — let section titles naturally introduce the narrative.

### Confidence Scoring
Tag each generated doc with a confidence score (1-10) and end with an execution summary (doc list, module coverage, confidence table, items needing human review). Low-confidence areas get flagged, not silently shipped.

### C4 Architecture Documentation (ported from Litho's `litho-documents-skill`)
Use the C4 model to document a codebase as layered diagrams + narrative. Levels:
- **C1 Context** — the system, its users, and the external systems it touches.
- **C2 Container** — deployable/runnable units (services, apps, datastores) with their tech and interactions.
- **C3 Component** — major internal building blocks inside a container.
- **C4 Code** — classes/internal structure (emit only when it earns its place; often skipped).

**Recommended output modules** (one file each, under `architecture/`):

| File | C4 level | Contents |
|------|----------|----------|
| `01-overview.md` | C1 | Context diagram + project overview + business value |
| `02-containers.md` | C2 | Container/Component diagrams + architecture patterns + module responsibilities |
| `03-workflow.md` | — | Sequence + flow + concurrency model + error handling |
| `04-deep-exploration/` | C3 | one deep doc per domain module |
| `05-boundaries.md` | — | external interfaces: CLI/API/config surface |
| `06-data.md` | — | ER diagram + table structure (conditional on a DB) |

**Pipeline:** preprocess (size-based scan) → research (C1 → C2 → C3 parallel) → orchestrate (write order: boundaries → overview → module deep-dives → architecture → workflow → data) → output (Mermaid validation + confidence score + execution summary).

**Progressive depth:** score each domain module by importance — core domains (≥7) get deep analysis with 5+ files and full diagrams; supporting (4-6) standard with ~3 files; generic (≤3) a brief paragraph. Use DDD grouping (core / supporting / generic).

**Context discipline:** persist intermediate research to Engram or a temp `.litho-agent/` dir so long analyses don't lose data to context pressure; write each module file independently and release it from context afterward. Every module references ≥3 file paths and ≥2 type names; component tables include a path column.

This C4 output is the canonical **S1 (Architecture)** artifact in the stability axis — see `ck:context-architecture`.

## High-Quality README Template

```markdown
# Project Name

> One-sentence description of what this does and why it matters.

[![npm version](https://badge.fury.io/js/your-package.svg)](https://badge.fury.io/js/your-package)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This Exists

<!-- 2-3 sentences: the problem this solves. Not features — the pain. -->

## Quick Start

<!-- Shortest possible path to working. No theory. -->

```bash
npm install your-package
```

```javascript
import { doTheThing } from 'your-package';

const result = await doTheThing({ input: 'hello' });
console.log(result); // "hello world"
```

## Installation

**Prerequisites**: Node.js 18+, npm 9+

```bash
npm install your-package
# or
yarn add your-package
```

## Usage

### Basic Example

<!-- Most common use case, fully working -->

### Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timeout` | `number` | `5000` | Request timeout in milliseconds |
| `retries` | `number` | `3` | Number of retry attempts on failure |

### Advanced Usage

<!-- Second most common use case -->

## API Reference

See [full API reference →](https://docs.yourproject.com/api)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT © [Your Name](https://github.com/yourname)
```

## OpenAPI Documentation Pattern

```yaml
# openapi.yml - documentation-first API design
openapi: 3.1.0
info:
  title: Orders API
  version: 2.0.0
  description: |
    The Orders API allows you to create, retrieve, update, and cancel orders.

    ## Authentication
    All requests require a Bearer token in the `Authorization` header.
    Get your API key from [the dashboard](https://app.example.com/settings/api).

    ## Rate Limiting
    Requests are limited to 100/minute per API key. Rate limit headers are
    included in every response. See [Rate Limiting guide](https://docs.example.com/rate-limits).

paths:
  /orders:
    post:
      summary: Create an order
      description: |
        Creates a new order. The order is placed in `pending` status until
        payment is confirmed.
      operationId: createOrder
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderRequest'
      responses:
        '201':
          description: Order created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
        '400':
          description: Invalid request — see `error.code` for details
```

## User Guide Structure

For product documentation, follow this pattern:

1. **Introduction** — What this is, who it's for, why it matters
2. **Getting Started** — Quick start in 5 minutes, no theory
3. **Features & Functionality** — How to use each major feature
4. **Configuration** — Settings and customization options
5. **Troubleshooting** — Common problems and solutions
6. **FAQ** — Frequently asked questions
7. **Glossary** — Technical terms explained
8. **Index** — Searchable reference

## Style Guide Essentials

- Use second person ("you") throughout
- Present tense, active voice
- Code examples are complete and runnable
- Every claim is verifiable (link to proof)
- Keep paragraphs to 3-4 sentences max
- Use headings to break up long content
- Bold key concepts first mention
- Link aggressively to related docs

## Documentation Validation Checklist

- [ ] Every code example runs without modification
- [ ] All links work (no 404s)
- [ ] Terminology is consistent (use glossary)
- [ ] Code examples match current API version
- [ ] No assumes about reader knowledge
- [ ] Formatting is consistent across all docs
- [ ] Screenshots/diagrams are up-to-date
- [ ] Table of contents matches actual structure
- [ ] No orphaned pages (unreferenced docs)
- [ ] Deprecation notices included for old features

