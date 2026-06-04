---
name: context-budget
description: Token optimization, context budgeting, and memory management for AI agents. Includes thresholds, warnings, and compaction strategies.
---

# Context Budget

Token optimization, context budgeting, and memory management. Keeps AI agents efficient within context limits.

## Context Limits

| Model | Context | Warning | Critical |
|-------|---------|---------|----------|
| Haiku | 200K | 160K | 180K |
| Sonnet | 200K | 160K | 180K |
| Opus | 200K | 160K | 180K |
| GPT-4 | 128K | 100K | 115K |
| Claude 3.5 | 200K | 160K | 180K |

## Budget Strategy

### Conservative (Minimal)
- System prompt: < 5K tokens
- Context: < 50K tokens
- Use for: Simple tasks, single-file changes

### Balanced (Standard)
- System prompt: < 10K tokens
- Context: < 80K tokens
- Use for: Most tasks, multi-file changes

### Aggressive (Full)
- System prompt: < 15K tokens
- Context: < 150K tokens
- Use for: Complex tasks, architectural decisions

## Workflow

### Phase 1 — Measure

```bash
# Count tokens (approximate)
echo "$CONTEXT" | wc -c | awk '{print $1/4}'

# Or use API
opencode --token-count
```

### Phase 2 — Budget

If context > warning threshold:
1. Enable throttling
2. Use tail sampling (last N messages)
3. Trigger compaction warning

If context > critical threshold:
1. Force compaction
2. Disable non-essential hooks
3. Warn user

### Phase 3 — Optimize

```bash
# Slim system prompt
/context-budget --slim

# Compact context
/context-budget --compact

# Archive old messages
/context-budget --archive
```

## Token Optimization Techniques

### 1. Slim Prompts

**Before (bloated):**
```
You are a senior software architect with 15+ years experience.
You have worked at Google, Meta, Amazon. You specialize in
clean architecture, testing, and best practices. You're
helpful but also challenging when needed...
```

**After (concise):**
```
Senior Architect. 15+ yrs exp. Clean architecture, testing.
Helpful, challenging when needed.
```

### 2. Lazy Loading

Only load what's needed:
- Load skills on-demand
- Use skill resolver
- Don't pre-load everything

### 3. Short References

**Before:**
```
As defined in our architecture decision record at /docs/adr/001.md:
- We use hexagonal architecture
- Ports and adapters pattern
- Domain driven design
```

**After:**
```
(Ref: /docs/adr/001.md - hexagonal architecture, ports/adapters, DDD)
```

### 4. Compact History

Tail sampling (keep last N messages):
```bash
# Keep last 20 messages
tail -n 20 conversation.json > compacted.json
```

## Warning Levels

| Level | Threshold | Action |
|-------|-----------|--------|
| Green | < 70% | Normal |
| Yellow | 70-80% | Enable throttling |
| Orange | 80-90% | Suggest compaction |
| Red | > 90% | Force compaction |

## Usage

```bash
# Check budget
/context-budget --check

# Slim prompts
/context-budget --slim

# Compact context
/context-budget --compact

# Set threshold
/context-budget --threshold=100000
```

## Output Format

```markdown
## Context Budget

### Current: 85,000 / 200,000 tokens (43%)

### Breakdown
- System prompt: 12,000 tokens (6%)
- Conversation: 65,000 tokens (33%)
- Tools output: 8,000 tokens (4%)

### Warning Level: GREEN ✅

### Recommendations
1. No action needed
2. Context is well within limits
```

## Compaction Strategies

### 1. Summarize Old Messages
Replace old messages with summary.

### 2. Archive
Move old context to external storage.

### 3. Prune Tool Outputs
Keep only relevant tool outputs.

### 4. Inline Small Files
For small files, inline directly instead of tool references.

## Best Practices

1. **Monitor continuously** - Check every N messages
2. **Slim prompts** - Keep system prompt minimal
3. **Lazy load** - Only load what's needed
4. **Tail sampling** - Keep recent, archive old
5. **Compact early** - Don't wait for critical
