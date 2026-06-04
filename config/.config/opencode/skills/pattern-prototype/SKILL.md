---
name: pattern-prototype
description: >
  Patrón Prototype: copiar objetos existentes sin depender de sus clases.
  Trigger: Cuando crear objetos es costoso o complejo.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Copiar objetos **existentes sin que el código dependa de sus clases**.

## Cuándo Usarlo

- Crear objetos es costoso (DB call, network, cálculo)
- Evitar subclases para crear copias
- Necesitás copiar objetos sin conocer su tipo exacto

## Estructura

```
Prototype (interfaz)
    └─ clone() → Prototype

ConcretePrototypeA
    └─ clone() → new ConcretePrototypeA(self)

ConcretePrototypeB
    └─ clone() → new ConcretePrototypeB(self)
```

## Ejemplo

```python
import copy

class Document:
    def __init__(self, title, content):
        self.title = title
        self.content = content
    
    def clone(self):
        return copy.deepcopy(self)

# Uso
original = Document("Report", "Content here...")
clone = original.clone()
clone.title = "Report Copy"
```

## Código Smell que Resuelve

- Clonar objetos mediante subclases
- Creación costosa de objetos similares
- Código repetido de creación

## Shallow vs Deep Copy

```python
# Shallow - comparte referencias
copy.copy(obj)

# Deep - crea copia independiente
copy.deepcopy(obj)
```

## Casos de Uso Reales

- Templates de documentos
- Configuraciones por defecto
- Clonar entidades en games
- Cache de objetos

## Recursos

- https://refactoring.guru/es/design-patterns/prototype