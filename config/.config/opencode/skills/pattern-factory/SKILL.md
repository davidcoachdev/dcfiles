---
name: pattern-factory
description: >
  Patrón Factory Method: interfaz para crear objetos en superclase, subclases决定 tipo.
  Trigger: Cuando las subclases deben decidir qué clase instanciar.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Definir una **interfaz para crear objetos** pero dejar que las **subclases decidan qué clase instanciar**.

## Cuándo Usarlo

- subclases来决定 qué tipo de objeto crear
- Clase base no sabe de antemano qué subclase instanciar
- Necesitás extender familias de productos

## Estructura

```
Product (interfaz)
    └─ ConcreteProductA
    └─ ConcreteProductB

Creator (clase abstracta)
    └─ factoryMethod() → Product
        └─ ConcreteCreatorA → crea ConcreteProductA
        └─ ConcreteCreatorB → crea ConcreteProductB
```

## Ejemplo

```python
class Button(ABC):
    @abstractmethod
    def render(self): pass

class WindowsButton(Button):
    def render(self): print("Render Windows button")

class MacButton(Button):
    def render(self): print("Render Mac button")

class Dialog(ABC):
    @abstractmethod
    def create_button(self) -> Button: pass
    
    def render(self):
        button = self.create_button()
        button.render()

class WindowsDialog(Dialog):
    def create_button(self) -> Button:
        return WindowsButton()

class MacDialog(Dialog):
    def create_button(self) -> Button:
        return MacButton()
```

## Código Smell que Resuelve

- switch statements para crear diferentes tipos
- Acoplamiento directo a clases concretas

## Diferencia con Abstract Factory

| Factory Method | Abstract Factory |
|---------------|------------------|
| 1 producto | Familia de productos |
| 1 método | múltiples métodos |
| herencia | composición |

## Recursos

- **Main Source**: https://refactoring.guru/es/design-patterns/factory-method [Refactoring.Guru]
- **Código ejemplos**: https://refactoring.guru/es/design-patterns/factory-method#example-1