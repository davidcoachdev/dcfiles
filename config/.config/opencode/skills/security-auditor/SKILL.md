---
name: security-auditor
description: >
  Security specialist for vulnerability assessment, penetration testing, threat modeling, and compliance auditing.
  Trigger: When doing security audits, vulnerability assessments, penetration testing, threat modeling, or compliance reviews.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "2.0"
  enhanced-by: agency-agents
---

## When to Use

- Security audits and vulnerability assessments
- Penetration testing
- Threat modeling (before code is written)
- Compliance reviews (SOC2, HIPAA, PCI-DSS)
- Secure code review
- Security architecture design

## Adversarial Thinking Framework

When reviewing any system, always ask:
1. **What can be abused?** — Every feature is an attack surface
2. **What happens when this fails?** — Assume every component will fail; design for graceful, secure failure
3. **Who benefits from breaking this?** — Understand attacker motivation
4. **What's the blast radius?** — Compromised component shouldn't take down everything

## Security-First Principles

1. **Never disable security controls** as a "fix" — find the root cause
2. **All user input is hostile** — validate and sanitize at every trust boundary
3. **No custom crypto** — use libsodium, OpenSSL, Web Crypto API. Never roll your own
4. **Secrets are sacred** — no hardcoded creds, no secrets in logs, no client-side secrets
5. **Default deny** — whitelist over blacklist in access control, CORS, CSP
6. **Fail securely** — errors must not leak stack traces, internal paths, or DB schemas
7. **Least privilege everywhere** — IAM roles, DB users, API scopes, container capabilities
8. **Defense in depth** — never rely on a single layer; assume any layer can be bypassed

## Vulnerability Severity Classification

| Level | Examples | Action |
|-------|----------|--------|
| **Critical** | RCE, auth bypass, SQL injection with data access | Fix immediately, block deploy |
| **High** | Stored XSS, IDOR with sensitive data, privilege escalation | Fix within 24h, track SLA |
| **Medium** | CSRF on state-changing actions, missing security headers | Fix within sprint |
| **Low** | Clickjacking on non-sensitive pages, minor info disclosure | Backlog |
| **Info** | Best practice deviations, defense-in-depth improvements | Document |

**Every finding must include**: severity, proof of exploitability, concrete remediation with code.

## OWASP Top 10 (2021+) Quick Reference

| # | Category | Key Check |
|---|----------|-----------|
| A01 | Broken Access Control | IDOR, missing auth checks, privilege escalation |
| A02 | Cryptographic Failures | Plaintext storage, weak algorithms, missing TLS |
| A03 | Injection | SQLi, NoSQLi, CMDi, template injection, LDAP injection |
| A04 | Insecure Design | Missing threat modeling, no abuse cases |
| A05 | Security Misconfiguration | Default creds, open S3 buckets, verbose errors |
| A06 | Vulnerable Components | Outdated deps with known CVEs, unmaintained packages |
| A07 | Auth Failures | Weak passwords, missing MFA, session fixation |
| A08 | Data Integrity Failures | Insecure deserialization, unsigned updates, CI poisoning |
| A09 | Logging Failures | Missing audit trails, no alerting on auth failures |
| A10 | SSRF | Internal network scanning, cloud metadata access |

## Threat Modeling Checklist

```
1. Draw the architecture diagram (services, data flows, trust boundaries)
2. Identify assets (data, credentials, services, infrastructure)
3. For each asset, identify: who can access it? how? from where?
4. Apply STRIDE per component:
   - Spoofing: Can someone impersonate a user/service?
   - Tampering: Can someone modify data in transit/at rest?
   - Repudiation: Can actions be denied? (audit trail)
   - Info Disclosure: Can someone see data they shouldn't?
   - Denial of Service: Can someone overwhelm the system?
   - Elevation of Privilege: Can someone gain higher access?
5. Rank threats by likelihood × impact
6. Design mitigations for top threats
```

## Security Architecture Patterns

- **Zero Trust**: Least-privilege access + microsegmentation
- **Defense in Depth**: WAF → rate limiting → input validation → parameterized queries → output encoding → CSP
- **Auth**: OAuth 2.0 + PKCE, OIDC, passkeys/WebAuthn, MFA enforcement
- **Authorization**: RBAC, ABAC, ReBAC — match to application needs
- **Secrets Management**: HashiCorp Vault, AWS Secrets Manager, SOPS with rotation
- **Encryption**: TLS 1.3 in transit, AES-256-GCM at rest, proper key rotation

## Supply Chain Security

- Audit third-party deps for CVEs + maintenance status
- Generate SBOM (Software Bill of Materials)
- Pin dependencies + use lock files
- Verify package integrity (checksums, signatures)
- Monitor for dependency confusion and typosquatting

## Security Domains

### Application Security
- OWASP Top 10, CWE Top 25
- Input validation, auth/authorization, cryptography
- API security: BOLA, BFLA, rate limiting, GraphQL introspection

### Infrastructure Security
- Network segmentation, container security, cloud posture
- IAM least-privilege, secrets management, encryption at rest/transit

### Compliance
- SOC 2 Type II, HIPAA, PCI-DSS, GDPR, ISO 27001

## Tools

- **SAST**: Semgrep, CodeQL, SonarQube
- **DAST**: Burp Suite, OWASP ZAP, Nuclei
- **SCA**: Snyk, Trivy, Dependabot
- **IaC**: Checkov, tfsec, Kics
- **Secrets**: GitLeaks, TruffleHog, detect-secrets

## Resources

See `references/` for detailed guides:

- **`references/security-best-practices.md`** - Input validation, SQL injection prevention, authentication, CORS/CSRF, rate limiting

Code examples in `assets/`:
- **`assets/security-patterns-example.ts`** - Complete working examples with validation, authentication, CORS, rate limiting, secure headers

## External Resources

- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **CWE Top 25**: https://cwe.mitre.org/top25/
- **OWASP ASVS**: https://owasp.org/www-project-application-security-verification-standard/
- **NIST CSF**: https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final