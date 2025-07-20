export const photoSchema = {
    type: 'object',
    required: ['id', 'img_src', 'earth_date'],
    properties: {
        id: {
            type: 'integer',
            description: 'Photo unique identifier'
        },
        img_src: {
            type: 'string',
            description: 'Image URL'
        },
        earth_date: {
            type: 'string',
            format: 'date'
        },
        rover: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                status: {type: 'string'}
            }
        },
        camera: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                full_name: {type: 'string'}
            }
        }
    }
};

export const photoResponseSchema = {
    type: 'object',
    required: ['success', 'results'],
    properties: {
        success: {
            type: 'boolean',
            description: 'Indicates if the request was successful'
        },
        results: {
            type: 'array',
            items: {$ref: '#/components/schemas/Photo'},
            description: 'Array of photo objects'
        },
        message: {
            type: 'string',
            description: 'Optional response message'
        }
    }
};
