---
name: sdd-cavekit-eval
description: >
  Eval harness: comparación por pares + agregación Bradley-Terry para rankear
  implementaciones/candidatos. Trigger: "/sdd-cavekit eval", "compare candidates"
---

## Eval — Pairwise + Bradley-Terry (Patrón #5 de AgentSkillOS)

Compara candidatos de forma relativa (no absoluta) y agrega preferencias en un score continuo.
Reduce position bias comparando en ambos órdenes.

### Cuándo usarlo
- Tenés 2+ variantes de un artefacto (HTML, doc, código, imagen, video) y querés decidir cuál es mejor.
- Como paso opcional en `check` para desempatar críticas.

### Protocolo
1. Para cada par (A, B), pedí un veredicto ordenado (`A>B`, `B>A`, o empate) — idealmente en ambos órdenes.
2. Volcá las comparaciones a `context/impl/eval-comparisons.jsonl` (una línea por juicio):
   `{"a":"idA","b":"idB","winner":"a"}`  (empate → omitir o `winner:"tie"`).
3. Corré `python skills/sdd-cavekit/scripts/bradley_terry.py context/impl/eval-comparisons.jsonl` → scores normalizados.
4. Reportá ranking en `context/impl/eval-report.md`.

### Criterios de comparación (multiformato)
PDF/PPTX/DOCX/HTML/imagen/video: evaluá fidelidad al requisito, claridad, completitud, riesgo.

### Result Contract
```
{n} comparaciones → Bradley-Terry scores: A={sA}, B={sB}...
Mejor candidato: {id}
```

### Auto-Load
- validation-first
