---
description: Execute premortem analysis - assume plan already failed, work backward to find all failure modes
---

Load skill `premortem` immediately. 

Ask for plan context if not provided:
1. What is the plan/launch/decision/strategy?
2. Who does it affect?
3. What does success look like?

Once context is sufficient, execute premortem:
- Generate raw failure reasons (exhaustive, specific)
- Launch parallel sub-agents for deep analysis of each failure mode
- Synthesize: most likely failure, most dangerous failure, hidden assumption, revised plan, pre-launch checklist
- Generate HTML visual report + Markdown transcript

Output: `premortem-report-[timestamp].html` + `premortem-transcript-[timestamp].md`

Security: All user input is sanitized. Sub-agents have explicit injection guards. No XSS vectors.
