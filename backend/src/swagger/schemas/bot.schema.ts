export const botSchema = {
    type: 'object',
    required: ['prompt'],
    properties: {
        prompt: {
            type: 'string',
            description: 'The prompt to send to the bot'
        }
    }
};

export const botResponseSchema = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
            description: 'Indicates if the request was successful'
        },
        results: {
            type: 'object',
            properties: {
                response: {
                    type: 'string',
                    description: 'Bot response to the prompt'
                }
            }
        },
        message: {
            type: 'string',
            description: 'Status message'
        }
    }
};
