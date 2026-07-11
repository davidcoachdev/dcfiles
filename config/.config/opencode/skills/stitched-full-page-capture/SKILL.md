---
name: stitched-full-page-capture
description: >
  Captura de screenshots de página completa (full-page) combinando múltiples
  capturas parciales. Usa el browser headless para hacer scroll progresivo,
  capturar secciones y unirlas en una imagen completa. Usar cuando el usuario
  pida screenshot de página completa, full-page capture, o capturar sitio
  entero como imagen.
  Trigger: full page capture, full page screenshot, stitched screenshot,
  capturar página completa, screenshot largo.
license: Apache-2.0
metadata:
  author: gentleman-programming (adapted from MengTo/Skills stitched-full-page-capture)
  version: "1.0"
---

# Stitched Full-Page Capture

## Overview

Workflow para capturar screenshots de página completa combinando capturas parciales del viewport. No depende de herramientas externas — usa el browser headless y stitching manual o herramientas de línea de comandos.

## Workflow

### 1. Preparación

Cargar `obscura_browser` para navegación. Elegir método según stack disponible:

| Método | Herramienta | Cuando usar |
|--------|-------------|-------------|
| Browser nativo | `obscura_browser_snapshot` + scroll progresivo | Captura rápida de contenido visible |
| Puppeteer/Playwright script | `node` script con Puppeteer | Captura full-page precisa |
| CLI tool | `full-page-screen-capture` (npm) o similar | Automatización batch |

### 2. Captura con scroll progresivo (obscura_browser)

```javascript
// Workflow:
// 1. Navegar a la URL
// 2. Scroll al inicio
// 3. Step: scroll down en increments, capturar snapshot cada vez
// 4. Colectar todo el contenido en un archivo markdown

const steps = [
  { action: "navigate", url: "https://ejemplo.com" },
  { action: "scroll", to: "top" },
  { action: "snapshot", label: "hero" },
  { action: "scroll", amount: 800 },
  { action: "snapshot", label: "mid-page" },
  { action: "scroll", direction: "bottom" },
  { action: "snapshot", label: "footer" },
];
```

### 3. Captura con Puppeteer/Playwright (cuando esté disponible)

```javascript
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('https://ejemplo.com', { waitUntil: 'networkidle0' });
await page.screenshot({
  path: 'fullpage.png',
  fullPage: true
});
await browser.close();
```

### 4. Stitching manual (sin herramientas externas)

Si no hay Puppeteer disponible, usar técnica de composición:

1. Capturar múltiples snapshots en scroll progresivo
2. Documentar la página completa como archivo markdown estructurado
3. Incluir screenshots individuales por sección

### 5. Organización de archivos

```text
captures/YYYY-MM-DD/
├── README.md           # Resumen de la captura
├── site-name/
│   ├── hero-section.md
│   ├── content-section.md
│   ├── footer-section.md
│   └── full-page.md    # Documento unificado con todo el contenido
```

### 6. Reporte

```markdown
# Full-Page Capture - sitio.com - YYYY-MM-DD

**URL**: https://ejemplo.com
**Viewport**: 1440x900
**Método**: scroll progresivo + snapshot

## Secciones Capturadas
1. Hero - header + navegación + hero content
2. Features - grid de 3 columnas con iconos
3. Testimonios - carrusel de quotes
4. Pricing - 3 tiers con CTA
5. Footer - links + newsletter form

## Notas
- Página con lazy loading en imágenes
- Animaciones se activan con IntersectionObserver
- Mobile: single column, hamburger menu
```

Referencia: Adaptado de MengTo/Skills — stitched-full-page-capture
