import { describe, it, expect } from "vitest";
import { validateHealthEntry } from "./healthEntry";

describe("validateHealthEntry", () => {
  it("accepts valid input with all fields", () => {
    const errors = validateHealthEntry({
      patientId: "patient-1",
      sleep: 7.5,
      mood: 4,
      weight: 70.0,
      symptoms: ["fatigue", "headache"],
    });
    expect(errors).toHaveLength(0);
  });

  it("accepts valid input with only patientId", () => {
    const errors = validateHealthEntry({ patientId: "patient-1" });
    expect(errors).toHaveLength(0);
  });

  it("rejects missing patientId", () => {
    const errors = validateHealthEntry({ patientId: "" });
    expect(errors).toHaveLength(1);
    expect(errors[0].field).toBe("patientId");
  });

  it("rejects non-string patientId", () => {
    const errors = validateHealthEntry({ patientId: 123 as any });
    expect(errors).toHaveLength(1);
    expect(errors[0].field).toBe("patientId");
  });

  describe("sleep validation", () => {
    it("rejects sleep below 0", () => {
      const errors = validateHealthEntry({ patientId: "p1", sleep: -1 });
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe("sleep");
    });

    it("rejects sleep above 24", () => {
      const errors = validateHealthEntry({ patientId: "p1", sleep: 25 });
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe("sleep");
    });

    it("accepts sleep at boundary 0", () => {
      const errors = validateHealthEntry({ patientId: "p1", sleep: 0 });
      expect(errors).toHaveLength(0);
    });

    it("accepts sleep at boundary 24", () => {
      const errors = validateHealthEntry({ patientId: "p1", sleep: 24 });
      expect(errors).toHaveLength(0);
    });

    it("rejects non-numeric sleep", () => {
      const errors = validateHealthEntry({ patientId: "p1", sleep: "bad" as any });
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe("sleep");
    });
  });

  describe("mood validation", () => {
    it("rejects mood below 1", () => {
      const errors = validateHealthEntry({ patientId: "p1", mood: 0 });
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe("mood");
    });

    it("rejects mood above 5", () => {
      const errors = validateHealthEntry({ patientId: "p1", mood: 6 });
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe("mood");
    });

    it("rejects non-integer mood", () => {
      const errors = validateHealthEntry({ patientId: "p1", mood: 3.5 });
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe("mood");
    });

    it("accepts mood at boundary 1", () => {
      const errors = validateHealthEntry({ patientId: "p1", mood: 1 });
      expect(errors).toHaveLength(0);
    });

    it("accepts mood at boundary 5", () => {
      const errors = validateHealthEntry({ patientId: "p1", mood: 5 });
      expect(errors).toHaveLength(0);
    });
  });

  describe("weight validation", () => {
    it("rejects weight of 0", () => {
      const errors = validateHealthEntry({ patientId: "p1", weight: 0 });
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe("weight");
    });

    it("rejects negative weight", () => {
      const errors = validateHealthEntry({ patientId: "p1", weight: -10 });
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe("weight");
    });

    it("accepts positive weight", () => {
      const errors = validateHealthEntry({ patientId: "p1", weight: 65.5 });
      expect(errors).toHaveLength(0);
    });

    it("rejects non-numeric weight", () => {
      const errors = validateHealthEntry({ patientId: "p1", weight: "heavy" as any });
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe("weight");
    });
  });

  describe("symptoms validation", () => {
    it("rejects non-array symptoms", () => {
      const errors = validateHealthEntry({ patientId: "p1", symptoms: "fatigue" as any });
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe("symptoms");
    });

    it("rejects array with non-string elements", () => {
      const errors = validateHealthEntry({ patientId: "p1", symptoms: ["fatigue", 123] as any });
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe("symptoms");
    });

    it("accepts empty symptoms array", () => {
      const errors = validateHealthEntry({ patientId: "p1", symptoms: [] });
      expect(errors).toHaveLength(0);
    });

    it("accepts valid symptoms array", () => {
      const errors = validateHealthEntry({
        patientId: "p1",
        symptoms: ["fatigue", "headache", "nausea"],
      });
      expect(errors).toHaveLength(0);
    });
  });

  it("returns multiple errors for invalid fields", () => {
    const errors = validateHealthEntry({
      patientId: "",
      sleep: -5,
      mood: 10,
      weight: -1,
      symptoms: "bad" as any,
    });
    expect(errors.length).toBeGreaterThanOrEqual(4);
  });
});
