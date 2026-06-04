---
name: backend-api-skill
description: Senior Backend Engineer. API Design specialist with Swagger/OpenAPI documentation and REST Client testing. Enforces proper HTTP methods, status codes, versioning, authentication, and endpoint testing patterns.
---

> **Absorbed:** `api` (REST conventions), `backend-patterns` (Clean Architecture), `backend-architect` (deleted meta-router)

# Backend API Development Skill

## 1. ACTIVE BASELINE CONFIGURATION
* API_COMPLEXITY: 6 (1=Simple CRUD, 10=Distributed Systems)
* SECURITY_LEVEL: 7 (1=Public, 10=Enterprise/PCI/HIPAA)
* DOCUMENTATION_DEPTH: 8 (1=Minimal, 10=Complete OpenAPI Spec)
* TESTING_RIGOR: 7 (1=Manual, 10=Full CI/CD Pipeline)

Use these as global variables throughout. Adapt based on user requests.

## 2. DEFAULT ARCHITECTURE & CONVENTIONS

### Swagger UI / OpenAPI Integration
* **MANDATORY:** All APIs MUST have OpenAPI 3.0+ specification
* Generate from code: Use `swagger-ui-express`, `tsoa`, `nestjs/swagger`, or `flasgger`
* UI Endpoint: `/api/docs` or `/swagger`
* JSON Spec: `/api/docs.json` or `/openapi.json`
* Include: schemas, examples, response types, authentication requirements

### REST Client Testing (VS Code / JetBrains)
* **FILE EXTENSION:** Use `.http` or `.rest` files
* **NAMING:** `api-test.rest`, `endpoints.http`, `auth-tests.rest`
* **LOCATION:** Root or `/tests/api/` directory
* **STRUCTURE:** Group by resource, include comments, use variables

### HTTP Method Standards
* GET → Retrieve (no body, idempotent)
* POST → Create (201 Created)
* PUT → Replace (idempotent)
* PATCH → Partial Update (idempotent)
* DELETE → Remove (204 No Content)
* **NEVER:** Use GET for mutations, POST for simple reads

### Status Code Enforcement
* 200 OK - Successful GET/PUT/PATCH
* 201 Created - Successful POST
* 204 No Content - Successful DELETE
* 400 Bad Request - Validation error
* 401 Unauthorized - Missing/invalid auth
* 403 Forbidden - Authenticated but not allowed
* 404 Not Found - Resource doesn't exist
* 409 Conflict - State violation (duplicate)
* 422 Unprocessable Entity - Business logic error
* 500 Internal Server Error - Exception (never leak stack)

### URL Design
* Resource naming: `/users`, `/orders`, `/products` (plural)
* Nested resources: `/users/{id}/orders` (if owned)
* Actions: `/users/{id}/activate` (not `/activateUser`)
* Versioning: `/api/v1/users` or header `Accept: application/vnd.api.v1+json`
* Query params: `?status=active&page=2&limit=20`

## 3. API DESIGN DIRECTIVES (Bias Correction)

### Rule 1: Consistent Response Envelopes
* Standardize: `{ success: boolean, data: T, meta?: PaginationMeta, error?: ErrorInfo }`
* NEVER: Mix response formats across endpoints

### Rule 2: API Versioning Strategy
* Major version in URL: `/api/v1/`, `/api/v2/`
* Deprecation policy: Header `Warning: 299 - "Deprecation"`
* Sunset headers: `Sunset: Sat, 01 Jan 2025 00:00:00 GMT`

### Rule 3: Pagination Standard
* Use cursor-based (`cursor`, `next_cursor`) for large datasets
* Include: `limit`, `offset` or `page`, `per_page`
* Response must include: `total`, `has_more`, `next_cursor`

### Rule 4: Field Selection
* Support `?fields=id,name,email` for sparse fieldsets
* Never return entire object when only ID needed

### Rule 5: Error Response Standard
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [{ "field": "email", "message": "Invalid format" }],
    "request_id": "req_abc123"
  }
}
```

## 4. SWAGGER UI SPECIFICATION REQUIREMENTS

### Required Fields Per Endpoint
* summary: Short description
* description: Detailed explanation
* operationId: Unique identifier
* tags: Grouping (e.g., ["Users", "Authentication"])
* parameters: path, query, header, body
* requestBody: Schema reference + examples
* responses: All possible codes with examples
* security: Array of security schemes

### Schema Definitions
* Define all DTOs/entities in `components/schemas`
* Use `\$ref` for reusability
* Include `example` values (not just description)

### Authentication Documentation
* Describe auth flows in `components/securitySchemes`
* Types: apiKey, http (Bearer), oauth2, openIdConnect
* Document required scopes for OAuth2

## 5. REST CLIENT FILE STRUCTURE

### File Organization
```
api/
├── base.http          # Base URL, global variables
├── auth.http          # Login, register, token refresh
├── users.http         # User CRUD operations
├── products.http      # Product endpoints
└── orders.http        # Order management
```

### Variable Usage
```http
@baseUrl = http://localhost:3000
@token = eyJhbGciOiJIUzI1NiIs...

GET {{baseUrl}}/api/users
Authorization: Bearer {{token}}
```

### Test Patterns
```http
### Get All Users
GET {{baseUrl}}/api/users
Authorization: Bearer {{token}}

> {%
  client.assert(response.status === 200, "Expected 200");
  client.assert(response.body.data.length > 0, "Should have users");
%}

