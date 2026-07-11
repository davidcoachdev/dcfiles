---
name: performance-profiling
description: >
  Guía de profiling de rendimiento para aplicaciones Apple (macOS/iOS). Usa
  Instruments, Xcode Diagnostics, y MetricKit para diagnosticar hangs, alta
  CPU, memory leaks, OOM crashes, launch lento, battery drain, y problemas
  térmicos. Usar cuando el usuario investigue rendimiento en apps nativas de
  Apple, o pida instrumentar con os_signpost.
  Trigger: performance profiling, Instruments, Xcode profiling, Apple profiling,
  memory leak iOS, app hang iOS, MetricKit, os_signpost.
license: Apache-2.0
metadata:
  author: gentleman-programming (adapted from MengTo/Skills performance-profiling)
  version: "1.0"
---

# Performance Profiling (Apple Platforms)

## Overview

Diagnosticar problemas de rendimiento en apps Apple sistemáticamente: elegir el workflow de profiling correcto, aplicar fixes quirúrgicos, y verificar con mediciones reales.

## Decision Tree

```text
¿Qué problema de rendimiento investigas?

+ Hangs, stutters, dropped frames, alta CPU
  -> Leer references/time-profiler.md

+ Alta memoria, leaks, OOM crashes, footprint creciente
  -> Leer references/memory-profiling.md

+ Slow cold launch, warm launch, time to first frame
  -> Leer references/launch-optimization.md

+ Battery drain, thermal throttling, background energy
  -> Leer references/energy-diagnostics.md

+ "App se siente lenta"
  -> Empezar con time-profiler, luego memory-profiling
```

## Quick Reference

| Problema | Instrument / Tool | Key Metric |
|----------|------------------|------------|
| UI hangs >250ms | Time Profiler + Hangs | Hang duration, main thread stack |
| Alta CPU | Time Profiler | CPU % por función |
| Memory leak | Leaks + Memory Graph | Leaked bytes, retain cycles |
| Memory growth | Allocations | Live bytes, generation analysis |
| Slow launch | App Launch | Time to first frame |
| Battery drain | Energy Log | Energy impact |
| Thermal issues | Activity Monitor | Thermal state transitions |

## Workflow

1. Identificar categoría de rendimiento del reporte del usuario
2. Leer solo la referencia que corresponda
3. Preferir profiling en dispositivo real con Release build y datos representativos
4. Inspeccionar el codepath nombrado por el profile ANTES de proponer fix
5. Aplicar el fix más pequeño que resuelva el bottleneck medido
6. Re-profilear para confirmar la mejora

## Profiling Ground Rules

- **Profilear en dispositivo real** — Simulator usa CPU/memoria del host
- **Release configuration** — optimizaciones cambian hot paths
- **Datos representativos** — no databases vacías ni assets de juguete
- **Cerrar apps no relacionadas** para reducir noise
- **Medir antes y después** del fix

## Xcode Diagnostics

| Setting | Use For |
|---------|---------|
| Main Thread Checker | UI work off main thread |
| Thread Sanitizer | Data races |
| Address Sanitizer | Buffer overflows, use-after-free |
| Malloc Stack Logging | Allocation call stacks |
| Zombie Objects | Messages to deallocated objects |

## MetricKit Hook

```swift
import MetricKit

final class PerformanceReporter: NSObject, MXMetricManagerSubscriber {
    func startCollecting() {
        MXMetricManager.shared.add(self)
    }

    func didReceive(_ payloads: [MXMetricPayload]) {
        for payload in payloads {
            if let launch = payload.applicationLaunchMetrics {
                log("Resume time: \(launch.histogrammedResumeTime)")
            }
            if let memory = payload.memoryMetrics {
                log("Peak memory: \(memory.peakMemoryUsage)")
            }
        }
    }
}
```

## Review Checklist

**Responsiveness:**
- Sin trabajo síncrono en main thread >100ms
- Sin file I/O ni network en main thread
- `@MainActor` limitado a código que realmente necesita UI access

**Memory:**
- Sin retain cycles en delegates, closures, observers
- Recursos grandes se liberan al salir de pantalla
- Caches y colecciones acotadas

**Launch:**
- Sin trabajo pesado en `init()` del `@main App` struct
- Inicialización no-esencial diferida

**Energy:**
- Background tasks usan `BGTaskScheduler` apropiado
- Timers usan tolerance para coalescer wakeups
- Network requests bachados y cacheados

## Referencias de MengTo

Las referencias originales (`time-profiler.md`, `memory-profiling.md`, `launch-optimization.md`, `energy-diagnostics.md`) contienen detalles específicos de cada instrumento. Consultar documentación oficial de Apple para profundizar.

Referencia: Adaptado de MengTo/Skills — performance-profiling
