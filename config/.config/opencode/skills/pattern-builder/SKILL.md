---
name: pattern-builder
description: >
  Patrón Builder: construir objetos complejos paso a paso.
  Trigger: Cuando la construcción tiene muchos pasos o parámetros.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Construir objetos complejos **paso a paso**, permitiendo diferentes representaciones.

## Cuándo Usarlo

- Construcción de objetos con muchos parámetros opcionales
- Construcción paso a paso (no todo en constructor)
- Diferentes representaciones del mismo objeto
- Constructor con demasiados parámetros (anti-pattern)

## Estructura

```
Director → Builder → Product
            ├─ buildPartA()
            ├─ buildPartB()
            └─ getResult() → Product

ConcreteBuilderA → ProductA
ConcreteBuilderB → ProductB
```

## Ejemplo

```python
class House:
    def __init__(self):
        self.walls = None
        self.roof = None
        self.windows = None

class HouseBuilder:
    def __init__(self):
        self.house = House()
    
    def build_walls(self, material):
        self.house.walls = material
        return self  # fluent interface
    
    def build_roof(self, style):
        self.house.roof = style
        return self
    
    def build_windows(self, count):
        self.house.windows = count
        return self
    
    def get_result(self):
        return self.house

# Uso
house = HouseBuilder().build_walls("brick").build_roof("slanted").get_result()
```

## Código Smell que Resuelve

- Constructor con muchos parámetros
- Telescoping constructor (muchos overloads)
- Creación paso a paso compleja

## Ventajas vs Telescoping Constructor

| Telescoping | Builder |
|-------------|----------|
| House("brick", None, "slanted", 5, ...) | builder.walls("brick").roof("slanted") |
| Orden fijo de parámetros | Parámetros en cualquier orden |
| Difícil de leer | Legible |

## Recursos

- https://refactoring.guru/es/design-patterns/builder