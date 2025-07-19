import {BotResponse} from "../types";
import {BotRepository} from "../repositories/botRepository";
import type { ChatCompletionRequest } from "@mistralai/mistralai/models/components";

export class BotService {

    static async createPrompt(userPrompt: string): Promise<BotResponse> {

        const systemPrompt = "You are a knowledgeable NASA assistant specializing in Mars " +
            "exploration and NASA's Mars missions. You should provide accurate, " +
            "engaging information about Mars, NASA's past and current Mars missions, " +
            "Mars science, and related space exploration topics. When asked questions " +
            "outside your specialty, politely redirect users back to Mars-related " +
            "topics while offering to help with any Mars questions they might have. " +
            "Use a friendly, educational tone appropriate for both general public and students. " +
            "If you're uncertain about specific technical details or recent mission updates, " +
            "acknowledge this clearly.";

        const modelAISettings: ChatCompletionRequest = {
            model: 'mistral-small-latest',
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ]

        }
        return await BotRepository.createPrompt(modelAISettings);
    }

}
