import { Request, Response } from "express";
import prisma from "../db/prisma";
import { buildPatientContext, getChatCompletion } from "../ai";

/**
 * POST /api/ai/chat
 *
 * Flow:
 *   1. Receive { patientId, message }
 *   2. Fetch patient health entries from DB
 *   3. Build structured context via Context Builder
 *   4. Send message + context to Ollama/Gemma 4
 *   5. Return AI response
 *
 * When Ollama is unavailable, the endpoint automatically uses
 * simulate mode so the API remains functional during development.
 */
export async function chat(req: Request, res: Response): Promise<void> {
  try {
    const { patientId, message } = req.body;

    // ---- Validate input ----
    if (!patientId || typeof patientId !== "string") {
      res.status(400).json({ error: "patientId is required" });
      return;
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      res.status(400).json({ error: "message is required" });
      return;
    }

    // ---- Fetch health data (graceful if DB unavailable) ----
    let entries: Array<{
      id: string;
      patientId: string;
      sleepHours: number | null;
      weight: number | null;
      mood: number | null;
      symptoms: unknown;
      notes: string | null;
      recordedAt: Date;
    }> = [];

    try {
      entries = await prisma.healthEntry.findMany({
        where: { patientId },
        orderBy: { recordedAt: "desc" },
        take: 100,
      });
    } catch {
      console.warn(
        `[AI Chat] DB unavailable for patient ${patientId} — proceeding without health context`,
      );
    }

    // ---- Build context ----
    const patientContext = buildPatientContext(entries);

    // ---- Call AI (simulate mode by default for development) ----
    const simulate = process.env.OLLAMA_SIMULATE !== "false";
    const result = await getChatCompletion(
      { message: message.trim(), patientContext },
      { simulate },
    );

    // ---- Return response ----
    res.json({
      response: result.content,
      model: "Gemma 4",
    });
  } catch (error) {
    console.error("[AI Chat] Error:", error);
    res.status(500).json({ error: "Failed to process AI chat request" });
  }
}
