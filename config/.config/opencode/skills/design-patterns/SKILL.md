---
name: design-patterns
description: >
  Índice de los 22 patrones de diseño. Carga la skill específica según el patrón que necesites.
  Trigger: Cuando necesitas arquitectura, refactorización o elegir un patrón específico.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Los 22 Patrones - Carga la Skill Específica

### Creacionales (5)
| Pattern | Skill a cargar |
|---------|---------------|
| Singleton | `pattern-singleton` |
| Factory Method | `pattern-factory` |
| Abstract Factory | `pattern-abstract-factory` |
| Builder | `pattern-builder` |
| Prototype | `pattern-prototype` |

### Estructurales (7)
| Pattern | Skill a cargar |
|---------|---------------|
| Adapter | `pattern-adapter` |
| Bridge | `pattern-bridge` |
| Composite | `pattern-composite` |
| Decorator | `pattern-decorator` |
| Facade | `pattern-facade` |
| Flyweight | `pattern-flyweight` |
| Proxy | `pattern-proxy` |

### Comportamiento (10)
| Pattern | Skill a cargar |
|---------|---------------|
| Observer | `pattern-observer` |
| Strategy | `pattern-strategy` |
| State | `pattern-state` |
| Command | `pattern-command` |
| Chain of Responsibility | `pattern-chain` |
| Iterator | `pattern-iterator` |
| Mediator | `pattern-mediator` |
| Memento | `pattern-memento` |
| Template Method | `pattern-template` |
| Visitor | `pattern-visitor` |

## Árbol de Decisión Rápido

```
¿Crear objetos?
├─ 1 instancia → pattern-singleton
├─ subclases决定 → pattern-factory
├─ familiarelated → pattern-abstract-factory
├─ pasos complejos → pattern-builder
├─ clonar → pattern-prototype

¿Estructura/clases?
├─ interfaz incompatible → pattern-adapter
├─ abstr/impl separadas → pattern-bridge
├─ árbol/jerarquía → pattern-composite
├─ agregar features → pattern-decorator
├─ simplificar sistema → pattern-facade
├─ muchos objetos similares → pattern-flyweight
├─ controlar acceso → pattern-proxy

¿Comportamiento?
├─ notificar cambios → pattern-observer
├─ algoritmos intercambiables → pattern-strategy
├─ cambiar según estado → pattern-state
├─ request como objeto → pattern-command
├─ cadena handlers → pattern-chain
├─ recorrer colección → pattern-iterator
├─ reducir acoplamiento → pattern-mediator
├─ guardar estado/undo → pattern-memento
├─ pasos fijos → pattern-template
└─ agregar operaciones → pattern-visitor
```

## Code Smells → Patrón

| Smell | Skill |
|-------|-------|
| switch gigante | pattern-state, pattern-strategy |
| clase muy grande | pattern-composite, pattern-facade |
| muchos objetos similares | pattern-flyweight |
| dependencias caóticas | pattern-mediator |
| necesito agregar features | pattern-decorator |
| una sola instancia global | pattern-singleton |
| subclases casi iguales | pattern-factory |
| quiero undo/redo | pattern-command, pattern-memento |
| notificación de eventos | pattern-observer |
| necesito agregar métodos a jerarquía | pattern-visitor |

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]