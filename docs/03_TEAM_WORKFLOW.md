# Team Workflow and Development Process

## 1. Purpose

This document defines how the three-person team collaborates while using Freebuff as the primary AI coding environment.

It covers:

- Team responsibilities
- Workstreams
- Branch strategy
- Review process
- Coding workflow
- Integration process
- Definition of Done
- Ownership rules

Product requirements are defined in `01_MASTER_PROJECT_CONTEXT.md`.

Technical architecture is defined in `02_ARCHITECTURE.md`.

API contracts are defined in `04_API_CONTRACTS.md`.

Database structure is defined in `05_DATABASE_SCHEMA.md`.

AI behavior is defined in `06_AI_SPECIFICATION.md`.

Cross-workstream integration is defined in `07_INTEGRATION_RULES.md`.

---

## 2. Team Development Model

The project uses:

- GitHub as source of truth
- Separate workstreams
- Feature branches
- Pull requests
- Shared documentation
- Freebuff as primary AI coding environment

Freebuff generates and modifies code.

Human team members are responsible for:

- Product decisions
- Architecture decisions
- Requirements
- Prompting
- Reviewing AI-generated plans
- Reviewing AI-generated code
- Testing
- Integration
- Documentation

---

## 3. Team Workstreams

### Workstream A — AI / Gemma 4

Owner: Team Member 1

Branch:

`feature/gemma-ai`

Responsibilities:

- Gemma 4 integration
- AI prompts
- AI context construction
- Function calling
- AI safety behavior
- AI response formatting
- AI evaluation
- AI conversation logic
- Candidate health-data extraction
- Patient summary generation
- Doctor summary generation

Primary areas:

- `ai/`
- `lib/ai/`
- AI-specific tests
- AI configuration

Must coordinate with backend for:

- APIs
- Data retrieval
- Authentication
- Authorization
- Candidate validation
- Tool execution
- Database persistence

Must coordinate with frontend for:

- AI response formats
- Chat behavior
- Loading states
- Error states

Must not independently change:

- Database architecture
- Authentication architecture
- Authorization rules
- Alert thresholds
- Emergency notification logic

### Workstream B — Frontend

Owner: Team Member 2

Branch:

`feature/frontend`

Responsibilities:

- Patient dashboard
- Daily survey
- Structured health-data entry
- AI chat interface
- Health history
- Health trends
- Doctor dashboard
- Charts
- Patient summaries
- Alert presentation
- Accessibility
- User experience

Primary areas:

- `frontend/`
- `components/`
- `pages/`
- UI tests

Must coordinate with AI for:

- AI response structure
- Chat behavior

Must coordinate with backend for:

- API contracts
- Authentication flows
- Data formats
- Error handling

Must not independently change:

- Database architecture
- AI model configuration
- Alert logic
- Authentication architecture

### Workstream C — Backend / Data

Owner: Team Member 3

Branch:

`feature/backend`

Responsibilities:

- Database
- Backend APIs
- Authentication
- Authorization
- Patient permissions
- Doctor permissions
- Data validation
- AI tool execution
- Candidate health-data validation
- Data persistence
- Alert engine
- Notification system
- Security

Primary areas:

- `backend/`
- `database/`
- `api/`
- `security/`
- Alert engine

Must coordinate with AI for:

- AI context APIs
- Function-calling tools
- Candidate extraction
- AI data requirements

Must coordinate with frontend for:

- API contracts
- Authentication flows
- Response formats

Must not independently change:

- AI prompts
- AI personality
- AI response design
- Frontend user experience

---

## 4. Architecture Decision Ownership

One team member should act as final coordinator for architecture decisions.

This person ensures consistency.

They are responsible for:

- Maintaining `02_ARCHITECTURE.md`
- Resolving conflicting technical decisions
- Ensuring technology choices remain consistent
- Approving major cross-workstream changes
- Maintaining the project's source of truth

The coordinator does not automatically own all implementation work.

