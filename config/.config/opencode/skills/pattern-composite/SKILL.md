---
name: pattern-composite
description: >
  Patrón Composite: composar objetos en estructuras de árbol y trabajar como objetos individuales.
  Trigger: Cuando representás parte-todo jerarquías.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Componer objetos en **estructuras de árbol** y trabajar con esas estructuras como si fueran objetos individuales.

## Cuándo Usarlo

- Representar jerarquías parte-todo
- Necesitás tratar objetos individuales y compuestos igual
- Operaciones recursivas en árbol
- Sistema de archivos, UI components, organigramas

## Estructura

```
Component (interfaz)
    └─ operation()
    └─ add(child)
    └─ remove(child)

Leaf (objeto simple)
    └─ operation()

Composite (contiene hijos)
    └─ operation() → for child in children: child.operation()
    └─ add/remove children
```

## Ejemplo

```python
class File(ABC):
    def get_size(self): pass

class FileLeaf(File):
    def __init__(self, size):
        self.size = size
    def get_size(self): return self.size

class Folder(File):
    def __init__(self):
        self.children = []
    
    def add(self, file):
        self.children.append(file)
    
    def get_size(self):
        return sum(child.get_size() for child in self.children)

# Uso - todos tratan igual
root = Folder()
root.add(FileLeaf(100))
root.add(FileLeaf(200))
subfolder = Folder()
subfolder.add(FileLeaf(50))
root.add(subfolder)
print(root.get_size())  # 350
```

## Código Smell que Resuelve

- Tratar diferente objetos simples vs compuestos
- Código condicional para verificar tipo

## Operaciones Típicas

- Recursive size calculation
- Tree traversal
- Apply operation to all
- Count elements

## Recursos

- https://refactoring.guru/es/design-patterns/composite