---
name: ats-keyword-strategy
description: ATS keyword optimization, resume keywords, keyword matching, keyword optimization, tailor resume, resume tailoring — extract and match keywords, calculate match scores, quantify achievements, and tailor resumes for specific roles
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# ATS Keyword Strategy

## When to Use This Skill

Use this skill when the user wants to:
- Extract and match keywords from job descriptions
- Calculate their resume's keyword match score
- Quantify achievements with metrics and numbers
- Tailor their resume for a specific job or company
- Rewrite professional summaries, experience bullets, or skills sections
- Mentions keywords like: "ATS keyword", "keyword optimization", "resume keywords", "keyword matching", "tailor resume", "resume tailoring", "match score", "quantify achievements"

Also use after `resume-ats-optimizer` has confirmed ATS compatibility — this skill handles the content, not the formatting.

## Core Capabilities

- Extract and analyze keywords from job descriptions
- Calculate match scores between resume and job postings
- Quantify achievements using the Quantification Framework
- Rewrite professional summaries, experience bullets, and skills sections
- Reorder and reorganize resume sections by role type
- Tailor resumes for specific companies and roles
- Manage master resume and tailored versions

## Keyword Optimization Process

### Step 1: Extract Job Description Keywords

Identify three types of keywords:

**Hard Skills (Technical)**
- Programming languages (Python, Java, SQL)
- Tools and platforms (Salesforce, AWS, Excel)
- Certifications (PMP, CPA, CFA)
- Methodologies (Agile, Six Sigma, SDLC)

**Soft Skills**
- Leadership, collaboration, communication
- Problem-solving, analytical thinking
- Project management, stakeholder management

**Industry Terms**
- B2B, SaaS, e-commerce
- Enterprise, SMB, mid-market
- ARR, MRR, churn rate

### Step 2: Match Analysis

For each keyword in job description:
1. Check if exact phrase appears in resume
2. Check for synonyms or variations
3. Count frequency of mention
4. Note location (summary, experience, skills)

### Step 3: Calculate Match Score

```
Match Score = (Keywords Matched / Total Required Keywords) × 100

Example:
Job has 20 required keywords
Your resume has 15 of them
Match Score = 75%

Target: 80%+ for strong match
```

### Step 4: Keyword Placement Strategy

**Priority 1: Professional Summary (Top of Resume)**
- Include 5-8 most important keywords
- Use naturally in 3-4 sentence paragraph
- Example: "Data Scientist with 5+ years using Python, SQL, and machine learning to drive business insights..."

**Priority 2: Skills Section**
- List keywords explicitly
- Group by category if needed
- Use exact phrasing from job description

**Priority 3: Experience Bullets**
- Incorporate keywords into achievement statements
- Don't force keywords unnaturally
- Use variations throughout

**Keyword Density Guidelines:**
- Critical keywords: Appear 2-4 times throughout resume
- Important keywords: Appear 1-2 times
- Don't keyword stuff - keep it natural
- Vary phrasing (e.g., "led team" and "team leadership")

## Analysis Output Format

When analyzing a resume, provide this structured report:

```markdown
# ATS COMPATIBILITY REPORT

## Overall Score: [X]/100

### File Format Check ✅/❌
- Format: [DOCX/PDF]
- Text extraction: [Success/Failed]
- File size: [X KB/MB]

### Formatting Issues
✅ No tables or columns detected
❌ Contact info in header (move to body)
⚠️  Two different font sizes in skills section

### Keyword Analysis

JOB REQUIREMENTS vs YOUR RESUME:

**Critical Keywords (Must Have):**
✅ Project Management - Found 3x
✅ Agile/Scrum - Found 2x
❌ Stakeholder Management - MISSING (mentioned 5x in JD)
❌ Budget Management - MISSING (mentioned 3x in JD)

**Important Keywords:**
✅ Cross-functional teams - Found 1x
⚠️  "Risk management" - You have "risk mitigation" (close but not exact match)
✅ Process improvement - Found 2x

**Match Score: 65%**
Target: 80%+ recommended

### Recommended Changes

**1. Add Missing Keywords:**

In Professional Summary, change:
"Experienced project manager with proven track record..."

To:
"Experienced project manager with proven track record in stakeholder management and budget oversight..."

In Experience section, add bullet:
"Managed stakeholder communication across 3 departments and executive leadership team"
"Directed budget management for $2.5M project portfolio"

**2. Fix Formatting:**
- Move contact information from header to body of resume
- Make all skill section items same font size (currently 10pt and 11pt mixed)

**3. Strengthen Existing Keywords:**
Change "risk mitigation" to "risk management" for exact match

### Estimated New Match Score: 85%
```

