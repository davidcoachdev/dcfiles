---
name: pattern-singleton
description: >
  Patrón Singleton: una sola instancia con punto de acceso global.
  Trigger: Cuando exactamente una instancia debe controlar algo (logger, config, DB connection, cache global).
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Propósito

Garantizar que una clase tenga **exactamente una instancia** con un **punto de acceso global**.

## Cuándo Usarlo

- Logger global de la aplicación
- Conexión a base de datos (una sola conexión)
- Configuración global (Settings)
- Cache de aplicación
- Pool de objetos compartido

## Estructura

```python
class Singleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# Uso
logger1 = Singleton()
logger2 = Singleton()
logger1 is logger2  # True
```

## Ventajas

- Acceso global garantizado
- Se inicializa una sola vez (ahorro recursos)
- Número controlable de instancias

## Problemas que Resuelve

| Code Smell | Solución |
|-----------|---------|
| Múltiples conexiones a DB | Singleton de conexión |
| Configuración redundante | Singleton de settings |
| Logger duplicado | Singleton de logger |

## Contraindicaciones

- **Ojo**: Puede dificultar testing (hard de mockear)
- Evita cuando necesitás múltiples instancias
- Cuidado con estado compartido entre requests (en web apps)

## Idiomas por Lenguaje

### Python
```python
class Database:
    _instance = None
    
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
```

### JavaScript/TypeScript
```typescript
class Config {
  private static instance: Config;
  
  private constructor() {}
  
  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}
```

### Go (con sync.Once)
```go
type Database struct {}

var (
    instance *Database
    once     sync.Once
)

func GetDatabase() *Database {
    once.Do(func() {
        instance = &Database{}
    })
    return instance
}
```

## Recursos

- **Main Source**: https://refactoring.guru/es/design-patterns/singleton [Refactoring.Guru]
- **Código ejemplos**: https://refactoring.guru/es/design-patterns/singleton#example-1 [Multiple languages]