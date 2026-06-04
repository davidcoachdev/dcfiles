---
name: github-pr
description: "Trigger: creating PRs, writing PR descriptions, using gh CLI. Create high-quality Pull Requests with conventional commits, chained PRs for large changes, and proper descriptions."

---

> **Absorbed:** `branch-pr` (Gentle AI PR creation), `chained-pr` (400-line PR splitting into stacked PRs)
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Creating a new Pull Request
- Writing PR titles and descriptions
- Preparing commits for review
- Using `gh pr create` command

---

## Critical Patterns

### PR Title = Conventional Commit

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types (from Conventional Commits 1.0.0)

| Type | Description | SemVer |
|------|-------------|--------|
| `feat` | New feature for user | MINOR |
| `fix` | Bug fix for user | PATCH |
| `docs` | Documentation changes | - |
| `style` | Formatting, no code change | - |
| `refactor` | Code refactoring | - |
| `perf` | Performance improvement | PATCH |
| `test` | Adding/updating tests | - |
| `chore` | Maintenance, deps update | - |
| `build` | Build system changes | - |
| `ci` | CI configuration changes | - |
| `revert` | Reverting previous commit | - |

### Breaking Changes

```bash
# Option 1: With ! after type/scope
feat(auth)!: drop support for password login

# Option 2: With BREAKING CHANGE footer
feat(auth): add OAuth2
BREAKING CHANGE: password login no longer supported
```

### Scope

```bash
feat(auth): add login
feat(api): add users endpoint
feat(ui): update dashboard
fix(parser): resolve array parsing issue
```

### PR Description Structure

```markdown
## Summary
- 1-3 bullet points explaining WHAT and WHY

## Changes
- List main changes

## Testing
- [ ] Tests added/updated
- [ ] Manual testing done

Closes #123
```

### Atomic Commits

```bash
# Good: One thing per commit
git commit -m "feat(user): add User model"
git commit -m "feat(user): add UserService"
git commit -m "test(user): add UserService tests"

# Bad: Everything in one commit
git commit -m "add user feature"
```

---

## Code Examples

### Basic PR Creation

```bash
gh pr create \
  --title "feat(auth): add OAuth2 login" \
  --body "## Summary
- Add Google OAuth2 authentication

## Changes
- Added AuthProvider component
- Created useAuth hook

Closes #42"
```

### PR with HEREDOC (Complex Description)

```bash
gh pr create --title "feat(dashboard): add analytics" --body "$(cat <<'EOF'
## Summary
- Add real-time analytics dashboard

## Changes
- Created AnalyticsProvider
- Added LineChart, BarChart components

## Testing
- [x] Unit tests for components
- [x] Manual testing complete

## Screenshots
![Dashboard](url)

Closes #123
EOF
)"
```

### Draft PR

```bash
gh pr create --draft \
  --title "wip: refactor auth" \
  --body "Work in progress"
```

### PR with Reviewers and Labels

```bash
gh pr create \
  --title "feat(api): add rate limiting" \
  --body "Adds rate limiting to API" \
  --reviewer "user1,user2" \
  --label "enhancement,api"
```

---

## Commands

```bash
# Create PR
gh pr create --title "type(scope): desc" --body "..."

# Create with web editor
gh pr create --web

# View PR status
gh pr status

# View diff
gh pr diff

# Check CI status
gh pr checks

# Merge with squash
gh pr merge --squash

# Add reviewer
gh pr edit --add-reviewer username
```

---

## Anti-Patterns

### Don't: Vague Titles

```bash
# Bad
gh pr create --title "fix bug"
gh pr create --title "update"

# Good
gh pr create --title "fix(auth): prevent session timeout"
```

### Don't: Giant PRs

```bash
# Bad: 50 files, 2000+ lines in one PR

# Good: Split into logical PRs
# PR 1: feat(models): add User model
# PR 2: feat(api): add user endpoints
# PR 3: feat(ui): add user pages
```

### Don't: Empty Descriptions

```bash
# Bad
--body "Added feature"

# Good
--body "## Summary
- What you did and why

## Changes  
- Specific changes

Closes #123"
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Create PR | `gh pr create -t "type: desc" -b "body"` |
| Draft PR | `gh pr create --draft` |
| Web editor | `gh pr create --web` |
| Add reviewer | `--reviewer user1,user2` |
| Add label | `--label bug,high-priority` |
| Link issue | `Closes #123` in body |
| View status | `gh pr status` |
| Merge squash | `gh pr merge --squash` |

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]