## Why Quantification Matters

**The Problem:**
- "Managed projects" vs "Managed 12 projects worth $2M"
- "Improved processes" vs "Reduced cycle time by 40%"
- "Helped customers" vs "Resolved 50+ tickets daily with 98% satisfaction"

**Studies Show:**
- Resumes with numbers get 30% more attention
- Quantified bullets are 40% more memorable
- Numbers provide credibility and scale


## The Quantification Framework

### Categories of Metrics

**1. Money**
- Revenue generated
- Costs reduced/saved
- Budget managed
- Deal sizes closed
- Profit margins improved

**2. Time**
- Hours saved
- Cycle time reduced
- Project duration
- Response times
- Time to market

**3. Percentages**
- Growth rates
- Improvement percentages
- Efficiency gains
- Error reduction
- Conversion rates

**4. Volume/Scale**
- Number of customers/users
- Projects managed
- Team size
- Transactions processed
- Items produced

**5. Quality**
- Satisfaction scores
- Error rates
- Accuracy rates
- Compliance rates
- SLA adherence

**6. Frequency**
- Per day/week/month
- Annual totals
- Meeting cadences
- Report cycles


## Finding Hidden Metrics

### The Discovery Questions

For any experience, ask:

**Scale Questions:**
- How many people/projects/customers?
- What was the budget/revenue involved?
- How large was the team?
- How many locations/regions?

**Impact Questions:**
- What changed because of your work?
- What would have happened without you?
- What problems did you solve?
- What got better/faster/cheaper?

**Comparison Questions:**
- How was it before vs. after?
- How did you compare to others/previous results?
- What was the baseline you improved?

### Role-Specific Metric Discovery

**Sales:**
- Quota attainment percentage
- Revenue generated
- Number of deals closed
- Average deal size
- Pipeline generated
- New accounts acquired
- Retention rate

**Marketing:**
- Leads generated
- Campaign ROI
- Engagement rates
- Follower growth
- Website traffic increase
- Conversion rates
- Brand awareness metrics

**Customer Service:**
- Tickets resolved per day
- Customer satisfaction score
- Average response time
- First call resolution rate
- NPS score contribution

**Operations:**
- Efficiency improvements
- Cost reductions
- Process cycle times
- Error rate reductions
- Throughput increases

**Engineering:**
- System uptime
- Performance improvements
- Bug resolution rate
- Deployment frequency
- Code coverage

**Project Management:**
- Number of projects
- Budget sizes
- Team sizes
- On-time delivery rate
- Stakeholders managed

**HR/Admin:**
- Hiring numbers
- Time to fill
- Employee satisfaction scores
- Training completion rates
- Onboarding efficiency


## Estimation Techniques

When you don't have exact numbers:

### Conservative Estimation

**Principle:** Estimate low to maintain credibility

**Example:**
- You think you saved 100 hours/month → say "75+ hours"
- You think growth was 50% → say "~40%"
- You think you served 500 customers → say "400+"

### Range Estimation

**Format:** "X-Y" or "X to Y"

**Examples:**
- "Managed team of 8-12"
- "Generated $100K-$150K in revenue"
- "Saved 20-30 hours weekly"

### Minimum Bound

**Format:** "X+" or "at least X"

**Examples:**
- "Served 100+ customers daily"
- "Managed at least 15 concurrent projects"
- "Generated $500K+ in annual revenue"

### Percentage of Activity

**Format:** Calculate from known totals

**Example:**
- Company had 1000 customers → You managed 20% → "Managed 200 customer accounts"
- Team had 10 people → You supervised 4 → "Supervised 40% of team"

### Time-Based Calculation

**Format:** Work backwards from frequency