---

## 5. Branch Strategy

Stable branch:

`main`

Feature branches:

- `feature/gemma-ai`
- `feature/frontend`
- `feature/backend`

`main` should contain the most stable integrated version.

Avoid major experimental changes directly on `main`.

Work should be developed on appropriate feature branches and integrated through pull requests.

---

## 6. Freebuff Coding Workflow

Freebuff agents should follow:

Inspect
↓
Plan
↓
Human review
↓
Implement
↓
Test
↓
Document
↓
Pull Request
↓
Review
↓
Integrate

Agents should not immediately modify large parts of the project without understanding existing code and documentation.

---

## 7. Inspection-First Rule

Before significant tasks, Freebuff must:

- Read relevant documentation.
- Identify its workstream.
- Inspect existing code.
- Identify dependencies.
- Identify potential conflicts.
- Report findings.

The first prompt for a major task should generally request inspection rather than implementation.

---

## 8. Plan-Before-Implementation Rule

Before significant changes, Freebuff should propose:

- Files to modify
- Files to create
- APIs to consume
- APIs to change
- Database dependencies
- Other workstreams affected
- Potential risks

For major changes, human approval should be obtained before implementation.

---

## 9. AI Coding Rules

Freebuff must:

- Read relevant documentation.
- Inspect existing code.
- Never rewrite unrelated working functionality without approval.
- Respect workstream ownership.
- Identify dependencies.
- Propose plans before major changes.
- Avoid changing shared architecture without approval.
- Avoid modifying another team's workstream unless authorized.
- Report files created or modified.
- Report assumptions.
- Report unresolved issues.
- Never claim completion without testing.

---

## 10. Workstream Ownership

Each Freebuff workspace should primarily modify files owned by its workstream.

If changes outside the workstream are required:

1. Stop.
2. Identify the required change.
3. Document it.
4. Coordinate with the affected owner.
5. Obtain approval.
6. Make the smallest necessary change.

Do not silently change another team's architecture.

---

## 11. Cross-Workstream Integration

When one workstream needs functionality from another, document the requirement.

Example:

AI needs a backend API for candidate health-data validation.

Correct process:

AI Lead documents requirement.
↓
Backend Lead reviews.
↓
API contract agreed.
↓
`04_API_CONTRACTS.md` updated.
↓
Backend implements API.
↓
AI integrates with approved API.

The AI Lead should not silently modify backend architecture.

Detailed integration rules are defined in `07_INTEGRATION_RULES.md`.

---

## 12. Pull Request Review

Before integration into `main`, verify:

- Requirements are satisfied.
- Implementation matches approved architecture.
- API compatibility is preserved.
- Database compatibility is preserved.
- Authentication remains correct.
- Authorization remains correct.
- AI integration remains compatible.
- No unrelated functionality is broken.
- Documentation is updated.
- Relevant tests pass.

---

## 13. Integration Testing

Integration is a shared responsibility.

Before a feature is considered integrated, verify:

- Frontend works with backend.
- Backend works with database.
- AI works with backend.
- AI-extracted candidate health data is validated.
- Authorization works correctly.
- Error states are handled.
- Relevant tests pass.

The team should regularly perform full-system integration tests.

---

## 14. Conflict Resolution

If workstreams require conflicting changes:

1. Stop implementation.
2. Document the conflict.
3. Identify affected components.
4. Discuss options.
5. Decide as a team.
6. Update appropriate documentation.
7. Implement the approved solution.

Never allow two AI agents to independently solve the same architecture problem.

---

## 15. Definition of Done

A task is not complete when Freebuff generates code.

A task is complete when:

- Implementation exists.
- Relevant tests pass.
- Requirements are satisfied.
- Documentation is updated.
- No unrelated functionality is broken.
- Integration dependencies are resolved.
- Workstream owner has reviewed the result.
- Changes are ready for pull request review.

A feature is not fully integrated until integration testing requirements are satisfied.
