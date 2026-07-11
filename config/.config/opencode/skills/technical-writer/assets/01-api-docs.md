# User API Documentation

## Get User

```
GET /api/v1/users/:id
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| id | string | User ID |

### Response

```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Example

```bash
curl -X GET https://api.example.com/api/v1/users/user_123 \
  -H "Authorization: Bearer token"
```