**Example:**
- Met with 5 clients/week × 50 weeks = "Consulted with 250+ clients annually"
- Processed 30 invoices/day × 250 days = "Processed 7,500+ invoices annually"


## Quantification Templates

### Before and After Template
```
"Improved [X] from [before number] to [after number], resulting in [Y]% improvement"

Example:
"Improved page load time from 8 seconds to 2 seconds, resulting in 75% reduction and 20% increase in user engagement"
```

### Scale Template
```
"[Verb] [number] [things], resulting in [impact]"

Example:
"Managed 25 concurrent projects worth $3M, delivering 95% on-time with zero budget overruns"
```

### Volume + Impact Template
```
"Processed [number] [items] per [time period], achieving [quality metric]"

Example:
"Resolved 50+ customer tickets daily, maintaining 98% satisfaction rating and 4-hour average response time"
```

### Comparison Template
```
"Ranked #[X] out of [Y] in [metric], [context]"

Example:
"Ranked #2 out of 45 sales representatives nationally, generating $3.2M in annual revenue"
```


## Common "I Have No Numbers" Situations

### Situation 1: "I was just one person on a team"

**Solution:** Focus on YOUR contribution

**Example:**
- "Part of team that launched product" →
- "Contributed 40% of front-end code for product launch reaching 100K users"

### Situation 2: "I don't have access to business metrics"

**Solution:** Quantify activities and inputs

**Example:**
- "Supported sales team" →
- "Created 50+ sales presentations and managed pipeline of 200+ prospects in Salesforce"

### Situation 3: "My job didn't produce measurable outcomes"

**Solution:** Measure the work itself

**Example:**
- "Wrote documentation" →
- "Produced 75-page technical documentation reducing new hire onboarding time by 2 weeks"

### Situation 4: "Results were confidential"

**Solution:** Use percentages or ranges

**Example:**
- "Increased revenue" →
- "Grew revenue by 40%+ year-over-year" or "Contributed to $X-$Y million growth"

### Situation 5: "I was entry-level with limited impact"

**Solution:** Quantify learning, throughput, accuracy

**Example:**
- "Entered data" →
- "Processed 200+ records daily with 99.5% accuracy rate, exceeding team average by 15%"


## Analysis Summary
**Bullets without numbers:** X
**Bullets with numbers:** Y
**Target:** 100% of bullets should have at least one metric


## Quantified Bullets

### Original Bullet #1:
"Managed customer accounts"

### Questions to Find Metrics:
- How many accounts? → [User answer: ~40]
- What was the revenue? → [User answer: ~$2M]
- What results did you achieve? → [User answer: retained most]

### Quantified Version:
"Managed portfolio of 40 enterprise accounts representing $2M ARR, achieving 95% retention rate"

### Metrics Added:
- Account count: 40
- Revenue: $2M ARR
- Retention: 95%

---

### Original Bullet #2:
[Continue for each bullet]


## Estimation Notes
- [Metric]: Estimated based on [reasoning]
- [Metric]: Conservative estimate using [method]


