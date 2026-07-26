import { Router } from "express";
import { chat } from "../controllers/aiChatController";

export const aiChatRouter = Router();

aiChatRouter.post("/chat", chat);
