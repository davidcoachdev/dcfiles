#!/usr/bin/env python3
"""Rebuild context/refs/kit-index.json by scanning context/kits/*.md.

Preserves manual entries (source: byo | external). Idempotent.
Run from project root: python skills/sdd-cavekit/scripts/refresh_kit_index.py
"""
import json
import os
import glob
import datetime

KITS_DIR = "context/kits"
INDEX = os.path.join("context", "refs", "kit-index.json")


def read_goal(path):
    try:
        txt = open(path, encoding="utf-8").read()
    except Exception:
        return ""
    for line in txt.splitlines():
        s = line.strip()
        if s.lower().startswith("goal"):
            return s.split(":", 1)[1].strip() if ":" in s else s
    for line in txt.splitlines():
        if line.strip():
            return line.strip().lstrip("#").strip()
    return os.path.basename(path)


def main():
    os.makedirs(os.path.dirname(INDEX), exist_ok=True)
    manual = []
    if os.path.exists(INDEX):
        try:
            data = json.load(open(INDEX, encoding="utf-8"))
            manual = [e for e in data.get("entries", []) if e.get("source") in ("byo", "external")]
        except Exception:
            manual = []
    entries = []
    seen = set()
    for p in sorted(glob.glob(os.path.join(KITS_DIR, "*.md"))):
        name = os.path.splitext(os.path.basename(p))[0]
        if name.lower() in ("readme",):
            continue
        goal = read_goal(p)
        caps = sorted({w for w in name.replace("-", " ").replace("_", " ").lower().split() if len(w) > 2})
        entries.append({
            "id": name,
            "goal": goal[:160],
            "capabilities": caps,
            "path": p,
            "source": "project",
        })
        seen.add(name)
    entries.extend([e for e in manual if e["id"] not in seen])
    out = {
        "version": 1,
        "updated_at": datetime.date.today().isoformat(),
        "entries": entries,
    }
    with open(INDEX, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"kit-index rebuilt: {len(entries)} entries ({len(manual)} manuales preservados) -> {INDEX}")


if __name__ == "__main__":
    main()