## Remaining Questions
- [Questions to ask user for missing information]
```


## Quantification Quality Checklist

For each bullet:
- ✅ Has at least ONE number
- ✅ Number is relevant (not just any number)
- ✅ Scale is clear (what does the number mean?)
- ✅ Estimation is conservative and defensible
- ✅ Number adds credibility, not confusion
- ✅ You can explain the number in an interview


## Numbers to Avoid

- ❌ Numbers that make you look bad
- ❌ Numbers you can't explain or defend
- ❌ Numbers that reveal confidential information
- ❌ Exaggerated or inflated numbers
- ❌ Numbers without context (e.g., "increased by 300%" without baseline)
- ❌ Too many numbers in one bullet (2-3 max)


## Key Principle

**Every bullet can be quantified.** If you think your work can't be measured, you haven't asked the right questions yet.

The goal isn't to have impressive numbers—it's to have SPECIFIC numbers that show the scope and impact of your work.


## Professional Summary Section

### When to Include

**Include Summary If:**
- Career changers (need to explain transition)
- Senior professionals (distill long career)
- Returning to workforce (address gaps)
- Highly specialized role (emphasize fit)

**Skip Summary If:**
- Entry level with limited experience
- Straightforward career progression
- Space is at a premium

### Summary Framework

**Formula:** [Title/Identity] + [Years/Experience] + [Key Skills] + [Value Proposition]

### By Career Stage

**Entry Level:**
```
Recent Computer Science graduate from UC Berkeley with internship experience in full-stack development. Skilled in Python, React, and AWS. Seeking to leverage academic projects in machine learning and user-facing application development in a software engineering role.
```

**Mid-Career:**
```
Product Manager with 6 years driving B2B SaaS products from concept to scale. Track record of launching products that generated $10M+ ARR through data-driven roadmap prioritization and cross-functional leadership. Expert in API products, developer tools, and enterprise sales motions.
```

**Senior/Executive:**
```
Technology executive with 15+ years building and scaling engineering organizations from 50 to 500+ across global markets. Proven success leading digital transformation initiatives, M&A integration, and platform modernization. P&L ownership of $100M+ with track record of 40%+ efficiency improvements.
```

**Career Changer:**
```
Sales professional transitioning to Customer Success, bringing 5 years of consultative selling experience and proven ability to build lasting client relationships. Skilled in needs assessment, solution design, and stakeholder management. Seeking to apply relationship-building expertise to drive customer retention and expansion.
```

### Summary Don'ts

- ❌ "Seeking a challenging position..."
- ❌ "Hard-working team player..."
- ❌ "Results-oriented professional..."
- ❌ Third person ("John is a...")
- ❌ Objectives (what you want vs. what you offer)


## Experience Section

### Standard Format

```
COMPANY NAME | City, State
Job Title | Start Date - End Date

• Achievement bullet with metric and impact
• Achievement bullet with metric and impact
• Achievement bullet with metric and impact
```

### Bullet Guidelines by Career Stage

**Entry Level (0-2 years):**
- 3-5 bullets per role
- Include relevant projects
- Quantify where possible
- Show initiative and learning

**Mid-Career (3-10 years):**
- 4-6 bullets for recent roles
- 2-3 bullets for older roles
- Focus on achievements over duties
- Strong metrics throughout

**Senior (10+ years):**
- 5-6 bullets for recent roles
- 2-3 bullets for older roles
- Emphasize leadership and strategy
- Show increasing scope

### Handling Different Situations

**Multiple Roles at Same Company:**
```
COMPANY NAME | City, State
Senior Manager | 2021 - Present
• [Bullets for current role]

Manager | 2019 - 2021
• [Bullets for previous role]

Analyst | 2017 - 2019
• [Bullets for earliest role]
```

**Short Tenure:**
- Include if relevant experience
- Frame around project or achievement
- Don't apologize or explain in resume

**Contract/Freelance:**
```
Freelance Product Consultant | 2022 - Present
Clients include: Company A, Company B, Company C
• [Achievement with Client A]
• [Achievement with Client B]
```


## Education Section

### Standard Format

```
EDUCATION

Bachelor of Science in Computer Science
University of California, Berkeley | 2020
GPA: 3.8/4.0 | Honors: Magna Cum Laude
```

### What to Include by Career Stage

**Entry Level:**
- Degree, major, school, year
- GPA (if 3.5+)
- Honors and awards
- Relevant coursework
- Academic projects
- Study abroad

**Mid-Career:**
- Degree, major, school, year
- GPA only if exceptional
- Skip coursework (replaced by experience)

**Senior:**
- Degree, school
- May skip year (age discrimination)
- Professional development more relevant

### Advanced Degrees

```
MBA, Finance & Strategy
Harvard Business School | 2022
• Leadership Fellow
• Relevant coursework: Corporate Finance, M&A Strategy

