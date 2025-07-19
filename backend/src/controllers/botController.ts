import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import {BadRequestError} from "../errors";
import {ApiResponse, BotResponse} from "../types";
import {botValidationRules} from "../validation/botValidation";
import {BotService} from "../services/botService";

export class BotController {

    static validateBotPrompt= botValidationRules.postBotPrompt

    static async postBotPrompt(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new BadRequestError(`Invalid parameters: ${errors.array()[0].msg}`);
            }

            const { prompt } = req.body;

            const results: BotResponse = await BotService.createPrompt(prompt);

            const response: ApiResponse<BotResponse> = {
                success: true,
                results: results,
                message: 'Bot prompt submitted successfully'
            };

            res.status(200).json(response);
        } catch (error: unknown) {
            next(error);
        }
    }

}
