import { photoSchema, photoResponseSchema } from './schemas/photo.schema';
import { photoPaths } from './paths/photo.paths';
import { botSchema, botResponseSchema } from './schemas/bot.schema';
import { botPaths } from './paths/bot.paths';
import { manifestSchema, manifestResponseSchema } from './schemas/manifest.schema';
import { manifestPaths } from './paths/manifest.paths';
import {roverResponseSchema, roverSchema} from "./schemas/rover.schema";
import { roverPaths } from './paths/rover.paths';

export const swaggerConfig = {
    openapi: '3.0.0',
    info: {
        title: 'Mars Rover API',
        version: '1.0.0',
        description: 'API for accessing Mars Rover images and information',
        contact: {
            name: 'API Support',
            email: 'support@example.com'
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT'
        }
    },
    servers: [
        {
            url: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000',
            description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
        },
    ],
    components: {
        schemas: {
            Photo: photoSchema,
            PhotoResponse: photoResponseSchema,
            Bot: botSchema,
            BotResponse: botResponseSchema,
            Manifest: manifestSchema,
            ManifestResponse: manifestResponseSchema,
            Rover: roverSchema,
            RoverResponse: roverResponseSchema
        },
        securitySchemes: {
            apiKey: {
                type: 'apiKey',
                in: 'header',
                name: 'X-API-Key'
            }
        }
    },
    security: [
        { apiKey: [] }
    ],
    tags: [
        { name: 'Rovers', description: 'Mars Rover information endpoints' },
        { name: 'Photos', description: 'Mars Rover photos endpoints' },
        { name: 'Manifests', description: 'Mission manifest endpoints' },
        { name: 'Bot', description: 'AI Bot interaction endpoints' }
    ],
    paths: {
        ...photoPaths,
        ...botPaths,
        ...manifestPaths,
        ...roverPaths
    }
};
