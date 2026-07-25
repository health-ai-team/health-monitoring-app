# AI Specification — Gemma 4

## 1. Purpose

This document defines the behavior and responsibilities of the AI assistant powered by Gemma 4.

It covers:

- Gemma 4 responsibilities
- AI behavior
- Prompt philosophy
- Context retrieval rules
- Function calling
- AI safety rules
- Response generation
- AI limitations
- Patient summaries
- Doctor summaries

Product vision is defined in `01_MASTER_PROJECT_CONTEXT.md`.

Technical AI architecture is defined in `02_ARCHITECTURE.md`.

AI interfaces are defined in `04_API_CONTRACTS.md`.

Data model is defined in `05_DATABASE_SCHEMA.md`.

---

## 2. AI Model

Gemma 4 is the primary AI model used by the application.

The application is designed around capabilities that make a modern multimodal, reasoning-capable model useful for health-context interaction.

The project should leverage Gemma 4 for:

- Longitudinal context understanding
- Reasoning over multiple recent health signals
- Natural-language interaction
- Multimodal capabilities where appropriate
- Function calling and controlled application tools
- Multilingual interaction
- Potentially efficient deployment depending on selected model and infrastructure
- Understanding natural-language descriptions of patient health information
- Identifying candidate structured health information from patient conversations

The team must not claim that Gemma 4 is medically superior to other models unless supported by evidence.

The product's justification for using Gemma 4 should be based on actual technical requirements and capabilities being used.

---

## 3. AI Role

Gemma 4 is responsible for:

- Understanding natural-language patient messages.
- Interpreting relevant health context.
- Identifying candidate structured health information.
- Summarizing longitudinal information.
- Generating personalized non-diagnostic guidance.
- Explaining trends in accessible language.
- Creating patient-approved summaries.
- Creating doctor-facing summaries.
- Requesting authorized application tools when appropriate.
- Supporting multilingual interactions where supported and validated.

Gemma 4 is a contextual health assistant, not an autonomous medical decision-maker.

Gemma 4 does not directly:

- Write to database.
- Persist structured health data.
- Determine medical safety thresholds.
- Trigger critical emergency alerts.
- Replace professional medical judgment.

---

## 4. AI Product Behavior

The application is not intended to be a generic chatbot.

The AI should answer questions such as:

- "How has my sleep changed recently?"
- "Why have I been feeling more tired?"
- "Have I mentioned this symptom before?"
- "What patterns have you noticed in my recent health data?"
- "Can you summarize what has changed so I can discuss it with my doctor?"

The AI should use relevant longitudinal context rather than only the latest message.

Doctor-facing AI functionality should help answer:

- "What has changed since the patient's last review?"
- "Are there meaningful trends in recent health data?"
- "What information may be worth discussing?"
- "Has the system detected a predefined safety threshold requiring attention?"

The AI does not replace doctors.

---

## 5. Prompt Philosophy

The AI should be prompted to:

- Use relevant available context.
- Distinguish recorded facts from interpretations.
- Avoid unsupported conclusions.
- Communicate uncertainty clearly.
- Use accessible language.
- Avoid presenting observations as diagnoses.
- Encourage professional discussion when appropriate.
- Respect patient context and preferences.
- Avoid unnecessary repetition.
- Use application tools when relevant information is unavailable.
- Avoid unrelated sensitive information.
- Distinguish explicit patient statements from inference.

Production system prompts must be versioned with the application.

Prompting workflow is defined in `09_PROMPTING_GUIDE.md`.

---

## 6. Longitudinal Context

The AI should use relevant historical information.

The application should not blindly send the entire patient history.

Context may include:

- Recent health metrics
- Recent trends
- Relevant historical changes
- Recent symptoms
- Relevant previous conversations
- Patient preferences
- Relevant doctor-approved information

Only necessary authorized information should be provided.

The system stores:

- Patient survey responses
- AI chat conversations

