# oh-my-mermaid

Turn complex codebases into clear, navigable architecture diagrams with Mermaid.

## Install

```bash
npm install -g oh-my-mermaid
omm setup           # Setup for Claude Code, Codex, Cursor, OpenClaw
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `/omm-scan` | Analiza el codebase → genera architecture docs |
| `/omm-push` | Login + push a cloud (ohmymermaid.com) |
| `omm view` | Abrir viewer interactivo (requiere GUI) |
| `omm config language es` | Idioma del output |

## Cómo funciona

1. Ejecutá `/omm-scan` en tu proyecto
2. El agent analiza el codebase y genera diagramas Mermaid
3. Output en `.omm/`:

```
.omm/
├── overall-architecture/
│   ├── description.md
│   ├── diagram.mmd
│   └── auth-service/
├── data-flow/
└── external-integrations/
```

## Ver los diagramas

En VS Code (conectado a WSL):
- Preview del `.md` directamente
- extensión "Mermaid Preview"
- Copiá el código en [mermaid.live](https://mermaid.live)

## Validation Gate (Mermaid Fixer)

After `/omm-scan` emits `.mmd` files, validate them before publishing:

```bash
node <mermaid-fixer-skill-dir>/assets/validate-mermaid.mjs .omm/**/*.mmd
```

Fix any reported errors (unbalanced brackets, unknown diagram type, edges with a
missing endpoint) and re-run until exit code `0`. This ports the "Mermaid Fixer"
idea from `sopaco/deepwiki-rs` — broken diagrams silently fail to render, so a
quick validation pass prevents shipping dead diagrams.

## Trigger

- Onboarding a nuevo proyecto
- Necesitás entender la arquitectura
- Querés documentar el codebase