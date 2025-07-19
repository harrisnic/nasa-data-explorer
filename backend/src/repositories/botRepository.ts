import {ExternalServiceError} from "../errors";
import {config as configVar} from "../config/config";
import {Mistral} from "@mistralai/mistralai";
import {Prompt} from "../types";
import type { ChatCompletionRequest } from "@mistralai/mistralai/models/components";

export class BotRepository {

    private static client: Mistral;

    // Initialize the static client
    static {
        const apiKey = configVar.bot.apiKey;
        this.client = new Mistral({apiKey: apiKey});
    }

    static async createPrompt(modelAISettings: ChatCompletionRequest): Promise<Prompt> {
        try {
            const chatResponse = await this.client.chat.complete(modelAISettings);
            return chatResponse.choices[0].message.content as Prompt;
        } catch (error: any) {
            throw new ExternalServiceError('Failed to create bot prompt');
        }
    }
}
