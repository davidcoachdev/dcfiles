---
name: github-repo-reviewer
description: "Trigger: review github repo, analyze a repository, repo health check, give opinion on a project. Fetch README + GitHub API signals and produce a structured opinionated assessment of any GitHub repo."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# Skill: github-repo-reviewer

## Activation Contract

Use when a user or agent says things like "review this repo", "analyze <github url>",
"what do you think of <project>", "repo health check", or "should we adopt <lib/framework>".
Designed for tech-evaluation before adoption — fits the Cavekit flow when picking dependencies.

Do NOT use for: a deep source-code audit (that needs clone + astGrep), or non-GitHub repos.

## Hard Rules

- State your scope honestly: this is a **signal-based review** (README + API metrics), not a code audit.
- Prefer `gh` CLI for live data; if `gh` is unavailable, fall back to `webfetch` on `api.github.com`
  (unauthenticated limit ~60 req/hr — batch calls).
- Respond in the user's language (e.g., Spanish if they wrote in Spanish).
- Ground every opinion in evidence: stars, release cadence, open-issue ratio, nature of recent PRs.
  Never invent metrics.
- For frameworks, cross-check the README's marketing claims against the official docs/learn site.

## Decision Gates

| Situation | Action |
|-----------|--------|
| `gh` CLI available | `gh repo view owner/repo --json ...` + `gh api` |
| `gh` missing | `webfetch` `api.github.com/repos/owner/repo`, `/releases/latest`, `/issues?state=open&sort=created&direction=desc` |
| Need architecture depth | Offer to clone + read/`astGrep` (out of scope of the quick review) |
| Framework with docs site | Also `webfetch` the docs intro (e.g., `dioxuslabs.com/learn`) to validate claims |

## Execution Steps

1. Parse `owner/repo` from a URL or `owner/repo` argument.
2. Fetch the README (`raw.githubusercontent.com/owner/repo/<default>/README.md`).
3. Fetch signals: repo metadata (stars, forks, open_issues, pushed_at, license, topics),
   latest release (tag + date + body), and 5 recent open issues/PRs.
4. If a docs/learn site exists, fetch its intro to compare claims vs reality.
5. Synthesize the review using `assets/review-template.md`.
6. Close with an honest scope note and offer a deeper path (clone / audit / benchmark).

## Output Contract

Return a structured opinion with: Position, Health signals, Strengths, Weaknesses/Risks,
Comparison to alternatives, Verdict (✅/🟡/🔴), and a Scope note. Always state it is signal-based
and offer the deeper audit if the user wants it.

## References

- `assets/review-template.md` — fixed structure for the written review.
