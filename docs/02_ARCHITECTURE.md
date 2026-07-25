# System Architecture

## 1. Purpose

This document defines the technical architecture of the application.

It covers:

- Overall system architecture
- Component interactions
- Data flow
- AI orchestration
- Context-builder architecture
- Alert architecture
- Security architecture
- Technology decisions

Product scope is defined in `01_MASTER_PROJECT_CONTEXT.md`.

Team processes are defined in `03_TEAM_WORKFLOW.md`.

API interfaces are defined in `04_API_CONTRACTS.md`.

Database structure is defined in `05_DATABASE_SCHEMA.md`.

AI behavior is defined in `06_AI_SPECIFICATION.md`.

Cross-workstream integration is defined in `07_INTEGRATION_RULES.md`.

---

## 2. Overall Architecture

The application consists of six primary layers:

1. Presentation Layer
2. Application / Backend Layer
3. Data Layer
4. AI Orchestration Layer
5. Safety and Alert Layer
6. External Services Layer

High-level architecture:

Patient / Doctor
↓
Frontend
↓
Backend / API
↓
Authentication + Authorization
↓
Application Services
↓
┌───────────────────────┐
↓                       ↓
Database          AI Orchestration
                        ↓
                  Context Builder
                        ↓
                     Gemma 4
                        ↓
                    Backend
                        ↓
                Safety / Alert Engine
                        ↓
                   Notifications

The database is the central persistent source for health information, survey responses, AI conversations, and other application records.

Gemma 4 does not directly access the database.

The backend controls:

- Data retrieval
- Validation
- Authorization
- Persistence
- AI interaction

Detailed AI behavior is defined in `06_AI_SPECIFICATION.md`.

---

## 3. Presentation Layer

The frontend provides interfaces for patients and doctors.

### Patient interfaces

- Registration
- Login
- Dashboard
- Daily health survey
- Structured health data entry
- AI chat
- Health history
- Trends
- AI summaries
- Notifications

### Doctor interfaces

- Login
- Patient list
- Patient profile
- Health charts
- Trends
- AI-generated summaries
- Alerts

The doctor-facing experience should prioritize:

- Charts
- Trends
- Meaningful changes over time
- Summaries
- Alerts

The frontend may display raw data where appropriate, but the primary doctor workflow should not depend on manually interpreting large amounts of raw entries.

The frontend must never directly access protected database credentials.

The frontend communicates with the backend through approved APIs defined in `04_API_CONTRACTS.md`.

---

## 4. Backend Layer

The backend is responsible for:

- Authentication
- Authorization
- API endpoints
- Business logic
- Data validation
- Patient permissions
- Doctor permissions
- AI orchestration
- AI-extracted health-data validation
- Data persistence
- Alert processing
- Notifications

The backend is the primary control layer.

The backend must validate:

- Structured health data submitted directly by patients.
- Candidate structured health data identified from natural-language AI conversations.

Gemma 4 may identify candidate information, but the backend controls whether it is valid and may be persisted.

API contracts are defined in `04_API_CONTRACTS.md`.

---

## 5. Database Layer

The database stores persistent data including:

- Users
- Patient profiles
- Doctor profiles
- Doctor-patient relationships
- Emergency contacts
- Health entries
- Survey responses
- Symptoms
- AI conversations
- AI messages
- AI-generated summaries
- Alerts
- Notifications
- Consent records
- Audit records where required

Survey responses and AI chat conversations are stored according to approved privacy, security, authorization, consent, and retention policies.

Storage and retrieval are separate concepts.

The system stores conversation history.

The AI context builder retrieves only relevant authorized portions for a specific task.

The detailed logical schema is defined in `05_DATABASE_SCHEMA.md`.

The database must enforce appropriate access controls.

No AI agent should directly access the database without authorized backend logic.

---

## 6. AI Orchestration Layer

The AI orchestration layer prepares safe and relevant information for Gemma 4.

High-level flow:

User message
↓
Backend receives message
↓
Authentication check
↓
Authorization check
↓
Intent / task identification
↓
Retrieve relevant health context
↓
Build AI context
↓
Call Gemma 4
↓
Handle approved tool calls if required
↓
Validate AI response
↓
If candidate health data is identified,
send through backend validation
↓
Persist validated structured data where appropriate
↓
Store conversation and messages
↓
Return response

Detailed AI behavior is defined in `06_AI_SPECIFICATION.md`.

AI-facing interfaces are defined in `04_API_CONTRACTS.md`.

---

## 7. Context Builder Architecture

The context builder prepares relevant information for AI processing.

The application should not blindly send the entire patient history to Gemma 4.

The context builder selects information relevant to the current task from the central database.

Example:

Patient asks:

"Why have I been feeling so tired lately?"

The system may retrieve:

- Recent sleep history
- Recent mood
- Recent symptoms
- Recent weight changes
- Relevant previous conversations

The context builder should not automatically retrieve unrelated data.

The context builder must respect authentication and authorization.

It must distinguish between:

- Data stored in the database
- Data retrieved for a specific AI task
- Data included in the prompt sent to Gemma 4

Only relevant authorized context should be provided to Gemma 4.

