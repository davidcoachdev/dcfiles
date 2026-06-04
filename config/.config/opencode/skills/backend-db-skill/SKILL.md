---
name: backend-db-skill
description: Senior Database Engineer. SQL/PostgreSQL specialist with migrations, indexing strategies, query optimization, and data modeling. Enforces referential integrity, transaction safety, and performance patterns.
---

> **Absorbed:** `database` (query rules, repository pattern), `database-specialist` (NoSQL, migrations, indexing)

# Backend Database Development Skill

## 1. ACTIVE BASELINE CONFIGURATION
* SCHEMA_COMPLEXITY: 6 (1=Flat tables, 10=Complex domain models)
* NORMALIZATION_LEVEL: 7 (1=Denormalized, 10=BCNF strict)
* QUERY_COMPLEXITY: 5 (1=Simple selects, 10=Multi-join analytics)
* MIGRATION_STRATEGY: 7 (1=Manual SQL, 10=Versioned migrations)

Use these as global variables throughout. Adapt based on user requests.

## 2. DEFAULT ARCHITECTURE & CONVENTIONS

### PostgreSQL Defaults
* Primary: PostgreSQL 14+
* Extensions: `uuid-ossp`, `pg_trgm`, `citext`
* JSONB for flexible schemas (not for structured relationships)
* Timestamps: `created_at`, `updated_at` with `DEFAULT NOW()`

### Migration Structure
```sql
-- migrations/001_create_users.sql
-- Migration: Create users table
-- Created: 2024-01-15

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email CITEXT NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
```

### Naming Conventions
* Tables: `snake_case`, plural (`user_profiles`, `order_items`)
* Columns: `snake_case` (`created_at`, `is_active`)
* FK: `table_name_id` (`user_id`, `order_id`)
* Indexes: `idx_{table}_{columns}` or `uq_{table}_{columns}` for unique
* Constraints: `{table}_{column}_{type}` (`users_email_unique`)

## 3. DATABASE DESIGN DIRECTIVES (Bias Correction)

### Rule 1: Primary Key Strategy
* Default: `UUID` with `gen_random_uuid()` (not sequential)
* Exceptions: Surrogate `BIGSERIAL` only for high-write log tables
* Composite keys: Only for join tables (`user_id, role_id`)

### Rule 2: Foreign Key Enforcement
* **MANDATORY:** All relationships via FK with `ON DELETE CASCADE/RESTRICT`
* No soft-delete without `deleted_at` column with index
* Use `REFERENCES` with explicit constraint names

### Rule 3: Indexing Strategy
* Index WHERE clauses, not just SELECT
* Partial indexes for filtered queries: `WHERE deleted_at IS NULL`
* Cover indexes for performance: `INCLUDE (name, email)`
* NEVER index low-cardinality boolean columns alone
* Use `EXPLAIN ANALYZE` for query plans

### Rule 4: Data Types
* UUID for IDs, emails, tokens
* DECIMAL for money (NOT FLOAT)
* JSONB only when schema truly flexible
* TEXT for unlimited length (no VARCHAR(max))
* BOOLEAN with `DEFAULT FALSE`

## 4. QUERY PATTERNS & OPTIMIZATION

### Safe Query Patterns
```sql
-- Parameterized (NO string interpolation)
SELECT * FROM users WHERE id = $1;

-- Pagination with cursor (NOT offset for large tables)
SELECT * FROM users 
WHERE created_at < $cursor 
ORDER BY created_at DESC 
LIMIT 20;

-- Upsert pattern
INSERT INTO users (email, name) 
VALUES ($1, $2)
ON CONFLICT (email) 
DO UPDATE SET name = EXCLUDED.name, updated_at = NOW();
```

### N+1 Prevention
* Use JOINs: `SELECT * FROM orders JOIN users ON...`
* Batch queries: `WHERE id IN (...)`
* Lateral joins for complex aggregations

