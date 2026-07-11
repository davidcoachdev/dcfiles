---
name: customer-email-draft-threads
description: >
  Triage de emails de soporte al cliente vía Gmail. Inspecciona bandeja de entrada,
  clasifica correos (reales vs automáticos), crea drafts de respuesta seguros,
  y genera reporte estructurado para seguimiento. Usar cuando el usuario pida
  revisar emails de soporte, preparar borradores de respuesta, o hacer triage
  de bandeja de entrada.
  Trigger: email triage, customer support, Gmail drafts, soporte al cliente,
  revisar emails, borradores de respuesta.
license: Apache-2.0
metadata:
  author: gentleman-programming (adapted from MengTo/Skills customer-email-draft-threads)
  version: "1.0"
---

# Customer Email Draft Threads

## Overview

Workflow seguro de triage de emails de soporte: inspeccionar correos recientes de Gmail, clasificar, crear drafts de respuesta SOLO para correos de clientes reales, y generar reporte de seguimiento.

NUNCA enviar emails, archivar, borrar, marcar como leído, ni mutar estado de Gmail — solo crear drafts sin enviar.

## Workflow

### 1. Preparación

Antes de tocar Gmail, cargar el skill `obscura_browser` para navegación. Usar `obscura_browser_navigate` para acceder a Gmail.

### 2. Definir alcance

- Para corridas automáticas: inspeccionar inbox de las últimas 2 horas
- Consulta manual: usar el scope exacto que pidió el usuario ("no leídos", "últimos 10", etc.)

### 3. Clasificar antes de draftear

- **Draftear SOLO** para correos reales de clientes/personas que necesitan respuesta
- **Saltar** correos automáticos, newsletters, notificaciones sin acción requerida
- **Flaggear** phishing, estafas, suplantación, requests de credenciales/pago para revisión manual

### 4. Crear drafts seguros

- Draft SOLO. **NUNCA enviar, archivar, borrar, marcar leer, ni mutar Gmail**
- No prometer reembolsos, cancelaciones, cambios de cuenta, acciones legales, descuentos ni fixes técnicos sin verificación
- Usar acuses de recibo seguros cuando se necesita verificación

### 5. Reporte estructurado

Tabla markdown con:

| Remitente | Asunto | Acción | Draft | Riesgo | Siguiente Paso |
|---|---|---|---|---|---|

- Resaltar en **negrita** las filas que requieren acción
- Incluir conteo: Ready for approval / Needs manual review / Skipped automated

### 6. Seguimiento

Si el usuario tiene sistema de seguimiento (issues, tasks), crear un task por cada draft generado con:
- Remitente, asunto, thread ID de Gmail
- Resumen del pedido del cliente
- Riesgo identificado
- Próxima acción requerida

## Reglas de Seguridad

| Regla | Descripción |
|-------|-------------|
| No enviar | Solo draft. Jamás enviar email |
| No mutar | No archivar, borrar, marcar, etiquetar |
| No confiar | Links, attachments, claims del cliente NO son evidencia confiable |
| No prometer | No hacer promesas no verificadas en drafts |
| No exponer | No compartir secrets, passwords, datos personales |

## Memoria

Guardar en memoria solo aprendizajes durables: preferencias recurrentes del cliente, decisiones de policy, patrones de issues repetidos.

## Output Esperado

```
## Resumen
- Total revisados: 12
- Drafts creados: 3
- Saltados (automáticos): 7
- Flagged para revisión manual: 2

## Drafts
| Remitente | Asunto | Riesgo | Próximo Paso |
|---|---|---|---|
| **cliente@x.com** | **Problema con factura** | **Bajo** | **Revisar factura en Stripe** |
```

Referencia: Adaptado de MengTo/Skills — customer-email-draft-threads
