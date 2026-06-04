---
name: output-skill
description: Anti-lazy output enforcement. Prevents placeholder comments, skipped code, and half-finished work. Forces complete deliverables.
---

# Output Skill - No Placeholders

## PROBLEM
AI agents often output:
- `// TODO: implement this`
- Placeholder components
- Half-written functions
- "..." instead of full code
- Missing error handling

## ENFORCEMENT RULES

### 1. NO Placeholder Comments
```tsx
// ❌ PROHIBIDO
function Button({ label }) {
  // TODO: add loading state
  return <button>{label}</button>
}

// ✅ CORRECTO
function Button({ label, loading, onClick }) {
  const [isPressed, setPressed] = useState(false)
  
  if (loading) {
    return <ButtonSkeleton />
  }
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {label}
    </motion.button>
  )
}
```

### 2. NO Skipped Code
If the user asks for 5 components, deliver 5 COMPLETE components. Not 3 with "..." for the rest.

### 3. NO Empty States Without Content
```tsx
// ❌ PROHIBIDO
function UserList({ users }) {
  if (users.length === 0) {
    return <div>No users</div> // Too simple!
  }
  return users.map(u => <UserCard user={u} />)
}

// ✅ CORRECTO - beautiful empty state
function UserList({ users, onInvite }) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <UsersIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No users yet</h3>
        <p className="text-gray-500 mb-6 text-center max-w-sm">
          Invite your first team member to get started.
        </p>
        <Button variant="primary" onClick={onInvite}>
          Invite User
        </Button>
      </div>
    )
  }
  return users.map(u => <UserCard user={u} />)
}
```

### 4. NO Missing Error Handling
Every API call, form submission, and async operation must have error handling.

### 5. NO Missing Loading States
Every data fetch must have loading state (skeleton, spinner, or skeleton with layout).

## COMPLETENESS CHECKLIST

Before outputting ANY code, verify:

- [ ] All requested components/functionality implemented
- [ ] NO TODO comments
- [ ] NO placeholder content
- [ ] Error states handled
- [ ] Loading states handled
- [ ] Empty states are beautiful, not minimal
- [ ] Types complete (no `any`)
- [ ] Props fully typed
- [ ] No "..." or incomplete implementations

## QUALITY STANDARD

Treat every task as production-critical. A partial output is a broken output.

## FORBIDDEN
- TODO/FIXME comments
- Placeholder components
- Skipped implementations
- Minimal error messages
- Simple empty states