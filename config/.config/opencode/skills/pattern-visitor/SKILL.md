---
name: pattern-visitor
description: >
  Patrón Visitor: agregar operaciones a una estructura de objetos sin modificar sus clases.
  Trigger: Cuando necesitás agregar nuevas operaciones a una jerarquía de clases.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Representar una operación a realizar sobre elementos de una estructura de objetos, permitiendo definir nuevas operaciones sin cambiar las clases de los elementos.

## Cuándo Usarlo

- Agregar operaciones a jerarquía de clases sin modificarlas
- Muchas operaciones diferentes sobre mismos objetos
- Operaciones complejas que dependen del tipo
- Evitar switch statements basados en tipo

## Estructura

```
Element (interfaz)
    └─ accept(Visitor)

ConcreteElementA, ConcreteElementB
    └─ accept(Visitor) → visitor.visit(this)

Visitor (interfaz)
    └─ visitElementA(ConcreteElementA)
    └─ visitElementB(ConcreteElementB)

ConcreteVisitor1, ConcreteVisitor2
    └─ implementan visit methods
```

## Ejemplo

```python
from abc import ABC, abstractmethod

class Element(ABC):
    @abstractmethod
    def accept(self, visitor):
        pass

class Circle(Element):
    def __init__(self, radius):
        self.radius = radius
    
    def accept(self, visitor):
        return visitor.visit_circle(self)

class Rectangle(Element):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def accept(self, visitor):
        return visitor.visit_rectangle(self)

class Visitor(ABC):
    @abstractmethod
    def visit_circle(self, circle):
        pass
    
    @abstractmethod
    def visit_rectangle(self, rectangle):
        pass

class AreaCalculator(Visitor):
    def visit_circle(self, circle):
        return 3.14 * circle.radius ** 2
    
    def visit_rectangle(self, rectangle):
        return rectangle.width * rectangle.height

class PerimeterCalculator(Visitor):
    def visit_circle(self, circle):
        return 2 * 3.14 * circle.radius
    
    def visit_rectangle(self, rectangle):
        return 2 * (rectangle.width + rectangle.height)

# Uso
shapes = [Circle(5), Rectangle(4, 6)]
area_calc = AreaCalculator()
perim_calc = PerimeterCalculator()

for shape in shapes:
    print(f"Área: {shape.accept(area_calc)}")
    print(f"Perímetro: {shape.accept(perim_calc)}")
```

## Código Smell que Resuelve

- Switch statements basados en tipo
- Operaciones dispersas en múltiples clases
- Dificultad para agregar nuevas operaciones

## Pros y Contras

| Pros | Contras |
|------|---------|
| Agregar operaciones fácil | Agregar elementos difícil |
| Operaciones centralizadas | Violación de encapsulación |
| Separa lógica | Complejidad aumenta |

## Recursos

- https://refactoring.guru/es/design-patterns/visitor
