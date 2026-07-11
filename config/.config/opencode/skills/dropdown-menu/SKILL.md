# Dropdown Menu

Menús desplegables accesibles, con keyboard nav y posicionamiento.

## HTML Semántico

```html
<div class="dropdown">
  <button
    class="dropdown-trigger"
    aria-haspopup="true"
    aria-expanded="false"
  >
    Menu
    <svg aria-hidden="true" class="chevron" viewBox="0 0 20 20">...</svg>
  </button>
  <div class="dropdown-menu" role="menu" aria-label="Options">
    <a href="#" role="menuitem" tabindex="-1">Profile</a>
    <a href="#" role="menuitem" tabindex="-1">Settings</a>
    <hr role="separator">
    <a href="#" role="menuitem" tabindex="-1">Logout</a>
  </div>
</div>
```

## Estilos Base

```css
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-menu {
  display: none;
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 200px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  padding: 4px;
  z-index: 50;
}
.dropdown.open .dropdown-menu { display: block; }
.dropdown-menu a {
  display: block;
  padding: 8px 12px;
  border-radius: 4px;
  color: var(--text-primary);
  font-size: 14px;
}
.dropdown-menu a:hover,
.dropdown-menu a:focus-visible {
  background: var(--bg-secondary);
}
.dropdown-menu hr {
  margin: 4px 8px;
  border: none;
  border-top: 1px solid var(--border);
}
```

## JavaScript

```javascript
class Dropdown {
  constructor(el) {
    this.el = el;
    this.trigger = el.querySelector('.dropdown-trigger');
    this.menu = el.querySelector('.dropdown-menu');
    this.items = [...this.menu.querySelectorAll('[role="menuitem"]')];
    this.open = false;

    this.trigger.addEventListener('click', () => this.toggle());
    this.menu.addEventListener('keydown', (e) => this.handleKeydown(e));
    document.addEventListener('click', (e) => {
      if (!this.el.contains(e.target)) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  toggle() { this.open ? this.close() : this.open(); }

  open() {
    this.open = true;
    this.el.classList.add('open');
    this.trigger.setAttribute('aria-expanded', 'true');
    this.items[0]?.focus();
  }

  close() {
    this.open = false;
    this.el.classList.remove('open');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.focus();
  }

  handleKeydown(e) {
    const current = this.items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.items[(current + 1) % this.items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.items[(current - 1 + this.items.length) % this.items.length]?.focus();
    }
  }
}

document.querySelectorAll('.dropdown').forEach(el => new Dropdown(el));
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| ARIA roles (`menu`, `menuitem`) | Divs sin semántica |
| Keyboard nav (arrow keys, esc) | Solo mouse |
| Cerrar al hacer click fuera | Menu abierto para siempre |
| Posicionar con espacio suficiente | Menu que se sale del viewport |
| `:focus-visible` en items | Outline feo o sin focus |
