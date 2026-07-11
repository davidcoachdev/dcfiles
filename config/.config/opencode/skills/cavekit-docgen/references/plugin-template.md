# Plugin Template

Create custom plugins to extend cavekit-docgen functionality.

## Plugin Structure

```
plugins/
├── _registry.yaml
└── my-custom-plugin/
    └── PLUGIN.md
```

## PLUGIN.md Format

```markdown
# My Custom Plugin

## Description
What this plugin does

## Configuration
- option1: Description
- option2: Description

## Hooks

### on_module_analysis
Instructions for module analysis phase:
- Step 1 to perform
- Step 2 to perform
- What to output

### on_diagram_generate
Instructions for diagram generation:
- Diagram types to generate
- Mermaid syntax to use
- What information to extract

### on_export
Instructions for final export:
- Post-processing steps
- File organization
- Any additional files to create

## Example Output
Show what this plugin produces.
```

## _registry.yaml Entry

```yaml
plugins:
  - name: my-custom-plugin
    enabled: false
    description: Custom functionality
    hooks:
      - on_module_analysis
      - on_diagram_generate
    config:
      option1: value1
      option2: value2
```

## Available Hooks

| Hook | When | What to do |
|------|------|------------|
| `before_generate` | Start of generation | Initialize state, check config |
| `on_analysis` | Code analysis | Extract additional info |
| `on_module_analysis` | Per module | Add module-specific content |
| `on_generate` | Content generation | Modify/add content |
| `on_api_generate` | API docs | Enhance API documentation |
| `on_diagram_generate` | Diagrams | Create additional diagrams |
| `on_export` | End | Finalize, organize files |

## Example: API Documentation Enhancer

```markdown
# API Documentation Enhancer

## Description
Enhances API docs with additional semantic information

## Configuration
- include_examples: Add usage examples
- include_errors: Document error types

## Hooks

### on_api_generate
For each API function:
1. Identify error cases
2. Find related functions
3. Add cross-references
4. Generate usage patterns

### on_diagram_generate
Create:
- Call hierarchy diagram
- Dependency graph
```

## Register Plugin

After creating your plugin:
1. Add entry to `plugins/_registry.yaml`
2. Enable with: `"enable plugin <name>"`