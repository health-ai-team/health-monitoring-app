import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { healthRouter } from "./routes/health";
import { healthDataRouter } from "./routes/healthData";
import { aiChatRouter } from "./routes/aiChat";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", healthRouter);
app.use("/api/patient", healthDataRouter);
app.use("/api/ai", aiChatRouter);

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
