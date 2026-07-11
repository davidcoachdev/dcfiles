---
name: refactoring-guru-smells
description: >
  Catálogo de code smells de Refactoring.Guru.
metadata:
  author: Refactoring.Guru
  url: https://refactoring.guru/es/refactoring/smells
---

## Main Source

**Title:** Catálogo de Code Smells
**Website:** Refactoring.Guru
**URL:** https://refactoring.guru/es/refactoring/smells

## Las 8 Categorías

### 1. Bloaters (código inflado)

| Smell | Descripción |
|-------|-------------|
| Long Method | Método > 10-20 líneas, hace demasiadas cosas |
| Large Class | Clase con muchas responsabilidades |
| Primitive Obsession | Usar primitivos en vez de objetos pequeños |
| Long Parameter List | Más de 3-4 parámetros |
| Data Clumps | Mismos grupos de datos juntos en múltiples lugares |

### 2. Object-Orientation Abusers

| Smell | Descripción |
|-------|-------------|
| Switch Statements | Switch/if grandes que violan OCP |
| Temporary Field | Campos temporales usados solo en ciertos casos |
| Refused Bequest | Subclase que no usa todo lo que hereda |
| Alternative Classes | Clases con interfaces diferentes para lo mismo |

### 3. Change Preventers

| Smell | Descripción |
|-------|-------------|
| Divergent Change | Cambiar una clase requiere cambiar muchos lugares |
| Shotgun Surgery | Un cambio requiere modificar muchas clases |
| Parallel Inheritance | Jerarquías paralelas que siempre se crean juntas |

### 4. Dispensables

| Smell | Descripción |
|-------|-------------|
| Comments | Comentarios que explican código confuso |
| Duplicate Code | Mismo código en múltiples lugares |
| Lazy Class | Clase que no hace suficiente |
| Data Class | Clase solo con datos, sin comportamiento |
| Dead Code | Código que ya no se usa |
| Speculative Generality | Clases/métodos "por si acaso" |

### 5. Couplers (acoplamiento)

| Smell | Descripción |
|-------|-------------|
| Feature Envy | Método usa más datos de otra clase que de la propia |
| Inmutability | Dos clases saben demasiado una de otra |
| Message Chains | Llamadas encadenadas (a.getB().getC().getD()) |
| Middle Man | Clase que solo delega a otra |

## Used In

- Skill: `refactoring` → Índice principal
- Skills específicas: `ref-smell-*`