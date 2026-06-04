---
name: Resume ATS Optimizer
description: Optimize resumes for Applicant Tracking Systems, check ATS compatibility, and analyze keyword match
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# Resume ATS Optimizer

## When to Use This Skill

Use this skill when the user wants to:
- Optimize their resume for Applicant Tracking Systems (ATS)
- Check if their resume will pass automated screening
- Understand why their applications aren't getting responses
- Fix formatting issues that break ATS parsers
- Mentions keywords like: "ATS", "not getting interviews", "resume not working", "optimize resume"

Also use when the user provides a resume file and mentions they're applying to jobs.

## Core Capabilities

- Parse resume and test ATS compatibility
- Identify formatting issues that break ATS parsers
- Generate ATS-friendly formatting recommendations
- Evaluate file format and naming conventions
- Audit section headers and contact info layout

## The ATS Problem

75% of resumes are rejected by Applicant Tracking Systems before a human ever sees them. Companies use ATS to:
- Filter out unqualified candidates automatically
- Search for specific keywords from job requirements
- Parse resumes into structured data
- Rank candidates by keyword match percentage

Common reasons resumes fail ATS:
1. Poor formatting (tables, columns, headers/footers)
2. Missing keywords from job description
3. Inconsistent section headers
4. Non-standard fonts or special characters
5. Text embedded in images
6. Incorrect file format

## ATS Compatibility Checklist

### File Format
- ✅ Use .docx or .pdf (not .pages, .odt)
- ✅ PDF must be text-based, not scanned image
- ✅ File name: "FirstName_LastName_Resume.pdf"

### Font & Formatting
- ✅ Standard fonts: Arial, Calibri, Georgia, Times New Roman
- ✅ Font size: 10-12pt for body, 14-16pt for headers
- ✅ No text boxes, tables, or columns
- ✅ No headers/footers (put contact info in body)
- ✅ No images, graphics, or charts
- ✅ Consistent date formats (MM/YYYY)
- ✅ Standard bullet points (•, -, *)

### Section Headers
Use standard, recognizable headers:
- ✅ "Professional Experience" or "Work Experience" (not "Where I've Been")
- ✅ "Education" (not "Academic Background")
- ✅ "Skills" (not "Core Competencies")
- ✅ "Summary" or "Professional Summary"

### Contact Information
```
John Smith
email@example.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johnsmith
San Francisco, CA
```

NOT in header/footer, and avoid:
- ❌ Tables for contact info
- ❌ Special characters in email
- ❌ Multiple phone numbers
- ❌ Full mailing address (city/state is enough)

## Common ATS Failure Patterns

### Pattern 1: Creative Formatting
```
❌ PROBLEM:
[Two-column layout with graphics]
[Skill bars and proficiency charts]
[Text in colored boxes]

✅ SOLUTION:
- Single column layout
- Text-only skills list
- Simple bullet points
```

### Pattern 2: Unconventional Section Names
```
❌ PROBLEM:
"My Journey" (instead of Experience)
"What I Bring to the Table" (instead of Skills)
"Academic Pursuits" (instead of Education)

✅ SOLUTION:
Use standard headers ATS recognizes
```

### Pattern 3: Missing Keywords
```
❌ PROBLEM:
Job requires: "Python, SQL, Data Visualization"
Resume says: "Programming, databases, making charts"

✅ SOLUTION:
Use exact terminology from job description
```

### Pattern 4: Keyword Stuffing
```
❌ PROBLEM:
Skills: Python, Python programming, Python developer, Python expert, Python specialist, Advanced Python...

✅ SOLUTION:
Skills: Python, SQL, JavaScript, React, Node.js
(Then incorporate naturally in bullets)
```

## Industry-Specific Considerations

### Tech Resumes
- Emphasize programming languages and frameworks
- Include GitHub, portfolio links in Skills section (not header)
- Certifications and courses matter highly

### Business/Finance
- Focus on software proficiency (Excel, SAP, Salesforce)
- Certifications critical (CPA, CFA, PMP)
- Industry keywords (P&L, ROI, KPI)

### Healthcare
- Licenses and certifications required
- Specific systems (Epic, Cerner, MEDITECH)
- Compliance keywords (HIPAA, Joint Commission)

### Marketing
- Platform expertise (HubSpot, Salesforce, Google Analytics)
- Channel keywords (SEO, PPC, email marketing)
- Metrics and results-driven language

## Edge Cases & Special Situations

### Career Changers
- Focus on transferable skills
- Use keywords from TARGET industry, not just current
- May need two resume versions for ATS

### Recent Graduates
- Education section becomes priority for keywords
- Include relevant coursework, projects
- Internships count as experience - use those keywords

