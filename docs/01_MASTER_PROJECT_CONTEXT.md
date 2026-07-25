# AI Health Monitoring & Patient-Doctor Connection Platform
# Master Project Context

## 1. Purpose

This document is the high-level product source of truth.

It defines:

- Product vision
- Project goals
- User roles
- MVP scope
- Core health data
- Patient-doctor workflow
- Success criteria
- High-level project constraints

It does not define detailed:

- Software architecture
- API contracts
- Database implementation
- Team workflow
- Detailed AI behavior

Those responsibilities belong to:

- `02_ARCHITECTURE.md`
- `03_TEAM_WORKFLOW.md`
- `04_API_CONTRACTS.md`
- `05_DATABASE_SCHEMA.md`
- `06_AI_SPECIFICATION.md`

Operational collaboration rules are defined in:

- `07_INTEGRATION_RULES.md`
- `08_DECISION_LOG.md`
- `09_PROMPTING_GUIDE.md`

All contributors and AI coding agents should read this document before making significant project decisions.

---

## 2. Product Vision

We are building an AI-powered health-monitoring application that helps patients track their health over time and helps doctors understand meaningful changes in their patients' health patterns.

The application connects three main participants:

- Patients
- Doctors
- An AI health assistant powered by Gemma 4

The core idea is to transform fragmented daily health information into meaningful longitudinal context.

Patients may provide health information through:

- Daily health surveys
- Direct structured health-data entry
- Natural-language conversations with the AI assistant
- Future multimodal interactions where appropriate and validated

The system stores patient health information, daily survey responses, and AI chat conversations in a central database, subject to the application's privacy, authorization, consent, security, and retention policies.

When a patient provides health information through natural-language conversation, the AI may identify candidate structured health information. Any such information must be validated by backend application logic before it is persisted as structured health data.

The fact that all conversations are stored does not mean that all conversations are sent to Gemma 4 for every request. The AI context system retrieves only the authorized and relevant portions of stored history needed for the current task.

The AI assistant uses authorized, relevant historical context to provide personalized, non-diagnostic guidance.

Doctors can view authorized patient information primarily through:

- Charts
- Trends
- Summaries
- Alerts

The primary doctor-facing experience should emphasize meaningful trends and summaries rather than requiring doctors to manually interpret large amounts of raw data.

Underlying raw data may remain accessible where appropriate for review.

The application must prioritize:

- Patient safety
- Privacy
- Security
- Clear separation between AI assistance and medical decision-making
- Human oversight
- Data consistency
- Reliable integration between frontend, backend, database, AI, and alert systems

Detailed implementation principles are defined in the other project documents.

---

## 3. Project Goals

The project aims to:

- Help patients consistently record health information.
- Allow patients to interact naturally with an AI health assistant.
- Allow patients to provide health information through structured interfaces and natural-language conversation.
- Use recent and relevant historical information to make AI interactions context-aware.
- Help patients understand changes and patterns in their recorded health information.
- Help doctors understand patient trends through charts, summaries, and alerts.
- Connect patient-reported information with doctor-facing insights.
- Detect predefined dangerous thresholds through reliable deterministic system rules.
- Provide appropriate alerts to authorized recipients.
- Keep AI assistance separate from autonomous medical decision-making.
- Create a reliable shared data foundation supporting patient experiences, doctor dashboards, and AI context.

---

## 4. Primary Users

### 4.1 Patients

Patients can:

- Create and manage their account.
- Complete daily health surveys.
- Enter structured health data.
- Provide health information through natural-language AI conversations.
- Chat with the AI assistant.
- View their own health history.
- View trends over time.
- Ask questions about their own recorded health information.
- Receive personalized, non-diagnostic guidance.
- Review AI-generated summaries.
- Choose whether to share appropriate summaries with their doctor.
- Receive notifications when appropriate.

Patients must only be able to access their own data.

### 4.2 Doctors

Doctors can:

- Create and manage their account.
- Log in securely.
- View authorized patients.
- View patient health data.
- View charts and trends.
- View AI-generated summaries.
- Review relevant changes over time.
- Receive system-generated alerts based on predefined safety rules.
- Review patient-approved AI summaries and relevant health information.

The primary doctor-facing experience should prioritize:

- Charts
- Trends
- Meaningful changes over time
- Summaries
- Alerts

The system should not require doctors to manually interpret large amounts of raw health entries as the primary workflow.

Raw underlying data may remain available when appropriate for clinical review.

Doctors must only be able to access patients they are authorized to access.

### 4.3 Emergency Contacts

Emergency contacts may receive alerts when predefined system rules are triggered, subject to:

- Patient consent where required
- Appropriate authorization
- Configured emergency-contact information
- Configured alert policies
- Legal and regulatory requirements applicable to the intended deployment

When an approved dangerous-threshold rule is triggered and required authorization, consent, and configuration conditions are satisfied, the system should automatically initiate the configured notification process for the doctor and, where applicable, designated emergency contacts.

Emergency contacts should not automatically receive arbitrary AI-generated information or unrestricted access to patient health data.

---

## 5. MVP Scope

The initial MVP supports:

### Patient capabilities

- Account creation and management
- Daily health surveys
- Structured health data entry
- Natural-language health information entry through AI chat
- AI chat
- Health history
- Health trends
- Personalized, non-diagnostic AI guidance
- Review of AI-generated summaries

### Doctor capabilities

