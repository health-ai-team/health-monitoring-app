# System Architecture

## 1. Purpose of This Document

This document defines the technical architecture of the application.

It covers:

* Overall system architecture
* Component interactions
* Data flow
* AI orchestration
* Context-builder architecture
* Alert architecture
* Security architecture
* Technology decisions

Product scope and goals are defined in `01_MASTER_PROJECT_CONTEXT.md`.

Team development processes are defined in `03_TEAM_WORKFLOW.md`.

API interfaces are defined in `04_API_CONTRACTS.md`.

Database structure is defined in `05_DATABASE_SCHEMA.md`.

Detailed AI behavior is defined in `06_AI_SPECIFICATION.md`.

---

# 2. Overall Architecture

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
┌──────┴─────────────────┐
↓                        ↓
Database              AI Orchestration
↓
Context Builder
↓
Gemma 4

Backend
↓
Safety / Alert Engine
↓
Notifications

The database is the central persistent source for health information, survey responses, AI conversations, and other application records.

Gemma 4 does not directly access the database.

The backend controls all data retrieval, validation, authorization, persistence, and AI interaction.

The detailed responsibilities of Gemma 4 are defined in `06_AI_SPECIFICATION.md`.

---

# 3. Presentation Layer

The frontend provides interfaces for patients and doctors.

## Patient interfaces

* Registration
* Login
* Dashboard
* Daily health survey
* Structured health data entry
* AI chat
* Health history
* Trends
* AI summaries
* Notifications

## Doctor interfaces

* Login
* Patient list
* Patient profile
* Health charts
* Trends
* AI-generated summaries
* Alerts

The doctor-facing experience should prioritize:

* Charts
* Trends
* Meaningful changes over time
* Summaries
* Alerts

The frontend may display underlying raw data where appropriate, but the primary doctor workflow should not depend on manually interpreting large amounts of raw health entries.

The frontend must never directly access protected database credentials.

The frontend communicates with the backend through approved APIs defined in `04_API_CONTRACTS.md`.

---

# 4. Backend Layer

The backend is responsible for:

* Authentication
* Authorization
* API endpoints
* Business logic
* Data validation
* Patient permissions
* Doctor permissions
* AI orchestration
* AI-extracted health-data validation
* Data persistence
* Alert processing
* Notifications

The backend is the primary control layer of the application.

The backend must validate both:

1. Structured health data submitted directly by the patient.
2. Candidate structured health data identified from natural-language AI conversations.

Gemma 4 may identify candidate information, but the backend must control whether that information is valid and may be persisted as structured health data.

The API contracts are defined in `04_API_CONTRACTS.md`.

---

# 5. Database Layer

The database stores the application's persistent data, including:

* Users
* Patient profiles
* Doctor profiles
* Doctor-patient relationships
* Emergency contacts
* Health entries
* Survey responses
* Symptoms
* AI conversations
* AI messages
* AI-generated summaries
* Alerts
* Notifications
* Consent records
* Audit records where required

All patient survey responses and AI chat conversations are stored in the central database according to application privacy, security, authorization, consent, and retention policies.

Storage and retrieval are separate concepts:

* The system stores the conversation history.
* The AI context builder retrieves only relevant authorized portions of that history for a specific AI task.

The detailed logical schema is defined in `05_DATABASE_SCHEMA.md`.

The database must enforce appropriate access controls.

No AI agent should directly access the database without going through authorized backend logic.

---

# 6. AI Orchestration Layer

The AI orchestration layer prepares safe and relevant information for Gemma 4 and manages the interaction between the application and the model.

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
send it through backend validation
↓
Persist validated structured data where appropriate
↓
Store conversation and messages
↓
Return response to user

Detailed AI behavior is defined in `06_AI_SPECIFICATION.md`.

AI-facing interfaces and tool contracts are defined in `04_API_CONTRACTS.md`.

---

# 7. Context Builder Architecture

The context builder is a system component that prepares relevant information for AI processing.

The application should not blindly send the entire patient history to Gemma 4.

The context builder selects information relevant to the current task from the central database.

For example, if a patient asks:

"Why have I been feeling so tired lately?"

The system may retrieve:

* Recent sleep history
* Recent mood
* Recent symptoms
* Recent weight changes
* Relevant previous conversations

The context builder should not automatically retrieve unrelated data.

