---
name: pattern-adapter
description: >
  Patrón Adapter: colaboración entre objetos con interfaces incompatibles.
  Trigger: Cuando tenés código legacy con interfaz diferente a la nueva.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Permitir la **colaboración entre objetos con interfaces incompatibles**.

## Cuándo Usarlo

- Integrar código legacy con código nuevo
- Usar biblioteca externa incompatible
- Normalizar interfaces diferentes
- legacy system integration

## Estructura

```
Client → Target (interfaz)
           ↓
        Adapter → Adaptee (旧interfaz)

Método: adapter.method() → adaptee.specific_method()
```

## Ejemplo

```python
class OldPaymentSystem:
    def process_payment_old(self, amount):
        return f"Processing ${amount} via old system"

class PaymentProcessor(ABC):
    @abstractmethod
    def pay(self, amount): pass

class PaymentAdapter(PaymentProcessor):
    def __init__(self):
        self.old_system = OldPaymentSystem()
    
    def pay(self, amount):
        return self.old_system.process_payment_old(amount)
```

## Código Smell que Resuelve

- Interfaces incompatibles
- Wrappers manuales de código legacy

## Types of Adapter

| Type | Descripción |
|------|-------------|
| Object Adapter | Composición (tiene el objeto) |
| Class Adapter | Herencia (Python solo object) |

## Diferencia con Decorator

| Adapter | Decorator |
|---------|-----------|
| Cambia interfaz | Mantiene interfaz |
|新老interfaz incompatibles | Agrega funcionalidad |
| "Traduce" | "Enhance" |

## Recursos

- https://refactoring.guru/es/design-patterns/adapter