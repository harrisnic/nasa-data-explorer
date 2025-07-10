import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import roverRoutes from './routes/roverRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { ApiResponse } from './types';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/rovers', roverRoutes);

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
    const response: ApiResponse<{ version: string; timestamp: string; description: string }> = {
        success: true,
        data: {
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            description: 'Mars Rover Photo API - Explore the Red Planet through rover images'
        },
        message: 'Mars Rover API is running successfully'
    };
    res.json(response);
});

// Error handling middleware
app.use(notFoundHandler);
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
