---
name: pattern-state
description: >
  Patrón State: alterar comportamiento según estado interno.
  Trigger: Cuando el comportamiento cambia drásticamente según el estado.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Permitir a un objeto **alterar su comportamiento** cuando su estado interno cambia. Parece como si el objeto cambiara su clase.

## Cuándo Usarlo

- Comportamiento depende del estado
- Muchas condiciones sobre el estado del objeto
- Transiciones de estado complejas
- Máquinas de estado (orders, workflows)

## Estructura

```
Context → state.handle()
          ↓
State (interfaz)
    └─ handle(context)

ConcreteStateA → handle() → transición a StateB
ConcreteStateB → handle() → transición a StateA
```

## Ejemplo

```python
class OrderState(ABC):
    def proceed(self, order): pass
    def cancel(self, order): pass

class NewOrder(OrderState):
    def proceed(self, order):
        order.state = ShippedOrder()
        print("Order shipped")
    def cancel(self, order):
        order.state = CancelledOrder()
        print("Order cancelled")

class ShippedOrder(OrderState):
    def proceed(self, order):
        order.state = DeliveredOrder()
        print("Order delivered")
    def cancel(self):
        print("Cannot cancel shipped order")

class Order:
    def __init__(self):
        self.state = NewOrder()
    
    def proceed(self):
        self.state.proceed(self)
    
    def cancel(self):
        self.state.cancel(self)

order = Order()
order.proceed()  # Shipped
order.proceed()  # Delivered
order.cancel()  # Cannot cancel
```

## Código Smell que Resuelve

- switch gigante sobre estados
- Condiciones basadas en estado

## State vs Strategy

| State | Strategy |
|-------|----------|
| El objeto cambia comportamiento | Cliente elige algoritmo |
| Estado interno | Comportamiento inyectado |
| Transiciones automático | Cambio manual |

## Recursos

- https://refactoring.guru/es/design-patterns/state