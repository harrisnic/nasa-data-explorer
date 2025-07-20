export const manifestPaths = {
    '/api/manifests': {
        get: {
            summary: 'Get rover manifest',
            tags: ['Manifests'],
            parameters: [
                {
                    in: 'query',
                    name: 'rover',
                    required: true,
                    schema: {
                        type: 'string',
                        enum: ['curiosity', 'opportunity', 'spirit', 'perseverance'],
                        description: 'The name of the Mars rover'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ManifestResponse'
                            }
                        }
                    }
                },
                400: {
                    description: 'Invalid parameters',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {type: 'boolean'},
                                    message: {type: 'string'}
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
