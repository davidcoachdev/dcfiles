#!/bin/bash
# Restaurar agentes custom a opencode.json
# Uso: bash merge-custom-agents.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MAIN="$SCRIPT_DIR/opencode.json"
CUSTOM="$SCRIPT_DIR/custom-agents.json"

if [ ! -f "$CUSTOM" ]; then
    echo "❌ No existe custom-agents.json"
    exit 1
fi

python3 -c "
import json, sys

with open('$MAIN') as f:
    main = json.load(f)
with open('$CUSTOM') as f:
    custom = json.load(f)

before = len(main.get('agent', {}))
for name, agent_def in custom['agent'].items():
    main['agent'][name] = agent_def
after = len(main['agent'])

with open('$MAIN', 'w') as f:
    json.dump(main, f, indent=2)
    f.write('\n')

added = after - before
print(f'✅ Mergeado: {added} agentes restaurados (total: {after})')
print('Agentes custom:', ', '.join(sorted(custom['agent'].keys())))
" && echo "" && echo "Listo. Reiniciá OpenCode para que tome los cambios."
