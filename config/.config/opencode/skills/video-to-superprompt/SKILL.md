---
name: video-to-superprompt
description: >
  Convierte un video de referencia en un superprompt detallado para recreación
  o inspiración. Analiza story, layout, motion, diseño visual y aspectos
  técnicos. Extrae frames clave con ffmpeg y produce un prompt listo para
  copiar/pegar. Usar cuando el usuario suba un video de referencia y pida
  analizar diseño, UI, animaciones, transiciones, o crear prompt de recreación.
  Trigger: video to superprompt, analizar video, reference video, recrear video,
  extraer frames de video, convertir video a prompt.
license: Apache-2.0
metadata:
  author: gentleman-programming (adapted from MengTo/Skills video-to-superprompt)
  version: "1.0"
---

# Video to Superprompt

## Goal

Convertir un video de referencia en un prompt listo para builder que capture QUÉ muestra el video, CÓMO se mueve, CÓMO debería reconstruirse, y qué assets se necesitan.

## Workflow

### 1. Localizar el video

- Aceptar: rutas locales, URLs, videos en browser, assets de artículos
- Si el video es inaccesible, pedir el archivo exacto antes de inventar detalles

### 2. Extraer metadata técnica

```bash
ffprobe -v error -show_entries format=duration,size:stream=width,height,r_frame_rate -of json "$VIDEO"
mkdir -p /tmp/video-frames
ffmpeg -y -i "$VIDEO" -vf fps=1 /tmp/video-frames/frame-%03d.jpg
```

- Para videos largos (>30s), extraer también start/middle/end + momentos de transición
- Priorizar timeline beats sobre thumbnails uniformes

### 3. Analizar en capas

| Capa | Qué analizar |
|------|-------------|
| **Story** | Propósito, arco emocional, orden de secciones, transiciones entre beats |
| **Screen/Layout** | Viewport framing, grids, sticky zones, cards, overlays, navegación, footer |
| **Motion** | Timing de reveals, easing, parallax, masks, pinned sections, scroll scrubbing, hover states, looped ambient motion, camera moves |
| **Visual Design** | Tipografía, paleta de colores, surfaces, borders, shadows, textura, iconografía |
| **Technical** | CSS/native APIs, IntersectionObserver, GSAP ScrollTrigger, Lenis, Framer Motion, Three.js/WebGL, canvas, carousels |
| **A11y/Perf** | Reduced motion, mobile behavior, touch/keyboard, lazy loading, static fallbacks |

### 4. Plan de assets

Producir un asset map. Incluir URLs exactas cuando existan, o nombres placeholder para assets a generar.

### 5. Escribir el superprompt

```markdown
# [Project Name] - Recreation Prompt

## Referencia
- Video: path/to/video.mp4
- Tipo: exact recreation / inspired adaptation
- Viewport: 1440x900, responsive

## Asset Map
- hero-bg.jpg - background image (placeholder)
- logo.svg - vector logo (provided)
- texture-overlay.png - noise texture (generate)

## Global Design Language
- Colores: dark mode, fondo #0a0a0a, texto #fafafa, acento #6366f1
- Tipografía: Inter (headings), Inter (body)
- Spacing: 8px grid, section padding 8rem/4rem

## Section-by-Section
### Hero
- Layout: full-screen, texto centrado, background visual
- Animación: fade-in con stagger, parallax suave en background
- Scroll behavior: pinned section, opacity reveal en scroll
- Reduced motion: static fade-in sin parallax

### Features Grid
- Layout: 3-column grid, gap 2rem
- Cards: border 1px solid rgba(255,255,255,0.1), radius 12px
- Animación: scale 1.02 en hover, 300ms ease-out
```

### 6. Verificar

- ¿Todos los asset paths existen o están marcados como placeholder?
- Si se extrajeron frames, ¿los archivos son no-empty y representativos?
- ¿El prompt es suficientemente detallado para rebuild sin ver el original?

## Output Modes

| Mode | Descripción |
|------|-------------|
| **Prompt only** | Prompt paste-ready + asset map corto arriba |
| **Implementation brief** | Prompt + build plan + QA checklist |
| **Asset pack** | Prompts separados para backgrounds, sprites/WebGL, video clips |

## Quality Bar

- El prompt debe ser suficientemente largo para rebuild la interacción SIN ver el video
- Debe preservar la secuencia, pacing y quirks notables del video
- Debe nombrar mecanismos exactos: pinned section, scrubbed timeline, parallax layer, shader, particle field
- Debe incluir comportamiento mobile y reduced motion SIEMPRE

Referencia: Adaptado de MengTo/Skills — video-to-superprompt
