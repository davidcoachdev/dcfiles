---
name: adversarial-review-plus
description: Enhanced adversarial review con 8 categorías de ataque de NexusAgile + Auto-Blindaje integrado con Engram. Para uso con judgment-day o review standalone.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
  inspired_by: github.com/ferrosasfp/nexus-agile-enterprise
---

## When to Use

- Como paso de review en judgment-day (reemplaza la sección Review Criteria)
- Review standalone de código antes de commit/merge
- Security audit de features nuevas
- Validación de cambios en auth, DB, pagos, datos sensibles

---

## Skills Router Integration

Antes de lanzar review, detectar dominio y cargar SOLO skills relevantes:

| Señal en el código | Skill a cargar |
|--------------------|----------------|
| `.tsx`, `.jsx`, `component`, `useEffect` | react-19, typescript |
| `.go`, `func Test`, `teatest` | go-testing |
| `.py`, `def test`, `pytest` | pytest |
| `auth`, `login`, `JWT`, `session` | security-auditor |
| `SELECT`, `INSERT`, `migration`, `schema` | database-specialist |
| `contract`, `Solidity`, `transfer` | blockchain-developer |
| `endpoint`, `route`, `handler` | api-designer |
| `docker`, `k8s`, `deploy` | devops-engineer |

**Máximo 2 skills** por review. Más = señal de scope demasiado grande.

**Cómo cargar**: Inyectar compact rules del skill registry en el prompt del judge.

---

## 8 Categorías de Ataque (Enhanced Review Criteria)

Cada categoría tiene checks específicos. El reviewer DEBE clasificar hallazgos.

### 1. Autenticación y Autorización (AuthZ)

| Check | Qué buscar | Severidad |
|-------|-----------|-----------|
| Rutas nuevas verifican auth | Rutas públicas que deberían ser privadas | CRITICAL |
| Acciones protegidas | Server actions/APIs sin verificación de sesión | CRITICAL |
| Roles respetados | Acceso a datos de otros usuarios | CRITICAL |
| Tokens/sesiones | Sesiones sin expiración, tokens en localStorage | WARNING |

**Preguntas de ataque**:
- ¿Puede un usuario no autenticado acceder a esta ruta/acción?
- ¿Puede un usuario ver/modificar datos de otro usuario?
- ¿Hay escalación de privilegios posible?

### 2. Validación de Inputs

| Check | Qué buscar | Severidad |
|-------|-----------|-----------|
| Entrada de usuario validada | Formularios sin validación server-side | CRITICAL |
| Tipos verificados | Inputs que asumen tipo sin validar | WARNING |
| Límites de longitud | Strings sin límite que pueden desbordar | WARNING |
| Archivos subidos | Uploads sin validación de tipo/tamaño | CRITICAL |

**Preguntas de ataque**:
- ¿Qué pasa si envío un string donde espera un número?
- ¿Qué pasa si envío un payload de 10MB?
- ¿Qué pasa si envío caracteres especiales/unicode?

### 3. Inyección

| Check | Qué buscar | Severidad |
|-------|-----------|-----------|
| SQL Injection | Queries con concatenación de strings | CRITICAL |
| XSS | innerHTML/dangerouslySetInnerHTML sin sanitizar | CRITICAL |
| Command Injection | Ejecución de comandos con input de usuario | CRITICAL |
| Path Traversal | Acceso a archivos con input de usuario sin sanitizar | CRITICAL |

**Preguntas de ataque**:
- ¿Hay algún lugar donde input de usuario se concatena en una query?
- ¿Hay renderizado de HTML no sanitizado?
- ¿Se construyen paths de archivo con input de usuario?

### 4. Secretos y Configuración

| Check | Qué buscar | Severidad |
|-------|-----------|-----------|
| Secrets hardcodeados | API keys, passwords, tokens en código | CRITICAL |
| Secrets en logs | Información sensible logueada | CRITICAL |
| Secrets en cliente | Env vars de servidor expuestas al cliente | CRITICAL |
| Configuración segura | Defaults inseguros (CORS abierto, debug en prod) | WARNING |

