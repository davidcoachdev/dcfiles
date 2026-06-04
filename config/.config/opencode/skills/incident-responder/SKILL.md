---
name: incident-responder
description: >
  Production incident response expert for debugging, log analysis, root cause analysis, structured response coordination, post-mortem facilitation, and on-call process design.
  Trigger: When debugging production issues, incident response, system recovery, on-call, or post-mortem.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "2.0"
  enhanced-by: agency-agents
---

## When to Use

- Production incidents and outages
- Debugging production issues
- Log analysis and root cause analysis
- System recovery and mitigation
- On-call process design
- Post-mortem facilitation
- SLO/SLI definition and tracking

## Severity Classification (SEV1–SEV4)

| Level | Impact | Response Time | Example |
|-------|--------|---------------|---------|
| SEV1 | Total outage, revenue loss | <5 min page | Site down, data loss |
| SEV2 | Major feature degraded | <15 min | Payment failures, 50% errors |
| SEV3 | Minor feature impacted | <1 hr | Slow dashboard, non-critical API |
| SEV4 | Cosmetic/informational | Next business day | UI glitch, wrong timezone |

## Incident Response Roles

| Role | Responsibility |
|------|---------------|
| Incident Commander | Coordinates response, makes decisions, owns timeline |
| Communications Lead | Stakeholder updates at fixed intervals |
| Technical Lead | Drives troubleshooting and remediation |
| Scribe | Documents timeline, actions, decisions in real-time |

## Critical Rules During Incidents

1. Classify severity FIRST — determines escalation and communication cadence
2. Assign roles before troubleshooting — chaos multiplies without coordination
3. Update stakeholders at fixed intervals, even if "no change, still investigating"
4. Document in real-time — Slack channel is source of truth, not memory
5. Timebox investigation: if hypothesis not confirmed in 15 min, pivot to next

## Response Workflow

```
DETECT → TRIAGE → DECLARE → INVESTIGATE → MITIGATE → RESOLVE → LEARN
```

### Triage Checklist

- [ ] Severity classified (SEV1–SEV4)
- [ ] Incident channel created
- [ ] Roles assigned (IC, Comms, Tech, Scribe)
- [ ] Stakeholder notification sent
- [ ] Monitoring dashboards pulled up

### Investigation Pattern

1. Check service health: `kubectl get pods -n <namespace>`
2. Review error rates in monitoring dashboard
3. Check recent deployments: `kubectl rollout history deployment/<service>`
4. Review dependency health and status pages
5. Timebox each hypothesis to 15 minutes

### Mitigation Options (in priority order)

1. **Rollback** — if deploy-related, undo to last known good
2. **Restart** — if state corruption suspected, rolling restart
3. **Scale up** — if capacity-related, increase replicas
4. **Feature flag off** — disable the offending feature
5. **DNS failover** — if regional, route to healthy region

## Post-Mortem Template

```markdown
# Post-Mortem: [Title]
**Date**: YYYY-MM-DD | **Severity**: SEV[1-4] | **Duration**: Xh Ym

## Executive Summary
[2-3 sentences: what happened, who affected, how resolved]

## Impact
- Users affected: [number/%]
- Revenue impact: [estimated]
- SLO budget consumed: [X% of monthly error budget]

## Timeline (UTC)
| Time | Event |
|------|-------|
| HH:MM | Alert fires |
| HH:MM | On-call acknowledges |
| HH:MM | Root cause hypothesis |
| HH:MM | Mitigation initiated |
| HH:MM | Resolution confirmed |

## 5 Whys (Root Cause)
1. Why did it happen? → [answer]
2. Why did that happen? → [answer]
3. Why did that happen? → [answer]
4. Why did that happen? → [answer]
5. Root systemic issue → [answer]

## Action Items
| ID | Action | Owner | Priority | Due | Status |
|----|--------|-------|----------|-----|--------|
```

## SLO/SLI Framework

```yaml
service: example-api
owner: backend-team
slis:
  availability: "successful_requests / total_requests"
  latency_p99: "histogram_quantile(0.99, rate(...))"
slos:
  availability: 99.9%
  latency_p99: 400ms
error_budget:
  monthly: 43min (0.1% of 30d)
```

## On-Call Best Practices

- Rotate fairly, prevent burnout (max 1 week primary)
- Maintain tested runbooks for known failure scenarios
- Conduct game days quarterly to validate readiness
- Never skip severity classification — it determines escalation
- Every incident must produce timeline + action items within 48 hours

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]