The context builder must respect authentication and authorization.

The context builder must distinguish between:

* Data stored in the database
* Data retrieved for a specific AI task
* Data actually included in the prompt sent to Gemma 4

Only relevant authorized context should be provided to Gemma 4.

Detailed context retrieval rules and AI context philosophy are defined in `06_AI_SPECIFICATION.md`.

---

# 8. Function-Calling Architecture

Gemma 4 may request controlled application tools.

High-level interaction:

Gemma 4
↓
Requests approved tool
↓
Backend receives tool request
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

The detailed behavior of AI tool use is defined in `06_AI_SPECIFICATION.md`.

The technical interfaces for the tools are defined in `04_API_CONTRACTS.md`.

---

# 9. Critical Safety Architecture

The system must distinguish between:

## AI Layer

Used for:

* Interpretation
* Summarization
* Pattern explanation
* Natural-language communication
* Candidate information extraction from patient messages

## Deterministic Safety Layer

Used for:

* Threshold checks
* Safety rules
* Alert creation
* Notification triggers

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

The exact threshold values and safety rules must be explicitly approved before implementation.

Neither Gemma 4 nor Freebuff may invent or independently define medical safety thresholds.

Gemma 4 may explain a detected change but does not independently control the alert.

Detailed AI safety limitations are defined in `06_AI_SPECIFICATION.md`.

---

# 10. Data Flow — Patient Survey

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

The complete survey response is stored in the database.

Relevant structured health information may also be represented in health-data entities according to the database schema.

---

# 11. Data Flow — AI Chat

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

The complete AI conversation is stored in the central database.

The entire conversation is not automatically sent back to Gemma 4 on every request.

Only relevant authorized context is retrieved and provided for the current task.

---

# 12. Data Flow — Doctor Dashboard

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

The doctor dashboard should prioritize meaningful trends and summaries over raw data presentation.

The underlying health records remain available to authorized backend processes and may be presented where appropriate.

---

# 13. Data Flow — Alert

Validated Health Data
↓
Backend
↓
Deterministic Safety Rules
↓
Approved Threshold Crossed?
/ 
No   Yes
|     |
End   Create Alert
↓
Determine Authorized Recipients
↓
Notify Doctor
↓
Notify Emergency Contacts if
configured and authorized
↓
Log Event

Alerts must be generated from predefined deterministic rules.

Gemma 4 may explain or summarize the event but must not independently trigger the critical alert.

---

# 14. Security Architecture

The system must enforce security through multiple layers.

## Authentication

Users must be authenticated before accessing protected functionality.

## Authorization

The backend must verify that the user is authorized to access the requested resource.

## Data Access

Patients may access their own data.

Doctors may access only authorized patients.

Emergency contacts may receive only approved notifications.

AI systems receive only authorized context through backend-controlled mechanisms.

## Database Security

Protected database credentials must never be exposed to the frontend.

AI agents must not directly access protected database systems.

## Data Minimization

Only necessary data should be exposed to each component.

The AI context builder should retrieve only relevant information.

Detailed database access rules are defined in `05_DATABASE_SCHEMA.md`.

Detailed AI context minimization rules are defined in `06_AI_SPECIFICATION.md`.

---

# 15. Architecture Rules

1. The frontend never directly accesses protected database credentials.
2. AI never directly accesses the database.
3. AI never independently triggers emergency actions.
4. AI never independently decides that a medical safety threshold has been crossed.
5. All protected data access goes through authorization.
6. Critical alerts are controlled by deterministic backend logic.
7. Patient consent must be respected.
8. API contracts must be documented.
9. Database schema changes must be documented.
10. Major architecture changes must be reviewed.
11. Technology decisions must remain consistent across workstreams.
12. Workstream-specific development rules are defined in `03_TEAM_WORKFLOW.md`.

---

# 16. Technology Decisions

The exact technology stack must be documented here before implementation begins.

The team must explicitly decide:

* Frontend framework
* Backend framework
* Programming language
* Database
* Authentication provider
* Hosting platform
* Gemma 4 access method
* File storage
* Notification service
* Monitoring / logging

Once approved, these choices become the project standard.

Freebuff must not replace an approved technology with another technology without explicit approval.

Technology decisions that affect APIs, database structures, or AI integration must be coordinated according to `03_TEAM_WORKFLOW.md`.
