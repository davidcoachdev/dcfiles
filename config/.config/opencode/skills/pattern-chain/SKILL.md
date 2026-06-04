---
name: pattern-chain
description: >
  Patrón Chain of Responsibility: pasar solicitud por cadena de manejadores.
  Trigger: Cuando múltiples objetos pueden manejar una solicitud y no sabés cuál lo hará.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Pasar solicitudes a lo largo de una **cadena de manejadores**. Al recibir una solicitud, cada manejador decide si la procesa o la pasa al siguiente.

## Cuándo Usarlo

- Múltiples objetos pueden 处理请求
- No sabés cuál manejará la solicitud
- Quiere delegar automáticamente
-Middleware pattern

## Estructura

```
Handler
    └─ set_next(handler)
    └─ handle(request)

ConcreteHandlerA
    └─ handle(request): if can_handle: process else: next.handle()

ConcreteHandlerB
    └─ handle(request): if can_handle: process else: next.handle()
```

## Ejemplo

```python
class AuthHandler:
    def __init__(self):
        self.next_handler = None
    
    def set_next(self, handler):
        self.next_handler = handler
        return handler
    
    def handle(self, request):
        if self.next_handler:
            return self.next_handler.handle(request)

class Authenticator(AuthHandler):
    def handle(self, request):
        if not request.get("auth"):
            return "Not authenticated"
        return super().handle(request)

class Logger(AuthHandler):
    def handle(self, request):
        print(f"Logging: {request}")
        return super().handle(request)

class DataHandler(AuthHandler):
    def handle(self, request):
        return f"Data: {request['data']}"

# Chain
auth = Authenticator()
auth.set_next(Logger()).set_next(DataHandler())
result = auth.handle({"auth": True, "data": "content"})
```

## Código Smell que Resuelve

- Checks condicionales en cadena
- Acoplamiento entre handler y siguiente

## Casos de Uso Reales

- Middleware (express, Django)
- Event bubbling
- Error handling

## Recursos

- https://refactoring.guru/es/design-patterns/chain-of-responsibility