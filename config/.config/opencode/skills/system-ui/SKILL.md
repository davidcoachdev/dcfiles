# System UI

Componentes de sistema: el set mínimo que toda UI necesita.

## Componentes Core

### Button

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-primary { background: var(--accent); color: white; }
.btn-primary:hover { opacity: 0.9; }
.btn-secondary { background: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border); }
.btn-secondary:hover { background: var(--bg-tertiary); }
.btn-ghost { background: transparent; color: var(--text-secondary); }
.btn-ghost:hover { background: var(--bg-secondary); }
.btn-danger { background: var(--error); color: white; }
.btn-sm { padding: 6px 12px; font-size: 13px; }
.btn-lg { padding: 14px 28px; font-size: 16px; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
```

### Input

```css
.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.input::placeholder { color: var(--text-tertiary); }
.input-error { border-color: var(--error); }
.input-wrapper { position: relative; }
.input-icon {
  position: absolute;
  left: 12px; top: 50%; transform: translateY(-50%);
  color: var(--text-tertiary);
  pointer-events: none;
}
.input-wrapper .input { padding-left: 36px; }
```

### Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
}
.badge-default { background: var(--bg-tertiary); color: var(--text-secondary); }
.badge-success { background: rgba(34, 197, 94, 0.1); color: #16a34a; }
.badge-warning { background: rgba(245, 158, 11, 0.1); color: #d97706; }
.badge-error { background: rgba(239, 68, 68, 0.1); color: #dc2626; }
.badge-accent { background: rgba(59, 130, 246, 0.1); color: #2563eb; }
```

### Card

```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
}
.card-header { margin-bottom: 16px; }
.card-title { font-size: 16px; font-weight: 600; }
.card-description { font-size: 14px; color: var(--text-secondary); margin-top: 4px; }
```

### Dialog / Modal

```css
.dialog-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 50;
}
.dialog {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 24px;
  min-width: 400px;
  max-width: 90vw;
  z-index: 51;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.dialog-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.dialog-close { background: none; border: none; cursor: pointer; color: var(--text-tertiary); }
```

### Toast

```css
.toast {
  position: fixed;
  bottom: 24px; right: 24px;
  padding: 12px 20px;
  border-radius: 10px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  z-index: 100;
  animation: slideIn 0.3s ease-out;
}
@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| States: default, hover, active, disabled, focus | Componentes sin feedback visual |
| Consistent border-radius | Cada componente con radio distinto |
| Font-size estándar (14px botones, 16px body) | Múltiples tamaños inconsistentes |
| Spacing consistente (8px grid) | Padding arbitrario |
| Componentes accesibles (focus, keyboard) | Solo visual, sin accesibilidad |
