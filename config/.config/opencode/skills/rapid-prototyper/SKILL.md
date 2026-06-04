---
name: rapid-prototyper
description: >
  Fast MVP and proof-of-concept builder. Specializing in rapid iteration from idea to working prototype
  in hours, not weeks. Prioritizes speed of learning over code perfection.
  Trigger: When building prototypes, MVPs, hackathons, proof-of-concepts, or validating ideas quickly.
---

## When to Use

- Building an MVP or proof-of-concept
- Hackathons or time-boxed builds
- Validating an idea before full investment
- Quick demos for stakeholders
- Spike solutions to test feasibility

## Core Principles

### Speed Over Perfection
- Working prototype beats perfect design
- Ship something users can touch in hours, not weeks
- Code quality: "good enough to demonstrate, not good enough for production"
- Delete and rewrite is valid — prototypes are disposable

### The 80/20 Rule
- 80% of value comes from 20% of features
- Build the core interaction first
- Mock everything else — APIs, data, auth
- Hard-code what you can't build fast

### Progressive Prototype Maturity

| Level | Name | Time | Purpose | Quality |
|-------|------|------|---------|---------|
| P0 | Napkin Sketch | 5 min | Align on concept | Pen & paper |
| P1 | Clickable Wireframe | 2 hrs | Test flow and layout | Static HTML/Figma |
| P2 | Functional Prototype | 1-2 days | Test core interaction | Real code, mocked data |
| P3 | Demo-Grade MVP | 1-2 weeks | Stakeholder demo | Real APIs, basic error handling |
| P4 | Production MVP | 4-8 weeks | Real users, real data | Testing, CI/CD, monitoring |

## Tech Stack for Speed

### Frontend Prototyping
```
Next.js + Tailwind + shadcn/ui → Full app in hours
Vite + React → Fast SPA prototype
Streamlit → Python data prototype
Gradio → ML model demo
```

### Backend Prototyping
```
Next.js API Routes → Quick backend with auth
Supabase → Auth + DB + Realtime in 10 min
Firebase → Quick backend with hosting
PocketBase → Single-binary backend
```

### Data Mocking
```
JSON Server → REST API from JSON file (0 config)
MSW → Mock Service Worker for API mocking
Faker.js → Realistic fake data generation
```

## Rapid Prototyping Workflow

```
1. DEFINE: What's the ONE thing this prototype must demonstrate?
2. SCOPE: List only features needed for that demo (max 5)
3. MOCK: Identify what can be mocked vs must be real
4. BUILD: Core interaction first, everything else second
5. TEST: Put it in someone's hands within 24 hours
6. DECIDE: Kill it, pivot it, or invest in production version
```

## Anti-Patterns (Don't Do This in Prototypes)

- ❌ Setting up CI/CD pipelines
- ❌ Writing comprehensive tests (>smoke test only)
- ❌ Implementing full auth (mock it, or use Supabase/Firebase)
- ❌ Building admin panels (hardcode data)
- ❌ Optimizing for scale (single server is fine)
- ❌ Adding analytics before you have users
- ❌ Debating tech stack for more than 30 minutes

## Pivot or Kill Criteria

```
After demoing the prototype, ask:
- Did users complete the core task? → YES: invest further
- Did users understand the value? → NO: redesign, don't add features
- Did users ask for more features? → NO: problem might not exist
- Would users pay for this? → MAYBE: validate with pre-orders

Kill the prototype if:
- No one completes the core task
- No one understands the value proposition
- You can't explain it in one sentence
- You're adding features to make it "interesting"
```

## Quick Start Templates

### Next.js + Tailwind Prototype (5 min setup)
```bash
npx create-next-app@latest my-prototype --typescript --tailwind --eslint --app
cd my-prototype
npx shadcn@latest init
# Start building core feature immediately
```

### API Mocking with JSON Server
```bash
npx json-server --watch db.json --port 3001
# db.json: { "users": [], "posts": [] }
# Instant REST API: GET/POST/PUT/DELETE /users, /posts
```

### Streamlit Data Prototype
```python
import streamlit as st
import pandas as pd

st.title("ML Demo")
data = st.file_uploader("Upload CSV")
if data:
    df = pd.read_csv(data)
    st.dataframe(df)
    column = st.selectbox("Predict column", df.columns)
    st.write(f"We'll predict: {column}")
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]