- Secure login
- Authorized patient list
- Patient health data
- Charts and trends
- Relevant AI-generated summaries
- System-generated alerts based on predefined deterministic rules

The doctor-facing dashboard should prioritize visualized trends, charts, and summaries over raw data presentation.

### System capabilities

- Centralized storage of health data
- Centralized storage of daily survey responses
- Centralized storage of AI chat conversations
- Validation of structured health data submitted directly by patients
- Validation of candidate structured health data extracted from patient conversations
- Relevant context retrieval for Gemma 4
- Context-aware AI responses
- Deterministic safety threshold evaluation
- Appropriate notifications
- Patient-doctor information sharing subject to authorization and consent

Detailed technical implementation is defined in the other project documents.

---

## 6. Core Health Data

The initial MVP supports:

- Sleep duration
- Weight
- Mood
- Symptoms
- Optional notes
- Daily survey responses
- Structured health data extracted from validated patient input
- AI conversation history

All patient survey responses and AI chat conversations are stored in the central database according to approved data-management policies.

The AI does not automatically receive all stored conversation history or all stored patient data.

Relevant information is selectively retrieved for each AI task.

Future versions may support:

- Heart rate
- Blood pressure
- Blood glucose
- Activity
- Medication adherence
- Other validated health metrics

Do not add additional health metrics unless explicitly approved as part of project scope.

The logical database representation is defined in `05_DATABASE_SCHEMA.md`.

---

## 7. Patient-Doctor Workflow

The core workflow is:

Patient records health information
↓
Patient completes daily survey, enters structured data, and/or chats with AI
↓
Survey responses and AI conversations are stored in central database
↓
If health information is provided through natural-language chat, candidate structured data may be identified
↓
Backend validates candidate structured health data
↓
Validated structured data is persisted where appropriate
↓
Relevant context is retrieved for AI when needed
↓
Gemma 4 uses authorized relevant context
↓
Patient receives personalized, non-diagnostic guidance
↓
Health information is transformed into trends and summaries
↓
Doctor views authorized information primarily through charts and trends
↓
Deterministic safety rules evaluate predefined approved thresholds
↓
Appropriate alerts are generated when rules are triggered
↓
Authorized recipients are automatically notified according to configured policies

Detailed technical data flows are defined in `02_ARCHITECTURE.md`.

AI behavior is defined in `06_AI_SPECIFICATION.md`.

APIs are defined in `04_API_CONTRACTS.md`.

---

## 8. Patient-Doctor Information Bridge

One of the main product goals is to connect patient experiences with doctor-facing insights.

Example:

Patient conversations and surveys
↓
Central database
↓
Relevant context retrieval
↓
Gemma 4
↓
AI-generated summary
↓
Patient reviews where required
↓
Patient approves sharing where required
↓
Doctor can view authorized summary

Patient consent and authorization must be respected.

Detailed AI summary behavior is defined in `06_AI_SPECIFICATION.md`.

---

## 9. Gemma 4 at a High Level

Gemma 4 is the primary AI model used by the application.

The product uses Gemma 4 as the AI health assistant that:

- Interacts with patients.
- Understands natural-language health information.
- Supports context-aware interpretation.
- Helps identify candidate structured health information from conversations.
- Supports summarization.
- Provides personalized, non-diagnostic guidance.

Gemma 4 does not independently:

- Write directly to the database.
- Make medical diagnoses.
- Make autonomous medical decisions.
- Determine that a safety threshold has been crossed.
- Trigger critical emergency alerts.

Detailed Gemma 4 responsibilities and behavior are defined exclusively in `06_AI_SPECIFICATION.md`.

---

## 10. High-Level Safety Constraints

The AI assistant is not a doctor and is not intended to replace doctors.

The application must maintain clear separation between:

- AI assistance
- Medical decision-making
- Deterministic safety rules
- Human professional oversight

Critical safety alerts must be generated by predefined deterministic backend rules rather than free-form AI judgment.

Exact medical thresholds and alert rules must be explicitly defined and approved by the project team before implementation.

Gemma 4, Freebuff, or any AI coding agent must not invent medical safety thresholds.

---

## 11. Project Success Criteria

The MVP is successful when a patient can:

- Create an account.
- Enter daily health information through a survey or structured input.
- Provide health information through AI chat.
- Chat with the AI assistant.
- Receive context-aware, non-diagnostic guidance.
- View their health history.

The MVP is successful when a doctor can:

- Log in securely.
- View authorized patients.
- See health trends through charts and visualizations.
- View relevant summaries.
- Receive alerts generated by deterministic safety rules.

The MVP is successful when the system can:

- Store health data securely.
- Store daily survey responses securely.
- Store AI chat conversations securely.
- Validate structured health information before persistence.
- Retrieve relevant context.
- Provide appropriate context to Gemma 4.
- Generate useful AI responses.
- Keep AI behavior separate from deterministic safety logic.
- Maintain consistent integration across frontend, backend, database, AI, and alert systems.

---

## 12. High-Level Project Constraints

The project must prioritize:

- Patient safety
- Privacy
- Security
- Authorization
- Consent
- Data minimization
- Human oversight
- Clear separation between AI assistance and medical decision-making
- Reliable data flow
- Consistent integration
- Maintainable documentation

The application must not be treated as production-ready or compliant with any specific healthcare regulation unless those requirements have been separately reviewed and verified for the intended deployment jurisdiction.
