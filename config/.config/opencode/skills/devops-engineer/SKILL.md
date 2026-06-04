---
name: devops-engineer
description: >
  DevOps and infrastructure expert specializing in CI/CD, containerization, cloud platforms,
  SRE practices, observability, and infrastructure automation.
  Trigger: When setting up CI/CD, Docker, Kubernetes, DevOps practices, SRE, observability,
  infrastructure automation, or on-call processes.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "2.0"
  enhanced-by: agency-agents
---

## When to Use

- CI/CD pipelines and GitOps
- Container orchestration (Docker, Kubernetes)
- Infrastructure as Code (Terraform, CloudFormation)
- Cloud deployment (AWS, GCP, Azure)
- Observability and monitoring (Prometheus, Grafana)
- SRE practices (SLOs, error budgets, chaos engineering)
- On-call process design

## SRE & Reliability Engineering

### SLO/SLI/SLA Framework
```
SLI (Service Level Indicator): The metric you measure
  → "Proportion of requests returning 200 OK"

SLO (Service Level Objective): The target you set
  → "99.9% of requests return 200 OK over 30 days"

SLA (Service Level Agreement): The promise to customers
  → "99.9% availability or we credit your account"

Error Budget = 1 - SLO
  → 99.9% SLO = 0.1% error budget = 43.2 min/month
```

### Error Budget Policy
| Budget Remaining | Action |
|-----------------|--------|
| > 50% | Normal operations, deploy freely |
| 25-50% | Increased caution, slower rollouts |
| < 25% | Freeze non-critical deploys, focus on reliability |
| 0% | Code freeze, reliability work only |

### On-Call Best Practices
- Rotate fairly, max 1 week primary
- Create and maintain runbooks for known failure scenarios
- Conduct game days quarterly to validate readiness
- Alert fatigue is real — tune alerts to be actionable, not noisy
- Every page must have a runbook linked or it's a bad alert

## CI/CD Pipeline Patterns

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm run deploy:staging
      - run: npm run test:e2e
      - run: npm run deploy:prod
```

### Deployment Strategies

| Strategy | Risk | Complexity | Rollback |
|----------|------|-----------|----------|
| Rolling update | Low | Low | Quick (k8s rollout undo) |
| Blue-green | Zero downtime | Medium | Switch DNS |
| Canary | Minimal | High | Stop canary traffic |
| Feature flag | Minimal | Low | Toggle off |

## Kubernetes Essentials

### Health Checks
```yaml
livenessProbe:
  httpGet: { path: /healthz, port: 8080 }
  initialDelaySeconds: 10
  periodSeconds: 15
readinessProbe:
  httpGet: { path: /ready, port: 8080 }
  initialDelaySeconds: 5
  periodSeconds: 10
startupProbe:
  httpGet: { path: /healthz, port: 8080 }
  failureThreshold: 30
  periodSeconds: 10
```

### Resource Limits (Always Set)
```yaml
resources:
  requests: { cpu: 100m, memory: 128Mi }
  limits: { cpu: 500m, memory: 512Mi }
```

### Kubectl Troubleshooting Cheatsheet
```bash
kubectl get pods -A | grep -v Running    # Find unhealthy pods
kubectl logs <pod> --previous             # Previous container logs
kubectl describe pod <pod>               # Events and conditions
kubectl exec -it <pod> -- sh             # Shell into container
kubectl top pods -n <namespace>          # Resource usage
kubectl rollout undo deploy/<name>        # Rollback deployment
```

## Observability Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Metrics | Prometheus + Grafana | Time-series, alerting, dashboards |
| Logs | Loki / ELK |Structured log aggregation |
| Traces | Jaeger / Tempo | Distributed request tracing |
| Alerting | Alertmanager | Route alerts to correct team |
| Synthetic | Blackbox Exporter | Uptime monitoring |

### Alert Quality Rules
1. Every alert must be **actionable** — if you can't act on it, it's noise
2. Every alert must link to a **runbook**
3. Page only for **symptoms** (user impact), not causes (CPU high)
4. **Severity-based routing**: SEV1 → page, SEV2 → page, SEV3 → ticket, SEV4 → log

## Infrastructure as Code Rules

1. **Immutable infrastructure** — never SSH into servers; rebuild from IaC
2. **Least privilege** — IAM roles minimal, security groups restrictive
3. **State management** — Terraform state in remote backend, lock with DynamoDB
4. **Drift detection** — run `terraform plan` nightly, alert on drift
5. **Module reuse** — DRY within reason; don't over-abstract
6. **Secrets management** — Vault/AWS Secrets Manager, never in tfvars

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]