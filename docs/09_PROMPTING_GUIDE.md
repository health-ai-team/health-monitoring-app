# Freebuff Team Prompting Guide

## 1. Purpose

This document defines how team members should prompt Freebuff so that three AI coding workspaces can collaborate without conflicting with one another.

The goal is:

- Clear ownership
- Minimal conflicts
- Consistent architecture
- Small, controlled changes
- Predictable integration
- Shared understanding
- No duplicated implementations

---

## 2. The Golden Prompt Structure

Every significant prompt should contain:

1. Role
2. Context
3. Task
4. Ownership
5. Constraints
6. Files allowed to modify
7. Files that must not be modified
8. Dependencies
9. Expected output
10. Testing requirement

---

## 3. Start With Inspection

For a new task, first ask Freebuff to inspect.

Example:

You are working in the AI / Gemma 4 workstream.

Before changing any code:

1. Read:
   - 01_MASTER_PROJECT_CONTEXT.md
   - 02_ARCHITECTURE.md
   - 03_TEAM_WORKFLOW.md
   - 04_API_CONTRACTS.md
   - 06_AI_SPECIFICATION.md
   - 07_INTEGRATION_RULES.md
   - 08_DECISION_LOG.md

2. Inspect the existing AI-related code.

3. Identify:
   - Current AI integration
   - Existing APIs
   - Existing context retrieval
   - Existing database dependencies
   - Existing frontend dependencies
   - Potential conflicts

4. Do not modify code yet.

5. Report:
   - What currently exists
   - What files are relevant
   - What files you expect to modify
   - What other workstreams are affected
   - Whether an integration request is required

Wait for approval before implementation.

---

## 4. Planning Prompt

After inspection:

Based on your inspection, create an implementation plan for the requested task.

The plan must include:

- Files to create
- Files to modify
- Files that must not be modified
- APIs required
- Database dependencies
- AI dependencies
- Frontend dependencies
- Security implications
- Testing plan
- Integration requirements

Do not implement yet.

---

## 5. AI Workstream Prompt

Example:

You are working exclusively on the AI / Gemma 4 workstream.

Your task is to implement the patient AI chat orchestration.

You may modify only:

- ai/
- lib/ai/
- AI-specific tests
- AI configuration files

Do not modify:

- Database schema
- Authentication architecture
- Authorization architecture
- Alert thresholds
- Emergency notification logic
- Frontend UI

Use the existing approved APIs and database interfaces.

If the current APIs are insufficient, do not invent or silently modify backend APIs.

Instead, identify the required API contract and report it as an integration requirement.

The AI must:

- Use Gemma 4.
- Retrieve only authorized relevant context.
- Never directly access the database.
- Never directly write structured health data.
- Treat extracted health data as candidate data.
- Never independently trigger critical safety alerts.

First inspect the current implementation and propose a plan.

---

## 6. Frontend Workstream Prompt

Example:

You are working exclusively on the Frontend workstream.

Your task is to implement the patient health dashboard.

You may modify only:

- frontend/
- components/
- pages/
- UI-specific tests

Do not modify:

- Database schema
- Backend architecture
- AI model configuration
- Alert logic
- Authentication architecture

Use the existing approved API contracts.

If required data is not available through the current API:

1. Stop.
2. Identify the required API.
3. Describe the request and response shape needed.
4. Report the integration requirement.
5. Do not create a fake backend implementation.

The dashboard must display data returned by approved APIs.

First inspect the current frontend and API contracts.

Do not implement until you have proposed a plan.

---

## 7. Backend Workstream Prompt

Example:

You are working exclusively on the Backend / Data workstream.

Your task is to implement the patient health-data API.

You may modify:

- backend/
- api/
- database/
- security/
- backend tests

You are responsible for:

- Authentication
- Authorization
- Validation
- Persistence
- API implementation

You must follow:

- 01_MASTER_PROJECT_CONTEXT.md
- 02_ARCHITECTURE.md
- 04_API_CONTRACTS.md
- 05_DATABASE_SCHEMA.md
- 06_AI_SPECIFICATION.md

Do not modify:

- AI prompts
- AI personality
- Frontend user experience

If another workstream requires an API change, update the API contract and report the integration dependency.

