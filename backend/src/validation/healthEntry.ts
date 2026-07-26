export interface HealthEntryInput {
  patientId: string;
  sleep?: number;
  mood?: number;
  weight?: number;
  symptoms?: string[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export function validateHealthEntry(input: HealthEntryInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!input.patientId || typeof input.patientId !== "string") {
    errors.push({ field: "patientId", message: "patientId is required" });
  }

  if (input.sleep !== undefined) {
    if (typeof input.sleep !== "number" || isNaN(input.sleep)) {
      errors.push({ field: "sleep", message: "sleep must be a number" });
    } else if (input.sleep < 0 || input.sleep > 24) {
      errors.push({ field: "sleep", message: "sleep must be between 0 and 24" });
    }
  }

  if (input.mood !== undefined) {
    if (!Number.isInteger(input.mood)) {
      errors.push({ field: "mood", message: "mood must be an integer" });
    } else if (input.mood < 1 || input.mood > 5) {
      errors.push({ field: "mood", message: "mood must be between 1 and 5" });
    }
  }

  if (input.weight !== undefined) {
    if (typeof input.weight !== "number" || isNaN(input.weight)) {
      errors.push({ field: "weight", message: "weight must be a number" });
    } else if (input.weight <= 0) {
      errors.push({ field: "weight", message: "weight must be greater than 0" });
    }
  }

  if (input.symptoms !== undefined) {
    if (!Array.isArray(input.symptoms)) {
      errors.push({ field: "symptoms", message: "symptoms must be an array of strings" });
    } else if (!input.symptoms.every((s) => typeof s === "string")) {
      errors.push({ field: "symptoms", message: "each symptom must be a string" });
    }
  }

  return errors;
}
