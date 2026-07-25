# API Contracts

## 1. Purpose

This document defines communication contracts between:

- Frontend
- Backend
- AI-related application services

It covers:

- REST endpoints
- Authentication requirements
- Request/response contracts
- AI tool interfaces
- API versioning
- Error handling
- API change policy

System architecture is defined in `02_ARCHITECTURE.md`.

Database structures are defined in `05_DATABASE_SCHEMA.md`.

AI behavior is defined in `06_AI_SPECIFICATION.md`.

Cross-workstream processes are defined in `03_TEAM_WORKFLOW.md` and `07_INTEGRATION_RULES.md`.

---

## 2. Authentication Requirements

All protected endpoints require authenticated users.

The backend must verify:

- User identity
- User role
- User permissions
- Resource ownership or authorization

Possible roles:

- PATIENT
- DOCTOR
- ADMIN

Role definitions must be finalized before implementation.

Authentication implementation decisions belong in `02_ARCHITECTURE.md`.

---

## 3. Patient Health Data

### GET `/api/patients/me/health`

Purpose:

Retrieve the authenticated patient's own health history.

Expected data may include:

- Sleep
- Weight
- Mood
- Symptoms
- Survey responses
- Dates

Authorization:

Only the authenticated patient may access their own data.

### POST `/api/patients/me/health`

Purpose:

Create a new structured health entry.

Possible input:

```json
{
  "sleepHours": 6.5,
  "weight": 68.2,
  "mood": 3,
  "symptoms": [
    "fatigue"
  ],
  "notes": "Felt tired today"
}