M.S. in Computer Science
Stanford University | 2018
• Specialization: Artificial Intelligence
• Thesis: "Title of Thesis"
```

### Certifications

```
CERTIFICATIONS
AWS Solutions Architect Associate | Amazon Web Services | 2023
PMP (Project Management Professional) | PMI | 2022
Google Analytics Certified | Google | 2023
```


## Additional Sections

### When to Include Each

**Projects Section:**
- Entry level with limited work experience
- Career changers showing new skills
- Technical roles with personal projects

**Volunteer Section:**
- Relevant volunteer experience
- Leadership roles
- Fills employment gaps meaningfully

**Languages:**
- If relevant to role/company
- List proficiency levels accurately
- Only if beyond basic conversational

**Publications/Patents:**
- Academic positions
- Research roles
- Technical thought leadership

**Awards/Recognition:**
- Significant industry awards
- Company-wide recognition
- Relevant honors

### Format Examples

**Projects:**
```
PROJECTS
E-commerce Platform | React, Node.js, PostgreSQL | github.com/user/project
• Built full-stack marketplace with 500+ active users
• Implemented payment processing with Stripe integration
```

**Volunteer:**
```
VOLUNTEER EXPERIENCE
Board Member | Local Nonprofit | 2021 - Present
• Led fundraising committee, increasing annual donations by 40%
```

**Languages:**
```
LANGUAGES
English (Native) | Spanish (Professional) | Mandarin (Conversational)
```


## Section Order by Role Type

### Standard Order
1. Contact
2. Summary (optional)
3. Skills
4. Experience
5. Education
6. Additional

### Technical Roles
1. Contact
2. Skills (prioritized)
3. Experience
4. Projects
5. Education
6. Certifications

### Recent Graduate
1. Contact
2. Education (prioritized)
3. Skills
4. Experience/Internships
5. Projects
6. Activities

### Executive
1. Contact
2. Executive Summary
3. Career Highlights
4. Experience
5. Board Roles
6. Education

### Career Changer
1. Contact
2. Summary (explaining transition)
3. Skills (transferable)
4. Experience (reframed)
5. Bridge Experience
6. Education


## For: [User's situation/role]

### Recommended Section Order
1. [Section] - [Why]
2. [Section] - [Why]
...

### Section Details

#### Professional Summary
**Recommendation:** [Include/Skip]
**Draft:**
[Written summary if recommended]

#### Skills Section
**Format:** [Simple/Categorized/Proficiency]
**Content:**
[Organized skills list]

#### Experience Section
**Format:** [Standard/Functional/Hybrid]
**Bullets per Role:**
- Recent: [X] bullets
- Older: [X] bullets

#### Education Section
**Include:**
- [Items to include]
**Exclude:**
- [Items to exclude]

#### Additional Sections
**Recommended:** [Section name] because [reason]
**Skip:** [Section name] because [reason]


## Section-Building Checklist

- ✅ Section order optimized for role
- ✅ Summary is concise and targeted (if included)
- ✅ Skills are relevant and organized
- ✅ Experience bullets are achievement-focused
- ✅ Education appropriate for career stage
- ✅ Additional sections add value (not filler)
- ✅ Consistent formatting throughout
- ✅ All sections support the target role
- ✅ Nothing irrelevant or outdated included
- ✅ Total length appropriate (1-2 pages)


## The Tailoring Philosophy

**Key Principle:** You're not lying or fabricating - you're HIGHLIGHTING the most relevant parts of your true experience.

Think of your full experience as a library of achievements. Tailoring means selecting the books that best fit what each employer is looking for.


## Tailoring Process

### Step 1: Analyze the Job (Use Job Description Analyzer First)
- Identify required skills and keywords
- Note the company's priorities
- Understand the role's primary responsibilities

### Step 2: Audit Your Resume
For each section, ask:
- Does this support my candidacy for THIS specific role?
- Is there a better way to phrase this for THIS job?
- Should this be higher or lower in priority?

### Step 3: Make Strategic Adjustments

**Professional Summary:** Rewrite to mirror the job's key requirements

**Skills Section:** Reorder to put most relevant skills first, add missing keywords

**Experience:** 
- Reorder jobs if a less recent role is more relevant
- Swap bullet points to lead with most relevant achievements
- Add keywords naturally into existing bullets

**Education:** Highlight relevant coursework, certifications


## Section-by-Section Tailoring Guide

### Professional Summary

This is your "elevator pitch" - customize for each application.

**Generic Summary (AVOID):**
```
Results-driven professional with 5 years of experience in business operations. Strong analytical and communication skills. Looking for a challenging opportunity to grow.
```

**Tailored for Operations Manager Role:**
```
Operations Manager with 5 years optimizing supply chain processes and reducing costs by 25%. Expertise in Lean Six Sigma, vendor management, and cross-functional team leadership. Track record of improving operational efficiency while maintaining quality standards.
```

**Tailored for Project Manager Role (Same Person):**
```
Project Manager with 5 years leading cross-functional initiatives from concept to delivery. PMP-certified with expertise in Agile methodology, stakeholder management, and budget oversight. Track record of on-time, under-budget project delivery across $10M+ portfolios.
```

### Skills Section Reordering

**Job Description Emphasizes:** Data analysis, SQL, Python, stakeholder communication

**Before (Generic Order):**
```
Skills: Microsoft Office, Communication, Project Management, Python, SQL, Data Visualization, Leadership
```

**After (Tailored Order):**
```
Skills: SQL, Python, Data Analysis, Data Visualization, Stakeholder Communication, Project Management, Microsoft Office
```

### Experience Section

**Strategy 1: Reorder Jobs**

If your most recent job is less relevant than a previous role:

**Before:**
1. Marketing Coordinator (current, but applying for data role)
2. Data Analyst (previous, highly relevant)

**After:**
1. Data Analyst (labeled with dates, moved up)
2. Marketing Coordinator (still included, but secondary)

**Strategy 2: Swap Bullet Order**

Lead with bullets most relevant to the target role.

**Applying for Management Role - Lead with:**
- "Led team of 12..."
- "Managed budget of $2M..."

**Applying for Technical Role - Lead with:**
- "Developed automated system..."
- "Analyzed 500K+ data points..."

**Strategy 3: Adjust Bullet Language**

Incorporate job description keywords while staying truthful.

**Job Description Says:** "stakeholder management"
**Your Bullet Says:** "Worked with various teams"
**Tailored Version:** "Managed stakeholder relationships across 5 departments, ensuring alignment on project priorities"


## Tailoring Templates

### For Each Job Application, Create:

```markdown

