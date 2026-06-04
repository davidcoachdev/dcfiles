---
name: pattern-template
description: >
  Patrón Template Method: definir estructura de algoritmo en clase base, detalles en subclases.
  Trigger: Cuando múltiples clases tienen algoritmos similares con pasos variables.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Definir el **esqueleto de un algoritmo** en una clase base, dejando que las subclases implementen los pasos específicos.

## Cuándo Usarlo

- Algoritmos con pasos comunes pero implementación variable
- Evitar duplicación de código
- Controlar extensión de subclases
- Invertir el control (Hollywood Principle)

## Estructura

```
AbstractClass
    └─ templateMethod()  (pasos fijos)
        ├─ step1()
        ├─ primitiveOperation1() (abstracto)
        ├─ step2()
        └─ primitiveOperation2() (abstracto)

ConcreteClassA, ConcreteClassB
    └─ implementan primitiveOperation1(), primitiveOperation2()
```

## Ejemplo

```python
from abc import ABC, abstractmethod

class DataProcessor(ABC):
    def process(self):
        # Template Method - estructura fija
        data = self.read_data()
        processed = self.process_data(data)
        self.write_data(processed)
    
    @abstractmethod
    def read_data(self):
        pass
    
    @abstractmethod
    def process_data(self, data):
        pass
    
    @abstractmethod
    def write_data(self, data):
        pass

class CSVProcessor(DataProcessor):
    def read_data(self):
        return "csv_data"
    
    def process_data(self, data):
        return data.upper()
    
    def write_data(self, data):
        print(f"Escribiendo CSV: {data}")

class JSONProcessor(DataProcessor):
    def read_data(self):
        return "json_data"
    
    def process_data(self, data):
        return data.lower()
    
    def write_data(self, data):
        print(f"Escribiendo JSON: {data}")

# Uso
csv = CSVProcessor()
csv.process()  # Ejecuta template method

json = JSONProcessor()
json.process()  # Ejecuta template method
```

## Código Smell que Resuelve

- Código duplicado en subclases
- Algoritmos similares dispersos
- Falta de control sobre extensión

## Pros y Contras

| Pros | Contras |
|------|---------|
| Evita duplicación | Puede ser restrictivo |
| Estructura clara | Inversión de control confusa |
| Fácil de extender | Jerarquías profundas |

## Recursos

- https://refactoring.guru/es/design-patterns/template-method
