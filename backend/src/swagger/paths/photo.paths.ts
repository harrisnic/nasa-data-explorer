export const photoPaths = {
    '/api/photos': {
        get: {
            summary: 'Get photos by rover and date',
            tags: ['Photos'],
            parameters: [
                {
                    in: 'query',
                    name: 'rover',
                    required: true,
                    schema: {
                        type: 'string',
                        enum: ['curiosity', 'opportunity', 'spirit', 'perseverance']
                    }
                },
                {
                    in: 'query',
                    name: 'date',
                    required: false,
                    schema: {
                        type: 'string',
                        format: 'date'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {type: 'boolean'},
                                    results: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Photo'}
                                    }
                                }
                            }
                        }
                    }
                },
                400: {description: 'Invalid parameters'},
                500: {description: 'Server error'}
            }
        }
    }
};
