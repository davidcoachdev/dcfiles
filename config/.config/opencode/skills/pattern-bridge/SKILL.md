---
name: pattern-bridge
description: >
  Patrón Bridge: dividir clase grande en dos jerarquías (abstracción e implementación).
  Trigger: Cuando querés evitar binding rígido entre abstracción e implementación.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Dividir una clase grande en **dos jerarquías separadas** (abstracción e implementación) que pueden desarrollarse independientemente.

## Cuándo Usarlo

- Evitar binding rígido entre abstracción e implementación
- Necesitás extender ambas dimensiones independently
- Cambios en implementación no deben afectar clientes
- Shared abstraction con múltiples implementaciones

## Estructura

```
Abstraction
    └─ operation() → impl.operation_implementation()

RefinedAbstractionA
RefinedAbstractionB

Implementation
    └─ operation_implementation()

ConcreteImplementationA
ConcreteImplementationB
```

## Ejemplo

```python
class Device(ABC):
    @abstractmethod
    def get_status(self): pass

class RemoteControl:
    def __init__(self, device: Device):
        self.device = device
    
    def toggle_power(self):
        return f"Remote: {self.device.get_status()}"

class TV(Device):
    def get_status(self): return "TV is ON"

class Radio(Device):
    def get_status(self): return "Radio is OFF"

# Cambiar implementación no afecta abstracción
remote_tv = RemoteControl(TV())
remote_radio = RemoteControl(Radio())
```

## Código Smell que Resuelve

- Clase que cambia por dos razones (abstracción + implementación)
- Explosión de subclases (N*M combinaciones)

## Bridge vs Strategy

| Bridge | Strategy |
|--------|----------|
| Separar abstracción de implementación | Intercambiar algoritmos |
| Para diseño permanent | Para comportamiento runtime |
| Estructural | Comportamental |

## Recursos

- https://refactoring.guru/es/design-patterns/bridge