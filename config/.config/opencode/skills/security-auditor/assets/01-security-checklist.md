# Security Audit Checklist

## Authentication
- [ ] Passwords hashed with bcrypt/argon2
- [ ] JWT tokens have expiration
- [ ] Refresh tokens stored securely
- [ ] MFA implemented

## Authorization
- [ ] Role-based access control (RBAC)
- [ ] Principle of least privilege
- [ ] API endpoints protected

## Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] HTTPS/TLS for data in transit
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection (input validation)

## Infrastructure
- [ ] Firewall rules configured
- [ ] Secrets not in version control
- [ ] Logging and monitoring enabled
- [ ] Regular backups tested
