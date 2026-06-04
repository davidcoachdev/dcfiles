---
name: pattern-proxy
description: >
  Patrón Proxy: sustituto que controla acceso al objeto real.
  Trigger: Cuando necesitás lazy loading, logging, caching, seguridad.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Proporcionar un **sustituto o marcador de posición** para otro objeto, controlando el acceso al objeto original.

## Cuándo Usarlo

- Lazy initialization (virtual proxy)
- Logging y tracking (logging proxy)
- Cache de resultados (caching proxy)
- Control de acceso (protection proxy)
- Remote object access (remote proxy)

## Estructura

```
Subject (interfaz)
    └─ request()

RealSubject → request() real

Proxy → request() antes/después:
    - valida acceso
    - cachea resultado
    - crea real subject si no existe
    - logging
```

## Ejemplo

```python
class Image(ABC):
    def display(self): pass

class RealImage(Image):
    def __init__(self, filename):
        self.filename = filename
        self.load_from_disk()
    
    def load_from_disk(self):
        print(f"Loading {self.filename}")
    
    def display(self):
        print(f"Displaying {self.filename}")

class ImageProxy(Image):
    def __init__(self, filename):
        self.filename = filename
        self.real_image = None
    
    def display(self):
        if not self.real_image:
            self.real_image = RealImage(self.filename)
        self.real_image.display()

# Solo carga cuando se necesita
img = ImageProxy("photo.jpg")
img.display()  # carga y muestra
img.display()  # usa cache
```

## Tipos de Proxy

| Tipo | Propósito |
|------|------------|
| Remote | Acceder objeto en otro servidor |
| Virtual | Lazy initialization |
| Protection | Control de acceso |
| Smart | Logging, caching, etc |
| Firewall | Proteger de ataques |

## Código Smell que Resuelve

- Acceso directo a recursos costosos
- Repetir lógica de acceso/caching

## Recursos

- https://refactoring.guru/es/design-patterns/proxy