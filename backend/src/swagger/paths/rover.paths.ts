export const roverPaths = {
    '/api/rovers': {
        get: {
            summary: 'Get all rovers',
            tags: ['Rovers'],
            responses: {
                200: {
                    description: 'List of all Mars rovers',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {type: 'boolean'},
                                    results: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Rover'}
                                    },
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
    },
    '/api/rovers/{rover}': {
        get: {
            summary: 'Get rover by name',
            tags: ['Rovers'],
            parameters: [
                {
                    in: 'path',
                    name: 'rover',
                    required: true,
                    schema: {
                        type: 'string',
                        enum: ['curiosity', 'opportunity', 'spirit', 'perseverance'],
                    },
                    description: 'Name of the rover (case-insensitive)'
                }
            ],
            responses: {
                200: {
                    description: 'Rover details',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {type: 'boolean'},
                                    results: {$ref: '#/components/schemas/Rover'},
                                    message: {type: 'string'}
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Invalid rover name',
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
                404: {
                    description: 'Rover not found',
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
