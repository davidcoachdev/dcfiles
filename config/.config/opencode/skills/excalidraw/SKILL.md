---
name: excalidraw
description: "Trigger: excalidraw, sketch, wireframe, low-fi design, user flow, architecture diagram, whiteboard. Generate hand-drawn .excalidraw JSON sketches for early ideation before Penpot or code."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# Excalidraw — Low-Fidelity Sketching Skill

## Activation Contract

Use this skill for EARLY ideation only: wireframes, user-flow diagrams, architecture/ER
diagrams, or any quick visual thinking before committing to a high-fidelity design or code.

Do NOT use it for production UI, design systems, or code — those belong to Penpot
(high-fidelity design + tokens) and ui-craft / frontend-design / design-prototype (code).

## Hard Rules

- Excalidraw is LOW-FIDELITY by design (hand-drawn aesthetic). Never claim pixel accuracy.
- It is NOT a source of truth for code. The bridge to Penpot/skills is HUMAN: the user opens
  the `.excalidraw` file, reviews it, and feeds the agreed structure back as a brief.
- Produce a valid `.excalidraw` JSON file (clone `assets/wireframe-template.excalidraw`).
  The user opens it at excalidraw.com or the VSCode Excalidraw editor.
- Every element MUST carry all required fields. Copy them from the template; change only
  `type`, `text`, `x`, `y`, `width`, `height`, `points`, and colors.
- Keep it small: a few rectangles, text labels, and arrows. This is a sketch, not a spec.
- Set `type:"excalidraw"`, `version:2`, and a real `source` URL at the document root.

## Decision Gates

| Need | Tool |
|------|------|
| Early sketch, wireframe, flow, ER diagram | **Excalidraw** (this skill) |
| High-fidelity design + tokens + handoff | Penpot |
| Production code | ui-craft / frontend-design / design-prototype |

## Execution Steps

1. Confirm the stage is low-fidelity ideation (not design, not code).
2. Pick the canvas: one screen wireframe, a multi-step user flow, or an architecture/ER diagram.
3. Copy `assets/wireframe-template.excalidraw` and replace the elements.
4. Use `rectangle` for screens/boxes, `text` for labels, `ellipse` for start/end nodes,
   `arrow` (set `endArrowhead:"arrow"`, `points:[[0,0],[dx,dy]]`) for flow.
5. Write the result as `<name>.excalidraw` under the project's `docs/` or `sketches/` folder.
6. Tell the user to open it in Excalidraw, confirm the structure, then route to Penpot or the
   code skills with that brief.

## Output Contract

- A valid `<name>.excalidraw` JSON file the user can open directly.
- A one-line note on what to review and the next step (Penpot or code skills).

## References

- `assets/wireframe-template.excalidraw` — minimal valid scene to clone (rectangle + text + arrow).
