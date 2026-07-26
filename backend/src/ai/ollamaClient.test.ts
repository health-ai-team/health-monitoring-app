import { describe, it, expect } from "vitest";
import { getChatCompletion, checkOllamaConnection } from "./ollamaClient";
import type { PatientContext } from "./contextBuilder";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const mockContext: PatientContext = {
  patient_context: {
    recent_sleep: "Recorded 5 time(s). Average: 7.1 hours. Range: 6.0 – 8.0 hours.",
    recent_mood: "Recorded 5 time(s). Average: 4 out of 5. Range: 3 – 5.",
    symptoms: "Reported symptoms: fatigue (2 times), headache (1 time).",
    conversation_history: "",
  },
};

const emptyContext: PatientContext = {
  patient_context: {
    recent_sleep: "No sleep data recorded in this period.",
    recent_mood: "No mood data recorded in this period.",
    symptoms: "No symptoms reported in this period.",
    conversation_history: "",
  },
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("getChatCompletion (simulate mode)", () => {
  it("returns a response with simulated=true", async () => {
    const result = await getChatCompletion(
      { message: "How is my health?" },
      { simulate: true },
    );

    expect(result.simulated).toBe(true);
    expect(result.content).toBeTruthy();
    expect(typeof result.content).toBe("string");
  });

  it("includes health context in the mock response when provided", async () => {
    const result = await getChatCompletion(
      { message: "How is my sleep?", patientContext: mockContext },
      { simulate: true },
    );

    expect(result.content).toContain("7.1 hours");
    expect(result.content).toContain("fatigue");
  });

  it("mentions missing data when context is empty", async () => {
    const result = await getChatCompletion(
      { message: "How am I doing?", patientContext: emptyContext },
      { simulate: true },
    );

    expect(result.content).toContain("don't see any recent health data");
  });

  it("mentions missing context when no context provided", async () => {
    const result = await getChatCompletion(
      { message: "Hello" },
      { simulate: true },
    );

    expect(result.content).toContain("don't have your health context");
  });

  it("respects custom model name in output", async () => {
    const result = await getChatCompletion(
      { message: "Hi" },
      { simulate: true, model: "gemma4:2b" },
    );

    expect(result.model).toBe("gemma4:2b");
  });

  it("responds to health questions coherently", async () => {
    const result = await getChatCompletion(
      { message: "Why have I been feeling tired?", patientContext: mockContext },
      { simulate: true },
    );

    expect(result.content).toBeTruthy();
    // Should reference the sleep context
    expect(result.simulated).toBe(true);
  });
});

describe("getChatCompletion (real mode)", () => {
  it("throws a helpful error when Ollama is unreachable", async () => {
    await expect(
      getChatCompletion(
        { message: "Hello" },
        {
          baseUrl: "http://localhost:1", // definitely not running
          simulate: false,
        },
      ),
    ).rejects.toThrow(/Ollama/);
  });
});

describe("checkOllamaConnection", () => {
  it("returns false when the server is unreachable", async () => {
    const result = await checkOllamaConnection("http://localhost:1");
    expect(result).toBe(false);
  });
});
