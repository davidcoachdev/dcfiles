---
name: eval-workflow
description: Testing and evaluation methodology with checkpoint vs continuous evals, grader types, and pass@k metrics.
---

# Eval Workflow

Testing and evaluation methodology for AI agents. Includes checkpoint evals, continuous evals, grader types, and pass@k metrics.

## Eval Types

### Checkpoint Evals
Run at specific points:
- After each phase
- Before merge
- Before deploy

### Continuous Evals
Run throughout:
- Every N messages
- Every tool call
- Every task completion

## Grader Types

| Type | Use Case | Example |
|------|---------|---------|
| EXACT | String matching | `[output] == [expected]` |
| CONTAINS | Substring | `expected in output` |
| FUZZY | Partial match | Levenshtein distance |
| REGEX | Pattern match | `re.match(pattern, output)` |
| LLM | AI judging | `llmJudger(output, expected)` |
| HYBRID | Multiple | Combine any above |

## Pass@k Metrics

**Definition**: At least k of n tries must pass.

| Metric | Formula | Meaning |
|-------|---------|---------|
| pass@1 | p = pass rate | Standard accuracy |
| pass@3 | 1 - (1-p)^3 | 3 tries allowed |
| pass@5 | 1 - (1-p)^5 | 5 tries allowed |
| pass@10 | 1 - (1-p)^10 | 10 tries allowed |

**Why pass@k?** Better for hard tasks where single try is unrealistic.

## Workflow

### Phase 1 — Define Eval

```yaml
# eval.yaml
name: "feature-eval"
type: checkpoint
grader: CONTAINS
expected: "Hello, World!"
threshold: 0.8
```

### Phase 2 — Run Eval

```bash
/eval --run=feature-eval
```

### Phase 3 — Report

```markdown
## Eval Report: feature-eval

### Results
- Total: 100
- Passed: 85
- Failed: 15
- Pass Rate: 85%

### pass@k
- pass@1: 85%
- pass@3: 96%
- pass@5: 99%
- pass@10: 99.99%

### By Category
| Category | Pass Rate |
|----------|-----------|
| Happy path | 95% |
| Edge cases | 70% |
| Error handling | 80% |
```

### Phase 4 — Improve

If pass rate < threshold:
1. Fix failing cases
2. Add training data
3. Adjust grader sensitivity

## Usage

```bash
# Run all evals
/eval

# Run specific eval
/eval --run=feature-eval

# Run checkpoint
/eval --checkpoint

# Run continuous
/eval --continuous

# Report only
/eval --report
```

## Best Practices

1. **Start with pass@1** for easy tasks
2. **Use pass@3** for hard tasks (code generation)
3. **Monitor trends** over time
4. **Category breakdown** reveals patterns
5. **Hybrid graders** for complex tasks

## Test Categories

| Category | Description | Weight |
|----------|-------------|--------|
| Happy path | Standard inputs | 40% |
| Edge cases | Boundary conditions | 30% |
| Error handling | Invalid inputs | 20% |
| Performance | Speed, memory | 10% |

## Output Format

```markdown
## Eval Summary

### Overall: 85/100 (B)

### By Category
- Happy path: ✅ 95%
- Edge cases: ⚠️ 70%
- Error handling: ✅ 80%
- Performance: ✅ 90%

### Recommendations
1. Fix edge cases (15 failing)
2. Add more error handling tests
3. Monitor performance degradation
```

## Integration with TDD

Eval workflow pairs with TDD:

```bash
# TDD cycle
/test:write --fail   # Write failing test
/test:implement    # Implement fix
/test:eval         # Run eval
/test:commit       # Commit if pass rate > threshold
```
