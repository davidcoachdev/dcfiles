# Design Prototype Agent - Quick Start

## ✅ INSTALADO Y LISTO

Tu agente `design-prototype` está registrado en OpenCode.

---

## 🚀 CÓMO USAR

### **Paso 1: Invocar agente**

```bash
opencode --agent design-prototype
```

O desde OpenCode TUI:
```bash
opencode
# Luego: /design-prototype "tu brief aquí"
```

---

### **Paso 2: Agent ejecuta workflow**

El agente orquesta 4 subagentes automáticamente:

#### **Subagente 1: Discovery (30s)**
Te pregunta:
1. **Surface**: landing / dashboard / auth-flow / mobile / email
2. **Sections**: hero, features, pricing, sidebar, forms, etc.
3. **Tone**: professional / playful / minimal / bold / editorial
4. **Brand**: "tenemos brand" / "no brand, elegí vos"
5. **Complexity**: simple / medium / complex

Guardá respuestas → `context/discovery.json`

---

#### **Subagente 2: Direction (10s, si no hay brand)**
Muestra 5 direcciones visuales:

1. **Modern Minimal** (Linear) — monochrome + accent
2. **Soft Warm** (Notion) — peachy neutrals
3. **Tech Utility** (Vercel) — greys + dark mode
4. **Editorial** (Stripe) — serif + warm rust
5. **Brutalist** — harsh blacks + oversized

Elegís una → agent genera CSS tokens → `context/direction.json`

---

#### **Subagente 3: Prototype (60s)**
Genera HTML/CSS:
- Lee `context/discovery.json`
- Lee `context/direction.json`
- Lee seed template (`templates/html-seeds/dashboard.html`)
- Aplica CSS tokens
- Genera secciones
- Escribe `output/prototype-*.html`

**Para tu caso (login + dashboard):**
- `output/prototype-login.html`
- `output/prototype-dashboard.html`

---

#### **Subagente 4: Check (30s)**
Revisa con 5-dim critique:
- **Philosophy** (1-5) — matches direction?
- **Hierarchy** (1-5) — visual hierarchy clear?
- **Detail** (1-5) — polished?
- **Function** (1-5) — everything works?
- **Innovation** (1-5) — distinctive?

Plus:
- Accessibility checks (ARIA, contrast, keyboard nav)
- Responsive checks (mobile, tablet, desktop)
- Anti-AI-slop checks (no purple gradients, no fake metrics)

**Verdict:** APPROVE / REVISE

Si REVISE → loop back a Prototype.

---

### **Paso 3: Preview**

Abrí los HTML en browser:
```bash
firefox output/prototype-login.html
firefox output/prototype-dashboard.html
```

Iterá si necesitás:
- "make hero bigger"
- "change accent color to blue"
- "add forgot password link"

---

### **Paso 4: Convertir a Next.js**

Cuando apruebes el prototipo:

```bash
opencode --agent gentleman-sdd
```

**User:** "convert prototype-dashboard.html to Next.js + shadcn + Tailwind"

**Gentleman-SDD ejecuta:**
1. **Sketch** → lee HTML, genera kits (R1: Auth, R2: Dashboard, etc.)
2. **Map** → task graph
3. **Make** → código Next.js:
   ```
   app/
   ├── (auth)/
   │   ├── login/page.tsx
   │   └── register/page.tsx
   └── (dashboard)/
       ├── layout.tsx
       ├── page.tsx
       └── components/
           ├── sidebar.tsx
           ├── stats-cards.tsx
           └── ui/ (shadcn)
   ```
4. **Check** → peer review

**Output:** Código production-ready

---

## 📋 EJEMPLO COMPLETO: Login → Dashboard

### **Invocación:**
```bash
opencode --agent design-prototype
```

**User:** "login that redirects to dashboard after login"

---

### **Discovery (agent pregunta):**
```
1. Surface: auth-flow + dashboard
2. Sections: login-form, dashboard (sidebar, header, stats-cards)
3. Tone: professional
4. Brand: no brand
5. Complexity: simple
```

