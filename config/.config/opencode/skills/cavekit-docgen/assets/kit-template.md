# Kit Template for IAs

## Project Overview
- **Name**: {project_name}
- **Language**: {primary_language}
- **Framework**: {framework_if_any}
- **Purpose**: {one_line_description}

---

## R1: Core Functionality

**Description:** {what the module does}

**Acceptance Criteria:**
- [ ] Function `main()` exists and is callable
- [ ] Entry point handles CLI arguments correctly
- [ ] Error handling covers all edge cases

**Dependencies:**
- `module-a`
- `module-b`

---

## R2: API Surface

**Description:** {public interfaces}

**Acceptance Criteria:**
- [ ] Exported functions are documented
- [ ] Type signatures are explicit
- [ ] No undocumented public APIs

**Code Example:**
```typescript
// Usage example here
```

---

## R3: Data Model

**Description:** {data structures}

**Acceptance Criteria:**
- [ ] Models have type definitions
- [ ] Serialization/deserialization works
- [ ] No data loss on roundtrip

---

## R4: Error Handling

**Description:** {error strategy}

**Acceptance Criteria:**
- [ ] All errors are typed
- [ ] Error messages are actionable
- [ ] Stack traces preserved in dev

---

## R5: Testing Strategy

**Description:** {test approach}

**Acceptance Criteria:**
- [ ] Unit tests cover 80%+ of code
- [ ] Integration tests for critical paths
- [ ] E2E tests for user flows