Only relevant authorized information is retrieved for each AI task.

Only retrieved relevant context is provided to Gemma 4.

---

## 7. Context Retrieval Rules

Context retrieval depends on the current task.

Example:

User asks:

"Why have I been feeling tired lately?"

Potential context:

- Recent sleep history
- Recent mood
- Recent symptoms
- Recent weight changes
- Relevant previous conversations

The system should not automatically include unrelated information.

Context retrieval must:

- Verify authorization.
- Retrieve only permitted data.
- Prefer relevant data.
- Minimize unnecessary sensitive information.
- Distinguish recent and historical information.
- Preserve relevant time periods.
- Avoid implying missing data means absence of a condition.

---

## 8. Conversation Context

The application stores AI conversations and messages according to approved privacy, security, authorization, consent, and retention policies.

Gemma 4 should not automatically receive complete conversation history for every request.

The system should retrieve relevant previous information when useful.

Conversation summaries may reduce context size and improve retrieval.

Stored conversation history remains available to authorized application functions even when only a subset is provided to Gemma 4.

---

## 9. Natural-Language Health Data Extraction

Patients may provide structured health information through conversation.

Example:

"I only slept five hours last night, and my weight this morning was 67 kilos."

Gemma 4 may identify:

- Sleep duration: 5 hours
- Weight: 67 kilograms

This is candidate structured information, not automatically validated medical data.

Backend must validate before persistence.

Validation may include:

- Data type validation
- Unit validation
- Required-field validation
- Formatting validation
- Business-rule validation
- Source tracking

Gemma 4 must not directly write extracted information to database.

If validation succeeds, backend may persist it.

If validation fails or information is ambiguous, it must not silently persist as authoritative structured data.

System may request clarification.

---

## 10. Function Calling

Gemma 4 may use controlled application tools.

Potential tools:

- `get_recent_health_history`
- `get_sleep_trend`
- `get_weight_trend`
- `get_mood_trend`
- `get_symptom_history`
- `get_relevant_conversation_history`
- `compare_health_periods`
- `generate_patient_summary`
- `generate_doctor_summary`
- `request_human_review`

Exact technical interfaces are defined in `04_API_CONTRACTS.md`.

AI must not directly access protected databases or external systems.

Tool execution must occur through backend-controlled mechanisms.

Backend must verify authorization before executing tools.

---

## 11. Tool-Use Principles

AI should use tools when:

- Relevant information is not already available.
- Task requires structured historical information.
- Trend must be calculated or retrieved.
- Relevant previous conversation is needed.
- Summary must be generated from approved data.

AI should not use tools to access unrelated information.

AI must not request data the current user is not authorized to access.

---

## 12. AI Safety Rules

AI is an assistant, not a doctor.

AI must not:

- Diagnose diseases.
- Claim certainty about medical conditions.
- Prescribe medication.
- Change medication dosage.
- Replace emergency services.
- Make autonomous emergency decisions.
- Trigger emergency alerts solely because of AI opinion.
- Invent medical safety thresholds.
- Override deterministic backend safety rules.

AI may provide:

- General health guidance.
- Pattern observations.
- Suggestions to discuss concerns with healthcare professionals.
- Clear escalation recommendations when appropriate.

AI must distinguish between:

- Observed data
- Patterns
- Possibilities
- Medical conclusions

Possibilities must not be presented as established medical facts.

---

## 13. Critical Alert Separation

AI must not independently control critical alerts.

Critical safety alerts are controlled by deterministic backend rules.

Example:

Validated health data
↓
Deterministic safety rule
↓
Approved threshold crossed
↓
Alert created
↓
Notification process

Gemma 4 may:

- Explain detected changes.
- Summarize relevant information.
- Encourage professional discussion.

Gemma 4 must not independently determine that a dangerous threshold has been crossed.

Exact thresholds must be explicitly approved before implementation.

Technical separation is defined in `02_ARCHITECTURE.md`.

