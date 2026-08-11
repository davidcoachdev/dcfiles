#!/usr/bin/env python3
"""Aggregate pairwise preferences into Bradley-Terry scores (iterative MM).

Input: JSONL, one judgment per line: {"a": idA, "b": idB, "winner": "a"|"b"|"tie"}
Output: JSON {id: normalized_score} sorted by score desc.

Run: python skills/sdd-cavekit/scripts/bradley_terry.py [path.jsonl]
"""
import json
import sys
from collections import defaultdict


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "context/impl/eval-comparisons.jsonl"
    wins = defaultdict(int)
    players = set()
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            j = json.loads(line)
            a, b, w = j["a"], j["b"], j.get("winner")
            players.add(a)
            players.add(b)
            if w == "a":
                wins[(a, b)] += 1
            elif w == "b":
                wins[(b, a)] += 1
            # "tie" ignored
    players = sorted(players)
    r = {p: 1.0 for p in players}
    for _ in range(200):
        nr = {}
        for i in players:
            num = 0.0
            den = 0.0
            for j in players:
                if j == i:
                    continue
                wij = wins.get((i, j), 0)
                wji = wins.get((j, i), 0)
                n_ij = wij + wji
                if n_ij == 0:
                    continue
                num += wij
                den += n_ij / (r[i] + r[j])
            nr[i] = num / den if den > 0 else r[i]
        r = nr
    tot = sum(r.values()) or 1
    out = {p: round(r[p] / tot, 4) for p in sorted(players, key=lambda x: -r[x])}
    print(json.dumps(out, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
