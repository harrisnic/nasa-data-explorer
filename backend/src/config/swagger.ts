// src/config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'API documentation for your application',
    },
    servers: [
        {
            url: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000',
            description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
        },
    ],
};

const options = {
    definition: swaggerDefinition,
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to the API files
};

export const swaggerSpec = swaggerJSDoc(options);
