# Exploration: init-dcfiles

## Executive Summary

dcfiles es un proyecto greenfield para crear un gestor de dotfiles que también funcione como repositorio personal de dotfiles. La exploración analiza 6 gestores existentes (chezmoi, yadm, Dotbot, GNU Stow, rcm, homesick) y 3 lenguajes candidatos (Go, Rust, Python). El stack técnico predominante en gestores modernos es Go (chezmoi: 20.1k ⭐) por su single binary, rendimiento y ecosistema CLI maduro. La arquitectura ideal combina symlinks por defecto + templates Go para diferencias entre máquinas + encryption vía age para secrets. Se proponen 3 enfoques: (A) tool CLI en Go completa, (B) Python tool minimalista, (C) wrapper bash sobre bare git repo.

## Current State

Repositorio vacío con solo `openspec/config.yaml` y un archivo `a.md` no relacionado. No hay commits en `main`. Stack sin determinar en config.

## Existing Dotfiles Managers — Analysis

| Tool | Lang | Stars | Strategy | Encryption | Templates | Per-Host |
|------|------|-------|----------|------------|-----------|----------|
| **chezmoi** | Go | 20.1k | Symlink + copy + template | ✅ age/GPG | ✅ Go templates | ✅ |
| **yadm** | Bash | 6.3k | Git wrapper + symlink | ✅ GPG/OpenSSL | ✅ Jinja2 (opt) | ✅ alt files |
| **Dotbot** | Python | 7.9k | Symlink (YAML config) | ❌ (plugin) | ❌ | ❌ |
| **GNU Stow** | Perl | 1k | Symlink tree mirroring | ❌ | ❌ | ❌ (manual) |
| **rcm** | Shell | ~500 | Symlink (by host/tag) | ❌ | ❌ | ✅ (by host/tag) |
| **homesick** | Ruby | ~2k | Symlink (castle-based) | ❌ | ❌ | ❌ |

### Key takeaways from existing tools

1. **chezmoi** domina el espacio: single binary, scripting, encryption, templates. Su complejidad es su mayor contra.
2. **yadm** es el más simple que ofrece encryption y templates: envuelve git directamente.
3. **Dotbot** es popular por su simplicidad pero carece de features avanzados.
4. Ningún tool popular está escrito en Rust todavía — oportunidad.
5. El patrón "bare git repo + alias" (`git --git-dir=$HOME/.dotfiles --work-tree=$HOME`) es extremadamente popular sin necesitar tooling.

## Language Choice — Comparison

| Criterio | Go | Rust | Python | Bash |
|----------|----|------|--------|------|
| Single binary | ✅ | ✅ | ❌ | ❌ |
| Cross-platform | ✅✅ | ✅✅ | ✅ | ⚠️ Linux |
| Template engine | `text/template` built-in | `tera`/`handlebars` crate | Jinja2 built-in | N/A |
| Encryption | `age` / `filippo.io/age` | `age` crate | `python-gnupg` | `gpg` |
| CLI ecosystem | Cobra/Viper (muy maduro) | `clap` (maduro) | `click`/`typer` | getopts |
| Stdlib templating | ✅ built-in | ❌ (needs crate) | ✅ built-in | ❌ |
| Performance | Fast | Fastest | Medium | Slow |
| Dev speed | Fast | Slow | Fastest | Medium |
| JSON/YAML/Toml | ✅ `gopkg.in/yaml.v3` | ✅ `serde` | ✅ built-in | ❌ |
| Testability | ✅ excelente | ✅ excelente | ✅ buena | ⚠️ difícil |

## Architecture Patterns

### Symlink vs Copy vs Template

| Strategy | Pros | Cons | Use when |
|----------|------|------|----------|
| **Symlink** | Editable in place, git tracks originals, zero storage | No per-machine customization, breaks if target moves | Configs that are identical across machines |
| **Copy** | Independent per machine, safe to modify | Diverges from repo, manual sync | Machine-specific configs |
| **Template** | Dynamic content, machine-aware | Complex, needs engine, testing harder | Configs with variables (hostname, OS, user) |

**Recommendation**: Symlink default + template for per-machine diffs. Copy only when explicitly requested.

### Profile-based vs Machine-based

- **Machine-based**: Config por hostname (`hostname` -> `hostname.Darwin`). Simple, el approach de yadm.
- **Profile-based**: Config por perfil (`work`, `personal`, `server`). Más flexible.
- **Hybrid**: Ambas. Permite `dcfiles apply --profile work` y detecta hostname automáticamente.

### Git Integration

| Model | Description | Example |
|-------|-------------|---------|
| **Bare repo + alias** | `git --git-dir=$HOME/.dotfiles --work-tree=$HOME` | Popular community approach |
| **Git wrapper** | Tool wraps git commands internally | yadm |
| **Submodule** | Tool lives as git submodule in dotfiles repo | Dotbot |
| **Own VCS** | Tool manages files without exposing git | chezmoi (internally) |

**Recommendation**: Git wrapper model (como yadm) — expone git subcommands (`dcfiles status`, `dcfiles diff`, `dcfiles push`) para que el usuario use git directamente sin aprender una nueva interfaz.

### Bootstrap vs Full CLI

- **Bootstrap script**: `./install.sh` o `dcfiles bootstrap` — ideal para primera instalación en máquina nueva.
- **Full CLI**: `dcfiles apply`, `dcfiles add`, `dcfiles status` — gestión diaria.

**Recommendation**: Ambos. `dcfiles init` + `dcfiles apply` para daily use, `dcfiles bootstrap` para setup inicial.

## Directory Structure Convention