First inspect the current implementation.

---

## 8. Integration Prompt

When integrating work from another workstream:

The following approved functionality has been implemented by another workstream.

Before modifying code:

1. Read the relevant project documentation.
2. Inspect the existing implementation.
3. Inspect the API contract.
4. Inspect the integration requirement.
5. Verify the implementation matches the approved contract.

Do not redesign the other workstream's implementation.

Your task is only to integrate the approved functionality into this workstream.

Report:

- Files modified
- Integration points
- Assumptions
- Tests performed
- Remaining issues

---

## 9. API Change Prompt

If an API change is needed:

Do not modify the API immediately.

First:

1. Inspect current API contract.
2. Identify consumers.
3. Identify affected workstreams.
4. Propose the exact request and response changes.
5. Explain backward-compatibility impact.
6. Identify frontend impact.
7. Identify AI impact.
8. Identify database impact.

Wait for approval.

After approval:

1. Update 04_API_CONTRACTS.md.
2. Implement backend changes.
3. Update dependent consumers.
4. Test all affected components.

---

## 10. Database Change Prompt

If a database change is needed:

Do not modify the schema immediately.

First:

1. Inspect 05_DATABASE_SCHEMA.md.
2. Identify why the change is needed.
3. Identify affected APIs.
4. Identify affected AI tools.
5. Identify affected frontend functionality.
6. Identify migration requirements.
7. Propose the smallest schema change.

Wait for approval.

After approval:

1. Update 05_DATABASE_SCHEMA.md.
2. Implement migration.
3. Update backend.
4. Update affected APIs.
5. Update dependent workstreams.
6. Test migration and integration.

---

## 11. Architecture Change Prompt

If you believe the architecture must change:

Do not implement the architecture change immediately.

First report:

- Current architecture
- Problem
- Why current architecture is insufficient
- Proposed change
- Alternatives considered
- Affected components
- Affected workstreams
- API impact
- Database impact
- AI impact
- Security impact

Wait for team approval.

After approval:

1. Update 02_ARCHITECTURE.md.
2. Record the decision in 08_DECISION_LOG.md.
3. Update affected contracts.
4. Implement in coordinated steps.

---

## 12. Bug Fix Prompt

You are fixing a bug within the [WORKSTREAM] workstream.

Before changing code:

1. Reproduce or inspect the bug.
2. Identify root cause.
3. Identify affected files.
4. Confirm whether the bug crosses workstream boundaries.

Do not rewrite unrelated code.

Implement the smallest safe fix.

Then:

- Run relevant tests.
- Explain root cause.
- Explain files changed.
- Explain why the fix does not break other workstreams.

---

## 13. Testing Prompt

Review the implementation for the requested task.

Do not modify code yet.

Test:

- Expected behavior
- Error behavior
- Authorization
- Data validation
- AI integration where applicable
- API compatibility
- Database compatibility
- Cross-workstream integration

Report:

- Tests run
- Tests passed
- Tests failed
- Known limitations
- Remaining risks

---

## 14. Prompting Rules

Never prompt:

"Build the entire app."

Instead prompt:

"Inspect this specific workstream and implement this bounded task."

Never prompt two Freebuff agents to independently redesign the same shared architecture.

Never ask multiple workspaces to modify:

- The same API contract
- The same database schema
- The same architecture

without coordination.

Never assume another workstream's implementation.

Inspect the actual repository.

Never invent medical safety thresholds.

Never allow AI-generated assumptions to silently become architecture.

---

## 15. Standard Completion Report

Every significant Freebuff task should end with:

### Completed

What was implemented?

### Files Modified

List files.

### Files Created

List files.

### Tests

What was tested?

### Integration Dependencies

What other workstreams are affected?

### Assumptions

What assumptions were made?

### Known Issues

What remains unresolved?

### Documentation Updated

Which documentation files changed?

### Ready for Review

YES / NO

---

## 16. The Most Important Team Rule

Each team member should own a problem area, not just a set of prompts.

The three members should think of the project as:

AI Workstream
↕
Approved Contracts
↕
Backend / Data Workstream
↕
Approved Contracts
↕
Frontend Workstream

The contracts are the bridges between workstreams.

When a bridge needs to change, the team coordinates before coding.
