---
name: ui-component-glossary
description: >-
  Catálogo de referencia de 71 componentes de UI extraídos de NameThatUI
  (namethatui.com). Cada entrada trae el nombre real del elemento, su
  plataforma (web/macOS), el tag o símbolo de API, una descripción de una
  línea y un prompt "paste-ready" para pasarle al agente de código. Usar
  cuando estés construyendo una web o UI y necesites nombrar bien cada
  componente, elegir el patrón correcto o generar el prompt de
  implementación. También sirve para desambiguar elementos confundibles
  (badge vs chip vs pill, modal vs sheet vs drawer, etc.).
---

# UI Component Glossary (NameThatUI)

Catálogo visual de 71 componentes de interfaz. Cada entrada sigue el formato:

```
### Nombre del componente  [web|macOS]
TAG/API: <etiqueta o símbolo>
Qué es: descripción de una línea
Prompt: "frase paste-ready para tu agente de código"
```

Usá el nombre REAL del componente en tus prompts de implementación: mejora
mucho la precisión del agente (esa es la premisa de NameThatUI).

---

## WEB (39)

### Parallax Scrolling  [web]
TAG/API: `animation-timeline: scroll()`
Qué es: Capas que scrollean a distintas velocidades — el fondo queda atrás y aparece profundidad.
Prompt: "Agregá un efecto parallax: el fondo scrollea más lento que el contenido usando animation-timeline: scroll()."

### Date Picker  [web]
TAG/API: `<input type="date">`
Qué es: El calendario que aparece en un campo de fecha — y la franja resaltada de un rango.
Prompt: "Agregá un date picker con input type=date y resaltado de rango de fechas."

### Pagination  [web]
TAG/API: `<nav aria-label="pagination">`
Qué es: Los botones numerados de página bajo una lista — y la versión de puntos (page control).
Prompt: "Agregá paginación con nav aria-label=pagination y controles numerados + dots."

### Sign-in Form  [web]
TAG/API: `autocomplete="current-password"`
Qué es: Las partes nombrables del login — el ojo, la línea OR y los botones Continue-with.
Prompt: "Creá un sign-in form con toggle de password (ojo), divisor OR y botón Continue with Google."

### Carousel  [web]
TAG/API: `aria-roledescription="carousel"`
Qué es: Una tira de slides que recorrés con flechas o los puntitos.
Prompt: "Creá un carousel accesible con aria-roledescription=carousel, flechas y dots."

### Site Header vs. Navigation Bar  [web]
TAG/API: `<header>`
Qué es: Toda la franja superior es el header; la fila de links de página dentro es el nav.
Prompt: "Separá el site header (<header>) de la navigation bar (<nav>) con los links de página adentro."

### Card  [web]
TAG/API: `<Card>` / `role="group"`
Qué es: El rectángulo con media, título, cuerpo y footer — cada parte tiene nombre.
Prompt: "Creá una card con imagen, título, cuerpo y footer, cada parte como sub-elemento nombrado."

### Resize Handle (Size Grip)  [web]
TAG/API: `resize`
Qué es: Las tres líneas diagonales en la esquina de un text box que arrastrás para agrandarlo.
Prompt: "Agregá un resize handle (size grip) en la esquina inferior derecha del panel."

### Hamburger Menu (Nav Drawer)  [web]
TAG/API: `aria-expanded` + `aria-controls`
Qué es: El botón de tres líneas y el panel de navegación que se desliza abierto.
Prompt: "Creá un hamburger menu que abra un nav drawer, con aria-expanded y aria-controls."

### Bento Grid  [web]
TAG/API: `display: grid` + `grid-column: span 2`
Qué es: Una grilla, tiles de tamaños mixtos — un layout empaquetado como una caja bento.
Prompt: "Armá un bento grid con display:grid y tiles que hacen span de 2 columnas."

### Masonry Layout (Pinterest Grid)  [web]
TAG/API: `columns`
Qué es: Cards de distintas alturas empaquetadas en columnas sin gaps de fila.
Prompt: "Creá un masonry layout con CSS columns para cards de altura variable."

### Easing (Timing Function)  [web]
TAG/API: `transition-timing-function`
Qué es: La curva de velocidad de una animación — por qué el motion se siente suave o robótico.
Prompt: "Definí easing con transition-timing-function (ej. cubic-bezier) para que el motion sea suave."

### Spring Animation  [web]
TAG/API: `transition={{ type: "spring", stiffness, damping }}`
Qué es: Motion basado en física que sobrepasa el objetivo y se asienta.
Prompt: "Usá una spring animation con stiffness y damping para el elemento interactivo."

