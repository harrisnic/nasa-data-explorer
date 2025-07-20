export const manifestSchema = {
    type: 'object',
    required: ['name', 'landing_date', 'launch_date', 'status', 'max_sol', 'total_photos', 'photos'],
    properties: {
        name: {
            type: 'string',
            description: 'Name of the rover'
        },
        landing_date: {
            type: 'string',
            format: 'date',
            description: 'Date when the rover landed on Mars'
        },
        launch_date: {
            type: 'string',
            format: 'date',
            description: 'Date when the rover was launched'
        },
        status: {
            type: 'string',
            enum: ['active', 'complete'],
            description: 'Current status of the rover'
        },
        max_sol: {
            type: 'integer',
            description: 'The most recent Martian sol from which photos exist'
        },
        total_photos: {
            type: 'integer',
            description: 'Total number of photos taken by the rover'
        },
        photos: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    sol: {
                        type: 'integer',
                        description: 'Martian sol of the photos'
                    },
                    earth_date: {
                        type: 'string',
                        format: 'date',
                        description: 'Earth date of the photos'
                    },
                    total_photos: {
                        type: 'integer',
                        description: 'Number of photos taken on this sol'
                    },
                    cameras: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        description: 'List of cameras that took photos on this sol'
                    }
                }
            }
        }
    }
};

export const manifestResponseSchema = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
            description: 'Indicates if the request was successful'
        },
        results: {
            $ref: '#/components/schemas/Manifest'
        },
        message: {
            type: 'string',
            description: 'Status message'
        }
    }
};
