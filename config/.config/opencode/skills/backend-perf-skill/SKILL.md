---
name: backend-perf-skill
description: Senior Backend Performance Engineer. Application optimization specialist for profiling, benchmarking, memory management, and throughput optimization. Enforces observability, connection pooling, and algorithmic efficiency.
---

> **Absorbed:** `performance` (frontend + backend optimization tips)

# Backend Performance Skill

## 1. ACTIVE BASELINE CONFIGURATION
* OPTIMIZATION_FOCUS: 6 (1=Code-first, 10=System-level)
* OBSERVABILITY_LEVEL: 7 (1=Logs only, 10=Full tracing)
* BENCHMARK_REQUIRED: 5 (1=Manual, 10=CI integration)
* RESOURCE_LIMIT: 6 (1=Unlimited, 10=Strict budgets)

Use these as global variables throughout. Adapt based on user requests.

## 2. DEFAULT ARCHITECTURE & CONVENTIONS

### Performance Monitoring
* Metrics: CPU, Memory, Latency, Throughput, Errors
* Tools: Prometheus, Grafana, DataDog, New Relic
* Alerts: P95/P99 latency, error rate, resource usage

### Profiling Tools
* Node.js: `clinic.js`, `0x`, `node --prof`
* Go: `pprof`, `benchstat`
* Python: `cProfile`, `py-spy`
* General: Flame graphs, trace logs

### Connection Management
```typescript
// Database pool (PostgreSQL)
const pool = new Pool({
  max: 20,              // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// HTTP agent (Node.js)
const agent = new http.Agent({
  keepAlive: true,
  maxSockets: 25,
  maxFreeSockets: 10,
  timeout: 60000,
});
```

## 3. PERFORMANCE DESIGN DIRECTIVES (Bias Correction)

### Rule 1: Latency Optimization
* Target: P95 < 200ms, P99 < 500ms
* Slow query: Anything > 100ms
* Async: Non-blocking I/O for external calls
* Batch: Combine multiple DB operations

### Rule 2: Memory Management
* Leak detection: Track object allocations
* Streaming: Don't load large files to memory
* Buffer pooling: Reuse buffers for I/O
* GC tuning: Understand your language's GC

### Rule 3: Algorithmic Efficiency
* Complexity: O(n) or better preferred
* Index usage: Ensure DB queries use indexes
* Avoid: N+1 queries, cartesian products
* Prefer: Batch operations over loops

### Rule 4: Resource Budgets
* Timeout: 30s default, 5s for critical paths
* Retry: Exponential backoff with circuit breaker
* Rate limiting: Prevent cascade failures
* Circuit breaker: Fail fast when dependent service down

## 4. OPTIMIZATION PATTERNS

### Database Optimization
```sql
-- Explain analyze (PostgreSQL)
EXPLAIN ANALYZE 
SELECT u.name, COUNT(o.id) 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
WHERE u.created_at > '2024-01-01'
GROUP BY u.id;

-- Create covering index
CREATE INDEX idx_orders_user_date 
ON orders(user_id, created_at) 
INCLUDE (total, status);
```

### Batch Processing
```typescript
// Process in chunks
async function processUsers(userIds: string[], batchSize = 100) {
  for (let i = 0; i < userIds.length; i += batchSize) {
    const batch = userIds.slice(i, i + batchSize);
    await Promise.all(batch.map(id => processUser(id)));
  }
}

// Bulk insert
const values = users.map(u => `(${u.id}, '${u.name}')`).join(',');
await db.query(`INSERT INTO users (id, name) VALUES ${values}`);
```

