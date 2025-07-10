import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import roverRoutes from './routes/roverRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ApiResponse } from './types';
import photoRoutes from "./routes/photoRoutes";
import rateLimit from "express-rate-limit";
import { cacheMiddleware } from './middleware/cacheMiddleware';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Rate limiter configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Apply rate limiting to all requests
app.use(limiter);

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes cache for 1 hour
app.use('/api/rovers', cacheMiddleware(3600), roverRoutes);
app.use('/api/photos', cacheMiddleware(3600), photoRoutes);

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

// Error handling middleware
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
    console.log(`🚀 Mars Rover API is running on port ${PORT}`);
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
