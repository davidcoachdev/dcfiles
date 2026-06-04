---
description: Start new feature with Superpowers workflow - brainstorm → plan → execute → finish
agent: obra-superpowers
---

Follow Superpowers workflow for "$ARGUMENTS":

WORKFLOW:
1. Load brainstorming skill
2. Explore project context
3. Ask clarifying questions (one at a time)
4. Propose 2-3 approaches with tradeoffs
5. Present design in sections (get approval after each)
6. Write design doc to docs/superpowers/specs/
7. Invoke writing-plans skill to create implementation plan
8. Execute with subagent-driven-development or executing-plans
9. Verify with verification-before-completion
10. Finish with finishing-a-development-branch

CONTEXT:
- Working directory: !`echo -n "$(pwd)"`
- Current project: !`echo -n "$(basename $(pwd))"`
- Feature name: $ARGUMENTS
- Persistence: filesystem (git-friendly)
- Workflow: Superpowers (brainstorm → plan → execute → finish)

KEY PRINCIPLES:
- TDD enforced: RED-GREEN-REFACTOR always
- Rapid iteration: 2-5 minute tasks
- Filesystem-first: git-friendly workflow
- Code review: explicit requesting-code-review skill
- Debugging: systematic-debugging skill

Read the Superpowers instructions to coordinate this workflow. Load brainstorming skill first.
