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

## Trigger

- Onboarding a nuevo proyecto
- Necesitás entender la arquitectura
- Querés documentar el codebase