### Text Scramble (Decode Effect)  [web]
TAG/API: `ScrambleTextPlugin`
Qué es: Caracteres al azar se agitan y se asientan en el texto real.
Prompt: "Agregá un text scramble / decode effect que resuelve el texto final."

### Lightbox  [web]
TAG/API: `<dialog>`
Qué es: El overlay de imagen click-to-enlarge que atenúa la página detrás.
Prompt: "Creá un lightbox con <dialog> que agrande la imagen y atenúe el fondo."

### Marquee  [web]
TAG/API: `animation` + `@keyframes translateX`
Qué es: Contenido que scrollea solo hacia un costado en loop infinito.
Prompt: "Agregá un marquee con @keyframes translateX en loop infinito."

### Form Field  [web]
TAG/API: `<label for>`
Qué es: Cada parte de un input etiquetado — label, placeholder, helper text y la línea roja de error.
Prompt: "Creá un form field con label for, placeholder, helper text y estado de error."

### Truncation (Ellipsis & Line Clamp)  [web]
TAG/API: `text-overflow: ellipsis` / `line-clamp`
Qué es: Texto cortado con … — al final de la línea, tras N líneas, o en el medio.
Prompt: "Aplicá truncation con text-overflow:ellipsis o line-clamp según corresponda."

### Drag & Drop  [web]
TAG/API: `ondrop`
Qué es: Los grips, handles, previews y cues de aterrizaje alrededor de un drag.
Prompt: "Implementá drag & drop con ondrop, handle visual y preview de arrastre."

### Divider vs. Separator vs. Rule  [web]
TAG/API: `<hr>` / `role="separator"`
Qué es: La misma línea fina puede marcar corte de tema, separar controles o ser decoración.
Prompt: "Usá <hr> o role=separator según la línea separe contenido, controles o sea decorativa."

### Progress Ring vs. Spinner vs. Progress Bar  [web]
TAG/API: `<progress>` / `aria-busy`
Qué es: Un spinner significa 'esperá'; un ring o barra puede mostrar cuánto falta.
Prompt: "Elegí spinner (indeterminado) o progress bar/ring (determinado) según el caso."

### The Three Dots (Overflow Menu)  [web]
TAG/API: `<button>` (kebab / meatballs / hamburger)
Qué es: Puntos horizontales, verticales, tres líneas y elipsis significan cosas distintas.
Prompt: "Usá un overflow menu (kebab) para acciones secundarias, no lo confundas con el hamburger."

### Modal Dialog vs. Drawer vs. Sheet  [web]
TAG/API: `<dialog>`
Qué es: Tres overlays distinguidos por ubicación, alcance y profundidad de tarea.
Prompt: "Elegí dialog (centro), drawer (lateral) o sheet según alcance y profundidad de la tarea."

### Popover vs. Dropdown Menu vs. Tooltip  [web]
TAG/API: `popover`
Qué es: Tres overlays anclados con distinto trigger, contenido y regla de cierre.
Prompt: "Distinguí popover (contenido rico), dropdown (menú de acciones) y tooltip (ayuda)."

### Scrim (Backdrop / Overlay)  [web]
TAG/API: `::backdrop`
Qué es: La capa translúcida que separa una superficie modal de la página.
Prompt: "Agregá un scrim (::backdrop) translúcido detrás del modal."

### Skeleton vs. Spinner  [web]
TAG/API: `aria-busy="true"`
Qué es: Dos indicadores de carga: layouts predecibles (skeleton) vs esperas indeterminadas (spinner).
Prompt: "Usá skeleton para layouts conocidos y spinner para cargas indeterminadas."

### Combobox (Autocomplete / Typeahead)  [web]
TAG/API: `role="combobox"`
Qué es: Un input de texto emparejado con una lista filtrada de sugerencias.
Prompt: "Creá un combobox accesible (role=combobox) con filtrado typeahead."

### Command Palette  [web]
TAG/API: `Command` (⌘K)
Qué es: Un launcher buscable de acciones y navegación, first-keyboard.
Prompt: "Creá un command palette (⌘K) buscable para acciones y navegación."

### Accordion (Disclosure)  [web]
TAG/API: `<details>` / `role="region"`
Qué es: Secciones apiladas cuyos headings expanden y colapsan su contenido.
Prompt: "Creá un accordion con <details>/<summary> para secciones expandibles."

