---
name: vibe-coding
description: >
  Vibe Coding workflow 2025: PRD → Design → Tech Stack → LLM prompting → Git → CodeRabbit.
  Trigger: When user mentions vibe coding, AI coding, programming with LLM, or "making web fast with AI".
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Vibe Coding / AI-assisted development
- LLM programming workflow
- Fast web development with AI
- "Make me a website quickly" requests

## The Vibe Coding Workflow (2025)

### 1. PRD - Product Requirements Document

Antes de preguntar al LLM, define el proyecto:

```markdown
# Mi Proyecto - PRD

## Problema
[Qué problema resuelve]

## Usuarios target
[Quiénes lo usarán]

## Features principales
1. Feature A
2. Feature B

## Success metrics
- [Métrica 1]
- [Métrica 2]
```

### 2. Design Document

Busca inspiración en Dribbble, Awwwards, etc:

```markdown
# Design Reference

## Style
- Minimal/Corporate/Creative

## Colors
- Primary: #xxx
- Secondary: #xxx

## Layout
- hero-left, hero-center
- grid-based sections
```

### 3. Tech Stack

Investiga el mejor stack para tu proyecto:

```markdown
# Tech Stack

## Frontend
- Framework: Next.js 15 / React 19 / Vue / Svelte
- Styling: Tailwind / CSS Modules

## Backend
- Server: Next.js API / Node / Python

## Database
- PostgreSQL / MongoDB / Supabase

## Hosting
- Vercel / Netlify / Railway
```

### 4. Folder Structure

```
project/
├── source/
│   ├── docs/          # PRD.md
│   ├── design/         # Design refs
│   └── tech/          # Tech stack notes
├── src/
└── .git/               # Init early!
```

### 5. Workflow Sequence

```bash
# Paso 1: Crear docs antes de pedir a LLM
mkdir -p project/source/docs
# Escribir PRD.md primero

# Paso 2: Dar contexto al LLM
# "Aquí está mi PRD, diseño de referencia y constraints"

# Paso 3: Git init ANTES de generar código
git init
git add .
git commit -m "chore: initial scaffold"

# Paso 4: Después de generar código
gh repo create
# Instalar CodeRabbit desde GitHub Marketplace

# Paso 5: Code review con CodeRabbit
# GitHub Actions escanea vulnerabilidades
```

## Anti-Patterns

### DON'T

- ❌ Preguntar a LLM sin PRD escrito
- ❌ No hacer git init antes de código generado
- ❌ Saltarse CodeRabbit antes de producción
- ❌ Usar el stack errado para el proyecto
- ❌ No investigar alternativas de hosting

