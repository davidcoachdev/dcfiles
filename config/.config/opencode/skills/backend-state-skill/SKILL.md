---
name: backend-state-skill
description: Senior Backend Architect. State management specialist for server-side caching, distributed caching (Redis), message queues, and data consistency patterns. Enforces cache invalidation, eventual consistency, and distributed system patterns.
---

# Backend State Management Skill

## 1. ACTIVE BASELINE CONFIGURATION
* STATE_COMPLEXITY: 6 (1=Stateless, 10=Complex distributed)
* CACHE_STRATEGY: 5 (1=None, 10=Full caching layer)
* CONSISTENCY_MODEL: 6 (1=Strong, 10=Eventual)
* MESSAGE_QUEUE_USAGE: 4 (1=Sync, 10=Full async)

Use these as global variables throughout. Adapt based on user requests.

## 2. DEFAULT ARCHITECTURE & CONVENTIONS

### State Layers
* Application State: In-memory (short-lived)
* Session State: Redis or DB-backed
* Distributed Cache: Redis (primary)
* Persistent State: PostgreSQL/MongoDB

### Redis Patterns
```typescript
// Connection
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  tls: process.env.REDIS_TLS ? {} : undefined,
});

// Key patterns
const keys = {
  user: (id: string) => `user:${id}`,
  session: (sid: string) => `session:${sid}`,
  cache: (type: string, id: string) => `cache:${type}:${id}`,
  lock: (resource: string) => `lock:${resource}`,
};

// Cache with TTL
await redis.setex('cache:user:123', 3600, JSON.stringify(user));

// Distributed lock
const lock = await redis.set('lock:resource', 'owner', 'NX', 'EX', 30);
```

### Caching Strategies
* Cache-aside: App checks cache, fetches from DB, populates cache
* Write-through: Write to cache and DB simultaneously
* Write-behind: Write to cache, async write to DB
* Cache-first: Check cache, fallback to DB

## 3. STATE DESIGN DIRECTIVES (Bias Correction)

### Rule 1: Cache Invalidation
* **CRITICAL:** Cache without invalidation = stale data
* Strategies: Time-based (TTL), event-based, versioned
* Invalidate on: Create, Update, Delete of related data
* Use: Cache tags or version keys for grouped invalidation

### Rule 2: Distributed Locks
* Use for: Multi-instance coordination, race condition prevention
* Pattern: `SET key value NX EX ttl` (atomic set-if-not-exists)
* Always: Set timeout (prevent deadlocks)
* Release: Only if you own the lock (verify owner ID)

### Rule 3: Session Management
* Storage: Redis for distributed (vs in-memory for single instance)
* Session ID: Secure random, `crypto.randomUUID()`
* Cookie: `HttpOnly`, `Secure`, `SameSite=Strict`
* Session data: Minimal, reference external state

### Rule 4: Message Queues
* Use for: Async processing, event propagation, job queues
* Patterns: Pub/sub, point-to-point, dead letter queues
* Providers: Redis streams, RabbitMQ, Kafka, SQS
* Consumers: Idempotent, handle duplicates

## 4. CACHING PATTERNS

### Query Caching
```typescript
async function getUserWithCache(userId: string): Promise<User> {
  const cacheKey = `user:${userId}`;
  
  // Check cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // Fetch from DB
  const user = await db.users.findById(userId);
  if (!user) return null;
  
  // Store in cache (5 min TTL)
  await redis.setex(cacheKey, 300, JSON.stringify(user));
  
  return user;
}

async function invalidateUserCache(userId: string): Promise<void> {
  await redis.del(`user:${userId}`);
  // Also invalidate related caches
  await redis.del(`user:${userId}:profile`);
  await redis.del(`user:${userId}:permissions`);
}
```

### Distributed Counters
```typescript
// Rate limiting
async function checkRateLimit(key: string, limit: number, window: number): Promise<boolean> {
  const current = await redis.incr(key);
  if (current === 1) await redis.expire(key, window);
  return current <= limit;
}

// Atomic counter
await redis.hincrby('metrics:views', 'page:home', 1);
```

### Pub/Sub for Event Propagation
```typescript
// Publisher
await redis.publish('user:updated', JSON.stringify({ userId, changes }));

// Subscriber
const subscriber = redis.duplicate();
await subscriber.subscribe('user:updated', (message) => {
  const event = JSON.parse(message);
  // Handle event
});
```

## 5. MESSAGE QUEUE PATTERNS

### Job Queue (Bull/Beaneater)
```typescript
// Producer
const job = await queue.add('process-order', {
  orderId: '123',
  action: 'fulfill',
});

// Consumer
queue.process('process-order', async (job) => {
  const { orderId } = job.data;
  await processOrder(orderId);
  return { success: true };
});

// Retry with backoff
queue.opts = {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
};
```

### Dead Letter Queue
```typescript
// Failed jobs go to DLQ after max attempts
queue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
  // Alert on DLQ threshold
});
```

## 6. CONSISTENCY PATTERNS

### Eventual Consistency
* Accept: Slight delay between write and read
* Handle: Version vectors, last-write-wins
* Use for: Non-critical data, high-traffic reads

### Strong Consistency
* Require: Synchronous confirmation
* Use for: Financial transactions, inventory

### Hybrid Approach
* Strong: Primary operations (write, critical read)
* Eventual: Derived data (analytics, notifications)

## 7. PERFORMANCE GUARDRAILS
* Cache hit rate: Target 80%+
* Connection pool: Redis client pool reuse
* Serialization: Use JSON with compression or MessagePack
* Keys: Prefix with namespace to avoid collisions
* TTL: Set appropriate values (not too short, not forever)
* Memory: Monitor Redis memory, use eviction policies

## 8. DIAL DEFINITIONS

### STATE_COMPLEXITY (1-10)
* 1-3: Stateless, simple in-memory
* 4-7: Single Redis instance, basic caching
* 8-10: Multi-region, complex sharding, distributed transactions

### CACHE_STRATEGY (1-10)
* 1-3: No caching, direct DB
* 4-7: Basic query caching, session storage
* 8-10: Full caching layer, write-through, cache-aside

### CONSISTENCY_MODEL (1-10)
* 1-3: Strong consistency always
* 4-7: Hybrid (strong for writes, eventual for reads)
* 8-10: Eventual by default, conflict resolution

### MESSAGE_QUEUE_USAGE (1-10)
* 1-3: Synchronous processing
* 4-7: Background jobs, notifications
* 8-10: Full async, event sourcing, CQRS

## 9. AI TELLS (FORBIDDEN PATTERNS)

### Caching
* NO: Caching without invalidation strategy
* NO: Caching sensitive data unencrypted
* NO: No TTL (keys live forever)
* NO: Storing large objects in Redis

### Locks
* NO: Using sleeps instead of proper locking
* NO: Not setting lock timeout (deadlock risk)
* NO: Releasing locks you don't own

### Sessions
* NO: Storing sessions in memory (not shared)
* NO: Storing sensitive data in session
* NO: Not invalidating sessions on logout

### Queues
* NO: Non-idempotent consumers (duplicate processing)
* NO: Not handling message failures
* NO: No DLQ for failed messages

## 10. FINAL PRE-FLIGHT CHECK

- [ ] Redis connection properly configured?
- [ ] Cache invalidation strategy defined?
- [ ] Appropriate TTL values set?
- [ ] Distributed locks have timeout?
- [ ] Sessions use secure storage (Redis)?
- [ ] Message queue consumers are idempotent?
- [ ] Failed messages have DLQ?
- [ ] Consistency model documented per operation?
- [ ] Monitoring for cache hit rate?
- [ ] Connection pooling configured?