### Tabs  [web]
TAG/API: `role="tablist"`
Qué es: Una sola fila de labels que cambia una región de contenido compartida.
Prompt: "Creá tabs accesibles con role=tablist que cambian una sola región de contenido."

### Badge vs. Chip vs. Pill vs. Tag  [web]
TAG/API: `Badge` / `role="status"`
Qué es: Labels compactos distinguidos por significado, forma e interactividad.
Prompt: "Elegí badge (estado), chip (filtro), pill (forma) o tag según el significado."

### Breadcrumbs  [web]
TAG/API: `<nav>` (aria-label="breadcrumb")
Qué es: Un rastro de jerarquía desde la página actual hacia sus ancestros.
Prompt: "Agregá breadcrumbs con nav aria-label=breadcrumb hasta la home."

### Sticky vs. Fixed Positioning  [web]
TAG/API: `position: sticky`
Qué es: Dos formas de mantener un elemento visible, con distinto bloque contenedor.
Prompt: "Usá position:sticky dentro de su contenedor, no fixed, salvo que sea viewport."

### Focus Ring (:focus-visible)  [web]
TAG/API: `:focus-visible`
Qué es: El outline que identifica al control activo solo con teclado.
Prompt: "Mantené un focus ring con :focus-visible para accesibilidad de teclado."

### Empty State  [web]
TAG/API: `<section>` (role="status")
Qué es: Guía con propósito cuando una vista todavía no tiene contenido.
Prompt: "Creá un empty state con ícono, mensaje y CTA cuando no hay datos."

### Hover Card  [web]
TAG/API: `HoverCard` (role="dialog" no modal)
Qué es: Una preview rica, no modal, revelada desde una referencia en hover o focus.
Prompt: "Agregá un hover card no modal con preview rica en hover/focus."

### Switch vs. Checkbox vs. Radio  [web]
TAG/API: `<input type="checkbox" role="switch">`
Qué es: Controles para on/off, elecciones independientes o una opción de un grupo.
Prompt: "Elegí switch (on/off), checkbox (múltiple) o radio (única de grupo)."

### Toggle Group (Segmented Control)  [web]
TAG/API: `ToggleGroup` (role="group")
Qué es: Una fila conectada de opciones compactas con una selección persistente.
Prompt: "Creá un toggle group (segmented) con una selección persistente."

---

## macOS (32)

### Insertion Caret (Insertion Point)  [macOS]
TAG/API: `NSTextView.insertionPointColor`
Qué es: La línea parpadeante dentro del texto que marca dónde aparece el próximo caracter.
Prompt: "Configurá el insertion caret (NSTextView.insertionPointColor) del editor de texto."

### Pointer (Cursor)  [macOS]
TAG/API: `NSCursor`
Qué es: Cada forma que toma el puntero del mouse — y el nombre real de cada una.
Prompt: "Seteá el NSCursor adecuado (arrow, i-beam, pointingHand, crosshair) por zona."

### Alert  [macOS]
TAG/API: `NSAlert`
Qué es: La ventanita centrada con ícono badged, línea en bold y botones Cancel/OK.
Prompt: "Mostrá un NSAlert con ícono, mensaje y botones Cancel/OK."

### Slider  [macOS]
TAG/API: `NSSlider`
Qué es: El knob redondo que arrastrás sobre una pista para elegir un valor de un rango.
Prompt: "Creá un NSSlider con knob arrastrable sobre una pista de rango."

### Color Well  [macOS]
TAG/API: `NSColorWell`
Qué es: El botoncito swatch que muestra el color actual y abre el picker.
Prompt: "Agregá un NSColorWell que abra el color picker al hacer click."

### Mac Window  [macOS]
TAG/API: `NSWindow`
Qué es: El frame movible de la app Mac, de su title bar y toolbar a sus bordes de resize.
Prompt: "Definí la NSWindow con title bar, toolbar y bordes de resize."

### Split View  [macOS]
TAG/API: `NSSplitView`
Qué es: Panes redimensionables separados por un divisor arrastrable dentro de una ventana Mac.
Prompt: "Creá un NSSplitView con panes redimensionables y divisor arrastrable."

### Scroll View (Scroller)  [macOS]
TAG/API: `NSScrollView`
Qué es: Un viewport cuyo scrollbar de AppKit se llama scroller.
Prompt: "Embebé el contenido en un NSScrollView con scroller nativo."

### Search Field  [macOS]
TAG/API: `NSSearchField`
Qué es: Un text field Mac con búsqueda, limpieza y controles de queries recientes integrados.
Prompt: "Creá un NSSearchField con clear button y recent queries."

