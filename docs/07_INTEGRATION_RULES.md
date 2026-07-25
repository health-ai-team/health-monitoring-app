# Cross-Workstream Integration Rules

## 1. Purpose

This document defines how the three workstreams coordinate when a task crosses ownership boundaries.

It exists to prevent:

- Conflicting Freebuff prompts
- Duplicate implementations
- AI agents modifying the same architecture independently
- Broken API assumptions
- Database conflicts
- Uncoordinated changes
- Integration surprises

This document does not replace:

- `03_TEAM_WORKFLOW.md`
- `04_API_CONTRACTS.md`
- `05_DATABASE_SCHEMA.md`

Instead, it defines how changes between those areas are coordinated.

---

## 2. Golden Integration Rule

If your task requires another workstream to change something, do not silently change it yourself.

Instead:

1. Identify the dependency.
2. Stop implementation of the cross-workstream portion.
3. Describe the requirement.
4. Create an integration request.
5. Notify the affected owner.
6. Agree on the interface.
7. Update the relevant contract document.
8. Implement.
9. Test the integration.

---

## 3. Integration Request Template

Use:

### Request ID

`INT-XXX`

### Requested By

AI / Frontend / Backend

### Affected Workstreams

AI / Frontend / Backend

### Description

What is needed?

### Reason

Why is it needed?

### Current Behavior

What happens now?

### Desired Behavior

What should happen?

### Files or Components Potentially Affected

List known components.

### API Changes

Yes / No

### Database Changes

Yes / No

### AI Changes

Yes / No

### Security Impact

Yes / No

### Decision

Pending / Approved / Rejected

### Owner

Responsible team member.

### Status

REQUESTED

---

## 4. Integration Statuses

Use:

- REQUESTED
- UNDER_REVIEW
- APPROVED
- IN_PROGRESS
- READY_FOR_INTEGRATION
- INTEGRATED
- BLOCKED
- REJECTED

Active requests should be tracked using the team's agreed GitHub issue or project tracking system.

Do not maintain outdated active requests permanently inside this document.

---

## 5. API Integration

If another workstream needs an API:

1. Request the API behavior.
2. Backend owner reviews.
3. Agree on request/response behavior.
4. Update `04_API_CONTRACTS.md`.
5. Backend implements.
6. Backend tests.
7. Requesting workstream integrates.
8. Integration test is performed.

No workstream should invent an API contract independently.

---

## 6. Database Integration

If another workstream requires database changes:

1. Describe required data.
2. Identify why it is needed.
3. Backend/data owner reviews.
4. Update `05_DATABASE_SCHEMA.md`.
5. Identify migration requirements.
6. Implement schema change.
7. Test migration.
8. Update dependent APIs.
9. Integrate dependent workstream.

No workstream should silently modify shared database architecture.

---

## 7. AI Integration

AI workstream may define:

- AI behavior
- Prompt requirements
- Context requirements
- Tool requirements

Backend workstream controls:

- Data access
- Authorization
- Tool execution
- Validation
- Persistence

AI cannot directly access protected database systems.

---

## 8. Frontend Integration

Frontend must consume approved APIs.

Frontend should not independently:

- Redefine backend data models.
- Calculate critical medical safety thresholds.
- Change AI behavior.
- Change authorization logic.

If frontend needs a new API or response field, create an integration request.

---

## 9. Shared File Rule

Some files are shared architecture contracts.

These include:

- `02_ARCHITECTURE.md`
- `04_API_CONTRACTS.md`
- `05_DATABASE_SCHEMA.md`
- `06_AI_SPECIFICATION.md`

Do not allow multiple Freebuff agents to independently rewrite these documents at the same time.

One owner should coordinate changes.

---

## 10. Conflict Rule

If two workstreams disagree:

Stop.

Do not let Freebuff choose silently.

The team must:

1. Identify conflict.
2. Explain consequences.
3. Review existing documentation.
4. Review existing decisions.
5. Decide.
6. Update documentation.
7. Implement.

---

## 11. Integration Completion

An integration is complete only when:

- Contract is documented.
- Implementation exists.
- Dependent workstream has integrated.
- Tests pass.
- Authorization is verified.
- Error handling works.
- No unrelated functionality is broken.
- Documentation reflects final behavior.
