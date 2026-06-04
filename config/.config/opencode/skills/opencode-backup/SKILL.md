---
name: opencode-backup
description: >
  Backup and restore OpenCode configuration. Supports selective backup by category:
  skills, agents, hooks, prompts, commands, themes, all. Trigger: When user says
  "backup opencode", "backup skills", "backup agents", "restore opencode",
  "transfer opencode config", "migrate opencode", or needs to move config to another machine.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.1"
---

## When to Use

- User wants to backup their OpenCode config
- Moving to a new machine with OpenCode
- Syncing config between machines
- Saving a snapshot before major changes
- Sharing configuration with team

## Argument Handling

If user_message provided, parse and execute selective backup:

| Argument | What backs up |
|----------|--------------|
| `skills` | ~/.config/opencode/skills/ |
| `agents` | ~/.config/opencode/.agents/ (if exists) |
| `hooks` | ~/.config/opencode/hooks/ |
| `prompts` | ~/.config/opencode/prompts/ |
| `commands` | ~/.config/opencode/commands/ |
| `themes` | ~/.config/opencode/themes/ |
| `config` | AGENTS.md, opencode.json, oh-my-openagent.json |
| `all` | Everything above |
| Empty/default | Show help with options |

## Commands

### Crear Backup (ZIP)

```bash
# Los backups se guardan en ~/.config/opencode/backup/
mkdir -p ~/.config/opencode/backup

# Backup solo skills
cd ~/.config/opencode && zip -r backup/opencode-skills-backup.zip skills/ -x "*/node_modules/*" "*.db*"

# Backup completo (todo)
cd ~/.config/opencode && zip -r backup/opencode-full-backup.zip . -x "*/node_modules/*" "*.db*" "tui.json" "opencode-notifier*"
```

### Selective Backup (via argument)

```bash
# Backup only skills
opencode backup skills

# Backup only agents
opencode backup agents

# Backup skills + agents
opencode backup skills agents

# Backup everything
opencode backup all

# Or using skill directly with argument
# Say: "backup skills" or "backup agents" or "backup all"
```

### Backup via skill (with user_message)

When user invokes skill with message (e.g., `/backup skills` or "backup agents"):

1. Parse the message to extract target(s)
2. Run rsync for each target
3. Report what was backed up

### Backup to ZIP (for transfer) - RECOMENDADO

```bash
# Create compress backup for easy transfer + auto-generate instructions
INSTRUCTIONS="$HOME/opencode-backup-instructions.md"

# Generate instructions file
cat > "$INSTRUCTIONS" << 'EOF'
# OpenCode Backup - Instrucciones

## Crear Backup
cd ~ && zip -r ~/opencode-backup.zip ~/.config/opencode/ -x "*/node_modules/*" "*.db" "*.db-shm" "*.db-wal" "tui.json" "opencode-notifier*"

## Restaurar en Nueva Máquina
```bash
# 1. Instalar OpenCode
npm install -g opencode

# 2. Restaurar backup
unzip -o ~/opencode-backup.zip -d ~/.config/

# 3. Reinstalar dependencias
cd ~/.config/opencode && npm install
```

## Sync con rsync
rsync -avz --exclude='node_modules' --exclude='*.db' ~/.config/opencode/ user@nueva-maquina:~/.config/opencode/

## Contenido
| Incluido | Excluido |
|---------|---------|
| skills/ | node_modules/ |
| commands/ | *.db |
| hooks/ | tui.json |
| prompts/ | opencode-notifier* |
| AGENTS.md | |
| opencode.json | |
| themes/ | |
EOF

# Create ZIP with instructions
zip -r ~/opencode-backup.zip ~/.config/opencode/ "$INSTRUCTIONS" \
  -x "*/node_modules/*" "*.db" "*.db-shm" "*.db-wal" "tui.json" "opencode-notifier*" "opencode-agent-tmux/*"

rm "$INSTRUCTIONS"
echo "ZIP backup: ~/opencode-backup.zip (includes instructions)"
```

### Restore from Backup

```bash
# Restore to new machine
# File opencode-backup-instructions.md contains full instructions
unzip -o ~/opencode-backup.zip -d ~/.config/
```

### Sync with rsync (recommended)

```bash
# Sync to remote machine (via SSH)
rsync -avz --exclude='node_modules' --exclude='*.db' \
  ~/.config/opencode/ user@remote:~/.config/opencode/
```

## What to Include in Backup

| Item | Include? | Reason |
|------|----------|--------|
| `skills/` | ✅ YES | Custom skills (your 170+ skills) |
| `commands/` | ✅ YES | Custom slash commands |
| `prompts/` | ✅ YES | Custom prompts |
| `AGENTS.md` | ✅ YES | Agent configuration |
| `hooks/` | ✅ YES | Custom hooks |
| `opencode.json` | ✅ YES | Main config |
| `themes/` | ✅ YES | Custom themes |
| `node_modules/` | ❌ NO | Can reinstall |
| `*.db` | ❌ NO | Local state |
| `tui.json` | ❌ NO | Terminal-specific |

## Transfer Checklist

- [ ] Create backup ZIP
- [ ] Copy to new machine (USB, cloud, scp)
- [ ] Install OpenCode on new machine first
- [ ] Restore backup to `~/.config/opencode/`
- [ ] Run `opencode --sync` if available
- [ ] Test with `opencode --version`

## Troubleshooting

**Issue**: Permissions error on restore
```bash
chmod -R 755 ~/.config/opencode/
chown -R $USER:$USER ~/.config/opencode/
```

**Issue**: Node modules missing
```bash
cd ~/.config/opencode && npm install
```

**Issue**: Not seeing skills
```bash
opencode --reload-skills
```

## Resources

See `references/` for detailed guides and code examples in `assets/`.

## External Resources

- [Official Documentation]