### Save Panel  [macOS]
TAG/API: `NSSavePanel`
Qué es: El diálogo estándar Mac para nombrar un archivo y elegir dónde guardarlo.
Prompt: "Abrí un NSSavePanel para nombre de archivo y destino."

### Token Field  [macOS]
TAG/API: `NSTokenField`
Qué es: Un input de texto que convierte valores reconocidos en tokens redondeados removibles.
Prompt: "Creá un NSTokenField que convierta valores en tokens removibles."

### Combo Button  [macOS]
TAG/API: `NSComboButton`
Qué es: Una acción principal unida a una flecha separada que abre acciones relacionadas.
Prompt: "Creá un NSComboButton con acción principal + menú de acciones."

### Level Indicator  [macOS]
TAG/API: `NSLevelIndicator`
Qué es: Un gauge Mac renderizado como barra de capacidad, estrellas de rating o medidor de relevancia.
Prompt: "Usá un NSLevelIndicator (capacity / rating / relevance) según el caso."

### Column View (Browser)  [macOS]
TAG/API: `NSBrowser`
Qué es: Columnas estilo Finder que revelan cada nivel sucesivo de una jerarquía.
Prompt: "Creá una column view (NSBrowser) estilo Finder para la jerarquía."

### Outline View  [macOS]
TAG/API: `NSOutlineView`
Qué es: Un árbol indentado de filas que expanden para revelar hijos anidados.
Prompt: "Creá un NSOutlineView con filas expandibles e hijos anidados."

### Menu Bar  [macOS]
TAG/API: `NSApp.mainMenu`
Qué es: La franja arriba de la pantalla Mac — cada parte, etiquetada.
Prompt: "Definí el NSApp.mainMenu con sus ítems y submenús etiquetados."

### Context Menu  [macOS]
TAG/API: `NSMenu`
Qué es: El menú que se abre en el puntero con click derecho o Control-click sobre un item.
Prompt: "Agregá un NSMenu contextual (right-click / Control-click) sobre el item."

### Disclosure Triangle  [macOS]
TAG/API: `NSOutlineView`
Qué es: El controlcito rotativo que revela u oculta contenido anidado.
Prompt: "Usá un disclosure triangle (NSOutlineView) para revelar contenido anidado."

### Dock Badge  [macOS]
TAG/API: `NSDockTile.badgeLabel`
Qué es: El contador rojo o label de estado superpuesto sobre el ícono del Dock de la app.
Prompt: "Seteá un NSDockTile.badgeLabel con el contador de notificaciones."

### Focus Ring  [macOS]
TAG/API: `NSView.focusRingType`
Qué es: El glow de color de acento que identifica el control recibiendo input de teclado.
Prompt: "Mantené el NSView.focusRingType de acento en el control con foco."

### Inspector  [macOS]
TAG/API: `View.inspector(isPresented:content:)`
Qué es: El panel de la derecha para ver y editar detalles de la selección actual.
Prompt: "Agregá un inspector (panel derecho) para detalles de la selección."

### Panel (Floating Window / HUD)  [macOS]
TAG/API: `NSPanel`
Qué es: Una ventana auxiliar macOS que flota sobre las ventanas de documento relacionadas.
Prompt: "Creá un NSPanel (HUD) que flote sobre la ventana de documento."

### Popover  [macOS]
TAG/API: `NSPopover`
Qué es: Una burbuja flotante cuya flecha apunta de vuelta al control que la abrió.
Prompt: "Mostrá un NSPopover anclado con flecha al control que lo abrió."

### Pop-Up Button vs. Pull-Down Button vs. Combo Box  [macOS]
TAG/API: `NSPopUpButton`
Qué es: Tres controles Mac similares para elegir un valor o invocar una acción de menú.
Prompt: "Elegí NSPopUpButton (valor), pull-down (acción) o combo box según el caso."

### Segmented Control  [macOS]
TAG/API: `NSSegmentedControl`
Qué es: Una fila de opciones conectadas con el segmento actual visiblemente seleccionado.
Prompt: "Creá un NSSegmentedControl con el segmento activo resaltado."

### Sheet  [macOS]
TAG/API: `NSWindow.beginSheet(_:completionHandler:)`
Qué es: Un panel modal pegado a una ventana macOS, no a toda la app.
Prompt: "Mostrá un sheet (NSWindow.beginSheet) modal solo para la ventana."

