---
name: pattern-iterator
description: >
  Patrón Iterator: recorrer colección sin exponer estructura interna.
  Trigger: Cuando querés abstraer la lógica de recorrido de una colección.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Permitir **recorrer elementos de una colección** sin exponer su representación subyacente (lista, pila, árbol, etc.).

## Cuándo Usarlo

- Abstraer cómo se recorre una colección
- Múltiples formas de recorrido
- Soporte para iteraciones anidadas
- Necesitás el mismo interfaz para diferentes colecciones

## Estructura

```
Iterable
    └─ get_iterator() → Iterator

Iterator
    └─ has_next()
    └─ next()
    └─ current()

ConcreteIterator
    └─ Mantiene posición y referencia a colección

ConcreteIterable
    └─ get_iterator()
```

## Ejemplo

```python
class Iterator(ABC):
    def has_next(self): pass
    def next(self): pass

class ListIterator(Iterator):
    def __init__(self, collection):
        self.collection = collection
        self.position = 0
    
    def has_next(self):
        return self.position < len(self.collection)
    
    def next(self):
        item = self.collection[self.position]
        self.position += 1
        return item

class WordsCollection:
    def __init__(self):
        self.items = []
    
    def add(self, word):
        self.items.append(word)
    
    def get_iterator(self):
        return ListIterator(self.items)

# Uso - abstracción del recorrido
collection = WordsCollection()
collection.add("hello")
collection.add("world")

iterator = collection.get_iterator()
while iterator.has_next():
    print(iterator.next())
```

## Código Smell que Resuelve

- Exponer estructura interna de colección
- Acoplamiento a tipo específico de colección

## Built-in en Python

```python
# Python ya tiene esto integrado
for item in collection:
    print(item)

# Protocolo: __iter__ y __next__
class Collection:
    def __iter__(self):
        return iter(self.items)
```

## Recursos

- https://refactoring.guru/es/design-patterns/iterator