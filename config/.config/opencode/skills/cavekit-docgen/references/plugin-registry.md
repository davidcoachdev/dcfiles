# Plugin System

## Built-in Plugins

| Plugin | Description | Hooks |
|--------|-------------|-------|
| code-complexity | Code health & complexity analysis | on_module_analysis |
| api-doc-enhancer | Deep semantic API documentation | on_api_generate |
| changelog-generator | Generate changelog from git history | on_export |
| diagram-plus | Enhanced Mermaid diagrams | on_diagram_generate |
| i18n-sync | Multi-language synchronization | on_export |

## Plugin Structure

```
plugins/
├── _registry.yaml
└── {plugin_name}/
    └── PLUGIN.md
```

## _registry.yaml Format

```yaml
plugins:
  - name: code-complexity
    enabled: true
    description: Analyze code complexity
    hooks:
      - on_module_analysis
    config:
      complexity_threshold: 10
```

## Enable/Disable Plugins

```
"enable plugin code-complexity"
"disable plugin api-doc-enhancer"
```

## Plugin Hooks

| Hook | Description |
|------|-------------|
| before_generate | Before wiki generation starts |
| on_analysis | During code analysis |
| on_module_analysis | For each module being analyzed |
| on_generate | While generating content |
| on_api_generate | When generating API docs |
| on_diagram_generate | When creating Mermaid diagrams |
| on_export | After content is generated |

## Custom Plugins

To create a custom plugin:
1. Create `plugins/{plugin_name}/PLUGIN.md`
2. Add instructions for your hooks
3. Register in `_registry.yaml`

See `plugin-template.md` for format.