# C4 Diagram Templates (Mermaid)

Copy the relevant block, rename identifiers, and fill in the labels. Then run
`mermaid-fixer` on the file before committing.

## Level 1 — System Context (`C4Context`)

```mermaid
C4Context
    title System Context diagram for <SYSTEM>
    Person(userA, "User A", "Role / goal of this actor")
    Person(admin, "Administrator", "Operates the system")
    System(system, "<SYSTEM>", "One-line description")
    System_Ext(extApi, "External API", "Upstream / 3rd-party dependency")
    System_Ext(legacy, "Legacy System", "System we integrate with")

    Rel(userA, system, "Uses", "HTTPS")
    Rel(admin, system, "Manages", "HTTPS")
    Rel(system, extApi, "Calls", "JSON/REST")
    Rel(system, legacy, "Syncs data", "SQL")
```

## Level 2 — Container (`C4Container`)

```mermaid
C4Container
    title Container diagram for <SYSTEM>
    Person(user, "User", "Primary operator")

    Container_Boundary(sys, "<SYSTEM>") {
        Container(web, "Web App", "TypeScript / Next.js", "UI + API gateway")
        Container(api, "API Service", "Go", "Business logic")
        ContainerDb(db, "Database", "PostgreSQL", "Persistence")
        ContainerQueue(queue, "Queue", "Redis", "Async jobs")
    }

    System_Ext(email, "Email Provider", "Notifications")

    Rel(user, web, "Uses", "HTTPS")
    Rel(web, api, "Calls", "gRPC")
    Rel(api, db, "Reads/Writes", "SQL/TCP")
    Rel(api, queue, "Publishes", "Redis")
    Rel(api, email, "Sends", "SMTP")
```

## Level 3 — Component (`C4Component`)

```mermaid
C4Component
    title Component diagram for <SYSTEM> — <CONTAINER>
    Container_Boundary(api, "API Service") {
        Component(router, "HTTP Router", "chi", "Routes requests")
        Component(auth, "Auth Component", "JWT", "Login + sessions")
        Component(svc, "Domain Service", "Go", "Core logic")
        Component(repo, "Repository", "sqlc", "DB access")
    }
    ContainerDb(db, "Database", "PostgreSQL", "Persistence")

    Rel(router, auth, "Checks", "")
    Rel(router, svc, "Dispatches", "")
    Rel(svc, repo, "Uses", "")
    Rel(repo, db, "Reads/Writes", "SQL")
```

## Level 4 — Code (`classDiagram`)

Mermaid has no `C4Code` primitive; use a `classDiagram` for the single most
important component only.

```mermaid
classDiagram
    class OrderService {
        +create(order) Order
        +cancel(id) void
    }
    class OrderRepository {
        +save(o) void
        +find(id) Order
    }
    class Order {
        +id: string
        +total: number
        +status: Status
    }
    OrderService --> OrderRepository : uses
    OrderService ..> Order : builds
    OrderRepository --> Order : persists
```

## Notes
- Element ids must be unique within a diagram and contain no spaces.
- Labels with spaces go in quotes: `Person(u, "User Name", "desc")`.
- Relations: `Rel(from, to, "label", "tech")` for C4; `-->`, `..>` for class.
- After editing, run `mermaid-fixer` — it catches unknown types, unbalanced
  brackets, and edges with missing endpoints.
