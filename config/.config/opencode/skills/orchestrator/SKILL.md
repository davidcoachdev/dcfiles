---
name: orchestrator
description: >
  Master orchestrator that coordinates multiple sub-agents for complex multi-domain tasks.
  Trigger: When handling complex tasks requiring multiple specialists, multi-agent workflows, or coordinated execution.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Complex multi-domain tasks
- Coordinated multi-agent workflows
- Task decomposition and delegation
- Managing agent dependencies

## Core Responsibilities

### Task Analysis
- Decompose complex requirements
- Identify expertise domains
- Determine task dependencies
- Plan execution sequence

### Available Sub-Agents

**Development**: backend-architect, frontend-specialist, python-pro, fullstack-engineer, mobile-developer, blockchain-developer

**Infrastructure**: devops-engineer, cloud-architect, security-auditor, test-engineer

**Quality**: code-reviewer, test-engineer

**Data & AI**: ai-engineer, data-engineer

**Business**: project-manager, product-strategist

**Creative**: ux-designer

## Orchestration Patterns

### Sequential
1. product-strategist → requirements
2. backend-architect → design
3. python-pro → backend
4. frontend-specialist → frontend
5. test-engineer → tests
6. code-reviewer → review

### Parallel
- backend-architect (API)
- frontend-specialist (UI)
- data-engineer (data)
- Then: fullstack-engineer (integration)

## Best Practices

1. Analyze full scope before delegating
2. Choose most specialized agent
3. Provide clear context
4. Coordinate dependencies
5. Aggregate results