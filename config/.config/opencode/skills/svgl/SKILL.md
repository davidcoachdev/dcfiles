# svgl

Biblioteca de logos SVG para usar en proyectos.

## Qué es

Colección de logos SVG optimizados para web. 5.8k stars, MIT.

Web: https://svgl.app

## Cómo usar

### 1. Buscar un logo

Ir a https://svgl.app y buscar el logo que necesitás.

### 2. Usar en código

```bash
# Descargar directamente
curl -o logo.svg https://svgl.app/library/你的-logo.svg
```

### 3. API

```
GET https://svgl.badger.app/api/library?theme=light
```

Parámetros:
- `theme`: `light` | `dark`
- `category`: filtrar por categoría

## Agregar un nuevo logo

1. Fork del repo: https://github.com/pheralb/svgl/fork
2. Agregar el SVG en `static/library/`
3. Agregar metadata en `src/data/svgs.ts`:

```typescript
{
  title: 'Nombre',
  category: 'Categoria',  // ver src/types/categories.ts
  route: '/library/tu_logo.svg',
  url: 'https://sitio.com'
}
```

4. Crear PR

## Reglas del SVG

- Optimizar con [SVGOMG](https://jakearchibald.github.io/svgomg/)
- NO remover `viewBox`
- Máximo 21kb

## Trigger

- User necesita un logo de una marca/tool
- Buscar iconos SVG para proyecto
- Agregar nuevo logo a la colección