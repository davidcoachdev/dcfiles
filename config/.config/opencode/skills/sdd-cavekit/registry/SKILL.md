---
name: sdd-cavekit-registry
description: >
  Registry de capacidades extensible (capability tree) + refresco programado.
  Define el formato de kit-index.json y cómo rebuildarlo. Trigger: "/sdd-cavekit index", "refresh registry"
---

## Registry — Capability Tree + Refresh (Patrón #4 de AgentSkillOS)

El registry es un índice de capacidades de los kits existentes, vivo en `context/refs/kit-index.json`.
Es la **fuente primaria** de `cavekit-retrieve` (búsqueda barata y determinista, sin escanear todo).

### Formato de kit-index.json
```json
{
  "version": 1,
  "updated_at": "2026-08-10",
  "entries": [
    {
      "id": "kit-auth",
      "goal": "Autenticación y sesiones",
      "capabilities": ["auth", "jwt", "sessions"],
      "path": "context/kits/kit-auth.md",
      "source": "project"
    }
  ]
}
```

### Extensible (bring-your-own)
Podés añadir entradas `source: byo` o `external` apuntando a skills fuera de `context/kits/`. El retrieve las considera igual que las del proyecto.

### Refresh programado (dormant / scheduled updater)
No dejes el índice desactualizado. Rebuild con:
```bash
python skills/sdd-cavekit/scripts/refresh_kit_index.py
```
El script escanea `context/kits/` y regenera `context/refs/kit-index.json`, **conservando** las entradas manuales `byo`/`external`.

### Cuándo refrescar
- Tras `cavekit-init` (primer build).
- Tras agregar/borrar kits.
- Periódicamente (scheduled updater) en proyectos grandes.

### Auto-Load
- cavekit-writing (formato de kit)
