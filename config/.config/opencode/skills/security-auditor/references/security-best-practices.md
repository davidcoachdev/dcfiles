# Security Best Practices

## Input Validation

```typescript
// ✅ Validate all input
function createUser(email: string, password: string) {
  if (!isValidEmail(email)) throw new Error("Invalid email");
  if (password.length < 12) throw new Error("Password too short");
  return db.users.create({ email, password });
}

// ❌ Never trust user input
function createUser(email: string, password: string) {
  return db.users.create({ email, password });
}
```

## SQL Injection Prevention

```go
// ✅ Parameterized queries
rows, err := db.Query("SELECT * FROM users WHERE id = $1", userID)

// ❌ String concatenation
rows, err := db.Query("SELECT * FROM users WHERE id = " + userID)
```

## Authentication

```typescript
// ✅ Hash passwords
const hashedPassword = await bcrypt.hash(password, 10);

// ❌ Store plaintext
db.users.create({ email, password });
```

## CORS & CSRF

```typescript
// ✅ Configure CORS properly
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));

// ✅ CSRF tokens
app.post('/api/data', csrfProtection, (req, res) => {
  // Handle request
});
```

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Checklist](https://cheatsheetseries.owasp.org/)
