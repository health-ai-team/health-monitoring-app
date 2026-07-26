/**
 * AI Context Builder
 *
 * Converts authorized patient health data into structured context
 * for Gemma 4 prompts. This module only formats data — it never
 * draws medical conclusions, generates alerts, or diagnoses.
 *
 * Usage:
 *   import { buildPatientContext } from "./ai/contextBuilder";
 *   const context = buildPatientContext(healthEntries);
 *   // → { patient_context: { recent_sleep, recent_mood, symptoms, conversation_history } }
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HealthEntryRecord {
  id: string;
  patientId: string;
  sleepHours: number | null;
  weight: number | null;
  mood: number | null;
  symptoms: unknown; // JSON from Prisma (expected: string[] or null)
  notes: string | null;
  recordedAt: Date;
}

export interface PatientContext {
  patient_context: {
    recent_sleep: string;
    recent_mood: string;
    symptoms: string;
    conversation_history: string;
  };
}

export interface ContextBuilderOptions {
  /** Number of days of history to include. Default: 30 */
  lookbackDays?: number;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function parseSymptoms(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((s): s is string => typeof s === "string");
  }
  return [];
}

function fmt(val: number, decimals = 1): string {
  return val.toFixed(decimals);
}

// ---------------------------------------------------------------------------
// Sleep context
// ---------------------------------------------------------------------------

function buildSleepSummary(
  entries: HealthEntryRecord[],
): string {
  const withSleep = entries.filter((e) => e.sleepHours !== null);
  if (withSleep.length === 0) {
    return "No sleep data recorded in this period.";
  }

  const values = withSleep.map((e) => e.sleepHours!);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  const parts: string[] = [];
  parts.push(
    `Recorded ${values.length} time(s). Average: ${fmt(avg)} hours.`,
  );
  parts.push(`Range: ${fmt(min)} – ${fmt(max)} hours.`);

  return parts.join(" ");
}

// ---------------------------------------------------------------------------
// Mood context
// ---------------------------------------------------------------------------

function buildMoodSummary(entries: HealthEntryRecord[]): string {
  const withMood = entries.filter((e) => e.mood !== null);
  if (withMood.length === 0) {
    return "No mood data recorded in this period.";
  }

  const values = withMood.map((e) => e.mood!);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  const parts: string[] = [];
  parts.push(
    `Recorded ${values.length} time(s). Average: ${fmt(avg, 0)} out of 5.`,
  );
  if (withMood.length > 1) {
    parts.push(`Range: ${min} – ${max}.`);
  }

  return parts.join(" ");
}

// ---------------------------------------------------------------------------
// Symptoms context
// ---------------------------------------------------------------------------

function buildSymptomsSummary(entries: HealthEntryRecord[]): string {
  const allSymptoms = entries.flatMap((e) => parseSymptoms(e.symptoms));
  if (allSymptoms.length === 0) {
    return "No symptoms reported in this period.";
  }

  const countMap = new Map<string, number>();
  for (const symptom of allSymptoms) {
    countMap.set(symptom, (countMap.get(symptom) ?? 0) + 1);
  }

  const sorted = [...countMap.entries()].sort((a, b) => b[1] - a[1]);
  const fragments = sorted.map(
    ([name, count]) => `${name} (${count} time${count > 1 ? "s" : ""})`,
  );

  return `Reported symptoms: ${fragments.join(", ")}.`;
}

// ---------------------------------------------------------------------------
// Main builder
// ---------------------------------------------------------------------------

/**
 * Build a structured patient context object suitable for inclusion in
 * a Gemma 4 system prompt.
 *
 * The returned object contains only factual summaries — no medical
 * conclusions, no thresholds, no alerts, no diagnoses.
 *
 * @param entries  Patient health-entry records (from Prisma)
 * @param options  Optional configuration (lookback window, etc.)
 */
export function buildPatientContext(
  entries: HealthEntryRecord[],
  options?: ContextBuilderOptions,
): PatientContext {
  const days = options?.lookbackDays ?? 30;
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const recent = entries.filter((e) => e.recordedAt >= cutoff);

  return {
    patient_context: {
      recent_sleep: buildSleepSummary(recent),
      recent_mood: buildMoodSummary(recent),
      symptoms: buildSymptomsSummary(recent),
      conversation_history: "", // placeholder — will be wired once conversation storage exists
    },
  };
}
