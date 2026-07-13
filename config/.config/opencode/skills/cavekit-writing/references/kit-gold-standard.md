# Gold-Standard Cavekit Kit — Template

Copy this template for every new feature/change. Fill every section. A kit with loose
or missing acceptance criteria is the #1 cause of non-converging iteration loops — be
precise. Each requirement MUST be verifiable (a test, a command, or an observable
behavior). Quality and Security are non-negotiable.

---

## Metadata

- **id**: `feature/<short-kebab-name>`
- **title**: <Verb + what — short, searchable>
- **status**: draft | in-progress | verified | archived
- **owner**: <who leads this change>
- **date**: <YYYY-MM-DD>
- **priority**: quality | security | speed | cost

## Goal

<One sentence: what we are building and why. If you cannot state it, stop — the scope
is unclear and this is a spec bug, not a coding task.>

## Constraints (non-negotiable)

- **Quality**: clean code, SOLID, follows surrounding code style. No premature abstraction.
- **Security**: no secret logging/exposure; least privilege; review for injection, SSRF,
  broken authz before "done".
- **Strict TDD**: tests are written/updated as part of implementation (red → green →
  refactor). Coverage must not drop.
- **Verification**: the project's real test/lint/typecheck/build commands must pass and
  their output reported. "Should work" is not a result.

## Functional Requirements

Each requirement: a clear statement + testable acceptance criteria. Use the format:

### FR-1. <Requirement name>

- **What**: <one-line description>
- **Acceptance criteria**:
  - [ ] AC1: <observable behavior a user/harness can check>
  - [ ] AC2: <edge case covered>
- **Test**: <test file + case name, or command that proves it>
- **Notes**: <non-obvious constraints, dependencies>

### FR-2. ...

## Non-Functional Requirements

- **Performance**: <budget, e.g. "list renders < 200ms p95"> — with how to measure>
- **Security**: <threats considered, e.g. "unauthenticated user cannot DELETE">
- **Accessibility**: <WCAG level if UI>
- **Reliability**: <failure modes handled>

## Design Approach

- **Patterns to use**: <e.g. Repository, Strategy, container/presentational>
- **Anti-patterns to avoid**: <e.g. god service, silent catch, TODO-as-design>
- **Key files / modules touched**: <paths>
- **Diagram** (if useful): <ascii or reference to a drawn sketch>

## Strict TDD Plan

1. Write the failing test for FR-1 AC1 first (red).
2. Implement the minimum to pass (green).
3. Refactor within the test's safety net.
4. Repeat per acceptance criterion.
5. Run the full suite + lint + typecheck before marking verified.

## Security Gates (checklist before "verified")

- [ ] No secrets in code, logs, or commits
- [ ] Input validated at boundaries
- [ ] Authz enforced on every protected action
- [ ] No raw SQL/command concatenation (parameterized / escaped)
- [ ] Dependencies pinned and scanned
- [ ] Error messages leak no internal detail

## Verification Plan (exact, runnable)

- Command: `<test command>`, e.g. `npm test` / `pytest` / `go test ./...`
- Command: `<lint>`, e.g. `npm run lint` / `ruff check .`
- Command: `<typecheck>`, e.g. `tsc --noEmit`
- Assertion: all above exit 0; coverage delta >= 0 vs baseline
- Manual: <steps a human confirms if UI/behavioral>

## Definition of Done (Result Contract)

- `status`: verified
- `executive_summary`: <what shipped>
- `artifacts`: <paths: kit, tests, implementation>
- `next_recommended`: <archive, or next change>
- `risks`: <what to watch, known limitations]

## Open Questions

- <anything blocked on the user or another team — surface, don't assume>