### Executive Level
- ATS still matters for senior roles
- Focus on strategic keywords
- Include board experience, P&L size, team size

### Gaps in Employment
- Use years only (not months) if it helps
- Include freelance/consulting with keywords
- Volunteer work can include relevant keywords

## Implementation Checklist

When helping user optimize for ATS:

1. ✅ Scan current resume for ATS compatibility issues
2. ✅ Analyze job description for required keywords
3. ✅ Calculate current match score
4. ✅ Identify specific missing keywords
5. ✅ Suggest exact placements for new keywords
6. ✅ Flag formatting problems
7. ✅ Provide before/after examples
8. ✅ Re-score after suggested changes
9. ✅ Verify file format and naming
10. ✅ Test with ATS simulator if possible

## Success Metrics

After optimization, the resume should:
- Score 80%+ match for target job descriptions
- Pass ATS parsing test (all sections recognized)
- Have zero formatting errors
- Include all critical keywords 2-4x each
- Read naturally (not keyword-stuffed)
- Be ready to submit immediately

## Formatting Fundamentals

### The Dual Audience Challenge

Your resume must work for:
1. **ATS (Applicant Tracking Systems)** - Robots that parse text
2. **Human Readers** - Recruiters who scan quickly

**The Solution:** Clean, simple formatting that satisfies both.


## Document Setup

### Page Length
- **Entry Level (0-5 years):** 1 page
- **Mid-Level (5-15 years):** 1-2 pages
- **Senior/Executive (15+ years):** 2 pages (max 3 for executives)

### Margins
- **Recommended:** 0.5" - 1" all sides
- **Minimum:** 0.5" (don't go smaller)
- **Maximum:** 1" (don't waste space)

### Font Selection

**Safe, ATS-Friendly Fonts:**
- **Sans-serif:** Arial, Calibri, Helvetica, Verdana
- **Serif:** Times New Roman, Georgia, Garamond

**Font Sizes:**
- **Name:** 16-20pt
- **Section Headers:** 12-14pt
- **Body Text:** 10-12pt
- **Minimum readable:** 10pt

### Spacing
- **Line spacing:** 1.0 to 1.15
- **Space after paragraphs:** 6-12pt
- **Section spacing:** 12-16pt between sections


## ATS-Safe Formatting Rules

### DO:
- ✅ Use standard fonts
- ✅ Use simple bullet points (•, -, *)
- ✅ Use bold and italic sparingly
- ✅ Use standard section headers
- ✅ Save as .docx or text-based .pdf
- ✅ Put contact info in body (not header)
- ✅ Use single column layout
- ✅ Use consistent formatting throughout

### DON'T:
- ❌ Use tables (except simple ones for contact info)
- ❌ Use text boxes
- ❌ Use columns (multi-column layouts)
- ❌ Use headers/footers for important info
- ❌ Use images or graphics
- ❌ Use unusual fonts
- ❌ Use skill bars or progress indicators
- ❌ Use special characters or emojis
- ❌ Use color for essential information


## Section Organization

### Standard Section Order

```
1. Contact Information
2. Professional Summary (optional)
3. Skills/Technical Skills
4. Professional Experience
5. Education
6. Certifications (if relevant)
7. Additional (volunteer, languages, etc.)
```

### Section Header Formatting

**ATS-Recognized Headers:**
- PROFESSIONAL EXPERIENCE or WORK EXPERIENCE
- EDUCATION
- SKILLS or TECHNICAL SKILLS
- PROFESSIONAL SUMMARY or SUMMARY
- CERTIFICATIONS
- PROJECTS

**Format Options:**
```
PROFESSIONAL EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━

or

Professional Experience
_______________________

or

PROFESSIONAL EXPERIENCE
```


## Contact Information Layout

### Recommended Format
```
JOHN SMITH
john.smith@email.com | (555) 123-4567 | linkedin.com/in/johnsmith
San Francisco, CA
```

### Alternative Format
```
JOHN SMITH
San Francisco, CA
john.smith@email.com | (555) 123-4567
LinkedIn: linkedin.com/in/johnsmith | GitHub: github.com/johnsmith
```

### What to Include
- ✅ Full name
- ✅ Professional email
- ✅ Phone number
- ✅ City, State (no full address needed)
- ✅ LinkedIn URL
- ✅ Portfolio/GitHub (if relevant)

### What to Exclude
- ❌ Full street address
- ❌ Photo
- ❌ Date of birth
- ❌ Marital status
- ❌ Multiple phone numbers
- ❌ Personal social media


## Experience Section Formatting