### Connection Pooling
```typescript
// Graceful shutdown
async function shutdown() {
  console.log('Closing connections...');
  await pool.end();
  await redis.quit();
  await mq.close();
  process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

## 5. OBSERVABILITY

### Logging
```typescript
// Structured logging
logger.info('request_completed', {
  requestId: req.id,
  method: req.method,
  path: req.path,
  statusCode: res.statusCode,
  latencyMs: Date.now() - req.startTime,
  userId: req.user?.id,
});
```

### Metrics
```typescript
// Custom metrics
const requestDuration = new Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request duration in milliseconds',
  buckets: [50, 100, 200, 500, 1000, 2000],
});

const activeConnections = new Gauge({
  name: 'db_active_connections',
  help: 'Number of active database connections',
});
```

### Distributed Tracing
```typescript
// Trace span
const span = tracer.startSpan('processOrder', {
  parent: span,
  attributes: { orderId, userId },
});

try {
  await processOrder(orderId);
  span.setAttribute('success', true);
} catch (err) {
  span.setAttribute('success', false);
  span.setAttribute('error', err.message);
} finally {
  span.end();
}
```

## 6. BENCHMARKING

### Load Testing
```typescript
// k6 script
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Stay
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function() {
  const res = http.get('https://api.example.com/users');
}
```

### Benchmark Suite
```typescript
// Go benchmark
func BenchmarkFindUserByEmail(b *testing.B) {
  for i := 0; i < b.N; i++ {
    repo.FindByEmail("user@example.com")
  }
}

// Run: go test -bench=BenchmarkFindUserByEmail -benchmem
```

## 7. DIAL DEFINITIONS

### OPTIMIZATION_FOCUS (1-10)
* 1-3: Code-level, algorithmic improvements
* 4-7: Database and caching optimization
* 8-10: System-level, infrastructure tuning

### OBSERVABILITY_LEVEL (1-10)
* 1-3: Basic logging
* 4-7: Metrics + alerts + profiling
* 8-10: Full tracing + APM + custom dashboards

### BENCHMARK_REQUIRED (1-10)
* 1-3: Ad-hoc testing
* 4-7: Pre-commit benchmarks
* 8-10: CI integration, regression detection

### RESOURCE_LIMIT (1-10)
* 1-3: No strict limits
* 4-7: Basic timeouts, rate limits
* 8-10: Strict budgets per endpoint

## 8. AI TELLS (FORBIDDEN PATTERNS)

### Code Performance
* NO: Blocking I/O in hot paths
* NO: Synchronous operations in loops
* NO: Creating objects in tight loops
* NO: Deep recursion without tail optimization

### Database
* NO: N+1 queries (use JOIN or batch)
* NO: SELECT * (specify columns)
* NO: No indexes on WHERE columns
* NO: Unbounded result sets (no LIMIT)

### Resource Management
* NO: Missing timeouts
* NO: Connection leaks (always release)
* NO: Unbounded queues (use backpressure)
* NO: Not handling backpressure

### Error Handling
* NO: Catching without handling
* NO: Swallowing errors silently
* NO: Not differentiating error types
* NO: Logging sensitive data

## 9. THE CREATIVE ARSENAL

### Advanced Optimization
* Edge caching: CDN for static + API responses
* HTTP/2 multiplexing: Single connection
* gRPC: For internal services
* Connection coalescing: Share connections

### Memory Optimization
* Object pooling: Reuse expensive objects
* Zero-copy: Use buffers directly
* Streaming: Process data in chunks
* Weak refs: Allow GC for caches

### Scaling Patterns
* Horizontal scaling: Stateless services
* Read replicas: DB read scaling
* Sharding: Distribute data across nodes
* Async workers: Offload heavy processing

## 10. FINAL PRE-FLIGHT CHECK

- [ ] Database queries optimized with indexes?
- [ ] N+1 queries eliminated?
- [ ] Connection pools configured properly?
- [ ] Timeouts set on all external calls?
- [ ] Circuit breaker for downstream services?
- [ ] Logging includes performance context?
- [ ] Latency metrics collected?
- [ ] Load testing done?
- [ ] Memory leaks addressed?
- [ ] Graceful shutdown implemented?