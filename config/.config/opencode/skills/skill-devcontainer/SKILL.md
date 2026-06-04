# Dev Containers Skill

**Trigger phrases:** "devcontainer", "dev container", "setup devcontainer", "configure devcontainer", "reproducible development environment", "Docker development environment", "isolated dev setup"

## What is a Dev Container?

A **Dev Container** is a Docker-based development environment specified in `devcontainer.json` that ensures every team member (and every machine) runs identical tooling, dependencies, and runtimes. No more "works on my machine" 🚫.

**Key benefits:**
- ✅ **Reproducibility**: Same environment everywhere (local, CI/CD, team)
- ✅ **Isolation**: Dependencies don't pollute host machine
- ✅ **Onboarding**: New devs run one command instead of 30-minute setup scripts
- ✅ **Consistency**: Eliminates environment drift across team
- ✅ **Portability**: Works on macOS, Linux, Windows with Docker installed
- ✅ **Security**: Bind mounts, volume mounts, non-root user by default

## Architecture: The Dev Container Lifecycle

```
devcontainer.json (config file)
    ├─ base image (mcr.microsoft.com/devcontainers/rust:1.77 or custom Dockerfile)
    ├─ Features (pre-built tools: git, node, python, solana-cli, anchor)
    ├─ Lifecycle Commands (executed in order)
    │  ├─ onCreateCommand: runs ONCE during initial container setup
    │  ├─ postCreateCommand: runs ONCE after initial creation (install dependencies)
    │  ├─ postStartCommand: runs on EVERY container start (migrations, services)
    │  └─ updateContentCommand: runs on rebuild/update (incremental deps)
    ├─ Mounts (volumes, bind mounts, secrets)
    ├─ Environment variables (remoteEnv)
    ├─ VS Code extensions (ext install)
    └─ Port forwarding (localPort → containerPort)

Docker Compose (optional, for multi-container setups)
    ├─ app service (main development container)
    ├─ db service (PostgreSQL, MongoDB, etc.)
    ├─ cache service (Redis, Memcached)
    └─ named volumes (persist data across restarts)
```

## Best Practices (2026 Standards)

### 1. **Base Images: Pick Right**
| Image | Size | Pros | Cons |
|-------|------|------|------|
| `mcr.microsoft.com/devcontainers/rust:1.77` | 600MB | Pre-built, tools included, official | Larger |
| `rust:latest` | 1.2GB | Official Rust image | Too much bloat for dev |
| `rust:slim-bookworm` | 350MB | Slim, fast | Fewer tools, must add manually |
| Custom multi-stage Dockerfile | 200-400MB | Exact control, minimal | More maintenance |

**Rule:** For dev containers, prefer `mcr.microsoft.com/devcontainers/*` (pre-built, monthly updates, security hardened).

### 2. **Multi-Stage Dockerfiles (Build vs Runtime)**
```dockerfile
# Stage 1: Builder (contains all dev tools, 2GB)
FROM rust:latest AS builder
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libssl-dev
COPY . /app
WORKDIR /app
RUN cargo build --release

# Stage 2: Runtime (only the binary + minimal libs, 200MB)
FROM rust:slim-bookworm
COPY --from=builder /app/target/release/myapp /usr/local/bin/
CMD ["myapp"]
```

**Benefit:** Final image 80% smaller. Build tools never reach production.

### 3. **Features: Don't Reinvent the Wheel**
```json
{
  "image": "mcr.microsoft.com/devcontainers/rust:1.77",
  "features": {
    "ghcr.io/devcontainers/features/docker-outside-of-docker:1": {},
    "ghcr.io/devcontainers/features/github-cli:1": {},
    "ghcr.io/devcontainers-contrib/features/solana-cli:1": {}
  }
}
```

**Rule:** Use features instead of custom `postCreateCommand` scripts. Features are:
- ✅ Cached independently (faster rebuilds)
- ✅ Version-pinned (reproducible)
- ✅ Tested & maintained by community

### 4. **Lifecycle Commands: Order Matters**

```json
{
  "onCreateCommand": "echo 'First-time setup starting...'",
  "postCreateCommand": "npm install && cargo build",
  "postStartCommand": "npm run dev & solana-test-validator",
  "updateContentCommand": "npm install && cargo build"
}
```

**Execution order:**
1. `onCreateCommand` — once at container creation (init git, setup SSH)
2. `postCreateCommand` — once after creation (install dependencies)
3. `postStartCommand` — every restart (start services, background tasks)
4. `updateContentCommand` — on rebuild (incremental updates, no full reinstall)

**Caveman rule:** Don't run expensive operations in `postStartCommand` (runs on every restart). Use it only for stateless startup.

### 5. **Mounts: Volumes, Bind Mounts, Secrets**

