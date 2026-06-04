---
name: git-workflow-master
description: "Trigger: Git workflows, branching strategies, commit conventions, history management. Git workflow expert with branching, conventional commits, CI-friendly practices, and work-unit commit planning."

---

> **Absorbed:** `work-unit-commits` (commit planning as reviewable work units)
  history cleanup, merge conflicts, or CI/CD Git integration.
---

## When to Use

- Designing branching strategies (GitFlow, Trunk-Based, GitHub Flow)
- Writing conventional commits
- Cleaning up Git history (rebase, squash, amend)
- Resolving merge conflicts
- Setting up CI/CD Git integration
- Cherry-picking, bisecting, blaming

## Branching Strategies

### Trunk-Based Development (Recommended for most teams)

```
main ───────────────────────────────────────►
  ├─ feature/short-lived-1 ──► (merged in <1 day)
  ├─ feature/short-lived-2 ──► (merged in <1 day)
  └─ release/v1.2 ────────────► (if needed)

Rules:
- Feature branches live <1 day (ideally <2 hours)
- Commit to main frequently (CI must be green)
- Feature flags for incomplete work
- Pair programming over long-lived branches
```

### GitHub Flow (Simple, popular)

```
main ───────────────────────────────────►
  └─ feature/add-auth ──────► PR → merge to main

Rules:
- main is always deployable
- Feature branches for everything
- PRs required for merge
- Deploy from main automatically
```

### GitFlow (Complex, for scheduled releases)

```
main ──────────────────────────────► (production)
develop ───────────────────────────► (integration)
  ├─ feature/new-api ─────────────► (into develop)
  ├─ release/v1.2 ────────────────► (into main + develop)
  └─ hotfix/security-patch ───────► (into main + develop)

Rules:
- main = production, develop = next release
- Release branches when stabilizing
- Hotfix branches from main
- Use only if you have scheduled releases
```

## Conventional Commits 1.0.0

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | When | Example |
|------|------|---------|
| `feat` | New feature | `feat(auth): add OAuth2 login` |
| `fix` | Bug fix | `fix(api): handle null response` |
| `docs` | Documentation | `docs(readme): update install steps` |
| `style` | Formatting, no logic | `style(lint): fix semicolon` |
| `refactor` | Code restructure | `refactor(auth): extract token service` |
| `perf` | Performance | `perf(list): virtualize rendering` |
| `test` | Adding tests | `test(auth): add login integration test` |
| `build` | Build system | `build(docker): update node version` |
| `ci` | CI config | `ci(actions): add lint step` |
| `chore` | Maintenance | `chore(deps): bump react to 19` |
| `revert` | Revert commit | `revert: feat(auth): add OAuth2 login` |

### Breaking Changes
```
feat(api): change user endpoint response format

BREAKING CHANGE: /api/users now returns { data: [...] } instead of [...]
```

Or use `!` shorthand: `feat(api)!: change user endpoint response format`

## History Cleanup Commands

### Interactive Rebase (Edit last N commits)
```bash
git rebase -i HEAD~3
# pick → keep commit
# squash → merge with previous
# reword → change message
# edit → pause and modify commit
# drop → remove commit
```

### Squash All Commits in Branch
```bash
git merge --squash feature/branch
git commit -m "feat(scope): add feature description"
```

### Amend Last Commit (Message Only)
```bash
git commit --amend -m "feat(scope): better message"
```

### Remove File from History (Sensitive Data)
```bash
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/file' \
  --prune-empty HEAD
# Or use BFG (faster):
bfg --delete-files path/to/file
git reflog expire --expire=now --all && git gc --prune=now
```

### Find When a Bug Was Introduced
```bash
git bisect start
git bisect bad          # current commit is broken
git bisect good <hash>  # this commit was fine
# Git checks out middle commit
git bisect good         # if middle works
git bisect bad          # if middle is broken
# Repeat until found
git bisect reset        # clean up
```

## Merge Conflict Resolution

```bash
# See which files conflict
git status

# Three-way merge tool
git mergetool

# Accept ours for all conflicts in a file
git checkout --ours path/to/file
git add path/to/file

# Accept theirs for all conflicts in a file
git checkout --theirs path/to/file
git add path/to/file

# Rebase instead of merge (cleaner history)
git pull --rebase origin main

# Abort merge if too complex
git merge --abort
```

## CI/CD Git Best Practices

```yaml
# .github/workflows/ci.yml — essentials
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for analysis
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

### Git Rules for CI
1. **main is always green** — never merge broken code
2. **Small PRs** — max 400 lines changed, easier to review
3. **Rebase, don't merge** into feature branches from main
4. **Sign commits** — `git config commit.gpgsign true`
5. **Protect main** — require PR reviews, CI passes, no force push

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]