---
name: behavioral-nudge-engine
description: >
  Behavioral psychology and product design specialist for building user engagement,
  motivation patterns, and nudges that drive desired behaviors ethically.
  Trigger: When designing user engagement, gamification, motivation systems,
  onboarding flows, retention mechanics, or behavioral product features.
---

## When to Use

- Designing user onboarding flows
- Building engagement and retention mechanics
- Creating gamification systems
- Designing habit-forming product features
- Increasing user motivation and participation
- Ethical persuasive design (NOT dark patterns)

## Core Behavioral Models

### Fogg Behavior Model
```
B = MAP (Behavior = Motivation + Ability + Prompt)

Motivation (6 Core Drives):
  ┌─────────────────────────────────┐
  │  Sensation    ─── Pleasure/Pain│  Seeking: Pleasure, Avoiding: Pain
  │  Anticipation ─── Hope/Fear   │  Seeking: Hope, Avoiding: Fear
  │  Belonging    ─── Social/Anti │  Seeking: Acceptance, Avoiding: Rejection
  └─────────────────────────────────┘

Ability (6 Simplicity Factors):
  ┌─────────────────────────────────┐
  │  Time    ─── How long?         │  Less time = higher ability
  │  Money   ─── How much?         │  Less cost = higher ability
  │  Phys Effort ── How physical?  │  Less effort = higher ability
  │  Brain Cycles ── How much think?│  Less cognitive load = higher ability
  │  Social Deviance ── How normal?│  More normal = higher ability
  │  Non-Routine ── How familiar?   │  More routine = higher ability
  └─────────────────────────────────┘

Prompt (3 Types):
  ┌─────────────────────────────────┐
  │  Facilitator ─── When high motivation, low ability │  "Let me help you"
  │  Signal     ─── When high motivation, high ability│  "Reminder"
  │  Spark      ─── When low motivation, high ability │  "Why this matters"
  └─────────────────────────────────┘
```

### Hook Model (Nir Eyal)
```
Trigger → Action → Variable Reward → Investment → (back to Trigger)

1. TRIGGER (external or internal cue)
   - External: push notification, email, badge
   - Internal: boredom, uncertainty, need for connection

2. ACTION (simplest behavior in anticipation of reward)
   - Must be easier than thinking (1-click, swipe, scroll)
   - Reduce friction to minimum viable action

3. VARIABLE REWARD (surprise creates craving)
   - Tribe: social validation (likes, comments)
   - Hunt: information seeking (infinite scroll, search)
   - Self: achievement (streaks, badges, progress)

4. INVESTMENT (increases likelihood of next visit)
   - Data: profile, preferences, history
   - Content: posts, uploads, creations
   - Reputation: followers, karma, rating
   - Skill: learned shortcuts, onboarding completed
```

## Ethical Nudge Framework

### MUST DO (Dark Pattern Check)
Before implementing any nudge, ask:
1. **Is it transparent?** — Users can see and understand the nudge
2. **Is it reversible?** — Users can easily undo the action
3. **Does it benefit the user?** — Not just the company metrics
4. **Is it proportionate?** — The nudge matches the importance of the action
5. **Would you be comfortable explaining it publicly?** — If no, don't build it

### ❌ Dark Patterns (NEVER Use)
- **Roach motel**: Easy to get in, hard to get out (cancel subscription)
- **Confirmshaming**: "No, I don't want to improve my career" shame-based opt-outs
- **Hidden costs**: Reveal charges at the last step
- **Fake urgency**: "Only 2 left!" when inventory is artificial
- **Privacy zuckering**: Tricky defaults that share more than intended

### ✅ Ethical Nudges (Use These)
- **Default opt-in**: Healthy default, easy to change
- **Progress bars**: Show real progress toward user goals
- **Social proof**: "2,000 developers joined this week" (if true)
- **Loss aversion**: "You've written 4 days in a row, keep your streak!" (honest)
- **Chunking**: Break complex tasks into small steps

## Pattern Library

### Onboarding Pattern
```
Step 1: Value proposition (Spark — why this matters)
Step 2: Minimal setup (Ability — reduce friction)
Step 3: First success (Reward — early win)
Step 4: Investment hook (User creates something they'll return to)

Design Rules:
- Max 3 steps before first value
- Progress indicator showing distance to completion
- Skip option always available
- Never ask for permissions you don't need yet
```

### Retention Pattern
```
Daily: Streak counter, daily challenge, notification
Weekly: Progress report, weekly summary email, digest
Monthly: Level up, badge collection, milestone celebration

Key Metrics:
- DAU/MAU ratio > 25% = good retention
- Day-1 retention > 40%, Day-7 > 20%, Day-30 > 10%
- Session length increasing over time = engaged user
```

### Motivation Pattern
```
Intrinsic (sustainable):
  ─ Autonomy: "You choose what to work on"
  ─ Mastery: "You got 15% better this week"
  ─ Purpose: "Your work helped 500 people"

Extrinsic (temporary, use sparingly):
  ─ Points, badges, leaderboards
  ─ Discounts, rewards
  ─ Social recognition

Rule: Start with extrinsic, migrate to intrinsic
```

## Nudge Implementation Checklist

- [ ] Define target behavior (specific, measurable, achievable)
- [ ] Identify user motivation type (sensation/anticipation/belonging)
- [ ] Reduce ability barriers (time, effort, cognitive load)
- [ ] Choose prompt type (facilitator/signal/spark) based on motivation-ability profile
- [ ] Design variable reward (tribe/hunt/self)
- [ ] Plan investment hook (what user stores/create/learn)
- [ ] Run ethical check (transparent, reversible, user-beneficial, proportionate)
- [ ] A/B test with control group
- [ ] Measure impact on target metric AND user satisfaction

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]