### Standard Format
```
COMPANY NAME | City, ST
Job Title | Month Year - Month Year

• Achievement bullet with metrics and results
• Achievement bullet with metrics and results
• Achievement bullet with metrics and results
```

### Alternative Format
```
Job Title
COMPANY NAME, City, ST                    Month Year - Month Year

• Achievement bullet with metrics and results
• Achievement bullet with metrics and results
```

### Date Formatting
- **Consistent format:** Use same format throughout
- **Recommended:** Month Year (Jan 2020 - Present)
- **Also acceptable:** MM/YYYY (01/2020 - Present)
- **Avoid:** Full dates (January 15, 2020)

### Bullet Point Guidelines
- **Length:** 1-2 lines each
- **Format:** Start with action verb, end with result
- **Quantity:** 3-6 bullets per role (more for recent, fewer for old)
- **Symbol:** Use standard bullets (•, -, *)


## Skills Section Formatting

### Option 1: Simple List
```
SKILLS
Python, JavaScript, SQL, React, Node.js, AWS, Docker, Git, Agile, JIRA
```

### Option 2: Categorized
```
TECHNICAL SKILLS
Languages: Python, JavaScript, TypeScript, SQL
Frameworks: React, Node.js, Django, Flask
Tools: AWS, Docker, Kubernetes, Git, Jenkins
```

### Option 3: Columns (Careful with ATS)
```
SKILLS
Languages        Frameworks       Tools
Python           React            AWS
JavaScript       Node.js          Docker
SQL              Django           Git
```

**Note:** Multi-column layouts may cause ATS issues. Test before using.


## Education Section Formatting

### Standard Format
```
EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2018
GPA: 3.8/4.0 (include if 3.5+)
```

### With Honors/Details
```
EDUCATION
MBA, Finance & Strategy | Stanford Graduate School of Business | 2020
• Graduated with Distinction
• Relevant Coursework: Corporate Finance, M&A Strategy
```


## Visual Hierarchy Principles

### Hierarchy Order
1. **Name** - Largest, most prominent
2. **Section Headers** - Clear divisions
3. **Job Titles/Company Names** - Easy to scan
4. **Bullet Points** - The details

### Creating Hierarchy
- Use font SIZE to create levels
- Use **BOLD** for emphasis (names, titles, headers)
- Use CAPS for section headers
- Use consistent spacing to separate sections


## White Space Management

### Good White Space:
- Between sections (clear separation)
- After headings (visual breathing room)
- Between bullets (don't cram)
- Around margins (frame the content)

### Bad White Space:
- Huge gaps between sections
- Inconsistent spacing
- Half-empty pages
- Excessive margins eating space


## Common Formatting Mistakes

### Mistake 1: Wall of Text
**Problem:** Dense paragraphs with no bullets
**Solution:** Use bullet points, keep paragraphs short

### Mistake 2: Inconsistent Formatting
**Problem:** Different fonts, sizes, or styles throughout
**Solution:** Pick one format and stick to it

### Mistake 3: Trying to Be Creative
**Problem:** Fancy designs that break ATS
**Solution:** Save creativity for portfolio, not resume

### Mistake 4: Too Much Information
**Problem:** Cramming everything onto one page
**Solution:** Edit ruthlessly, prioritize relevance

### Mistake 5: Not Enough Information
**Problem:** Half-page resume with massive margins
**Solution:** Add detail, reduce margins (to 0.5")


## File Format Guidelines

### For Online Applications
- **.docx** - Best for ATS parsing
- **.pdf** - Good if created from Word (not scanned)

### For Email/Direct Send
- **.pdf** - Preserves formatting

### File Naming
```
FirstName_LastName_Resume.pdf
JohnSmith_Resume_ProductManager.pdf
```

**Avoid:**
- resume_final_v2_updated_FINAL.docx
- resume (1).pdf
- Untitled document.docx


## Current Issues
- [ ] [Issue 1]
- [ ] [Issue 2]
- [ ] [Issue 3]

## Before/After Preview

### Before:
[Description or example of current formatting]

### After:
[Description or example of improved formatting]


## Quick Formatting Checklist

Before submitting any resume:
- ✅ One page (or two if warranted)
- ✅ Standard font (10-12pt body)
- ✅ Consistent formatting throughout
- ✅ Clear section headers
- ✅ Appropriate white space
- ✅ No tables, text boxes, or columns
- ✅ Contact info in body (not header)
- ✅ Saved as .docx or .pdf
- ✅ Proper file name
- ✅ Proofread for consistency

> **Split from:** original 1930-line file. Partner skill: `ats-keyword-strategy` for keyword optimization, quantification metrics, and resume tailoring.
