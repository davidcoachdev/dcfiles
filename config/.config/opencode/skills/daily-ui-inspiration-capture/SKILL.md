---
name: daily-ui-inspiration-capture
description: >
  Workflow de captura diaria de inspiración UI. Navega sitios de inspiración
  (Awwwards, Dribbble, Behance, SiteInspire), captura screenshots de secciones
  destacadas, documenta patrones de diseño, animaciones, layouts y detalles
  visuales. Usar para generar banco de referencias visuales o mood boards.
  Trigger: daily UI inspiration, capturar inspiración, referencias visuales,
  mood board, recopilar diseños, bancos de UI.
license: Apache-2.0
metadata:
  author: gentleman-programming (adapted from MengTo/Skills daily-ui-inspiration-capture)
  version: "1.0"
---

# Daily UI Inspiration Capture

## Overview

Workflow diario para capturar y documentar inspiración UI. Genera un archivo markdown estructurado con screenshots, descripciones de patrones y notas de implementación.

## Workflow

### 1. Preparación

Cargar `obscura_browser` para navegación. Crear directorio de salida:

```bash
mkdir -p docs/inspiration/$(date +%Y-%m-%d)
```

### 2. Fuentes de inspiración

Visitar en orden:

| Sitio | URL | Enfoque |
|-------|-----|---------|
| Awwwards | https://www.awwwards.com | Sites premiados, tendencias |
| SiteInspire | https://www.siteinspire.com | Curados, categorizados |
| Dribbble | https://dribbble.com/search/website | Shots de UI, conceptos |
| Behance | https://www.behance.net/search/projects/ui%20design | Proyectos completos |

### 3. Captura

Para cada sitio interesante:

1. Navegar con `obscura_browser_navigate`
2. Evaluar: ¿tiene patrones de diseño destacados? (hero, navegación, grids, micro-interacciones, tipografía)
3. Capturar contenido: `obscura_browser_snapshot`
4. Extraer secciones clave con `obscura_browser_extract` usando selectores CSS
5. Documentar cada patrón en el archivo de salida

### 4. Documentar por sección

Para cada captura, documentar:

```markdown
## [Nombre del sitio]

**URL**: https://...
**Tags**: minimalista, dark, grid, animación

### Hero
- Layout: split screen con texto izq / visual der
- Animación: fade-in con stagger en textos, parallax en imagen
- Tipografía: Sans-serif bold, jerarquía clara

### Grid/Contenido
- Grid: 3 columnas con gap generoso
- Cards: borde sutil, shadow en hover
- Micro-interacciones: scale suave en hover de cards

### Colores
- Fondo: #0a0a0a
- Texto: #ffffff
- Acento: #6366f1
```

### 5. Estructura de salida

```text
docs/inspiration/YYYY-MM-DD/
├── README.md           # Resumen del día con hallazgos principales
├── site-1.md           # Sitio destacado 1
├── site-2.md           # Sitio destacado 2
└── assets/             # Screenshots o referencias locales
```

### 6. Análisis semanal

Cada viernes, generar resumen semanal con:
- Patrones recurrentes (colores, layouts, animaciones)
- Tendencias emergentes
- Ideas para implementar en proyectos actuales
- Links a los mejores hallazgos

## Output Esperado

After daily capture, generate a summary:

```markdown
# UI Inspiration - YYYY-MM-DD

## Destacados del Día
1. **[Site]** - Hero con grid asimétrico y tipografía bold
2. **[Site]** - Navegación con mega-menu y transiciones suaves
3. **[Site]** - Cards con glassmorphism y hover states

## Patrón del Día: Grids Asimétricos
- Hero con layout 60/40 en desktop, single column en mobile
- Gap de 2rem, border-radius de 12px en cards
- Transiciones de 300ms ease-out en hover

## Tags del Día
#minimalista #dark-mode #animacion-subtle #grid-asimetrico
```

Referencia: Adaptado de MengTo/Skills — daily-ui-inspiration-capture
