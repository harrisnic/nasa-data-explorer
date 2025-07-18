import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { config } from '../config/config';

// Create logs directory if it doesn't exist
const createLogsDirectory = (): string => {
    const logsDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }
    return logsDir;
};

// Create stream for access logs
const createLogStream = (): fs.WriteStream => {
    const logsDir = createLogsDirectory();
    const logPath = path.join(logsDir, 'access.log');

    const stream = fs.createWriteStream(logPath, { flags: 'a' });

    stream.on('error', (error) => {
        console.error('Error writing to access log:', error);
    });

    return stream;
};

// Development format
const devFormat = ':method :url :status :res[content-length] - :response-time ms';

// Production format with more details
const prodFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

export const loggingMiddleware = (() => {
    const accessLogStream = createLogStream();
    
    if (config.isProduction) {
        return morgan(prodFormat, { 
            stream: accessLogStream,
            skip: (req: Request, res: Response) => {
                // Skip health check logs
                return req.path === '/';
            }
        });
    } else {
        return morgan(devFormat, {
            stream: accessLogStream,
            skip: (req: Request, res: Response) => {
                return false;
            }
        });
    }
})();
