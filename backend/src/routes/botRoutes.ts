import { Router } from 'express';
import {BotController} from "../controllers/botController";

const router = Router();

// POST /api/bot
router.post('/', BotController.validateBotPrompt, BotController.postBotPrompt);

export default router;
