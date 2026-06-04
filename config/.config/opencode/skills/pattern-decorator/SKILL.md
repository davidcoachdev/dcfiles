---
name: pattern-decorator
description: >
  Patrón Decorator: añadir funcionalidades a objetos placing dentro de wrappers especiales.
  Trigger: Cuando necesitás agregar features sin modificar clases.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Añadir funcionalidades a objetos **colocándolos dentro de objetos encapsuladores** especiales que contienen esas funcionalidades.

## Cuándo Usarlo

- Agregar features sin herencia (evitar subclass explosion)
- Agregar features en runtime
- Diferentes combinaciones de features
- Responsabilidades que pueden ser añadidas/removidas

## Estructura

```
Component
    └─ operation()

ConcreteComponent
    └─ operation() → "base"

Decorator (Component + reference to Component)
    └─ operation() → self.component.operation() + self.added_behavior()

ConcreteDecoratorA
    └─ operation(): super + added_feature_a()

ConcreteDecoratorB
    └─ operation(): super + added_feature_b()
```

## Ejemplo

```python
class Coffee(ABC):
    def cost(self): pass

class SimpleCoffee(Coffee):
    def cost(self): return 5

class CoffeeDecorator(Coffee):
    def __init__(self, coffee):
        self.coffee = coffee

class Milk(CoffeeDecorator):
    def cost(self):
        return self.coffee.cost() + 2

class Sugar(CoffeeDecorator):
    def cost(self):
        return self.coffee.cost() + 1

# Combinar en runtime
coffee = SimpleCoffee()
coffee = Milk(coffee)
coffee = Sugar(coffee)
print(coffee.cost())  # 8
```

## Código Smell que Resuelve

- Subclass explosion para agregar features
- Agregar features en tiempo de desarrollo

## Decorator vs Inheritance

| Decorator | Inheritance |
|-----------|------------|
| Runtime | Compile time |
| Composición | Herencia |
| Flexible | Rígido |
| Múltiples combinaciones | Una combinación |

## Recursos

- https://refactoring.guru/es/design-patterns/decorator