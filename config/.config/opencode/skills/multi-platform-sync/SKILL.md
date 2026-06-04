---
name: multi-platform-sync
description: Synchronize AI agent configs across multiple harnesses (OpenCode, Claude Code, Codex, Cursor, Gemini).
---

# Multi-Platform Sync

Synchronize AI agent configuration across multiple harnesses. Supports OpenCode, Claude Code, Codex, Cursor, and Gemini.

## Supported Platforms

| Platform | Config Directory | Primary File |
|----------|-------------------|---------------|
| Claude Code | `.claude/` | `project.md` |
| Codex | `.codex/` | `instructions.md` |
| Cursor | `.cursor/` | `rules.mdcursorrules` |
| Gemini | `.gemini/` | `gemini.yaml` |
| OpenCode | `.config/opencode/` | `opencode.json` |
| Kiro | `.kiro/` | `config.json` |

## Config Layers

```
Shared (canonical source)
    ↓
Platform-Specific Overrides
    ↓
Local Customizations
```

### Shared Config
Common rules, skills, commands used across all platforms.

### Platform Overrides
Platform-specific adaptations (e.g., different tool names).

### Local Customizations
Project-specific customizations.

## Workflow

### Phase 1 — Detect Platforms

```bash
ls -la .claude .codex .cursor .gemini .kiro .config/opencode 2>/dev/null
# Find which platforms are used
```

### Phase 2 — Compare

```bash
# Find differences
/multi-platform-sync --compare

# Show conflict matrix
/platform-matrix
```

### Phase 3 — Sync

```bash
# Sync shared configs to all platforms
/multi-platform-sync --sync=shared

# Sync rules
/multi-platform-sync --sync=rules

# Sync skills
/multi-platform-sync --sync=skills
```

### Phase 4 — Validate

```bash
# Validate all configs
/multi-platform-sync --validate

# Check for conflicts
/multi-platform-sync --check-conflicts
```

## Platform Mapping

### Shared → Platform

| Shared | Claude Code | Codex | Cursor | Gemini | OpenCode |
|--------|-------------|-------|--------|--------|---------|----------|
| Rules | project.md | instructions.md | rules.mdcursorrules | gemini.yaml | rules/ |
| Skills | skills/ | skills/ | skills/ | skills/ | skills/ |
| Commands | commands/ | commands/ | commands/ | commands/ | commands/ |

### Tool Name Mapping

| OpenCode | Claude Code | Codex | Cursor | Gemini |
|----------|-------------|-------|--------|--------|
| delegate | Agent | agent | Agent | - |
| read | read | Read | Read | read |
| write | write | Edit | Edit | write |
| bash | bash | Bash | Terminal | bash |

## Usage

```bash
# Detect all platforms
/multi-platform-sync --detect

# Compare configs
/multi-platform-sync --compare

# Sync to specific platform
/multi-platform-sync --to=claude-code
/multi-platform-sync --to=codex
/multi-platform-sync --to=cursor
/multi-platform-sync --to=gemini

# Sync all platforms
/multi-platform-sync --sync=all

# Validate
/multi-platform-sync --validate
```

## Output Format

```markdown
## Platform Sync Report

### Detected Platforms
- Claude Code: ✅ (project.md present)
- Codex: ⚠️ (missing skills/)
- Cursor: ✅
- Gemini: ❌ (not installed)
- OpenCode: ✅ (opencode.json)

### Sync Status
| Platform | Rules | Skills | Commands |
|----------|-------|--------|----------|
| Claude Code | In sync | In sync | In sync |
| Codex | Outdated | Missing | In sync |
| Cursor | In sync | In sync | Outdated |

### Actions Needed
1. Sync Codex → add skills/
2. Sync Cursor → update commands/
```

## Conflict Resolution

When same config exists in multiple places:

| Priority | Source | Use |
|----------|--------|-----|
| 1 | Local | Most specific |
| 2 | Platform Override | Platform-specific |
| 3 | Shared | Default |

## Best Practices

1. **Single source of truth**: Define shared configs once
2. **Platform overrides minimal**: Only override what's different
3. **Validate after sync**: Always validate after syncing
4. **Version control**: Commit synced configs
5. **Monitor changes**: Track platform-specific drift