### Create User - Should Fail Validation
POST {{baseUrl}}/api/users
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "name": "",
  "email": "not-an-email"
}

> {%
  client.assert(response.status === 400, "Expected 400 for invalid data");
%}
```

### Advanced REST Client Features

#### Request Chaining (Response → Variable)
```http
### Login and capture token
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "pass123"
}

@token = {{login.response.body.$.token}}

### Use captured token in next request
GET {{baseUrl}}/profile
Authorization: Bearer {{token}}
```

#### Environment Variables (local/staging/prod)
```json
// .vscode/settings.json
{
  "rest-client.environmentVariables": {
    "$shared": { "authToken": "{{$dotenv TOKEN}}" },
    "local": { "baseUrl": "http://localhost:3000/api" },
    "staging": { "baseUrl": "https://staging.api.com" },
    "prod": { "baseUrl": "https://api.production.com" }
  },
  "rest-client.environmentName": "local"
}
```

#### GraphQL Support
```http
### GraphQL Query
POST {{baseUrl}}/graphql
Content-Type: application/json

{
  "query": "query($id: ID!) { user(id: $id) { name email } }",
  "variables": { "id": "123" }
}
```

#### Authentication Methods
```http
### Basic Auth
GET {{baseUrl}}/users
Authorization: Basic {{$base64 username:password}}

### Bearer Token
GET {{baseUrl}}/profile
Authorization: Bearer {{token}}

### API Key in header
GET {{baseUrl}}/data
X-API-Key: {{apiKey}}
```

#### Form Data / Multipart
```http
### Multipart Form Upload
POST {{baseUrl}}/upload
Content-Type: multipart/form-data; boundary=WebKitFormBoundary

--WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="image.png"
Content-Type: image/png

< ./assets/image.png
--WebKitFormBoundary--

--WebKitFormBoundary
Content-Disposition: form-data; name="title"

My Upload
--WebKitFormBoundary--
```

#### cURL Import
```http
# Paste cURL directly - REST Client auto-parses
curl -X POST https://api.example.com/users \
  -H "Authorization: Bearer token" \
  -d '{"name": "John"}'
```

## 6. PERFORMANCE GUARDRAILS
* Pagination mandatory for list endpoints (>100 results)
* Implement ETags + If-None-Match for caching
* Request timeout: 30s default, 5s for auth endpoints
* Rate limiting headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`
* Compression: Support gzip, brotli
* N+1 query prevention: Use joins or batch queries

## 7. DIAL DEFINITIONS

### API_COMPLEXITY (1-10)
* 1-3: Simple REST CRUD, no nesting
* 4-7: Multi-resource, basic relationships, search/filter
* 8-10: GraphQL options, WebSocket support, complex workflows

### SECURITY_LEVEL (1-10)
* 1-3: Public APIs, basic auth
* 4-7: JWT, API keys, role-based access
* 8-10: OAuth2, mTLS, request signing, audit logs, IP allowlisting

### DOCUMENTATION_DEPTH (1-10)
* 1-3: Basic endpoint list, minimal examples
* 4-7: Full schemas, auth docs, common errors
* 8-10: Complete OpenAPI, Try-it-out enabled, code snippets, migration guides

### TESTING_RIGOR (1-10)
* 1-3: Manual cURL testing
* 4-7: REST Client files, basic assertions
* 8-10: Automated test suite, CI integration, contract testing

## 8. AI TELLS (FORBIDDEN PATTERNS)

### Response Design
* NO inconsistent response formats
* NO omitting Content-Type header in docs
* NO generic error messages ("Something went wrong")

### URL & Methods
* NO `/getUsers` or `/getUserById` (use GET /users)
* NO using POST for everything to avoid complexity
* NO mixing plural/singular (pick ONE convention)

### Documentation
* NO empty schemas without properties
* NO missing response examples
* NO undocumented authentication requirements

### Testing
* NO hardcoded URLs in tests (use variables)
* NO testing only happy paths (test 400, 401, 403, 404)
* NO missing Content-Type in POST/PUT requests

## 9. THE CREATIVE ARSENAL

### Advanced API Patterns
* Compound endpoints: `POST /api/batch` for bulk operations
* Export/Import: `GET /api/export?format=csv&filters=...`
* Webhooks: Outgoing event notifications with retry logic
* Async operations: `202 Accepted` with `Location` header for polling

### Search & Filtering
* Full-text search: `?q=term&type=advanced`
* Faceted search: Aggregations in response
* Geo queries: `?lat=40.7128&lng=-74.0060&radius=10km`

### Versioning Strategies
* Header-based: `Accept: application/vnd.myapp.v1+json`
* Query param: `?version=1`
* Link header for deprecation: `Link: <url>; rel="deprecation"`

### Real-time Options
* Server-Sent Events: For dashboard updates
* WebSocket: For chat/live collaboration
* Webhook events: For external integrations

## 10. FINAL PRE-FLIGHT CHECK

- [ ] All endpoints have OpenAPI documentation?
- [ ] Swagger UI accessible at documented URL?
- [ ] REST Client file created with all endpoints?
- [ ] Variables used (no hardcoded URLs)?
- [ ] Test cases cover happy AND error paths?
- [ ] Proper HTTP status codes used?
- [ ] Authentication documented and tested?
- [ ] Pagination implemented for list endpoints?
- [ ] Error response format is consistent?
- [ ] API version strategy defined?