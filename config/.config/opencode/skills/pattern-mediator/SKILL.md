---
name: pattern-mediator
description: >
  Patrón Mediator: reducir acoplamiento entre objetos mediante un mediador central.
  Trigger: Cuando múltiples objetos necesitan comunicarse y hay acoplamiento caótico.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Definir un objeto que **encapsule cómo interactúan** un conjunto de objetos, promoviendo un acoplamiento débil.

## Cuándo Usarlo

- Múltiples objetos que se comunican de forma compleja
- Acoplamiento caótico entre clases
- Lógica de comunicación que cambia frecuentemente
- Necesitás centralizar la lógica de interacción

## Estructura

```
Mediator (interfaz)
    └─ ConcreteMediator (implementación)
        └─ coordina Colleague1, Colleague2, Colleague3

Colleague (interfaz)
    └─ ConcreteColleague1, ConcreteColleague2, ConcreteColleague3
        └─ comunican a través del Mediator
```

## Ejemplo

```python
class ChatMediator:
    def __init__(self):
        self.users = []
    
    def register_user(self, user):
        self.users.append(user)
        user.mediator = self
    
    def send_message(self, message, sender):
        for user in self.users:
            if user != sender:
                user.receive_message(message, sender)

class User:
    def __init__(self, name):
        self.name = name
        self.mediator = None
    
    def send_message(self, message):
        self.mediator.send_message(message, self)
    
    def receive_message(self, message, sender):
        print(f"{self.name} recibió: {message} de {sender.name}")

# Uso
chat = ChatMediator()
user1 = User("Alice")
user2 = User("Bob")
chat.register_user(user1)
chat.register_user(user2)
user1.send_message("Hola!")
```

## Código Smell que Resuelve

- Acoplamiento fuerte entre objetos
- Lógica de comunicación dispersa
- Dependencias caóticas

## Pros y Contras

| Pros | Contras |
|------|---------|
| Reduce acoplamiento | Mediator puede volverse complejo |
| Centraliza lógica | Punto único de fallo |
| Fácil de cambiar | Puede ser overkill para casos simples |

## Recursos

- https://refactoring.guru/es/design-patterns/mediator
