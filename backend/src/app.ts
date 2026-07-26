import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { healthRouter } from "./routes/health";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", healthRouter);

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
