---
name: pattern-command
description: >
  Patrón Command: convertir solicitud en objeto independiente.
  Trigger: Cuando necesitás cola, undo/redo, logging, operaciones diferidas.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Convertir una **solicitud en un objeto independiente** que contiene toda la información sobre la solicitud.

## Cuándo Usarlo

- Implementar queue de operaciones
- Undo/redo functionality
- Logging de operaciones
- Diferir ejecución
- Macro commands (secuencia de comandos)

## Estructura

```
Command
    └─ execute()

ConcreteCommand → receiver.action()
    └─ execute(): receiver.action(params)

Invoker → command.execute()
Client → crea command y configura receiver
```

## Ejemplo

```python
class Command(ABC):
    def execute(self): pass

class Light:
    def on(self): print("Light ON")
    def off(self): print("Light OFF")

class LightOnCommand(Command):
    def __init__(self, light):
        self.light = light
    def execute(self):
        self.light.on()

class RemoteControl:
    def __init__(self):
        self.history = []
    
    def press(self, command):
        command.execute()
        self.history.append(command)
    
    def undo(self):
        if self.history:
            last = self.history.pop()
            print("Undo")

light = Light()
remote = RemoteControl()
remote.press(LightOnCommand(light))
remote.undo()
```

## Código Smell que Resuelve

- Código repetido para ejecutar acciones
- Lógica de undo/redo分散

## Tipos de Command

| Tipo | Descripción |
|------|-------------|
| Simple | Una acción |
| Compound | Múltiples acciones |
| Macro | Secuencia de comandos |
| Undoable | Soporta undo |

## Recursos

- https://refactoring.guru/es/design-patterns/command