### Sidebar (Source List)  [macOS]
TAG/API: `NavigationSplitView`
Qué es: La columna de navegación translúcida al borde izquierdo de una ventana macOS.
Prompt: "Creá una sidebar (NavigationSplitView) translúcida a la izquierda."

### Stepper  [macOS]
TAG/API: `NSStepper`
Qué es: El par compacto de flechas arriba/abajo para incrementar o decrementar un valor.
Prompt: "Agregá un NSStepper para incrementar/decrementar valores numéricos."

### Toolbar (Unified Title Bar)  [macOS]
TAG/API: `NSToolbar`
Qué es: Una fila de acciones de ventana integrada con la title bar moderna de macOS.
Prompt: "Integrá un NSToolbar con la unified title bar."

### Traffic Lights (Window Controls)  [macOS]
TAG/API: `NSWindow.standardWindowButton(_:)`
Qué es: Los controles rojo, amarillo y verde arriba a la izquierda de una ventana macOS.
Prompt: "Posicioná los traffic lights (standardWindowButton) arriba a la izquierda."

### Visual Effect Material (Vibrancy)  [macOS]
TAG/API: `NSVisualEffectView`
Qué es: El fondo translúcido adaptativo detrás de sidebars, menús y paneles macOS.
Prompt: "Aplicá NSVisualEffectView (vibrancy) de fondo translúcido."

### Menu Bar Extra (Status Item)  [macOS]
TAG/API: `NSStatusItem`
Qué es: El ícono que vive al lado derecho de la menu bar de macOS.
Prompt: "Agregá un NSStatusItem (menu bar extra) a la derecha de la menu bar."

---

## CÓMO USAR ESTE SKILL

Cuando vayas a construir o revisar una web/UI:

1. **Nombrá bien.** En tu prompt de implementación usá el NOMBRE REAL del
   componente (ej. "creá un **carousel**", no "las fotos que pasan"). Eso es
   lo que hace NameThatUI: nombre real → símbolo de API → prompt del agente.
2. **Desambigüación.** Si dudás entre dos, buscá la entrada "vs." (Badge vs
   Chip vs Pill, Modal vs Drawer vs Sheet, Popover vs Dropdown vs Tooltip,
   Switch vs Checkbox vs Radio, Divider vs Separator vs Rule, Progress Ring vs
   Spinner vs Progress Bar, Skeleton vs Spinner, Pop-Up vs Pull-Down vs Combo
   Box, Site Header vs Nav Bar, Sticky vs Fixed).
3. **Prompt paste-ready.** Cada entrada trae una línea "Prompt:" que podés
   pegar directo en tu agente de código.
4. **Plataforma.** Las entradas `[web]` son para la web; las `[macOS]` son
   patrones nativos de Mac (útil si también targeteás escritorio).

### Archivos por componente (referencia completa)

Cada componente tiene su propio archivo en `assets/<slug>.md` con el contenido
**completo** extraído de la página original, en esta estructura canónica:

```
# Nombre
> Demo interactivo: <url>
**Plataforma:** web|macOS · **Tag/API:** `<tag>` · **También llamado:** …
## Descripción          (texto real del sitio)
## Si lo llamaste…      (frases que la gente usa — descripción extra)
## Anatomía             (cada parte nombrada, si aplica)
## Prompt para IA       (prompt paste-ready para tu agente)
### Debug prompt        (cuando falla)
## En el código         (tabla: framework → nombre → nota)
## Ver también          (links clicables a componentes relacionados)
```

La lista maestra con links está en `reference/bibliography.md`.

Para usar un componente en particular, leé `assets/<slug>.md`. Slugs ej.:

- `assets/form-field.md` — Form Field (web)
- `assets/carousel.md` — Carousel (web)
- `assets/modal-dialog-drawer-sheet.md` — Modal vs Drawer vs Sheet (web)
- `assets/popover.md` — Popover (macOS)
- `assets/segmented-control.md` — Segmented Control (macOS)

Ver `reference/bibliography.md` para los 71 links (original + local).

### Atajo mental
> "Lo que se ve" → buscá el nombre en este glosario → usé el tag/API que dice
> → pegá el prompt (o leé `assets/<slug>.md` para el contenido completo). No
> inventes nombres: el agente entiende mejor los reales.

### Fuente
71 componentes catalogados en https://namethatui.com/ (39 web + 32 macOS),
extraídos como referencia para builds con agentes de código. Cada
`assets/<slug>.md` es una copia local del contenido de su URL correspondiente;
`reference/bibliography.md` es la bibliografía con las fuentes originales.
