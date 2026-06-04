---
name: harness-audit
description: Audit AI agent harness (OpenCode, Claude Code, Codex, Cursor) for performance, compatibility, and best practices.
---

# Harness Audit

Audit AI agent harnesses for performance, compatibility, and best practices. Supports OpenCode, Claude Code, Codex, Cursor, and Gemini.

## Supported Harnesses

| Harness | Config File | Command |
|---------|-------------|----------|
| OpenCode | `opencode.json` | `opencode` |
| Claude Code | `.claude/` | `/claude` |
| Codex | `.codex/` | `/codex` |
| Cursor | `.cursor/` | `/cursor` |
| Gemini | `.gemini/` | `/gemini` |

## Audit Dimensions

### 1. Configuration Audit

- Agent definitions present
- Tool permissions correct
- Model assignments valid
- MCP servers configured

### 2. Skills Audit

- All skills have SKILL.md
- All skills have .skill-meta.json
- No duplicate skills
- Triggers properly configured

### 3. Commands Audit

- All commands have descriptions
- Arguments validated
- No conflicting commands

### 4. Performance Audit

- Context size reasonable
- No memory leaks
- Hook efficiency

### 5. Cross-Harness Compatibility

- Shared configs in sync
- Platform-specific overrides clean
- No hardcoded paths

## Audit Scoring

| Score | Level | Meaning |
|-------|-------|---------|
| 90-100 | A | Production-ready |
| 70-89 | B | Good, minor issues |
| 50-69 | C | Needs work |
| <50 | D | Critical issues |

## Workflow

### Phase 1 — Detect Harness

Check which harness is active:
```bash
echo $OPENCODE_AGENT
echo $CLAUDE_AGENT
echo $CODECX_AGENT
```

### Phase 2 — Run Audit

```bash
# Config audit
opencode --agent audit --check=config

# Skills audit  
opencode --agent audit --check=skills

# Commands audit
opencode --agent audit --check=commands

# Full audit
opencode --agent audit --check=all
```

### Phase 3 — Report

Generate audit report:

```markdown
## Harness Audit Report

### Overall Score: 85/100 (B)

### Configuration: ✅ PASS
- Agents: 12/12 defined
- Tools: All permissions valid
- Models: 10/10 assigned

### Skills: ⚠️ WARN
- Missing: 2 skills (.skill-meta.json)
- Duplicates: 1 skill

### Commands: ✅ PASS
- All: 13/13 have descriptions

### Performance: ✅ PASS
- Context: 45K tokens (under limit)
- Hooks: 3/3 efficient

### Cross-Harness: ⚠️ WARN
- 3 configs out of sync
```

### Phase 4 — Fix

Apply recommended fixes:
```bash
/harness-audit --fix
```

## Usage

```bash
# Full audit
/harness-audit

# Specific dimension
/harness-audit --check=config
/harness-audit --check=skills
/harness-audit --check=commands
/harness-audit --check=performance
/harness-audit --check=compatibility

# Auto-fix issues
/harness-audit --fix
```

## Output Format

```markdown
## Audit Results

| Dimension | Score | Status |
|-----------|-------|--------|
| Configuration | 100/100 | ✅ PASS |
| Skills | 78/100 | ⚠️ WARN |
| Commands | 100/100 | ✅ PASS |
| Performance | 95/100 | ✅ PASS |
| Compatibility | 60/100 | 🔶 FAIL |

---

**Recommendation**: Fix skills before production use.
```

## Observer Reliability

Check for common issues:
- Context explosion (throttling enabled?)
- Memory leaks (cleanup hooks?)
- Re-entrancy guards (prevent infinite loops?)
