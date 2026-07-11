# Playwright E2E Testing Skill

## Structure

```
playwright/
├── SKILL.md                 # Main skill definition (328 lines)
├── references/              # Supporting documentation
│   ├── page-object-model.md
│   ├── selectors-guide.md
│   └── mcp-workflow.md
├── assets/                  # Code examples
│   ├── login-tests-example.spec.ts
│   ├── helpers-example.ts
│   └── page-objects-example.ts
└── scripts/                 # Utility scripts (empty)
```

## Quick Start

1. **Read SKILL.md** - Understand Playwright patterns and MCP workflow
2. **Study references/** - Deep dive into specific techniques
3. **Review assets/** - Real-world code examples

## Key Concepts

- **Page Object Model** - Encapsulate page elements and interactions
- **Selector Priority** - Use getByRole/getByLabel for resilient tests
- **MCP Workflow** - Explore UI before writing tests
- **Test Documentation** - Document test cases in markdown

## When to Use

- Writing E2E tests
- Testing user flows
- Validating page interactions
- Testing form submissions
- Verifying page transitions

## File Structure

```
tests/
├── base-page.ts              # Parent class for ALL pages
├── helpers.ts                # Shared utilities
└── {page-name}/
    ├── {page-name}-page.ts   # Page Object Model
    ├── {page-name}.spec.ts   # ALL tests here
    └── {page-name}.md        # Test documentation
```

## Selector Priority

1. **getByRole** - Best for interactive elements
2. **getByLabel** - Best for form controls
3. **getByText** - For static content only
4. **getByTestId** - Last resort

## Common Commands

```bash
npx playwright test                    # Run all tests
npx playwright test --grep "login"     # Filter by name
npx playwright test --ui               # Interactive UI
npx playwright test --debug            # Debug mode
npx playwright codegen https://example.com  # Generate selectors
```

## MCP Workflow

If Playwright MCP tools available:
1. Navigate to target page
2. Take snapshot to see page structure
3. Interact with elements to verify flow
4. Take screenshots to document states
5. Verify page transitions
6. Document actual selectors
7. Create test code with verified selectors

## Related Skills

- `e2e-test-specialist` - Comprehensive E2E testing guide
- `systematic-debugging` - Debugging test failures
