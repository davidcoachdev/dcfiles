---
name: pattern-facade
description: >
  Patrón Facade: interfaz simplificada a sistema, biblioteca o grupo de clases complejo.
  Trigger: Cuando necesitás simplificar uso de biblioteca/framework.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Proporcionar una **interfaz simplificada** a una biblioteca, framework o grupo de clases complejas.

## Cuándo Usarlo

- Necesitás interfaz simple para sistema complejo
- Muchos puntos de entrada a un subsistema
- Separar sistema del cliente
- Capas de aplicación

## Estructura

```
Client → Facade → SubsystemA
               → SubsystemB
               → SubsystemC

Facade simple.operation() → coordina subsystem internally
```

## Ejemplo

```python
class VideoFile:
    pass

class CodecFactory:
    pass

class AudioMixer:
    pass

class VideoConverter:
    def convert(self, filename, format):
        file = VideoFile(filename)
        codec = CodecFactory.extract(file)
        
        # Facade hidden complexity
        data = codec.decode(file)
        result = codec.encode(data, format)
        
        audio = AudioMixer().fix(result)
        return audio

# Cliente simple
converter = VideoConverter()
converter.convert("video.ogg", "mp4")
```

## Código Smell que Resuelve

- Acoplamiento a sistema complejo
- Cliente usa directamente clases internas

## Facade vs Adapter

| Facade | Adapter |
|--------|---------|
| Simplifica interfaz | Traduce interfaz |
| Oculta complejidad | Expone funcionalidad |
| Nuevacliente | legacy |

## Principios

- Principio de mínima exposición
- Don't repeat yourself en coordinación

## Recursos

- https://refactoring.guru/es/design-patterns/facade