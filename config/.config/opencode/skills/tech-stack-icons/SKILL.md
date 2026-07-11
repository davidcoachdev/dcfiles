# Tech Stack Icons

Referencia de iconos de tecnologías para mostrar stacks en landing pages.

## Profile

- **Uso**: Secciones "Built with", "Tech stack", "Powered by" en landing pages
- **Sets**: Simple Icons, Devicon, skill icons personalizados

## Simple Icons (CDN)

```html
<!-- https://simpleicons.org/ -->
<img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" width="24" height="24">
<img src="https://cdn.simpleicons.org/nextdotjs/000000" alt="Next.js" width="24" height="24">
<img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" width="24" height="24">
```

```html
<!-- Con bg blanco para icons oscuros -->
<img src="https://cdn.simpleicons.org/nextdotjs/white" alt="Next.js" width="24" height="24" style="background: #000; border-radius: 4px; padding: 2px;">
```

## Public CDN

```css
/* stack section */
.stack-section { display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; align-items: center; padding: 40px 0; }
.stack-item { display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 12px; color: var(--text-tertiary); }
.stack-item img { width: 32px; height: 32px; transition: transform 0.2s; }
.stack-item:hover img { transform: translateY(-2px); }
```

```html
<div class="stack-section">
  <div class="stack-item">
    <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React">
    <span>React</span>
  </div>
  <div class="stack-item">
    <img src="https://cdn.simpleicons.org/nextdotjs/000000" alt="Next.js">
    <span>Next.js</span>
  </div>
  <div class="stack-item">
    <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript">
    <span>TypeScript</span>
  </div>
</div>
```

## Íconos Comunes

| Tecnología | Simple Icon ID | Color |
|------------|---------------|-------|
| React | react | 61DAFB |
| Next.js | nextdotjs | 000000 |
| TypeScript | typescript | 3178C6 |
| JavaScript | javascript | F7DF1E |
| Node.js | nodedotjs | 339933 |
| Python | python | 3776AB |
| Go | go | 00ADD8 |
| Rust | rust | 000000 |
| Docker | docker | 2496ED |
| AWS | amazonwebservices | FF9900 |
| Vercel | vercel | 000000 |
| Tailwind | tailwindcss | 06B6D4 |
| GitHub | github | 181717 |
| PostgreSQL | postgresql | 4169E1 |
| Redis | redis | FF4438 |
| GraphQL | graphql | E10098 |
| Figma | figma | F24E1E |
| Supabase | supabase | 3ECF8E |

## Grayscale (modo oscuro)

```html
<img src="https://cdn.simpleicons.org/react/888" alt="React">
```

```css
.stack-item img {
  filter: grayscale(100%) brightness(1.5);
  opacity: 0.6;
  transition: all 0.2s;
}
.stack-item:hover img {
  filter: none;
  opacity: 1;
}
```

## Marque Wrap

```css
.stack-marquee {
  display: flex;
  gap: 48px;
  animation: scroll 20s linear infinite;
}
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Usar Simple Icons CDN (rápido, sin build) | Subir SVGs manuales (pesado) |
| Grayscale + hover para color | Iconos a color brillante que distraen |
| Padding consistente entre icons | Tamaños irregulares |
| Marquesina infinita con CSS (no JS) | Animación JS compleja para algo simple |
| Alt text en cada icon | Imágenes sin descripción |
