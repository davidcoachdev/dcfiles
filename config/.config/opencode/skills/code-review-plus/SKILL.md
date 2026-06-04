---
name: code-review-plus
description: Enhanced code review with local + PR modes, security scanning, and quality gates. Blocks commits on CRITICAL/HIGH issues.
---

> **Absorbed:** `code-reviewer` (v1 — general code review framework, severity levels, best practices)

# Code Review Plus

Enhanced code review system with local uncommitted changes review and GitHub PR review modes. Comprehensive security and quality scanning.

## Modes

### Local Review Mode
Reviews uncommitted changes (`git diff`).

### PR Review Mode  
Reviews GitHub PR (pass PR number or URL).

## Workflow

### Phase 1 — GATHER

```bash
git diff --name-only HEAD
```

If no changed files → Stop with "Nothing to review."

### Phase 2 — SECURITY SCAN

Check for **CRITICAL** issues:
- Hardcoded credentials, API keys, tokens
- SQL injection vulnerabilities
- XSS vulnerabilities
- Missing input validation
- Insecure dependencies
- Path traversal risks

### Phase 3 — QUALITY SCAN

Check for **HIGH** issues:
- Functions > 50 lines
- Files > 800 lines
- Nesting depth > 4 levels
- Missing error handling
- console.log statements
- TODO/FIXME comments

Check for **MEDIUM** issues:
- Mutation patterns (prefer immutable)
- Emoji usage in code
- Missing tests for new code
- Accessibility issues (a11y)

### Phase 4 — REPORT

Generate structured report:
- **Severity**: CRITICAL, HIGH, MEDIUM, LOW
- **File location** and line numbers
- **Issue description**
- **Suggested fix**

### Phase 5 — GATE

**Block commit** if CRITICAL or HIGH issues found.
**Never approve** code with security vulnerabilities.

## Usage

```bash
# Local review (uncommitted changes)
/code-review

# PR review
/code-review 123
/code-review https://github.com/user/repo/pull/123
```

## Severity Decision Matrix

| Severity | Action | Block Commit |
|----------|--------|---------------|
| CRITICAL | Fix required | YES |
| HIGH | Fix required | YES |
| MEDIUM | Suggest fix | NO |
| LOW | Note | NO |

## Security Checks

```bash
# Check for leaks
grep -r "api_key\|secret\|password\|token" --include="*.js" --include="*.py"
grep -r "SELECT.*FROM.*WHERE" --include="*.sql"
```

## Quality Metrics

- **Cyclomatic complexity** < 10
- **Lines per function** < 50
- **Lines per file** < 800
- **Nesting depth** < 4
- **Test coverage** > 70%

## Output Format

```markdown
## Code Review Report

### CRITICAL (MUST FIX)
- [file:line] Issue: description
- [file:line] Issue: description

### HIGH (MUST FIX)
- [file:line] Issue: description

### MEDIUM (SHOULD FIX)
- [file:line] Issue: description

### LOW (NICE TO FIX)
- [file:line] Issue: description

---

**Verdict**: APPROVED / BLOCKED
```
