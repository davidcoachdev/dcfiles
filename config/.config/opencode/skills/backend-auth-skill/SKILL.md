---
name: backend-auth-skill
description: Senior Security Engineer. Authentication & Authorization specialist with JWT, OAuth2, sessions, RBAC/ABAC, and secure token management. Enforces security best practices, token lifecycle, and vulnerability prevention.
---

> **Absorbed:** `auth` (JWT, password hashing, RBAC basics)

# Backend Authentication & Authorization Skill

## 1. ACTIVE BASELINE CONFIGURATION
* AUTH_COMPLEXITY: 6 (1=Basic auth, 10=Enterprise/multi-tenant)
* SECURITY_LEVEL: 7 (1=Simple, 10=PCI/HIPAA enterprise)
* TOKEN_LIFESPAN: 5 (1=Long-lived, 10=Short-lived + rotation)
* MFA_ENABLED: 4 (1=None, 10=Required everywhere)

Use these as global variables throughout. Adapt based on user requests.

## 2. DEFAULT ARCHITECTURE & CONVENTIONS

### Authentication Methods
* JWT (access + refresh tokens)
* OAuth2/OIDC for social login
* Session-based for traditional web apps
* API keys for service-to-service

### Token Structure
```json
// Access Token (JWT)
{
  "sub": "user_id",
  "iss": "https://api.example.com",
  "aud": "https://app.example.com",
  "exp": 1699999999,
  "iat": 1699999999,
  "type": "access",
  "role": "admin",
  "permissions": ["read:orders", "write:orders", "delete:orders"]
}

// Refresh Token (opaque or JWT)
{
  "sub": "user_id",
  "type": "refresh",
  "exp": 1709999999,
  "family": "token_family_id"
}
```

### Password Requirements
* Hash: bcrypt (cost 12+), argon2, or scrypt
* Min length: 12 chars
* Require: uppercase, lowercase, number, special
* NO: common passwords, dictionary words, user info
* Store: `bcrypt.hash(password, 12)`

## 3. AUTH DESIGN DIRECTIVES (Bias Correction)

### Rule 1: Token Lifecycle
* Access token: 15 min - 1 hour (no refresh needed mid-session)
* Refresh token: 7-30 days with rotation on use
* Invalidate refresh token after each use (rotation)
* Blacklist tokens on logout/reset

### Rule 2: Authorization Models
* RBAC: Role-based (user, admin, moderator)
* ABAC: Attribute-based for complex rules
* Permissions: Granular, not just role-based
* Default deny: Explicit permission required

### Rule 3: Security Headers
```
Authorization: Bearer <token>
X-Request-ID: <uuid>
X-Forwarded-User: <if behind proxy>
```

### Rule 4: OAuth2 Flows
* Authorization Code + PKCE for SPAs/mobile
* Client Credentials for service auth
* Device flow for IoT
* NEVER: Implicit flow (deprecated)

## 4. IMPLEMENTATION PATTERNS

### Middleware Pattern
```typescript
// Auth middleware
async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }
  
  const token = authHeader.slice(7);
  try {
    const payload = await verifyJWT(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Permission middleware
function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}
```

### Login Flow
1. Validate credentials
2. Check password hash
3. Generate access + refresh tokens
4. Store refresh token (rotation)
5. Return tokens with expiration

### Logout Flow
1. Invalidate access token (if blacklist)
2. Remove refresh token from storage
3. Clear session data

## 5. SECURITY REQUIREMENTS

### Password Security
* NO storing plain text passwords
* NO: MD5, SHA1 (not for passwords)
* YES: bcrypt, argon2, scrypt
* Implement: password reset, not recovery (security)

### Rate Limiting
* Login: 5 attempts per minute, then 15 min lockout
* Token refresh: 10/min max
* API: 1000/hour per user

### Session Management
* Concurrent sessions: Configurable limit
* Session timeout: 30 min idle, 8 hour max
* Secure session cookies: `HttpOnly`, `Secure`, `SameSite=Strict`

### Multi-Factor Auth
* TOTP (authenticator apps)
* Backup codes (single-use)
* Optional for: admin, sensitive actions

## 6. PERFORMANCE GUARDRAILS
* Token verification: Cache public keys
* Login attempts: Redis for rate limiting
* Session store: Redis or DB with cleanup
* JWT: Minimal claims (no sensitive data in payload)
* Logout: Async, don't block response

## 7. DIAL DEFINITIONS

### AUTH_COMPLEXITY (1-10)
* 1-3: Basic email/password, simple roles
* 4-7: JWT, OAuth social, granular permissions
* 8-10: Multi-tenant, SSO, SAML, enterprise IAM

### SECURITY_LEVEL (1-10)
* 1-3: Basic auth, minimal encryption
* 4-7: JWT, HTTPS, rate limiting
* 8-10: mTLS, hardware keys, audit logging, compliance

### TOKEN_LIFESPAN (1-10)
* 1-3: Days/weeks, persistent sessions
* 4-7: Hours, daily refresh
* 8-10: Minutes, continuous rotation

### MFA_ENABLED (1-10)
* 1-3: Optional, not enforced
* 4-7: Recommended for sensitive actions
* 8-10: Required everywhere

## 8. AI TELLS (FORBIDDEN PATTERNS)

### Authentication
* NO storing passwords in plain text
* NO: sending passwords in URLs or logs
* NO: JWT without expiration
* NO: using base64 encoded secrets

### Authorization
* NO: trusting client-provided roles
* NO: broken access control (IDOR)
* NO: privilege escalation paths
* NO: missing authorization checks

### Token Security
* NO: sensitive data in JWT payload (it can be decoded)
* NO: long-lived refresh tokens without rotation
* NO: storing tokens in localStorage (cookies only)
* NO: not invalidating tokens on password change

### Error Handling
* NO: exposing user existence in login errors ("User not found")
* NO: leaking sensitive info in error messages
* YES: generic "Invalid credentials" for all auth failures

## 9. THE CREATIVE ARSENAL

### Advanced Auth Patterns
* Passkeys/WebAuthn: Passwordless authentication
* OAuth2 Device Flow: For CLI and IoT
* Token exchange: Delegation for service-to-service
* Evidence locker: Step-up authentication

### Enterprise Features
* SAML 2.0: Enterprise SSO integration
* SCIM: User provisioning/deprovisioning
* Directory sync: LDAP/Active Directory
* Audit logs: Every auth event tracked

### Security Monitoring
* Anomaly detection: Unusual login patterns
* Brute force detection: IP-based blocking
* Session analysis: Concurrent session alerts
* Token fingerprinting: Device binding

## 10. FINAL PRE-FLIGHT CHECK

- [ ] Passwords properly hashed (bcrypt/argon2)?
- [ ] JWT tokens have expiration and proper claims?
- [ ] Refresh token rotation implemented?
- [ ] Rate limiting on auth endpoints?
- [ ] Authorization middleware on all protected routes?
- [ ] Role/permission checks granular and explicit?
- [ ] HTTPS enforced for all auth flows?
- [ ] Secure cookie settings (HttpOnly, Secure, SameSite)?
- [ ] Logout invalidates tokens properly?
- [ ] Auth errors are generic (no info leakage)?