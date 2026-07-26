import { Request, Response } from "express";
import prisma from "../db/prisma";
import { validateHealthEntry } from "../validation";

export async function createHealthEntry(req: Request, res: Response): Promise<void> {
  try {
    const { patientId, sleep, mood, weight, symptoms } = req.body;

    const errors = validateHealthEntry({ patientId, sleep, mood, weight, symptoms });
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const entry = await prisma.healthEntry.create({
      data: {
        patientId,
        sleepHours: sleep !== undefined ? sleep : null,
        weight: weight !== undefined ? weight : null,
        mood: mood !== undefined ? mood : null,
        symptoms: symptoms !== undefined ? symptoms : undefined,
      },
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error("Error creating health entry:", error);
    res.status(500).json({ error: "Failed to create health entry" });
  }
}

export async function getHealthEntries(req: Request, res: Response): Promise<void> {
  try {
    const patientId = req.query.patientId as string | undefined;

    if (!patientId) {
      res.status(400).json({ error: "patientId query parameter is required" });
      return;
    }

    const entries = await prisma.healthEntry.findMany({
      where: { patientId },
      orderBy: { recordedAt: "desc" },
    });

    res.json(entries);
  } catch (error) {
    console.error("Error fetching health entries:", error);
    res.status(500).json({ error: "Failed to fetch health entries" });
  }
}
