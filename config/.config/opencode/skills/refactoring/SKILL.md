---
name: refactoring
description: >
  Guía completa de refactoring: 22 code smells con técnicas de refactoring.
  Trigger: Cuando ves código problemático, smell, o necesitás limpiar/refactorizar.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "3.0"
---

## Cuándo Usar Esta Skill

- Code review y ves code smells
- Necesitás refactorizar código existente
- Identificar problemas en el código
- Aplicar técnicas de refactoring

## Los 22 Code Smells (Organizados por Categoría)

### BLOATERS (5) - Código inflado

#### 1. Long Method
**Señales:** Método > 10-20 líneas, mucha indentación, comentarios que explican secciones
**Refactoring:** Extract Method, Replace Temp with Query, Introduce Parameter Object

#### 2. Large Class
**Señales:** Clase con muchas responsabilidades, muchos métodos, muchos campos
**Refactoring:** Extract Class, Extract Subclass, Extract Interface

#### 3. Primitive Obsession
**Señales:** Parámetros que podrían ser objetos, constantes relacionadas, datos que van juntos
**Refactoring:** Replace Data Value with Object, Introduce Parameter Object, Replace Type Code with Class

#### 4. Long Parameter List
**Señales:** Función con > 3-4 parámetros, parámetros relacionados
**Refactoring:** Introduce Parameter Object, Preserve Whole Object, Replace Parameter with Method Call

#### 5. Data Clumps
**Señales:** Mismos grupos de datos juntos en múltiples lugares
**Refactoring:** Extract Class, Introduce Parameter Object

---

### OBJECT-ORIENTATION ABUSERS (4) - Mal uso de OOP

#### 6. Switch Statements
**Señales:** Switch con > 3 cases, múltiples switch haciendo lo mismo
**Refactoring:** Replace Conditional with Polymorphism, Replace Type Code with State/Strategy

#### 7. Temporary Field
**Señales:** Campo que solo se usa en ciertos casos, campo que a veces es null
**Refactoring:** Extract Classntroduce Special Case

#### 8. Refused Bequest
**Señales:** Subclase que no usa métodos/campos heredados
**Refactoring:** Replace Inheritance with Delegation, Extract Subclass

#### 9. Alternative Classes with Different Interfaces
**Señales:** Dos clases hacen lo mismo pero con métodos diferentes
**Refactoring:** Rename Method, Move Method, Extract Superclass

---

### CHANGE PREVENTERS (3) - Previenen cambios

#### 10. Divergent Change
**Señales:** Cambiar una cosa requiere cambiar muchos lugares en una clase
**Refactoring:** Extract Class, Extract Method

#### 11. Shotgun Surgery
**Señales:** Un cambio requiere modificar muchas clases
**Refactoring:** Move Method, Move Field, Extract Class

#### 12. Parallel Inheritance Hierarchies
**Señales:** Cada vez que creas subclase A, necesitás crear subclase B
**Refactoring:** Move Method, Move Field, Extract Superclass

---

### DISPENSABLES (6) - Código innecesario

#### 13. Comments
**Señales:** Comentarios que explican código confuso, comentarios desactualizados
**Refactoring:** Extract Method, Rename Method, Introduce Assertion

#### 14. Duplicate Code
**Señales:** Mismas 5+ líneas en diferentes lugares, copy-paste
**Refactoring:** Extract Method, Extract Class, Template Method Pattern

#### 15. Lazy Class
**Señales:** Clase que no hace suficiente, no justifica su existencia
**Refactoring:** Inline Class, Collapse Hierarchy

#### 16. Data Class
**Señales:** Clase solo con datos y getters/setters, sin comportamiento
**Refactoring:** Move Method, Encapsulate Collection

#### 17. Dead Code
**Señales:** Código que nunca se ejecuta, métodos no usados, variables no usadas
**Refactoring:** Delete, Remove Parameter, Remove Method

#### 18. Speculative Generality
**Señales:** Clases/métodos "por si acaso", parámetros no usados, código "para el futuro"
**Refactoring:** Inline Class, Inline Method, Remove Parameter

---

### COUPLERS (5) - Acoplamiento excesivo

#### 19. Feature Envy
**Señales:** Método usa más datos de otra clase que de la propia
**Refactoring:** Move Method, Extract Method, Move Field

#### 20. Inappropriate Intimacy
**Señales:** Dos clases saben demasiado una de otra, acceso a privados
**Refactoring:** Move Method, Move Field, Extract Class, Hide Delegate

#### 21. Message Chains
**Señales:** Llamadas encadenadas (a.getB().getC().getD()), muchos puntos
**Refactoring:** Hide Delegate, Extract Method, Move Method

#### 22. Middle Man
**Señales:** Clase que solo delega a otra, no agrega valor
**Refactoring:** Remove Middle Man, Inline Class, Replace Delegation with Inheritance

---

## Proceso de Refactoring

1. **Identificar** code smell
2. **Verificar** que hay tests
3. **Aplicar** refactoring pequeño
4. **Correr** tests
5. **Commit** (si pasa)
6. **Repetir**

## Herramientas LSP

- Usar **Rename** para renombrar métodos
- Usar **Extract Method** refactoring automático
- Verificar con tests después de cada cambio

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]