### Transaction Patterns
```sql
BEGIN;
  -- Multiple operations
  INSERT INTO orders (...) VALUES (...);
  UPDATE inventory SET quantity = quantity - 1 WHERE ...;
COMMIT;

-- Savepoint for partial rollback
SAVEPOINT sp1;
ROLLBACK TO SAVEPOINT sp1;
```

## 5. MIGRATION MANAGEMENT

### Migration Best Practices
* **ALWAYS:** Add `IF NOT EXISTS` for new objects
* **ALWAYS:** Reverse migration (down.sql) for rollbacks
* **NEVER:** Modify existing migrations (add new ones)
* **NEVER:** Drop columns without backup strategy
* Use migration tools: `flyway`, `sqitch`, `prisma migrate`, `gorm auto migrate`

### Schema Versioning
* Version prefix: `001_`, `002_` or `2024_01_15_001`
* Include description in migration file
* Track applied migrations in dedicated table

## 6. PERFORMANCE GUARDRAILS
* Connection pooling: Use `pgBouncer` or built-in pool
* Query timeout: Default 30s, 5s for OLTP
* Bulk operations: `INSERT INTO ... VALUES (...), (...), (...)`
* Partitioning for time-series >10M rows
* Materialized views for expensive aggregations
* Statement timeout: `SET statement_timeout = '30s'`

## 7. DIAL DEFINITIONS

### SCHEMA_COMPLEXITY (1-10)
* 1-3: Flat tables, minimal relationships
* 4-7: Normalized with joins, basic hierarchies
* 8-10: Complex domain, polymorphic, multiple schemas

### NORMALIZATION_LEVEL (1-10)
* 1-3: Denormalized, duplication OK for read performance
* 4-7: 3NF, balanced normalization
* 8-10: BCNF, strict normalization, no redundancy

### QUERY_COMPLEXITY (1-10)
* 1-3: Simple CRUD, single table
* 4-7: Multi-join, aggregations, CTEs
* 8-10: Window functions, recursive CTEs, complex analytics

### MIGRATION_STRATEGY (1-10)
* 1-3: Manual SQL scripts
* 4-7: Versioned migrations, basic rollbacks
* 8-10: Full CI/CD migrations, zero-downtime deployments

## 8. AI TELLS (FORBIDDEN PATTERNS)

### Schema Design
* NO `SELECT *` in production code
* NO mixing camelCase and snake_case
* NO missing NOT NULL when column is required
* NO timestamps without timezone (use TIMESTAMPTZ)

### Query Writing
* NO string interpolation for values (SQL injection)
* NO `ORDER BY rand()` in production
* NO correlated subqueries for large datasets
* NO missing LIMIT on unbounded queries

### Migrations
* NO dropping tables without data backup
* NO adding NOT NULL to existing columns without default
* NO changing column types without migration
* NO forgetting to rebuild indexes after data changes

## 9. THE CREATIVE ARSENAL

### Advanced Patterns
* Partitioned tables: Range/list/hash partitioning
* JSONB indexing: GIN indexes with `jsonb_path_ops`
* Full-text search: `tsvector` + `tsquery` with ranking
* Array columns: For tags, categories (with GIN index)
* Enum types: For fixed sets (`status`, `type`)

### Data Modeling
* Audit trail: Trigger-based or event sourcing
* Soft deletes: With archive table pattern
* Polymorphic associations: JSONB or separate tables
* Temporal tables: For point-in-time queries

### Performance Patterns
* Columnar storage: For analytics (TimescaleDB)
* Read replicas: For query-heavy workloads
* Connection poolers: PgBouncer, PgPool
* Prepared statements: For repeated queries

## 10. FINAL PRE-FLIGHT CHECK

- [ ] All tables have primary keys?
- [ ] Foreign keys properly configured with cascade rules?
- [ ] Indexes on WHERE/JOIN columns?
- [ ] Migrations are versioned and reversible?
- [ ] Queries use parameterized statements?
- [ ] Pagination implemented for list queries?
- [ ] EXPLAIN ANALYZE shows reasonable costs?
- [ ] Connection pooling configured?
- [ ] Sensitive data encrypted at rest?
- [ ] Backup strategy documented?