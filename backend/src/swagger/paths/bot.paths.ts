export const botPaths = {
    '/api/bot': {
        post: {
            summary: 'Send prompt to bot',
            tags: ['Bot'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Bot'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/BotResponse'
                            }
                        }
                    }
                },
                400: {
                    description: 'Invalid request',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                    message: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                429: {
                    description: 'Rate limit exceeded'
                },
                500: {
                    description: 'Server error'
                }
            }
        }
    }
};