**Preguntas de ataque**:
- ¿Hay algún secret visible en el código fuente?
- ¿Se loguea información que podría ser sensible?
- ¿Hay variables de entorno de servidor accesibles desde el cliente?

### 5. Race Conditions y Concurrencia

| Check | Qué buscar | Severidad |
|-------|-----------|-----------|
| Double-submit | Formularios/acciones sin protección contra doble envío | WARNING |
| Estado inconsistente | Operaciones no atómicas que pueden dejar datos corruptos | CRITICAL |
| Rate limiting | Endpoints públicos sin límite de requests | WARNING |
| Idempotencia | Operaciones que generan duplicados si se ejecutan dos veces | WARNING |

**Preguntas de ataque**:
- ¿Qué pasa si el usuario hace click dos veces rápido?
- ¿Qué pasa si dos usuarios ejecutan la misma acción simultáneamente?
- ¿Hay protección contra abuso de endpoints?

### 6. Exposición de Datos

| Check | Qué buscar | Severidad |
|-------|-----------|-----------|
| Datos excesivos | APIs que devuelven más datos de los necesarios | WARNING |
| PII expuesta | Información personal visible donde no debería | CRITICAL |
| Errores verbosos | Stack traces o errores internos expuestos al usuario | WARNING |
| Enumeración | IDs secuenciales que permiten enumerar recursos | WARNING |

**Preguntas de ataque**:
- ¿La API devuelve campos que el cliente no necesita?
- ¿Se expone información personal de otros usuarios?
- ¿Los mensajes de error revelan detalles internos?

### 7. Datos Mock y Hardcoded

| Check | Qué buscar | Severidad |
|-------|-----------|-----------|
| Mock data en producción | Datos de prueba que no se reemplazaron | CRITICAL |
| URLs hardcodeadas | URLs de desarrollo que no se parametrizaron | WARNING |
| Valores mágicos | Números o strings hardcodeados que deberían ser configurables | SUGGESTION |

**Preguntas de ataque**:
- ¿Hay datos de prueba que podrían llegar a producción?
- ¿Hay URLs que apuntan a ambientes de desarrollo?
- ¿Hay valores que deberían venir de configuración?

### 8. Seguridad de Base de Datos

| Check | Qué buscar | Severidad |
|-------|-----------|-----------|
| RLS/Policies | Tablas nuevas sin Row Level Security | CRITICAL |
| Permisos | Operaciones que no verifican ownership | CRITICAL |
| Migraciones | Migraciones que podrían perder datos | CRITICAL |
| Índices | Queries sin índices que podrían ser lentas | WARNING |

**Preguntas de ataque**:
- ¿Un usuario puede consultar/modificar filas de otro usuario?
- ¿Las migraciones son reversibles sin perder datos?
- ¿Hay queries que podrían ser N+1 o full table scan?

---

## Formato de Reporte AR+

```markdown
## Adversarial Review Plus — {target}

> Fecha: {YYYY-MM-DD}
> Reviewer: {agent}

### Resumen por Categoría

| Categoría | Resultado | Hallazgos |
|-----------|-----------|-----------|
| 1. AuthZ | OK/CRITICAL/WARNING | {desc o "Sin hallazgos"} |
| 2. Inputs | OK/CRITICAL/WARNING | {desc o "Sin hallazgos"} |
| 3. Inyección | OK/CRITICAL/WARNING | {desc o "Sin hallazgos"} |
| 4. Secretos | OK/CRITICAL/WARNING | {desc o "Sin hallazgos"} |
| 5. Race Conditions | OK/CRITICAL/WARNING | {desc o "Sin hallazgos"} |
| 6. Data Exposure | OK/CRITICAL/WARNING | {desc o "Sin hallazgos"} |
| 7. Mock Data | OK/CRITICAL/WARNING | {desc o "Sin hallazgos"} |
| 8. DB Security | OK/CRITICAL/WARNING | {desc o "Sin hallazgos"} |

### Hallazgos CRITICAL (si hay)

| # | Categoría | Archivo | Línea | Descripción | Fix requerido |
|---|-----------|---------|-------|-------------|---------------|
| 1 | {cat} | `{path}` | {N} | {qué está mal} | {qué debe corregirse} |

### Hallazgos WARNING (si hay)

| # | Categoría | Archivo | Línea | Descripción | Recomendación |
|---|-----------|---------|-------|-------------|---------------|
| 1 | {cat} | `{path}` | {N} | {qué podría mejorar} | {sugerencia} |

### Veredicto

- **BLOCKED**: Hay hallazgos CRITICAL. Dev debe corregir y re-review.
- **APPROVED with notes**: Solo WARNINGs. Documentar y continuar.
- **APPROVED**: Sin hallazgos. Pipeline limpio.
```

