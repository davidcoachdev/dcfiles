---
name: pattern-flyweight
description: >
  Patrón Flyweight: compartir estado común entre muchos objetos.
  Trigger: Cuando tenés miles de objetos similares y necesitás optimizar memoria.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Mantener más objetos dentro de la cantidad disponible de memoria RAM **compartiendo las partes comunes del estado** entre varios objetos.

## Cuándo Usarlo

- Gran cantidad de objetos similares
- Memoria es bottleneck
- Estado extrínseco vs intrínseco
- trees, graphs con muchos nodos similares

## Estructura

```
FlyweightFactory → get_flyweight(key) → shared Flyweight

Flyweight
    └─ operation(extrinsic_state)

ConcreteFlyweight
    └─ intrinsic_state (compartido)

UnsharedConcreteFlyweight
    └─ puede tener estado no compartido
```

## Ejemplo

```python
class TreeType:
    def __init__(self, name, color, texture):
        self.name = name
        self.color = color
        self.texture = texture
    
    def draw(self, canvas, x, y):
        pass  # dibujar con los datos

class TreeFactory:
    def __init__(self):
        self.types = {}
    
    def get_tree_type(self, name, color, texture):
        key = f"{name}_{color}_{texture}"
        if key not in self.types:
            self.types[key] = TreeType(name, color, texture)
        return self.types[key]

class Tree:
    def __init__(self, x, y, tree_type):
        self.x = x
        self.y = y
        self.type = tree_type  # shared!

# Mil árboles pero solo unos pocos TreeType
forest = [Tree(x, y, factory.get_tree_type("oak", "green", "rough")) for ...]
```

## Estado Intrínseco vs Extrínseco

| Intrínseco | Extrínseco |
|------------|-----------|
| Compartido | Único por objeto |
| Independiente de contexto | Depende del contexto |
| En Flyweight | En cliente |

## Código Smell que Resuelve

- Demasiados objetos consumiendo memoria
- Objetos con datos repetidos

## Recursos

- https://refactoring.guru/es/design-patterns/flyweight