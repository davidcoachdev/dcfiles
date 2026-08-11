# Cavekit Protocols — Retrieval / Orchestration / Runtime

Cada fase del flujo implementa uno de tres protocolos. Son **contratos**, no implementaciones:
podés swapear la implementación sin tocar el orquestador (Patrón #6 de AgentSkillOS).

## 1. Retrieval Protocol
- **Input**: descripción del feature + `context/refs/kit-index.json`.
- **Output**: `context/refs/reuse-report.md` (kits reutilizables, score, veredicto).
- **Implementado por**: `cavekit-retrieve`. Swappable por otro retriever.

## 2. Orchestration Protocol
- **Input**: kits + estrategia (`quality | efficiency | simplicity`).
- **Output**: task dependency graph (Build Site).
- **Implementado por**: `cavekit-map` (con estrategias). Swappable por otro planner.

## 3. Runtime Protocol
- **Input**: task del grafo.
- **Output**: código/tests ejecutados (Strict TDD) vía SkillClient.
- **Implementado por**: `cavekit-make`. Swappable por otro executor.

## Regla de oro
El orquestador coordina los tres protocolos; **NUNCA acopla la implementación**.
Para cambiar un protocolo, reemplazás el agente que lo implementa, no el flujo.
