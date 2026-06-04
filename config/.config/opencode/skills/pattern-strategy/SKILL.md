---
name: pattern-strategy
description: >
  Patrón Strategy: familia de algoritmos intercambiables.
  Trigger: Cuando tenés múltiples algoritmos y querés switchearlos en runtime.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Definir una **familia de algoritmos**, colocar cada uno en una clase separada y hacer sus objetos **intercambiables**.

## Cuándo Usarlo

- Necesitás switchear algoritmos en runtime
- Diferentes variantes de un comportamiento
- Evitar condicionales para seleccionar algoritmo
- Aislar lógica de negocio de algoritmos

## Estructura

```
Context → strategy.execute()
          ↓
Strategy (interfaz)
    └─ execute()

ConcreteStrategyA → execute() → algoritmo A
ConcreteStrategyB → execute() → algoritmo B

# Context puede setear strategy en runtime
```

## Ejemplo

```python
class PaymentStrategy(ABC):
    def pay(self, amount): pass

class CreditCardPayment(PaymentStrategy):
    def pay(self, amount):
        print(f"Paid ${amount} with credit card")

class PayPalPayment(PaymentStrategy):
    def pay(self, amount):
        print(f"Paid ${amount} with PayPal")

class ShoppingCart:
    def __init__(self):
        self.items = []
        self.payment_strategy = None
    
    def set_payment(self, strategy):
        self.payment_strategy = strategy
    
    def checkout(self):
        total = sum(self.items)
        self.payment_strategy.pay(total)

# Cambiar estrategia en runtime
cart = ShoppingCart()
cart.items = [10, 20]
cart.set_payment(CreditCardPayment())
cart.checkout()
cart.set_payment(PayPalPayment())
cart.checkout()
```

## Código Smell que Resuelve

- switch statements para algoritmos
- Diferentes comportamentos condicionales

## Strategy vs State

| Strategy | State |
|----------|-------|
| Cliente elige algoritmo | Objeto cambia su comportamiento |
| Intencional | Automático |
|Usually one instance | Usually new state each time |

## Recursos

- https://refactoring.guru/es/design-patterns/strategy