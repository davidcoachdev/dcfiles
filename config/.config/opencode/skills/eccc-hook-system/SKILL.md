---
name: eccc-hook-system
description: Session hooks management system - automates context save/load, session summaries, and runtime profiling.
---

# ECCC Hook System

Session hooks management for OpenCode. Automates context save/load, session summaries, and runtime profiling.

## Hook Types

### Session Start Hook
Runs when session begins. Use to:
- Load project context
- Check environment
- Initialize state

### Session Stop Hook
Runs when session ends. Use to:
- Save session summary
- Persist memory to Engram
- Clean up resources

### Runtime Profiling Hook
Runs during session for:
- Token usage tracking
- Context inflation monitoring
- Performance metrics

## Configuration

### Hook Profile Modes

| Profile | Behavior |
|---------|----------|
| `minimal` | Only essential hooks |
| `standard` | Save/load + summaries |
| `strict` | Full profiling + metrics |

Set via: `ECC_HOOK_PROFILE=minimal|standard|strict`

### Disabled Hooks

Disable specific hooks:
```bash
ECC_DISABLED_HOOKS=session-start,context-load
```

## Hook Implementation

### Session Start

```bash
# ~/.config/opencode/hooks/session-start.sh
#!/bin/bash
echo "Session $(date) started" >> ~/.opencode/sessions.log
# Load project context
mem_context --project $(basename $(pwd))
```

### Session Stop

```bash
# ~/.config/opencode/hooks/session-stop.sh
#!/bin/bash
echo "Session $(date) ended" >> ~/.opencode/sessions.log
# Save to Engram
mem_session_summary --content "$(task_list)" --project $(basename $(pwd))
```

## Usage

```bash
# List hooks
/hookify-list

# Configure hooks
/hookify-configure --profile=standard

# Disable specific hook
/hookify-configure --disable=session-start
```

## Session Summary Format

When session ends, automatically save:

```markdown
## Goal
[What was worked on]

## Instructions
[User preferences, constraints]

## Discoveries
- [Technical finding 1]
- [Technical finding 2]

## Accomplished
- ✅ [Completed task 1]
- 🔲 [Pending task 2]

## Relevant Files
- path/to/file — [what changed]
```

## Context Budget

Monitor token usage:
- Start of session: Check context size
- Mid-session: Warn if > 80%
- End: Log total usage

## Memory Explosion Prevention

If context > 100K tokens:
1. Enable throttling
2. Use tail sampling (last N messages)
3. Trigger compaction warning

## Best Practices

1. Always save before ending session
2. Use throttling for large contexts
3. Profile regularly with `standard` mode
4. Disable heavy hooks in production
