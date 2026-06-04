---
name: threat-detection
description: >
  Security specialist for SIEM rules, threat hunting, MITRE ATT&CK mapping,
  detection engineering, and security monitoring.
  Trigger: When building detection rules, threat hunting, SIEM configuration,
  security monitoring, or mapping attacks to MITRE ATT&CK.
---

## When to Use

- Building SIEM detection rules
- Threat hunting in logs and telemetry
- Mapping attacks to MITRE ATT&CK framework
- Designing security monitoring and alerting
- Detection engineering (writing, testing, tuning rules)

## MITRE ATT&CK Quick Reference

### Most Common Tactics to Detect

| Tactic | ID | Key Techniques to Detect |
|--------|-----|--------------------------|
| Initial Access | TA0001 | Phishing links, exploit public app, valid accounts |
| Execution | TA0002 | PowerShell, WMI, cron jobs, shell commands |
| Persistence | TA0003 | Scheduled tasks, startup items, new service, registry run keys |
| Privilege Escalation | TA0004 | SUID abuse, token manipulation, UAC bypass |
| Defense Evasion | TA0005 | Process injection, log deletion, disable security tools |
| Credential Access | TA0006 | Brute force, credential dumping, kerberoasting |
| Lateral Movement | TA0008 | Pass-the-hash, RDP, SMB, SSH lateral movement |
| Exfiltration | TA0010 | DNS tunneling, large uploads, unusual data transfer |

## Detection Rule Patterns

### Sigma Rule Template (Universal SIEM Format)
```yaml
title: Suspicious PowerShell Execution
id: <uuid>
status: stable
level: high
description: Detects PowerShell execution with encoded commands
author: security-team
references:
  - https://attack.mitre.org/techniques/T1059/001/
tags:
  - attack.execution
  - attack.t1059.001
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    Image|endswith: '/powershell.exe'
    CommandLine|contains:
      - '-EncodedCommand'
      - '-enc'
      - '-ec'
  condition: selection
falsepositives:
  - Legitimate admin scripts
  - Software installers
```

### Key Detection Categories

| Category | What to Detect | Log Source |
|----------|---------------|------------|
| **Authentication** | Brute force, impossible travel, off-hours login | Auth logs, IAM |
| **Privilege Escalation** | SUID usage, sudo to root, role changes | Audit logs, OS logs |
| **Data Exfiltration** | Large outbound transfers, unusual destinations | NetFlow, DNS, proxy |
| **Malware** | Known IOCs, suspicious process chains | EDR, AV |
| **Insider** | Abnormal access patterns, mass download | DLP, access logs |

### High-Fidelity Detection Rules (Low False Positive)

```bash
# Impossible travel: login from two countries within 1 hour
source.geo.country_name != previous_source.geo.country_name
AND time_diff < 1h

# Off-hours admin activity (outside business hours)
user.role == "admin" AND time NOT IN (09:00-18:00 UTC)
AND action IN (config_change, user_create, permission_grant)

# Brute force: >10 failed logins from same source in 5 minutes
count(failed_login) > 10
GROUP BY source_ip
WINDOW 5m

# Data exfiltration: >500MB outbound to unusual destination
bytes_out > 500MB
AND destination NOT IN known_destinations
AND NOT destination.category == "cdn"
```

## Threat Hunting Methodology

### Hypothesis-Driven Hunting
```
1. FORM HYPOTHESIS: "If attacker X is in our network, they would use technique Y"
2. IDENTIFY DATA: What logs/telemetry would show technique Y?
3. QUERY: Search for indicators matching the hypothesis
4. ANALYZE: Review results, eliminate false positives
5. CONCLUSION: Confirm/deny hypothesis, create detection rule if confirmed
```

### Common Hunt Queries
```bash
# Find processes spawned by unusual parents
parent_process NOT IN (explorer.exe, cmd.exe, services.exe, svchost.exe)
AND child_process IN (powershell.exe, cmd.exe, bash)

# Find suspicious scheduled tasks (persistence)
schtasks /create OR crontab -e
AND task_command|contains: (download, http, base64, script)

# Find credential dumping attempts
process|contains: (mimikatz, procdump, lsass, sam) OR
access_mask: (PROCESS_VM_READ) AND target: lsass.exe

# Find DNS tunneling
dns.query.length > 50 AND dns.query.type == "TXT"
OR unique_subdomain_count > 100 per_minute
```

## Alert Severity Framework

| Level | Criteria | Response SLA |
|-------|----------|---------------|
| **Critical** | Active breach, data exfiltration, ransomware | <15 min |
| **High** | Credential compromise, privilege escalation, C2 | <1 hr |
| **Medium** | Suspicious behavior, policy violation, anomalous access | <4 hrs |
| **Low** | Informational, known false positive pattern | <24 hrs |
| **Info** | Contextual, correlation data, hunting output | No SLA |

## SIEM Rule Quality Checklist

- [ ] Rule has clear, descriptive title and MITRE ATT&CK mapping
- [ ] False positive rate documented and acceptable (<5% for high/critical)
- [ ] Rule has been tested against sample data (true positive + benign)
- [ ] Alert includes context: user, host, time, affected asset
- [ ] Runbook exists for response (or linked to existing runbook)
- [ ] Rule is tuned for environment (exclude known benign sources)
- [ ] Rule has owner and review date (quarterly review minimum)

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]