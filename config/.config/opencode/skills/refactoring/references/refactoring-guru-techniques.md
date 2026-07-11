---
name: refactoring-guru-techniques
description: >
  Técnicas de refactoring organizadas por tipo.
metadata:
  author: Refactoring.Guru
  url: https://refactoring.guru/es/refactoring/techniques
---

## Main Source

**Title:** Técnicas de Refactoring
**Website:** Refactoring.Guru
**URL:** https://refactoring.guru/es/refactoring/techniques

## Técnicas Principales

### Compiling Methods (métodos)

| Técnica | Descripción |
|---------|-------------|
| Extract Method | Sacar código a un método nuevo |
| Inline Method | Poner método pequeño directamente en su llamado |
| Extract Variable | Introducir variable intermedia |
| Inline Temp | Reemplazar temp con expresión |
| Replace Temp with Query | Usar método en vez de temp |
| Split Temporary Variable | Una variable por cada propósito |
| Remove Assignments to Parameters | No reasignar parámetros |

### Moving Features (entre objetos)

| Técnica | Descripción |
|---------|-------------|
| Move Method | Método a otra clase |
| Move Field | Campo a otra clase |
| Extract Class | Nueva clase de datos/métodos relacionados |
| Inline Class | Clases que ya no aportan |
| Hide Delegate | Ocultar cadena de llamadas |
| Remove Middle Man | 直接 llamar en vez de delegar |
| Introduce Foreign Method | Agregar método a otra clase |
| Introduce Extension | Agregar métodos a clase existente |

### Organizing Data (datos)

| Técnica | Descripción |
|---------|-------------|
| Change Value to Reference | Un objeto → muchos referencias |
| Change Reference to Value | Valor inmutable → objeto |
| Duplicate Observed Data | Dominio y UI en misma clase |
| Self Encapsulate Field | Getter/setter para acceder campo |
| Replace Data Value with Object | Primitivo → objeto con comportamiento |
| Replace Array with Object | Array → objeto con propiedades |
| Change Unidirectional Association | One-way → bidirectional |
| Change Bidirectional to Unidirectional | Eliminar ссылка innecesaria |
| Encapsulate Collection | Getter returns collection |
| Replace Magic Number | Número → constante con nombre |
| Encapsulate Field | Public → private + getter/setter |

### Simplifying Conditionals

| Técnica | Descripción |
|---------|-------------|
| Decompose Conditional | Extraer condiciones a métodos |
| Consolidate Conditional Expression | Unificar condiciones |
| Consolidate Duplicate Conditional | Mismo resultado en branches |
| Remove Control Flag | Return/break en vez de flag |
| Replace Conditional with Polymorphism | Switch → classes |
| Introduce Null Object | Null → objeto con comportamiento |
| Introduce Assertion | Assert para assumptions |

### Making Methods Easier to Call

| Técnica | Descripción |
|---------|-------------|
| Add Parameter | Agregar argumento |
| Remove Parameter | Eliminar argumento no usado |
| Rename Method | Nombre más claro |
| Separate Query from Modifier | Query (return) + Command (side effect) |
| Parameterize Method | Parámetro controla comportamiento |
| Replace Parameter with Method | Eliminar parámetro derivable |
| Introduce Parameter Object | Parámetros → objeto |
| Preserve Whole Object | Obtener objeto → pasar objeto |
| Remove Setting Method | Constructor hace todo |
| Replace Constructor with Factory | Más flexible que constructor |
| Replace Error Code with Exception | throw en vez de return código |
| Replace Exception with Test | Check antes de usar |

## Used In

- Skill: `refactoring` → Técnicas de refactoring