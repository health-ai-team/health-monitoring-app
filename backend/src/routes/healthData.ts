import { Router } from "express";
import { createHealthEntry, getHealthEntries } from "../controllers/healthDataController";

export const healthDataRouter = Router();

healthDataRouter.post("/health", createHealthEntry);
healthDataRouter.get("/health", getHealthEntries);
