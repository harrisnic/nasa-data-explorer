import {config} from "./config/config";
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from "express-rate-limit";
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import { cacheMiddleware } from './middlewares/cacheMiddleware';
import { ApiResponse } from './types';
import {cacheService} from "./services/cacheService";
import * as routes from './routes';
import {loggingMiddleware} from "./middlewares/loggingMiddleware";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import {swaggerConfig} from "./swagger/swaggerConfig";

const app: Application = express();

// Rate limiter configuration
const limiter = rateLimit({
    windowMs: config.server.rateLimit.windowMs,
    limit: config.server.rateLimit.max,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Apply rate limiting to all requests
app.use(limiter);

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true

})); // Enable CORS

// Logs to @/logs/access.log
app.use(loggingMiddleware);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const swaggerSpecs = swaggerJSDoc({
    definition: swaggerConfig,
    apis: [],
});

// Swagger UI setup
app.use('/swagger/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes cache for 1 hour
app.use('/api/rovers', cacheMiddleware(config.server.cache.duration), routes.roverRoutes);
app.use('/api/photos', cacheMiddleware(config.server.cache.duration), routes.photoRoutes);
app.use('/api/manifests', cacheMiddleware(config.server.cache.duration), routes.manifestRoutes);
app.use('/api/bot', cacheMiddleware(config.server.cache.duration), routes.botRoutes);

// Health check endpoint, cached for 5 mins
app.get('/', cacheMiddleware(300), (req: Request, res: Response) => {
    const response: ApiResponse<{ version: string; timestamp: string; description: string }> = {
        success: true,
        results: {
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            description: 'Mars Rover Photo API - Explore the Red Planet through rover images'
        },
        message: 'Mars Rover API is running successfully'
    };
    res.json(response);
});

// // Utility endpoint to flush cache
app.post('/api/utils/flush-cache', (req: Request, res: Response) => {
    cacheService.flush();
    const response: ApiResponse<null> = {
        success: true,
        results: null,
        message: 'Cache flushed successfully.'
    };
    res.json(response);
});

// Error handling middlewares
app.use(errorHandlerMiddleware);

// Start server
const server = app.listen(config.server.port, () => {
    console.log(`🚀 Mars Rover API is running on port ${config.server.port}`);
    console.log(`🔴 Exploring Mars data...`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

export default app;