## RESUME TAILORING PLAN

**Target Position:** [Job Title]
**Company:** [Company Name]
**Match Score:** [From JD Analyzer]

### Summary Customization
**Current:** [Your current summary]
**Tailored:** [Rewritten for this role]

### Skills Reordering
**Current Order:** [List]
**New Order:** [Reordered list with added keywords]
**Keywords Added:** [New skills from JD]

### Experience Adjustments

**Job 1: [Title]**
- Bullet to emphasize: [Which bullet to lead with]
- Keyword to add: [What phrase to incorporate]
- Bullet to de-emphasize: [Move down or remove if space needed]

**Job 2: [Title]**
[Same structure]

### Other Adjustments
- Education: [Any relevant coursework to add]
- Certifications: [Any to highlight]
- Projects: [Relevant projects to include]
```


## Common Tailoring Scenarios

### Scenario 1: Technical Role at Non-Tech Company

**Challenge:** They want technical skills but also business acumen

**Strategy:**
- Lead with technical achievements
- Include business impact in every technical bullet
- Add "translated technical concepts for business stakeholders"

### Scenario 2: Management Role (But You've Done Both IC and Management)

**Challenge:** Show leadership without abandoning technical credibility

**Strategy:**
- Summary: Emphasize leadership
- Experience: Lead with team management bullets
- Keep some technical bullets to show you understand the work

### Scenario 3: Startup (But You've Worked at Big Companies)

**Challenge:** Show you can thrive in ambiguity and wear many hats

**Strategy:**
- Highlight cross-functional work
- Emphasize initiative and self-starting
- Show scrappy, creative problem-solving
- De-emphasize rigid processes and large team structures

### Scenario 4: Big Company (But You've Worked at Startups)

**Challenge:** Show you can work within structure and at scale

**Strategy:**
- Emphasize process improvement
- Highlight work that scaled
- Show collaboration across teams
- Add metrics that show impact at scale


## Keyword Integration Rules

### DO:
- Add keywords that truthfully describe your work
- Use exact phrasing from job description when accurate
- Place keywords naturally in context
- Include keywords in multiple locations (summary, skills, experience)

### DON'T:
- Add skills you don't actually have
- Keyword stuff (repeating same term 10x)
- Create a different meaning than your actual experience
- Sacrifice readability for keyword density


## Truth vs. Tailoring Line

**Acceptable Tailoring:**
- Reordering true information
- Emphasizing relevant experience
- Using industry-standard terminology
- Adding context to vague statements
- Matching language style to job description

**Unacceptable (Lying):**
- Adding skills you don't have
- Changing numbers or metrics
- Creating fake experiences
- Claiming titles you didn't hold
- Stating certifications you don't have


## Version Management

### Maintain a Master Resume
- Keep ONE complete document with ALL experiences
- Include every bullet you've ever written
- This is your "source of truth"

### Create Targeted Versions
- Name files clearly: "JohnSmith_Resume_ProductManager_TechCorp.pdf"
- Track which version went to which company
- Save tailoring notes for interview prep

### Version Naming Convention
```
[LastName]_Resume_[TargetRole]_[Company]_[Date].pdf

