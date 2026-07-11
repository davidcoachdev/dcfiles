# Prompts for Wiki Generation

## Deep Code Analysis Prompt

Analyze the codebase at `{project_path}` and extract:
1. **Tech stack**: Languages, frameworks, main libraries
2. **Module structure**: Top-level directories and their purposes
3. **Entry points**: Main entry files, CLI commands, API endpoints
4. **Public APIs**: Exported functions, classes, interfaces
5. **Dependencies**: External packages, internal module dependencies
6. **Data models**: Key data structures, types, schemas
7. **Configuration**: Config files, environment variables

Output structured analysis for use in documentation generation.

---

## Module Documentation Prompt

Generate comprehensive module documentation for `{module_name}` with these sections:

1. **Overview** - What the module does, its purpose
2. **Installation** - How to install/setup
3. **Quick Start** - Minimal working example
4. **Core Concepts** - Key ideas users need to understand
5. **API Reference** - All exported functions/classes with signatures
6. **Configuration** - Options and environment variables
7. **Usage Examples** - Common use cases with code
8. **Advanced Topics** - Advanced usage, edge cases
9. **Troubleshooting** - Common issues and solutions
10. **Best Practices** - Recommended patterns
11. **Related Modules** - Links to related documentation
12. **Changelog** - Version history for this module
13. **Contributing** - How to contribute to this module
14. **License** - License information
15. **References** - External links, further reading
16. **Diagrams** - Mermaid diagrams for visual explanation

Each section should be substantial (not just headers).

---

## Architecture Documentation Prompt

Generate system architecture documentation:

1. **System Overview** - High-level description
2. **Architecture Diagram** - Mermaid graph showing components
3. **Component Descriptions** - Each major component and its role
4. **Data Flow** - How data moves through the system (sequence diagram)
5. **Dependency Graph** - Module dependencies (Mermaid)
6. **Entry Points** - How users interact with the system
7. **Key Decisions** - Architectural decisions and rationale

Include at least 2 Mermaid diagrams.

---

## API Documentation Prompt

Generate API reference for `{module_name}`:

1. **Overview** - Brief description of the API
2. **Functions/Methods** - Each exported function with:
   - Signature
   - Parameters (name, type, description)
   - Return value
   - Example usage
   - Errors thrown
3. **Classes/Interfaces** - Types with properties and methods
4. **Constants** - Exported constants and enums
5. **Type Definitions** - TypeScript interfaces, types
6. **Events** - Event names and payloads (if applicable)

---

## Homepage Prompt

Generate wiki index.md with:
1. **Project Title & Description** - What the project does
2. **Badges** - Tech stack, build status, coverage
3. **Features** - Key features in bullet points
4. **Quick Start** - Installation and basic usage
5. **Architecture Preview** - Mini architecture diagram
6. **Documentation Navigation** - Link to main sections
7. **Contributing** - How to contribute
8. **License** - License badge and info

---

## Quality Standards Prompt

Ensure generated content meets:
- 400+ lines for core modules
- 2+ Mermaid diagrams
- Complete, runnable code examples
- Cross-links between related sections
- No placeholder text (e.g., "TODO", "add content here")
- Proper heading hierarchy