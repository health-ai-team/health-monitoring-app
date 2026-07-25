# 00_QUICK_START.md

# Health Monitoring AI App — Quick Start

## 1. Purpose

This document is the short entry point for the project.

It gives team members and AI coding agents a quick understanding of:

* What we are building
* What the MVP must accomplish
* Where project requirements are documented
* Which document to read for a specific task
* How the three-person team works together
* How changes are made safely
* How Freebuff workspaces should be used

This document is intentionally shorter than the six detailed project documents.

The six detailed documents remain the authoritative source of truth for their respective areas.

---

# 2. What We Are Building

We are building a health-monitoring application that connects patients and doctors through an AI assistant.

Patients can record daily health information such as:

* Sleep
* Weight
* Mood
* Symptoms

Patients can provide this information through:

1. A quick daily survey
2. A conversation with the AI assistant

The AI assistant uses the patient's recent health history and available context to provide personalized daily guidance.

For example, if a patient's sleep has been low for several consecutive nights, the AI may suggest that the patient consider mentioning this pattern to their doctor.

Doctors can log in and view their patients' health information through charts and trends rather than having to interpret raw numbers manually.

If a patient's data crosses a dangerous or predefined threshold, the system can automatically generate alerts for:

* The patient's doctor
* The patient's emergency contacts

Survey responses and relevant AI chat conversations are stored in the central application database.

This central data supports:

* Patient history
* Doctor dashboards
* Charts and trends
* Health monitoring
* AI context and personalization
* Alert evaluation

The application is designed as a health-monitoring and communication support system.

It is not intended to replace professional medical diagnosis or emergency medical services.

---

# 3. MVP Goal

The MVP should demonstrate the complete core workflow:

```text
Patient
   │
   ├── Completes daily survey
   │
   └── Chats with AI assistant
          │
          ▼
      Central Database
          │
          ├──────────────► AI Context
          │                    │
          │                    ▼
          │             Personalized Guidance
          │
          ├──────────────► Doctor Dashboard
          │                    │
          │                    ▼
          │             Charts and Trends
          │
          └──────────────► Alert Evaluation
                               │
                               ▼
                    Doctor + Emergency Contacts
```

The MVP should prioritize the core end-to-end workflow over unnecessary complexity.

---

# 4. The Seven Documentation Files

## 00_QUICK_START.md

The entry point for the project.

Contains:

* High-level project explanation
* MVP overview
* Documentation map
* Team coordination rules
* Quick guidance for Freebuff

This document should remain concise.

---

## 01_MASTER_PROJECT_CONTEXT.md

The authoritative source for the product itself.

Read this when working on:

* Product requirements
* User roles
* MVP scope
* Health data
* Patient workflows
* Doctor workflows
* Overall goals
* Success criteria
* High-level constraints

This document answers:

> "What are we building and why?"

---

## 02_ARCHITECTURE.md

The authoritative source for the technical architecture.

Read this when working on:

* System structure
* Component interactions
* Data flow
* AI orchestration
* Context building
* Alert architecture
* Security architecture
* Technology decisions

This document answers:

> "How is the system structured?"

---

## 03_TEAM_WORKFLOW.md

The authoritative source for collaboration and ownership.

Read this when working on:

* Team responsibilities
* Workstreams
* Branches
* GitHub workflow
* Review process
* Integration
* Definition of Done
* Ownership rules

This document answers:

> "How do the three team members work together without interfering?"

---

## 04_API_CONTRACTS.md

The authoritative source for communication between application components.

Read this when working on:

* REST endpoints
* Authentication requirements
* Request formats
* Response formats
* AI service interfaces
* Error handling
* API versioning
* API change rules

This document answers:

> "How do the different parts of the application communicate?"

---

## 05_DATABASE_SCHEMA.md

The authoritative source for the logical data model.

Read this when working on:

* Database entities
* Relationships
* Constraints
* Data ownership
* Access rules
* Data persistence
* Migration policy

This document answers:

> "How is application data organized and protected?"

---

## 06_AI_SPECIFICATION.md

The authoritative source for AI behavior.

Read this when working on:

* Gemma 4
* AI responsibilities
* Prompt philosophy
* Context retrieval
* Function calling
* AI safety
* Response generation
* AI limitations
* Patient guidance
* Doctor summaries

This document answers:

> "How should the AI behave?"

---

# 5. Source-of-Truth Rule

Each topic has one authoritative document.

Do not duplicate detailed requirements across multiple documents.

Use references instead.

For example:

* Database rules belong in `05_DATABASE_SCHEMA.md`.
* AI behavior belongs in `06_AI_SPECIFICATION.md`.
* API contracts belong in `04_API_CONTRACTS.md`.
* System architecture belongs in `02_ARCHITECTURE.md`.

If another document needs to refer to that information, reference the authoritative document instead of copying the entire section.

This prevents contradictions.

---

# 6. What Freebuff Should Do Before Starting a Task

Before making changes, Freebuff should:

1. Read `00_QUICK_START.md`.
2. Identify the task's workstream.
3. Read the relevant authoritative documentation.
4. Inspect the existing code before modifying it.
5. Check the current Git branch.
6. Determine which files are within the assigned workstream.
7. Avoid modifying another team's workstream unless explicitly instructed.
8. Preserve existing functionality.
9. Follow the API and database contracts.
10. Follow the AI specification for all AI-related behavior.