```json
{
  "mounts": [
    "source=${localEnv:HOME}/.ssh,target=/home/vscode/.ssh,type=bind,readonly",
    "source=cargo-cache,target=/home/vscode/.cargo,type=volume",
    "source=npm-cache,target=/home/vscode/.npm,type=volume"
  ],
  "remoteEnv": {
    "API_KEY": "${localEnv:API_KEY}",
    "DATABASE_URL": "postgres://user:pass@db:5432/myapp"
  }
}
```

**Rules:**
- ✅ Mount `.ssh` from host (read-only) — authenticate to GitHub inside container
- ✅ Use **named volumes** for dependencies (cargo, npm) — persist across restarts
- ✅ Use **bind mounts** for source code — reflect local changes in real-time
- ❌ Never bake secrets into `devcontainer.json` or Dockerfile
- ✅ Pass secrets via environment variables from host: `${localEnv:SECRET_NAME}`

### 6. **Non-Root User: Security 101**

```json
{
  "remoteUser": "vscode",
  "containerUser": "vscode"
}
```

Or in Dockerfile:
```dockerfile
RUN groupadd -r vscode && useradd -r -g vscode vscode
USER vscode
```

**Why:** Containers run as `root` by default. Attacker breaks in → full system access. Non-root user limits blast radius.

### 7. **Docker-Outside-of-Docker (DooD) vs Docker-in-Docker (DinD)**

| Mode | Performance | Security | Use Case |
|------|-------------|----------|----------|
| **Docker-Outside-of-Docker** (DooD) | ⚡ Fast | ✅ Safer (mounts host socket) | Local dev, CI/CD testing |
| **Docker-in-Docker** (DinD) | 🐢 Slow, high memory | ❌ Nested daemon overhead | Isolated Docker environments (rare) |

**Rule:** Use `docker-outside-of-docker` feature. It mounts `/var/run/docker.sock` from host → container uses host Docker daemon (no nesting).

### 8. **Performance Optimization**

| Optimization | Impact | Effort |
|--------------|--------|--------|
| Use named volumes for dependencies | -70% build time | Low — one-liner |
| Pre-built images (avoid `docker build` on every open) | -50% first startup | Medium — push image to registry |
| BuildKit cache mounts | -80% npm/cargo rebuilds | Medium — requires BuildKit enabled |
| VS Code prebuilds (Codespaces) | -90% Codespaces startup | High — GitHub Actions workflow |
| Distroless images | -60% image size | High — custom setup |

**Quick wins for Rust/Anchor projects:**
```dockerfile
# Enable BuildKit
# syntax=docker/dockerfile:1.4

FROM rust:latest
RUN apt-get update && apt-get install -y build-essential

COPY . /app
WORKDIR /app

# Mount cargo registry & git (persist between builds)
RUN --mount=type=cache,target=/home/vscode/.cargo/registry \
    --mount=type=cache,target=/home/vscode/.cargo/git \
    cargo build --release
```

### 9. **Health Checks: For Orchestrators**

```json
{
  "healthCheck": {
    "test": ["CMD", "curl", "-f", "http://localhost:3000/health || exit 1"],
    "interval": 30,
    "timeout": 10,
    "retries": 3
  }
}
```

**Why:** Kubernetes, Docker Swarm, and orchestrators use health checks to know if container is alive.

### 10. **Supply Chain Security: Image Scanning & SBOMs**

```bash
# Scan base image for CVEs
docker scout cves mcr.microsoft.com/devcontainers/rust:1.77

# Generate SBOM (Software Bill of Materials)
docker scout sbom rust:latest

# Sign image with cosign (production only)
cosign sign --key cosign.key ghcr.io/myorg/myapp:latest
```

**2026 standard:** Every image must have a scanned SBOM + signed with cosign. Non-negotiable for supply chain security.

## Configuration: devcontainer.json Anatomy

