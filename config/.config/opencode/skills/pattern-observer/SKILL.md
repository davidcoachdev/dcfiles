---
name: pattern-observer
description: >
  Patrón Observer: mecanismo de suscripción para notificar eventos.
  Trigger: Cuando cambios en un objeto deben notificar a otros.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Definir un **mecanismo de suscripción** para notificar a varios objetos sobre cualquier evento que le pase al objeto que están observando.

## Cuándo Usarlo

- Cambios en un objeto deben notificar a otros
- Necesitás comunicación loosely coupled
- Sistema pub/sub
- MVC (Model-View-Controller)

## Estructura

```
Subject
    └─ attach(observer)
    └─ detach(observer)
    └─ notify()

Observer
    └─ update(subject)

ConcreteSubject
    └─ state
    └─ notify() → for obs in observers: obs.update()

ConcreteObserverA, B
    └─ update() → subject.get_state()
```

## Ejemplo

```python
class EventListener(ABC):
    def on_event(self, data): pass

class UserService(EventListener):
    def __init__(self):
        self.listeners = []
    
    def subscribe(self, listener):
        self.listeners.append(listener)
    
    def notify(self, event):
        for listener in self.listeners:
            listener.on_event(event)
    
    def create_user(self, name):
        # crear usuario...
        self.notify({"type": "user_created", "name": name})

class EmailSender(EventListener):
    def on_event(self, data):
        if data["type"] == "user_created":
            print(f"Sending email to {data['name']}")

class Logger(EventListener):
    def on_event(self, data):
        print(f"Logged: {data}")

service = UserService()
service.subscribe(EmailSender())
service.subscribe(Logger())
service.create_user("John")
```

## Código Smell que Resuelve

- Acoplamiento fuerte entre objetos
- Notificaciones manuales

## Nombres Alternativos

- Publish-Subscribe
- Event-Listener
- Dependents

## Recursos

- **Main Source**: https://refactoring.guru/es/design-patterns/observer [Refactoring.Guru]
- **Código ejemplos**: https://refactoring.guru/es/design-patterns/observer#example-1