# Systematic Debugging Skill

## Structure

```
systematic-debugging/
├── SKILL.md                 # Main skill definition (309 lines)
├── references/              # Supporting documentation
│   ├── root-cause-tracing.md
│   ├── defense-in-depth.md
│   └── condition-based-waiting.md
├── assets/                  # Code examples and test scenarios
│   ├── condition-based-waiting-example.ts
│   ├── test-academic.md
│   ├── test-pressure-1.md
│   ├── test-pressure-2.md
│   └── test-pressure-3.md
└── scripts/                 # Utility scripts
    └── find-polluter.sh
```

## Quick Start

1. **Read SKILL.md** - Understand the 4-phase debugging methodology
2. **Use references/** - Deep dive into specific techniques
3. **Study assets/** - Real-world examples and test scenarios
4. **Run scripts/** - Automated debugging helpers

## Key Concepts

- **Phase 1**: Root Cause Investigation
- **Phase 2**: Pattern Analysis
- **Phase 3**: Hypothesis and Testing
- **Phase 4**: Implementation

## When to Use

- Test failures
- Production bugs
- Unexpected behavior
- Performance problems
- Build failures
- Integration issues

## Related Skills

- `superpowers:test-driven-development` - For creating failing test cases
- `superpowers:verification-before-completion` - Verify fixes work