```json
{
  // Base image (prefer mcr.microsoft.com/devcontainers/*)
  "image": "mcr.microsoft.com/devcontainers/rust:1.77",

  // OR custom Dockerfile
  "build": {
    "dockerfile": "Dockerfile",
    "context": ".",
    "args": {
      "VARIANT": "bookworm"
    }
  },

  // Pre-built features (cached, version-pinned)
  "features": {
    "ghcr.io/devcontainers/features/docker-outside-of-docker:1": {},
    "ghcr.io/devcontainers/features/github-cli:1": {},
    "ghcr.io/devcontainers-contrib/features/solana-cli:1": {}
  },

  // Lifecycle commands (order matters)
  "onCreateCommand": "git config --global core.editor vim",
  "postCreateCommand": "cargo build && npm install",
  "postStartCommand": "npm run dev",

  // Non-root user
  "remoteUser": "vscode",

  // Mount .ssh, volumes, bind mounts
  "mounts": [
    "source=${localEnv:HOME}/.ssh,target=/home/vscode/.ssh,type=bind,readonly",
    "source=cargo-cache,target=/home/vscode/.cargo,type=volume"
  ],

  // Environment variables (NO secrets here!)
  "remoteEnv": {
    "API_KEY": "${localEnv:API_KEY}",
    "DATABASE_URL": "postgres://user:pass@db:5432/myapp"
  },

  // VS Code extensions to install
  "extensions": [
    "rust-lang.rust-analyzer",
    "GitHub.copilot",
    "ms-vscode.makefile-tools"
  ],

  // Port forwarding (host:container)
  "forwardPorts": [3000, 5432, 8545],
  "portsAttributes": {
    "3000": { "label": "app", "onAutoForward": "notify" },
    "5432": { "label": "database", "onAutoForward": "silent" }
  },

  // Docker Compose (multi-container)
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspace",

  // Customization
  "customizations": {
    "vscode": {
      "settings": {
        "rust-analyzer.checkOnSave.command": "clippy"
      }
    }
  }
}
```

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Container won't start | Base image not found, Dockerfile error | Run `docker logs <container>` |
| Slow first build | Large base image (1GB+), no cache | Use `mcr.microsoft.com/devcontainers/*` pre-built images |
| Dependency conflicts | postCreateCommand runs before features fully installed | Separate concerns: features for tools, postCreateCommand for app deps |
| Permissions denied on volumes | Running as root, volume mounted with wrong user | Use `remoteUser: vscode` + non-root in Dockerfile |
| Secrets leaked | Hardcoded in devcontainer.json or Dockerfile | Use `remoteEnv: { "SECRET": "${localEnv:SECRET}" }` |
| Docker-in-Docker too slow | Nested daemon overhead | Switch to `docker-outside-of-docker` feature |
| Container won't rebuild | Layer cache stale | `docker system prune -a && docker build --no-cache .` |

## Rust + Anchor-Specific Setup

```json
{
  "image": "mcr.microsoft.com/devcontainers/rust:1.77-bookworm",
  "features": {
    "ghcr.io/devcontainers/features/docker-outside-of-docker:1": {},
    "ghcr.io/devcontainers-contrib/features/solana-cli:1": {},
    "ghcr.io/devcontainers/features/github-cli:1": {}
  },
  "postCreateCommand": "cargo install anchor-cli && npm install -g @solana/cli",
  "postStartCommand": "solana-test-validator &",
  "mounts": [
    "source=cargo-cache,target=/home/vscode/.cargo,type=volume",
    "source=solana-keypairs,target=/home/vscode/.config/solana,type=volume"
  ],
  "remoteEnv": {
    "SOLANA_RPC_URL": "http://localhost:8899",
    "ANCHOR_PROVIDER_URL": "http://localhost:8899"
  },
  "extensions": [
    "rust-lang.rust-analyzer",
    "Anchor.anchor",
    "ms-vscode.makefile-tools"
  ],
  "forwardPorts": [8899]
}
```

## Security Checklist

- [ ] No secrets in `devcontainer.json` or Dockerfile
- [ ] Non-root user (`remoteUser: vscode`)
- [ ] Base image pinned to specific version or SHA digest
- [ ] No `--privileged` unless absolutely necessary
- [ ] SSH key mounted as read-only bind mount
- [ ] Secrets passed via `${localEnv:*}` variables
- [ ] Base image scanned for CVEs: `docker scout cves <image>`
- [ ] SBOM generated: `docker scout sbom <image>`
- [ ] Container runs with least privilege (read-only root filesystem where possible)
- [ ] Supply chain signed with cosign (production)

## References

- **Microsoft Official:** https://containers.dev/ (devcontainer.json spec)
- **Docker Best Practices 2026:** https://webcoderspeed.com/blog/scaling/docker-2026-best-practices
- **Container Security:** https://www.ox.security/blog/container-security-best-practices/
- **OX Security Container Lifecycle:** 4-layer security model (build, deploy, runtime, monitoring)
- **Dev Container Features:** https://github.com/devcontainers/features (pre-built, audited features)
- **Rust/Cargo in Containers:** https://docs.docker.com/language/rust/ (official Docker guide)
- **Anchor Framework:** https://book.anchor-lang.com/ (setup + best practices)

## Quick Start Template

```bash
# 1. Create .devcontainer directory
mkdir -p .devcontainer

# 2. Create devcontainer.json (copy template above)
cat > .devcontainer/devcontainer.json << 'EOF'
{
  "image": "mcr.microsoft.com/devcontainers/rust:1.77-bookworm",
  "features": {
    "ghcr.io/devcontainers/features/docker-outside-of-docker:1": {}
  },
  "postCreateCommand": "cargo build && npm install",
  "remoteUser": "vscode",
  "extensions": ["rust-lang.rust-analyzer"]
}
EOF

# 3. Open in VS Code
code .

# 4. Command palette: "Dev Containers: Reopen in Container"
```

## Related Skills

- **docker-expert**: General Docker best practices (images, layers, registries)
- **devops-engineer**: CI/CD automation (includes devcontainer integration)
- **security-auditor**: Container security scanning & compliance
- **solana-dev**: Solana + Anchor development (uses devcontainers for reproducibility)