---

### **Direction (agent muestra):**
```
Pick visual direction:
1. Modern Minimal (Linear)
2. Soft Warm (Notion)
3. Tech Utility (Vercel)
4. Editorial (Stripe)
5. Brutalist

Your choice: _
```

**User:** `1` (Modern Minimal)

---

### **Prototype (agent genera):**
```
✅ Prototype generated!

Files:
- output/prototype-login.html (3.2 KB)
- output/prototype-dashboard.html (4.8 KB)

Preview: file://output/prototype-login.html
```

---

### **Check (agent revisa):**
```
✅ Critique complete: APPROVE

Scores:
- Philosophy: 4/5 (matches Modern Minimal)
- Hierarchy: 5/5 (clear)
- Detail: 4/5 (polished)
- Function: 4/5 (works)
- Innovation: 3/5 (standard patterns)

All checks passed.
```

---

### **Preview:**
Abrís `prototype-login.html` en browser:
- Email input
- Password input
- "Sign In" button
- Social login (Google, GitHub)
- Link a "Forgot password?"
- Link a dashboard (simula redirect)

Abrís `prototype-dashboard.html`:
- Sidebar con nav
- Header con user menu
- Stats cards (4 cards)
- Main content area

---

### **Convert to Next.js:**
```bash
opencode --agent gentleman-sdd
> "convert prototype to Next.js + shadcn + Tailwind"
```

Output:
```
app/
├── (auth)/
│   └── login/
│       └── page.tsx
└── (dashboard)/
    ├── layout.tsx
    ├── page.tsx
    └── components/
        ├── sidebar.tsx
        ├── stats-cards.tsx
        └── ui/
            ├── button.tsx
            └── card.tsx
```

---

## 📦 EXPORTAR

### **Tar:**
```bash
cd ~/.config/opencode
tar -czf design-prototype-agent.tar.gz \
  skills/design-prototype \
  commands/design-prototype.md

# En otra máquina
tar -xzf design-prototype-agent.tar.gz -C ~/.config/opencode/
```

Después agregar manualmente a `opencode.json` (o usar script).

---

### **Git:**
```bash
cd ~/.config/opencode/skills/design-prototype
git init
git add .
git commit -m "feat: design-prototype agent"
git remote add origin git@github.com:tu-user/design-prototype-agent.git
git push -u origin main

# En otra máquina
cd ~/.config/opencode/skills/
git clone git@github.com:tu-user/design-prototype-agent.git design-prototype
```

---

### **Dotfiles:**
Agregar a tu repo de dotfiles:
```
dotfiles/
└── .config/
    └── opencode/
        ├── commands/
        │   └── design-prototype.md
        └── skills/
            └── design-prototype/
```

---

## 🎯 PRÓXIMOS PASOS

1. **Probar ahora:**
   ```bash
   opencode --agent design-prototype
   > "login page that redirects to dashboard"
   ```

2. **Agregar design systems** (opcional):
   Copiar desde Open Design:
   ```bash
   git clone https://github.com/nexu-io/open-design.git /tmp/od
   cp /tmp/od/design-systems/linear-app/DESIGN.md \
      ~/.config/opencode/skills/design-prototype/templates/design-systems/linear.md
   ```

3. **Customizar templates:**
   Editar `templates/html-seeds/*.html` según tus necesidades

---

## 🐛 TROUBLESHOOTING

**Agent no aparece:**
```bash
opencode agent list | grep design-prototype
```

Si no aparece → verificar `opencode.json` tiene las 5 entradas (design-prototype + 4 subagentes).

**Subagentes no spawnan:**
Verificar que `call_omo_agent` funciona:
```bash
opencode --help | grep agent
```

**Templates no cargan:**
```bash
ls ~/.config/opencode/skills/design-prototype/templates/html-seeds/
```

---

## ✅ LISTO

Tu agente está instalado y funcionando. Probalo ahora con tu caso de uso.
