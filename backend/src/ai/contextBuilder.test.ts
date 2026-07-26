import { describe, it, expect } from "vitest";
import { buildPatientContext, HealthEntryRecord } from "./contextBuilder";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeEntry(overrides: Partial<HealthEntryRecord> = {}): HealthEntryRecord {
  return {
    id: overrides.id ?? "entry-1",
    patientId: overrides.patientId ?? "patient-1",
    sleepHours: overrides.sleepHours ?? null,
    weight: overrides.weight ?? null,
    mood: overrides.mood ?? null,
    symptoms: overrides.symptoms ?? null,
    notes: overrides.notes ?? null,
    recordedAt: overrides.recordedAt ?? new Date(),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("buildPatientContext", () => {
  it("returns all fields with correct structure", () => {
    const result = buildPatientContext([]);

    expect(result).toHaveProperty("patient_context");
    expect(result.patient_context).toHaveProperty("recent_sleep");
    expect(result.patient_context).toHaveProperty("recent_mood");
    expect(result.patient_context).toHaveProperty("symptoms");
    expect(result.patient_context).toHaveProperty("conversation_history");
  });

  it("returns empty summaries when no entries exist", () => {
    const result = buildPatientContext([]);

    expect(result.patient_context.recent_sleep).toBe(
      "No sleep data recorded in this period.",
    );
    expect(result.patient_context.recent_mood).toBe(
      "No mood data recorded in this period.",
    );
    expect(result.patient_context.symptoms).toBe(
      "No symptoms reported in this period.",
    );
    expect(result.patient_context.conversation_history).toBe("");
  });

  it("summarizes sleep data correctly", () => {
    const now = new Date();
    const entries = [
      makeEntry({ sleepHours: 6.0, recordedAt: now }),
      makeEntry({ sleepHours: 8.0, recordedAt: now }),
      makeEntry({ sleepHours: 7.0, recordedAt: now }),
    ];

    const result = buildPatientContext(entries, { lookbackDays: 7 });

    expect(result.patient_context.recent_sleep).toContain("3 time(s)");
    expect(result.patient_context.recent_sleep).toContain("Average: 7.0");
    expect(result.patient_context.recent_sleep).toContain("Range: 6.0 – 8.0");
  });

  it("summarizes mood data correctly", () => {
    const now = new Date();
    const entries = [
      makeEntry({ mood: 3, recordedAt: now }),
      makeEntry({ mood: 4, recordedAt: now }),
      makeEntry({ mood: 5, recordedAt: now }),
    ];

    const result = buildPatientContext(entries, { lookbackDays: 7 });

    expect(result.patient_context.recent_mood).toContain("3 time(s)");
    expect(result.patient_context.recent_mood).toContain("Average: 4");
    expect(result.patient_context.recent_mood).toContain("Range: 3 – 5");
  });

  it("summarizes symptoms correctly", () => {
    const now = new Date();
    const entries = [
      makeEntry({ symptoms: ["fatigue", "headache"], recordedAt: now }),
      makeEntry({ symptoms: ["fatigue"], recordedAt: now }),
      makeEntry({ symptoms: ["nausea"], recordedAt: now }),
    ];

    const result = buildPatientContext(entries, { lookbackDays: 7 });

    expect(result.patient_context.symptoms).toContain("fatigue (2 times)");
    expect(result.patient_context.symptoms).toContain("headache (1 time)");
    expect(result.patient_context.symptoms).toContain("nausea (1 time)");
  });

  it("ignores entries outside the lookback window", () => {
    const now = new Date();
    const longAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000); // 60 days ago
    const entries = [
      makeEntry({ sleepHours: 7.0, recordedAt: now }),
      makeEntry({ sleepHours: 5.0, recordedAt: longAgo }), // too old
    ];

    const result = buildPatientContext(entries, { lookbackDays: 30 });

    // Only the recent entry should be included
    expect(result.patient_context.recent_sleep).toContain("1 time(s)");
    expect(result.patient_context.recent_sleep).toContain("Average: 7.0");
  });

  it("handles null symptoms gracefully", () => {
    const now = new Date();
    const entries = [
      makeEntry({ symptoms: null, recordedAt: now }),
      makeEntry({ symptoms: undefined, recordedAt: now }),
    ];

    const result = buildPatientContext(entries, { lookbackDays: 7 });

    expect(result.patient_context.symptoms).toBe(
      "No symptoms reported in this period.",
    );
  });

  it("returns single-entry mood correctly", () => {
    const now = new Date();
    const entries = [makeEntry({ mood: 3, recordedAt: now })];

    const result = buildPatientContext(entries, { lookbackDays: 7 });

    expect(result.patient_context.recent_mood).toContain("Average: 3");
    // No range for a single entry
    expect(result.patient_context.recent_mood).not.toContain("Range");
  });

  it("does not include medical conclusions", () => {
    const now = new Date();
    const entries = [
      makeEntry({ sleepHours: 4.0, mood: 2, symptoms: ["fatigue"], recordedAt: now }),
    ];

    const result = buildPatientContext(entries, { lookbackDays: 7 });

    // Should be purely factual — no diagnoses, no risk, no alerts
    expect(result.patient_context.recent_sleep).not.toMatch(
      /insomnia|disorder|problem/i,
    );
    expect(result.patient_context.recent_mood).not.toMatch(
      /depression|anxiety|disorder|concern/i,
    );
    expect(result.patient_context.symptoms).not.toMatch(
      /dangerous|warning|alert|risk/i,
    );
  });

  it("defaults lookback to 30 days when no option provided", () => {
    const old = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000); // 15 days — within default 30
    const entries = [makeEntry({ sleepHours: 7.0, recordedAt: old })];

    const result = buildPatientContext(entries);

    expect(result.patient_context.recent_sleep).toContain("1 time(s)");
  });
});