Detailed context retrieval rules are defined in `06_AI_SPECIFICATION.md`.

---

## 8. Function-Calling Architecture

Gemma 4 may request controlled application tools.

High-level interaction:

Gemma 4
↓
Requests approved tool
↓
Backend receives request
↓
Backend verifies authorization
↓
Backend executes approved tool
↓
Authorized data returned
↓
Result provided to Gemma 4
↓
Gemma 4 generates response

For health information provided through natural-language conversation:

Gemma 4
↓
Identifies candidate health information
↓
Backend receives candidate structured data
↓
Backend validates data
↓
Backend persists validated data if appropriate
↓
System continues normal workflow

The AI model does not directly access protected systems.

The AI model does not directly write to the database.

Detailed AI tool behavior is defined in `06_AI_SPECIFICATION.md`.

Technical interfaces are defined in `04_API_CONTRACTS.md`.

---

## 9. Critical Safety Architecture

The system distinguishes between:

### AI Layer

Used for:

- Interpretation
- Summarization
- Pattern explanation
- Natural-language communication
- Candidate information extraction

### Deterministic Safety Layer

Used for:

- Threshold checks
- Safety rules
- Alert creation
- Notification triggers

Example:

Validated health data
↓
Backend safety rule evaluates
↓
Approved threshold crossed
↓
Alert created
↓
Notification process begins
↓
Doctor notified
↓
Emergency contacts notified when authorized and configured

Exact thresholds must be explicitly approved before implementation.

Gemma 4 and Freebuff must not invent or independently define medical safety thresholds.

Gemma 4 may explain a detected change but does not independently control the alert.

---

## 10. Data Flow — Patient Survey

Patient
↓
Frontend Survey
↓
Backend API
↓
Authentication + Authorization
↓
Validation
↓
Database
↓
Trend Calculation
↓
Safety Rule Evaluation
↓
Alert if applicable

The complete survey response is stored.

Relevant structured health information may also be represented in health-data entities according to the database schema.

---

## 11. Data Flow — AI Chat

Patient
↓
AI Chat UI
↓
Backend
↓
Authentication
↓
Authorization
↓
Store incoming message
↓
Context Builder
↓
Relevant Data Retrieval
↓
Gemma 4
↓
Response Validation
↓
Candidate Health Data Identified?
↓
If yes → Backend Validation
↓
Persist Validated Structured Data
↓
Store AI Response
↓
Patient

The complete AI conversation is stored.

The entire conversation is not automatically sent to Gemma 4 on every request.

Only relevant authorized context is retrieved and provided.

---

## 12. Data Flow — Doctor Dashboard

Doctor
↓
Doctor Dashboard
↓
Backend
↓
Authorization
↓
Patient Data Retrieval
↓
Trend / Aggregation Layer
↓
Charts + Summaries
↓
Doctor

The dashboard prioritizes meaningful trends and summaries over raw data presentation.

Underlying records remain available to authorized backend processes.

---

## 13. Data Flow — Alert

Validated Health Data
↓
Backend
↓
Deterministic Safety Rules
↓
Approved Threshold Crossed?
↓
No → End
Yes
↓
Create Alert
↓
Determine Authorized Recipients
↓
Notify Doctor
↓
Notify Emergency Contacts if configured and authorized
↓
Log Event

Alerts must originate from predefined deterministic rules.

Gemma 4 may explain or summarize the event but must not independently trigger critical alerts.

---

## 14. Security Architecture

### Authentication

Users must be authenticated before accessing protected functionality.

### Authorization

The backend must verify that the user is authorized to access the requested resource.

### Data Access

Patients may access their own data.

Doctors may access only authorized patients.

Emergency contacts may receive only approved notifications.

AI systems receive only authorized context through backend-controlled mechanisms.

### Database Security

Protected database credentials must never be exposed to the frontend.

AI agents must not directly access protected database systems.

### Data Minimization

Only necessary data should be exposed to each component.

The AI context builder should retrieve only relevant information.

Detailed database access rules are defined in `05_DATABASE_SCHEMA.md`.

Detailed AI context rules are defined in `06_AI_SPECIFICATION.md`.

---

## 15. Architecture Rules

- The frontend never directly accesses protected database credentials.
- AI never directly accesses the database.
- AI never independently triggers emergency actions.
- AI never independently decides that a medical safety threshold has been crossed.
- All protected data access goes through authorization.
- Critical alerts are controlled by deterministic backend logic.
- Patient consent must be respected.
- API contracts must be documented.
- Database schema changes must be documented.
- Major architecture changes must be reviewed.
- Technology decisions must remain consistent across workstreams.

Workstream-specific rules are defined in `03_TEAM_WORKFLOW.md`.

---

## 16. Technology Decisions

The exact technology stack must be documented here before implementation begins.

The team must explicitly decide:

- Frontend framework
- Backend framework
- Programming language
- Database
- Authentication provider
- Hosting platform
- Gemma 4 access method
- File storage
- Notification service
- Monitoring / logging

Once approved, these choices become project standards.

Freebuff must not replace an approved technology without explicit approval.

Technology decisions affecting APIs, database structures, or AI integration must be coordinated through `07_INTEGRATION_RULES.md`.