---

## Auto-Blindaje Integration

**Auto-Blindaje = Documentar errores INMEDIATAMENTE cuando ocurren.**

Cuando el reviewer encuentra un error durante la review:

1. **Antes de reportar el hallazgo**, guardar en Engram:

```
mem_save(
  title="Auto-Blindaje: {error_type} en {file}",
  type="bugfix",
  content="""
**What**: {qué se encontró}
**Why**: {por qué es un problema}
**Where**: {archivo:línea}
**Learned**: {lección o patrón a evitar}
""",
  project="{project}",
  topic_key="auto-blindaje/{category}"
)
```

2. **Luego** reportar en el AR+ report.

**Categorías de topic_key**:
- `auto-blindaje/auth` — errores de autenticación/autorización
- `auto-blindaje/injection` — vulnerabilidades de inyección
- `auto-blindaje/data` — exposición de datos
- `auto-blindaje/concurrency` — race conditions
- `auto-blindaje/config` — secrets y configuración

**Ejemplo**:

```python
mem_save(
  title="Auto-Blindaje: SQL Injection en user_search",
  type="bugfix",
  content="""
**What**: Query SQL construida con string concatenation usando input de usuario
**Why**: Permite SQL injection — usuario puede ejecutar queries arbitrarias
**Where**: internal/store/user.go:142 — GetUserByEmail function
**Learned**: SIEMPRE usar parameterized queries ($1, $2) en SQL, nunca string interpolation
""",
  project="myapp",
  topic_key="auto-blindaje/injection"
)
```

---

## Integration con judgment-day

Cuando uses esta skill con `judgment-day`, reemplaza la sección "Review Criteria" del Judge Prompt con:

```markdown
## Review Criteria (Enhanced — 8 Categories)

Review the code against these 8 attack categories:

1. **AuthZ**: Authentication and authorization checks
2. **Inputs**: User input validation
3. **Injection**: SQL, XSS, command injection, path traversal
4. **Secrets**: Hardcoded secrets, logs, client exposure
5. **Concurrency**: Race conditions, double-submit, idempotency
6. **Data Exposure**: Excessive data, PII, verbose errors
7. **Mock Data**: Test data in prod, hardcoded URLs/values
8. **DB Security**: RLS, permissions, migrations, indexes

For EACH category:
- If you find issues → classify as CRITICAL/WARNING/SUGGESTION
- If clean → mark as OK
- If N/A → mark as OK with note "N/A"

Return findings in the AR+ report format.
```

---

## Rules

1. **Reviewer NUNCA implementa** — Solo identifica problemas
2. **CRITICAL es innegociable** — No se avanza hasta corregir
3. **WARNING se documenta** — Corregir si es rápido, deuda técnica si no
4. **Re-review después de fixes** — Verificar que el fix es correcto
5. **Auto-Blindaje obligatorio** — Todo hallazgo CRITICAL se guarda en Engram
6. **Máximo 2 skills** — Si necesitas más, el scope es demasiado grande
7. **Sin falsos positivos** — Justificar cada hallazgo con evidencia concreta

---

## Commands

```bash
# No CLI commands — se invoca via judgment-day o skill()
# Para review standalone: skill(name="adversarial-review-plus", ...)
```
