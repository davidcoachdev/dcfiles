---
name: pattern-abstract-factory
description: >
  Patrón Abstract Factory: producir familias de objetos relacionados sin especificar clases concretas.
  Trigger: Cuando necesitás crear familias de objetos relacionados.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Proporcionar una **interfaz para crear familias de objetos** relacionados sin especificar sus clases concretas.

## Cuándo Usarlo

- Crear productos relacionados que deben usarse juntos
- Necesitás independencia de cómo se crean los productos
- Sistema debe trabajar con múltiples familias de productos

## Estructura

```
AbstractFactory
    └─ createProductA() → AbstractProductA
    └─ createProductB() → AbstractProductB

ConcreteFactory1
    └─ createProductA() → ProductA1
    └─ createProductB() → ProductB1

ConcreteFactory2
    └─ createProductA() → ProductA2
    └─ createProductB() → ProductB2
```

## Ejemplo

```python
class Button(ABC): pass
class Checkbox(ABC): pass

class WinButton(Button): pass
class MacButton(Button): pass
class WinCheckbox(Checkbox): pass
class MacCheckbox(Checkbox): pass

class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button: pass
    @abstractmethod
    def create_checkbox(self) -> Checkbox: pass

class WindowsFactory(GUIFactory):
    def create_button(self): return WinButton()
    def create_checkbox(self): return WinCheckbox()

class MacFactory(GUIFactory):
    def create_button(self): return MacButton()
    def create_checkbox(self): return MacCheckbox()

def create_ui(factory: GUIFactory):
    button = factory.create_button()
    checkbox = factory.create_checkbox()
```

## Código Smell que Resuelve

- Dependencia directa de clases concretas
- Objetos que deberían ir juntos pero se crean por separado

## Recursos

- https://refactoring.guru/es/design-patterns/abstract-factory