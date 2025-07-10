import { Request, Response, NextFunction } from 'express';
import { cacheService } from '../services/cacheService';

export const cacheMiddleware = (duration: number = 3600) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Only cache GET requests
        if (req.method !== 'GET') return next();

        const key = `__express__${req.originalUrl || req.url}`;
        const cachedResponse = cacheService.get(key);

        if (cachedResponse) {
            return res.send(cachedResponse);
        } else {
            const originalSend = res.send.bind(res);
            res.send = function(body): Response {
                cacheService.set(key, body, duration);
                return originalSend(body);
            };
            next();
        }
    };
};
