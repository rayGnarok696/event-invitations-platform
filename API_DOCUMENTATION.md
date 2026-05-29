# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### Events

#### GET /events
Get all events

```bash
curl http://localhost:3000/api/events
```

**Response**:
```json
[
  {
    "id": "clv...",
    "title": "Wedding",
    "description": "John & Jane's wedding",
    "date": "2024-06-15T18:00:00Z",
    "location": "Grand Ballroom",
    "theme": "elegant",
    "sections": [...],
    "createdAt": "2024-05-28T...",
    "updatedAt": "2024-05-28T..."
  }
]
```

#### POST /events
Create a new event

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Wedding",
    "description": "John & Jane",
    "date": "2024-06-15T18:00:00Z",
    "location": "Grand Ballroom",
    "theme": "elegant"
  }'
```

**Request Body**:
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "date": "ISO 8601 datetime (optional)",
  "location": "string (optional)",
  "theme": "string (default: 'elegant')"
}
```

**Response**: Same as GET /events/:id

#### GET /events/:id
Get event by ID

```bash
curl http://localhost:3000/api/events/clv...
```

#### PUT /events/:id
Update an event

```bash
curl -X PUT http://localhost:3000/api/events/clv... \
  -H "Content-Type: application/json" \
  -d '{"title": "New Title"}'
```

#### DELETE /events/:id
Delete an event

```bash
curl -X DELETE http://localhost:3000/api/events/clv...
```

---

### Sections

#### POST /sections
Create a new section

```bash
curl -X POST http://localhost:3000/api/sections \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "clv...",
    "templateId": "greeting",
    "title": "Welcome",
    "content": "Please join us!"
  }'
```

**Request Body**:
```json
{
  "eventId": "string (required)",
  "templateId": "string (required)",
  "title": "string (required)",
  "content": "string (optional)",
  "customData": "JSON string (optional)"
}
```

#### PUT /sections/:id
Update a section

```bash
curl -X PUT http://localhost:3000/api/sections/clv... \
  -H "Content-Type: application/json" \
  -d '{"content": "Updated content"}'
```

#### DELETE /sections/:id
Delete a section

```bash
curl -X DELETE http://localhost:3000/api/sections/clv...
```

---

### Templates

#### GET /templates
Get all templates

```bash
curl http://localhost:3000/api/templates
```

#### GET /templates?category=header
Get templates by category

```bash
curl 'http://localhost:3000/api/templates?category=header'
```

#### GET /templates/categories
Get all template categories

```bash
curl http://localhost:3000/api/templates/categories
```

**Response**:
```json
["header", "details", "footer", "content"]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "details": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "string",
      "path": ["title"],
      "message": "String must contain at least 1 character(s)"
    }
  ]
}
```

### 404 Not Found
```json
{
  "error": "Event not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to create event"
}
```