Freebuff should not blindly rewrite existing code.

It should first understand the current implementation and make the smallest safe change required by the task.

---

# 7. Team Ownership

The team should divide work into clearly separated workstreams.

The exact ownership assignments are defined in:

`03_TEAM_WORKFLOW.md`

The general principle is:

> One person owns a workstream, while the whole team owns the quality of the final product.

Team members should not directly modify another person's workstream without coordination.

If a change crosses workstream boundaries, the affected team member should be informed before the change is made.

---

# 8. Working With Freebuff

Each team member may use their own Freebuff workspace for their assigned work.

However, all workspaces must remain connected to the same shared GitHub repository.

The GitHub repository is the shared source of truth for:

* Application code
* Documentation
* Branches
* Integrated work

Freebuff workspaces are working environments.

They are not separate versions of the project.

---

# 9. Before Starting Work

Every team member should know:

1. What task they are responsible for.
2. Which workstream owns that task.
3. Which files they are allowed to modify.
4. Which documentation applies.
5. Which branch they are working on.
6. Whether another team member's work is affected.

If any of these are unclear, stop and clarify before making changes.

---

# 10. Safe Prompting Principle

Prompts should be specific and scoped.

A good task prompt should identify:

* The task
* The relevant documentation
* The files or area to modify
* What must not be changed
* The expected result

Example:

> Read `00_QUICK_START.md`, `01_MASTER_PROJECT_CONTEXT.md`, `02_ARCHITECTURE.md`, and the relevant API contracts before making changes.
>
> I am working only on the patient daily health survey workflow.
>
> Implement the assigned survey functionality without modifying the doctor dashboard, AI behavior, database schema, or another team's workstream unless the change is strictly required.
>
> First inspect the existing implementation. Explain which files you plan to change and why. Then implement the smallest safe change.
>
> Do not rewrite unrelated code.

---

# 11. Cross-Workstream Changes

Some features naturally cross multiple parts of the system.

Examples include:

* A new health data field
* A change to an API endpoint
* A change to AI context
* A change to alert thresholds
* A change to the database schema

When a task affects multiple workstreams:

1. Identify all affected documents.
2. Identify all affected team members.
3. Agree on the change before implementation.
4. Update the authoritative documentation if necessary.
5. Update the relevant code.
6. Test the integration.
7. Review the change together.

Do not allow multiple Freebuff workspaces to independently invent different versions of the same contract.

---

# 12. Integration Principle

The application should be integrated through shared contracts.

The most important shared contracts are:

* API contracts
* Database schema
* AI interfaces
* Authentication behavior
* Data ownership rules

When integrating work, the team should verify that each component follows the agreed contracts.

Integration should not be based on assumptions.

---

# 13. Documentation Change Rule

If implementation changes an established requirement, contract, architecture decision, or data structure, the corresponding documentation must be reviewed.

The authoritative document should be updated when appropriate.

Do not silently change the code while leaving the documentation describing the old behavior.

---

# 14. AI Safety Principle

The AI assistant is a health-monitoring support tool.

It must not be treated as a replacement for professional medical care.

AI-generated guidance must follow the safety requirements defined in:

`06_AI_SPECIFICATION.md`

The AI must not invent medical facts, patient data, diagnoses, measurements, or clinical actions.

When the AI lacks sufficient information, it should acknowledge uncertainty rather than fabricate an answer.

---

# 15. Important Rule for the Team

The team should optimize for:

> Clear ownership + shared contracts + small changes + frequent integration.

Do not optimize for:

> Each person building a completely separate version of the application.

The goal is one shared application built by three coordinated workstreams.

---

# 16. Final Documentation Rule

When in doubt:

* Product question → `01_MASTER_PROJECT_CONTEXT.md`
* Architecture question → `02_ARCHITECTURE.md`
* Team question → `03_TEAM_WORKFLOW.md`
* API question → `04_API_CONTRACTS.md`
* Database question → `05_DATABASE_SCHEMA.md`
* AI question → `06_AI_SPECIFICATION.md`

If two documents appear to conflict, the team must resolve the conflict before continuing implementation.

Do not let Freebuff choose between conflicting requirements automatically.

---

# 17. Project Documentation Hierarchy

The documentation hierarchy is:

```text
00_QUICK_START.md
        │
        ▼
01_MASTER_PROJECT_CONTEXT.md
        │
        ├── 02_ARCHITECTURE.md
        │       ├── 04_API_CONTRACTS.md
        │       └── 05_DATABASE_SCHEMA.md
        │
        └── 06_AI_SPECIFICATION.md

03_TEAM_WORKFLOW.md
        │
        └── Governs how the team works with all documents
```

The documents should reference one another where necessary.

No document should silently redefine another document's area of responsibility.

---

# 18. MVP Mindset

The team should focus on delivering a coherent working MVP.

Avoid adding unnecessary functionality simply because it is technically possible.

Every implementation decision should be evaluated against:

* Does it support the MVP?
* Does it follow the documented architecture?
* Does it preserve patient and doctor workflows?
* Does it maintain data consistency?
* Does it respect AI safety requirements?
* Does it avoid unnecessary complexity?

The objective is a reliable, understandable MVP that demonstrates the complete patient → data → AI → doctor → alert workflow.