Propuesta de estructura para el repositorio de dotfiles:

```
~/.dotfiles/                  # O ~/dcfiles/
├── dcfiles.yaml              # Config del tool (opcional)
├── home/                     # Archivos que van a $HOME
│   ├── .bashrc
│   ├── .gitconfig
│   └── .config/
│       ├── nvim/
│       │   └── init.lua
│       └── tmux/
│           └── tmux.conf
├── private/                  # Archivos encriptados
│   └── .ssh/
│       └── config.age        # Encriptado con age
├── templates/                # Plantillas Go
│   ├── .gitconfig.tmpl
│   └── .bashrc.tmpl
├── scripts/                  # Scripts de bootstrap
│   ├── install-packages.sh
│   └── setup-os.sh
├── .dcfiles/                 # Metadata interna
│   ├── state.json            # Estado actual
│   └── config.yaml           # Config del tool
└── README.md
```

## Approaches

### Approach A: Go CLI Tool (Full-featured)

**Description**: Tool completa en Go usando Cobra/Viper, con symlinks + templates Go + encryption via age. Single binary, cross-platform.

- **Language**: Go
- **Pros**:
  - Single binary sin dependencias
  - Ecosistema CLI maduro (Cobra, Viper, fatih/color, tablewriter)
  - Go `text/template` built-in para templates de dotfiles
  - `filippo.io/age` para encryption moderna sin GPG
  - Cross-compilación trivial (Linux, macOS, Windows)
  - Go 1.24 con `slog` built-in, mejor iteración
  - Testabilidad nativa
  - Referencia directa: chezmoi (20k ⭐) está en Go
- **Cons**:
  - Más código que un wrapper bash
  - Go `text/template` no es tan expresivo como Jinja2
  - Mayor time-to-market que Python
- **Effort**: High

### Approach B: Python CLI Tool (Minimalist)

**Description**: Tool en Python con Click/Typer y Jinja2. Similar a Dotbot pero con encryption y templates.

- **Language**: Python
- **Pros**:
  - Desarrollo rápido
  - Jinja2 templates (más expresivos que Go templates)
  - python-gnupg para encryption
  - YAML/JSON/TOML soporte nativo
  - Gran ecosistema
- **Cons**:
  - Requiere Python runtime en el sistema
  - No single binary (necesita pipx o PyInstaller)
  - Rendimiento más lento (poco relevante para CLI de dotfiles)
  - Dependencias a gestionar
- **Effort**: Medium

### Approach C: Shell Bootstrap + Bare Git Repo

**Description**: Script bash minimalista + bare git repo (método de alias popular). Sin templates complejos.

- **Language**: Shell (Bash)
- **Pros**:
  - Cero dependencias
  - Extremadamente simple
  - Usa git directamente (sin abstracción)
  - Fácil de entender y modificar
  - Rápido de implementar
- **Cons**:
  - Sin encryption nativa
  - Sin templates
  - Lógica per-machine manual
  - Sin dry-run, sin validación
  - Shell scripting frágil en cross-platform
  - No escala bien a multi-máquina
- **Effort**: Low

## Recommendation

**Approach A: Go CLI Tool** es el enfoque recomendado.

### Razones

1. **Single binary es el estándar de facto** para dotfiles managers modernos. chezmoi (20k ⭐) lo demostró: la gente no quiere instalar runtimes.
2. **El perfil del usuario** (desarrollador Linux, usa dotfiles, escribe Go) hace que Go sea la elección natural.
3. **Go 1.24** ofrece `text/template`, `slog`, excelente stdlib para JSON/YAML, y cross-compile nativo.
4. **age encryption** es moderna, simple y sin la complejidad de GPG.
5. **El layout de proyecto Go CLI** definido en `golang-cli` y `golang-project-layout` skills encaja perfectamente.

### Scope propuesto para v1

- `dcfiles init` — inicializar repositorio de dotfiles
- `dcfiles add <file>` — agregar archivo al repo (copia/symlink)
- `dcfiles apply` — aplicar symlinks/plantillas en el sistema
- `dcfiles status` — mostrar estado (archivos trackeados vs sistema)
- `dcfiles encrypt` / `dcfiles decrypt` — manejo de secrets con age
- `dcfiles template` — procesar plantillas Go
- `dcfiles diff` — diferencias entre repo y sistema

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Reinventar chezmoi | High | Medium | No competir con chezmoi, hacer tool personal que resuelva necesidades específicas del usuario |
| Scope creep | Medium | High | Mantener v1 minimalista, features adicionales post-MVP |
| Cross-platform edge cases (macOS) | Medium | Medium | Testear en ambas plataformas desde el inicio |
| Encryption key management | Low | High | Usar age, que es más simple que GPG, y documentar flujo |
| Adopción de Go templates (no Jinja2) | Low | Low | Go templates son suficientes para el 90% de casos de dotfiles |
| Desviación del objetivo original (dcfiles repo personal + tool) | Medium | Medium | El tool debe gestionar su propio repositorio de dotfiles como primer caso de uso |

## Ready for Proposal

**Yes**. La exploración está completa. El enfoque Go CLI es claro y las decisiones técnicas están fundamentadas. El siguiente paso es `sdd-propose` para formalizar el alcance, estructura del proyecto y decisiones de arquitectura.

## Skill Resolution

- `golang-cli` — injected (Cobra/Viper patterns, exit codes, I/O discipline)
- `golang-project-layout` — injected (Go project structure, cmd/internal/pkg convention)
- `sdd-explore` — injected (exploration methodology, persistence contract)
- `_shared` — injected (change name safety, artifact paths)
