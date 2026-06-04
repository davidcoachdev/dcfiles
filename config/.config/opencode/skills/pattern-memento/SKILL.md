---
name: pattern-memento
description: >
  Patrón Memento: guardar y restaurar estado anterior de un objeto sin violar encapsulación.
  Trigger: Cuando necesitás undo/redo o guardar snapshots de estado.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Capturar y externalizar el estado interno de un objeto sin violar su encapsulación, permitiendo restaurarlo después.

## Cuándo Usarlo

- Undo/redo functionality
- Guardar snapshots de estado
- Transacciones (commit/rollback)
- Checkpoints en juegos
- Historial de cambios

## Estructura

```
Originator (objeto cuyo estado guardamos)
    └─ createMemento() → Memento
    └─ restoreFromMemento(Memento)

Memento (snapshot del estado)
    └─ getState()

Caretaker (gestor de mementos)
    └─ save(Memento)
    └─ restore(index)
```

## Ejemplo

```python
class Document:
    def __init__(self, content=""):
        self.content = content
    
    def write(self, text):
        self.content += text
    
    def create_memento(self):
        return DocumentMemento(self.content)
    
    def restore_from_memento(self, memento):
        self.content = memento.get_state()

class DocumentMemento:
    def __init__(self, state):
        self._state = state
    
    def get_state(self):
        return self._state

class DocumentHistory:
    def __init__(self):
        self.history = []
    
    def save(self, document):
        self.history.append(document.create_memento())
    
    def undo(self, document):
        if self.history:
            memento = self.history.pop()
            document.restore_from_memento(memento)

# Uso
doc = Document()
history = DocumentHistory()

doc.write("Hola ")
history.save(doc)

doc.write("Mundo")
print(doc.content)  # "Hola Mundo"

history.undo(doc)
print(doc.content)  # "Hola "
```

## Código Smell que Resuelve

- Necesidad de undo/redo
- Violación de encapsulación para guardar estado
- Lógica de historial dispersa

## Pros y Contras

| Pros | Contras |
|------|---------|
| Preserva encapsulación | Consume memoria (snapshots) |
| Undo/redo simple | Puede ser lento con objetos grandes |
| Historial limpio | Necesita serialización |

## Recursos

- https://refactoring.guru/es/design-patterns/memento
