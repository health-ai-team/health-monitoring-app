# Health Monitoring App — Backend

AI-powered health monitoring platform connecting patients and doctors through a Gemma 4 wellness assistant.

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL via Prisma ORM
- **AI Model:** Gemma 4 (via local Ollama)
- **Testing:** Vitest

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| Node.js | ≥ 18 | Runtime |
| npm | ≥ 9 | Package manager |
| PostgreSQL | ≥ 14 | Database |
| Ollama | Latest | Local AI inference |

## Installation

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Generate Prisma client
npx prisma generate
```

## Environment Setup

The backend uses these environment variables:

| Variable | Default | Required | Purpose |
|---|---|---|---|
| `PORT` | `3001` | No | Server port |
| `DATABASE_URL` | — | Yes | PostgreSQL connection string |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | No | Ollama server address |
| `GEMMA_MODEL` | `gemma4` | No | Ollama model name |
| `OLLAMA_SIMULATE` | `true` | No | `"false"` to connect to real Ollama |

## Database Setup

```bash
# 1. Start PostgreSQL (Docker)
docker run -d \
  --name health-db \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16

# 2. Create database
docker exec -it health-db psql -U postgres -c \
  "CREATE DATABASE health_monitoring;"

# 3. Set the connection string
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/health_monitoring?schema=public"

# 4. Run migrations
cd backend
npx prisma migrate dev
```

## Ollama Setup

```bash
# 1. Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 2. Pull Gemma 4
ollama pull gemma4

# 3. Start Ollama (in a separate terminal)
ollama serve

# 4. Verify
curl http://localhost:11434/api/tags
# Should show gemma4 in the list
```

## Running the Backend

```bash
# Development mode (hot reload)
cd backend
npm run dev

# Production build
npm run build
npm start
```

The server binds to `http://0.0.0.0:3001`.

## Running Tests

```bash
cd backend

# Run all tests
npm test

# Run specific suite
npx vitest run src/validation/
npx vitest run src/ai/
```

## API Endpoints

### Health Check

```bash
curl http://localhost:3001/api/health
```

```json
{ "status": "ok", "timestamp": "2026-07-26T12:00:00.000Z" }
```

### Submit Health Data

```bash
curl -X POST http://localhost:3001/api/patient/health \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "patient-1",
    "sleep": 7.5,
    "mood": 4,
    "weight": 70.0,
    "symptoms": ["fatigue", "headache"]
  }'
```

```json
{
  "id": "uuid-here",
  "patientId": "patient-1",
  "sleepHours": 7.5,
  "weight": 70.0,
  "mood": 4,
  "symptoms": ["fatigue", "headache"],
  "recordedAt": "2026-07-26T12:00:00.000Z",
  "createdAt": "2026-07-26T12:00:00.000Z"
}
```

### Retrieve Health History

```bash
curl "http://localhost:3001/api/patient/health?patientId=patient-1"
```

### AI Chat

```bash
curl -X POST http://localhost:3001/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "patient-1",
    "message": "How has my sleep been lately?"
  }'
```

```json
{
  "response": "Based on your recent health data, I can see...",
  "model": "Gemma 4"
}
```

The AI chat endpoint automatically uses **simulate mode** when Ollama is not running. Set `OLLAMA_SIMULATE=false` to connect to a real Gemma 4 instance.

## Architecture

```
Patient
  │
  ▼
POST /api/patient/health  ──►  Validation  ──►  PostgreSQL
  │
  ▼
POST /api/ai/chat
  │
  ├── Context Builder (buildPatientContext)
  │     └── Summarizes sleep, mood, symptoms from health entries
  │
  └── Ollama Client (getChatCompletion)
        └── POST http://localhost:11434/api/chat → Gemma 4
```

## Project Structure

```
backend/
├── src/
│   ├── ai/
│   │   ├── index.ts              # Barrel export
│   │   ├── contextBuilder.ts     # Converts health entries → AI context
│   │   ├── contextBuilder.test.ts
│   │   ├── ollamaClient.ts       # Ollama/Gemma 4 HTTP client
│   │   └── ollamaClient.test.ts
│   ├── controllers/
│   │   ├── aiChatController.ts   # POST /api/ai/chat handler
│   │   └── healthDataController.ts
│   ├── db/
│   │   ├── index.ts
│   │   ├── prisma.ts             # Prisma Client singleton
│   │   └── checkConnection.ts
│   ├── routes/
│   │   ├── health.ts             # GET /api/health
│   │   ├── healthData.ts         # POST/GET /api/patient/health
│   │   └── aiChat.ts             # POST /api/ai/chat
│   ├── validation/
│   │   ├── index.ts
│   │   ├── healthEntry.ts        # Health data validation rules
│   │   └── healthEntry.test.ts
│   ├── app.ts                    # Express app
│   └── index.ts                  # Server entry
├── prisma/
│   ├── schema.prisma             # User + HealthEntry models
│   └── migrations/               # Database migrations
├── package.json
└── tsconfig.json
```

## Project Status — MVP Complete

| Component | Status |
|---|---|
| Health Data API (POST/GET) | ✅ Complete |
| Data Validation | ✅ Complete |
| AI Context Builder | ✅ Complete |
| Ollama/Gemma 4 Integration | ✅ Complete |
| AI Chat Endpoint | ✅ Complete |
| Tests | 38 passing |
| Database Migrations | ✅ Created (pending apply) |

## License

Private — Team project for health-ai-team/health-monitoring-app.