Examples:
- Smith_Resume_PM_Google_Jan2024.pdf
- Smith_Resume_DataAnalyst_Meta_Jan2024.pdf
- Smith_Resume_General_Master.docx (your master file)
```


## Quick Tailoring Checklist

Before submitting any resume:

1. ✅ Summary mentions the exact job title/function
2. ✅ Top 5 skills match job description's top 5 requirements
3. ✅ Most relevant experience is positioned first
4. ✅ Each job's top bullet addresses job's key requirement
5. ✅ Keywords from JD appear naturally throughout
6. ✅ Company/industry terminology is used correctly
7. ✅ All claims are truthful
8. ✅ File is named appropriately
9. ✅ ATS formatting maintained
10. ✅ Saved for interview prep reference


## Target: [Job Title] at [Company]

### Professional Summary
**Before:** [Original]
**After:** [Tailored version]
**Keywords Added:** [List]

### Skills Section
**New Order:** [Reordered list]
**Added:** [New keywords]
**Removed:** [If any, for space]

### Experience Changes

**[Company Name] - [Title]**
- Move bullet X to position 1
- Modify bullet Y: [Before → After]
- Add keyword "[phrase]" to bullet Z

[Repeat for each relevant job]

### Overall Changes Summary
- Keywords added: X
- Bullets modified: Y
- Sections reordered: Yes/No
- Estimated new match score: Z%


## Implementation Notes

- Always start with the job description analyzer
- Keep tailoring changes documented for interview prep
- Maintain master resume as source of truth
- Never sacrifice ATS compatibility for tailoring
- Test keyword match after tailoring


## Update Workflow

### When to Update Master Resume

**Immediately Update For:**
- New job or promotion
- Completed major project
- New skills or certifications
- Significant achievements
- Awards or recognition

**Quarterly Review:**
- Add recent accomplishments
- Update metrics with new data
- Refresh skills section
- Remove outdated information

### Master to Tailored Workflow

```
1. Start with Master Resume
   ↓
2. Copy to new file (don't edit master)
   ↓
3. Analyze job description
   ↓
4. Select relevant bullets from master
   ↓
5. Choose appropriate summary version
   ↓
6. Reorder skills for relevance
   ↓
7. Add job-specific keywords
   ↓
8. Trim to appropriate length
   ↓
9. Save with proper naming convention
   ↓
10. Update application tracker
```


## Version Control Best Practices

### DO:
- ✅ Always work from master as source
- ✅ Use consistent naming conventions
- ✅ Track which version went where
- ✅ Keep master updated
- ✅ Date your files
- ✅ Backup to cloud storage

### DON'T:
- ❌ Edit master directly for applications
- ❌ Use vague names like "resume_final_v2"
- ❌ Forget which version you sent
- ❌ Let master get out of date
- ❌ Have multiple "master" files
- ❌ Delete old versions (archive instead)


## Version Management Checklist

- ✅ Master resume exists and is current
- ✅ Folder structure is organized
- ✅ Naming convention is consistent
- ✅ Application tracker is maintained
- ✅ Know which version sent to each company
- ✅ All versions pull from same master
- ✅ Backup system in place
- ✅ Old versions archived (not deleted)
- ✅ Update workflow is established
- ✅ Regular master resume reviews scheduled

> Partner skill: `resume-ats-optimizer` for ATS compatibility, formatting rules, and file format guidelines.