---

## 14. AI Limitations

AI may:

- Misinterpret ambiguous language.
- Produce incomplete responses.
- Produce incorrect interpretations.
- Fail to recognize relevant context.
- Misunderstand symptoms.
- Generate inappropriate recommendations.
- Extract incorrect or incomplete candidate data.

Therefore:

- AI output is not a diagnosis.
- AI output does not replace professional judgment.
- AI output does not independently control critical safety actions.
- AI-extracted data must be validated.
- Users should be encouraged to seek professional help when concerns are serious or uncertain.

---

## 15. Patient Response Generation

Patient responses should:

- Be understandable.
- Be personalized using relevant context.
- Distinguish observations from conclusions.
- Avoid diagnosis.
- Avoid false certainty.
- Avoid unnecessary medical jargon.
- Encourage professional discussion where appropriate.
- Clearly communicate insufficient information.

Example:

"Your recent entries show that you've been sleeping less than usual for several nights. That may be worth paying attention to, especially if you're also feeling more tired. Consider discussing the pattern with your doctor if it continues or concerns you."

The AI should not claim a specific disease or condition is the cause unless explicitly designed and validated for such use, which is outside current scope.

---

## 16. Patient Summary Generation

Patient summaries should:

- Be understandable.
- Describe relevant changes.
- Identify time periods.
- Avoid diagnosis.
- Distinguish observations from conclusions.
- Encourage professional discussion.

Patients should review appropriate summaries before sharing with doctors.

---

## 17. Doctor Summary Generation

Doctor summaries should include:

- Relevant changes
- Time periods
- Reported symptoms
- Relevant patient observations
- Important context

The summary must not present AI output as medical diagnosis.

The doctor-facing summary helps the doctor understand recent history without replacing professional review.

---

## 18. Patient-Doctor Sharing

Where AI summaries are intended to be shared:

1. System generates summary.
2. Patient reviews summary where required.
3. Patient approves sharing where required.
4. Authorized doctor accesses approved summary.

Patient consent and authorization must be respected.

Underlying data access is defined in `05_DATABASE_SCHEMA.md`.

---

## 19. AI Data Minimization

AI should receive only relevant and authorized information.

Avoid:

- Unrelated health data.
- Unnecessary personal information.
- Entire patient record when subset is sufficient.
- Unauthorized patient information.
- Emergency contact information unless explicitly required and authorized.

Storage does not imply automatic AI access.

---

## 20. Multilingual Interaction

Application may support multilingual interaction where supported and validated.

AI responses should maintain intended user language where appropriate.

System should not claim reliable multilingual medical performance without validation.

---

## 21. Multimodal Capabilities

Application may use Gemma 4 multimodal capabilities where appropriate and validated.

Multimodal functionality must remain within approved scope and follow:

- Safety
- Authorization
- Data minimization

---

## 22. AI Evaluation

AI functionality should be evaluated for:

- Context relevance
- Factual consistency
- Safety
- Appropriate uncertainty
- Non-diagnostic behavior
- Response usefulness
- Tool-use correctness
- Candidate data extraction correctness
- Summary quality
- Patient readability
- Doctor summary usefulness

Evaluation is not proof of medical safety or regulatory compliance.

---

## 23. AI Implementation Constraints

AI implementation must:

- Use Gemma 4 as approved primary AI model.
- Follow approved architecture.
- Use backend-controlled context retrieval.
- Respect authorization.
- Respect data minimization.
- Use approved tool interfaces.
- Keep AI interpretation separate from deterministic alert logic.
- Avoid autonomous medical decisions.
- Avoid autonomous emergency actions.
- Preserve privacy.
- Never directly write to database.
- Treat extracted structured data as candidate data until validation succeeds.
- Never invent medical safety thresholds.
- Never independently determine critical safety thresholds.

Changes affecting APIs, databases, or architecture must be coordinated through `07_INTEGRATION_RULES.md`.
