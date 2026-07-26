/**
 * Ollama / Gemma 4 Client
 *
 * Connects to a local Ollama runtime to invoke the Gemma 4 model.
 * Requires Ollama to be running locally (no cloud, no external API, no API keys).
 *
 * Architecture:
 *   Backend → localhost:11434/api/chat → Ollama → Gemma 4
 *
 * Usage:
 *   import { getChatCompletion } from "./ai/ollamaClient";
 *   import { buildPatientContext } from "./ai/contextBuilder";
 *
 *   const context = buildPatientContext(entries);
 *   const reply = await getChatCompletion({
 *     message: "How has my sleep been?",
 *     patientContext: context,
 *   });
 */

import { PatientContext } from "./contextBuilder";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_BASE_URL = "http://localhost:11434";
const DEFAULT_MODEL = "gemma4";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OllamaConfig {
  /** Ollama server URL. Default: http://localhost:11434 */
  baseUrl?: string;
  /** Model name in Ollama. Default: gemma4 */
  model?: string;
  /** If true, returns mock responses without calling Ollama. Default: false */
  simulate?: boolean;
}

export interface ChatRequest {
  /** The patient's natural-language message */
  message: string;
  /** Structured context from the Context Builder (optional) */
  patientContext?: PatientContext;
}

export interface ChatResult {
  /** The AI response text */
  content: string;
  /** Model used */
  model: string;
  /** Whether this came from mock mode instead of a real Ollama call */
  simulated: boolean;
}

// ---------------------------------------------------------------------------
// System prompt (based on docs/06_AI_SPECIFICATION.md)
// ---------------------------------------------------------------------------

function buildSystemPrompt(context?: PatientContext): string {
  const parts: string[] = [
    "You are a wellness assistant in a health-monitoring application.",
    "",
    "Your role is to help patients understand their health data.",
    "",
    "Rules:",
    "- Use the patient's health context to personalize your response.",
    "- Only discuss data that has been provided in the context.",
    "- Do not diagnose diseases or medical conditions.",
    "- Do not prescribe medication or change dosages.",
    "- Do not make emergency decisions.",
    "- Communicate uncertainty clearly.",
    "- Use accessible language.",
    "- Encourage professional discussion with a doctor when appropriate.",
    "- Never claim certainty about medical conditions.",
  ];

  if (context) {
    parts.push("", "Here is the patient's recent health context:");

    const ctx = context.patient_context;
    parts.push("");
    parts.push(`Recent sleep: ${ctx.recent_sleep}`);
    parts.push(`Recent mood: ${ctx.recent_mood}`);
    parts.push(`Reported symptoms: ${ctx.symptoms}`);

    if (ctx.conversation_history) {
      parts.push(`Previous conversation: ${ctx.conversation_history}`);
    }

    parts.push("");
    parts.push(
      "Use this context to provide personalized guidance. If data is missing, simply say so.",
    );
  }

  return parts.join("\n");
}

// ---------------------------------------------------------------------------
// Mock response
// ---------------------------------------------------------------------------

function buildMockResponse(message: string, context?: PatientContext): string {
  const lines: string[] = [];
  lines.push(
    "This is a simulated response from the local AI assistant development mode.",
  );
  lines.push("");

  if (context) {
    const ctx = context.patient_context;
    const hasSleep = !ctx.recent_sleep.includes("No sleep data");
    const hasMood = !ctx.recent_mood.includes("No mood data");
    const hasSymptoms = !ctx.symptoms.includes("No symptoms");

    if (hasSleep || hasMood || hasSymptoms) {
      lines.push("Based on your recent health data, I can see:");
      if (hasSleep) lines.push(`- ${ctx.recent_sleep}`);
      if (hasMood) lines.push(`- ${ctx.recent_mood}`);
      if (hasSymptoms) lines.push(`- ${ctx.symptoms}`);
    } else {
      lines.push(
        "I don't see any recent health data yet. Start by recording your sleep, mood, weight, or symptoms.",
      );
    }
  } else {
    lines.push(
      "I don't have your health context yet. Please submit some health data first.",
    );
  }

  lines.push("");
  lines.push(
    "**Note:** This is a mock response — the local Ollama server is not running. Install Ollama and pull Gemma 4 for real AI responses.",
  );

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Ollama HTTP call
// ---------------------------------------------------------------------------

interface OllamaChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OllamaChatRequest {
  model: string;
  messages: OllamaChatMessage[];
  stream: false;
}

interface OllamaChatResponse {
  model: string;
  created_at: string;
  message: { role: string; content: string };
  done: boolean;
  total_duration?: number;
  eval_count?: number;
}

async function callOllama(
  config: Required<Pick<OllamaConfig, "baseUrl" | "model">>,
  systemPrompt: string,
  userMessage: string,
): Promise<string> {
  const url = `${config.baseUrl}/api/chat`;

  const body: OllamaChatRequest = {
    model: config.model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    stream: false,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `Ollama returned status ${response.status}: ${errorText}`,
    );
  }

  const data = (await response.json()) as OllamaChatResponse;
  return data.message.content;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Send a patient message to Gemma 4 via local Ollama and get a response.
 *
 * When `config.simulate` is true, returns a mock response without
 * making any network call — useful for development without Ollama.
 *
 * @throws If Ollama is unreachable and simulate mode is off.
 */
export async function getChatCompletion(
  request: ChatRequest,
  config?: OllamaConfig,
): Promise<ChatResult> {
  const baseUrl = config?.baseUrl ?? DEFAULT_BASE_URL;
  const model = config?.model ?? DEFAULT_MODEL;
  const simulate = config?.simulate ?? false;

  // ---- Simulate mode ----
  if (simulate) {
    return {
      content: buildMockResponse(request.message, request.patientContext),
      model,
      simulated: true,
    };
  }

  // ---- Real Ollama call ----
  const systemPrompt = buildSystemPrompt(request.patientContext);

  try {
    const content = await callOllama(
      { baseUrl, model },
      systemPrompt,
      request.message,
    );

    return { content, model, simulated: false };
  } catch (error) {
    throw new Error(
      `Failed to reach Ollama at ${baseUrl}. ` +
        `Is Ollama running with '${model}' pulled?\n` +
        `  Install:  ollama pull ${model}\n` +
        `  Run:      ollama serve\n` +
        `  Detail:   ${(error as Error).message}`,
    );
  }
}

/**
 * Check if Ollama is reachable.
 * Returns `true` if the server responds, `false` otherwise.
 */
export async function checkOllamaConnection(
  baseUrl?: string,
): Promise<boolean> {
  try {
    const url = `${baseUrl ?? DEFAULT_BASE_URL}`;
    const response = await fetch(url, { method: "GET" });
    return response.ok;
  } catch {
    return false;
  }
}
