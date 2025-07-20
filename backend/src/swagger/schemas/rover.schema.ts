export const roverSchema = {
    type: 'object',
    required: ['name', 'landing_date', 'launch_date', 'status'],
    properties: {
        name: {
            type: 'string',
            enum: ['Curiosity', 'Opportunity', 'Spirit', 'Perseverance'],
            description: 'Name of the Mars rover'
        },
        landing_date: {
            type: 'string',
            format: 'date',
            description: 'Date when the rover landed on Mars'
        },
        launch_date: {
            type: 'string',
            format: 'date',
            description: 'Date when the rover was launched from Earth'
        },
        status: {
            type: 'string',
            enum: ['active', 'complete'],
            description: 'Current operational status of the rover'
        },
        max_sol: {
            type: 'integer',
            description: 'The most recent Martian sol from which photos exist'
        },
        max_date: {
            type: 'string',
            format: 'date',
            description: 'The most recent Earth date from which photos exist'
        },
        total_photos: {
            type: 'integer',
            description: 'Total number of photos taken by the rover'
        },
        cameras: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Camera code name'
                    },
                    full_name: {
                        type: 'string',
                        description: 'Full name of the camera'
                    }
                }
            },
            description: 'List of cameras mounted on the rover'
        }
    }
};

export const roverResponseSchema = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
            description: 'Indicates if the request was successful'
        },
        results: {
            oneOf: [
                {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Rover'
                    }
                },
                {
                    $ref: '#/components/schemas/Rover'
                }
            ],
            description: 'Rover data - either a single rover or an array of rovers'
        },
        message: {
            type: 'string',
            description: 'Status message'
        }
    }
};
