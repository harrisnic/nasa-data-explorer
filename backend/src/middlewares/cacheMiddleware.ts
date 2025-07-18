import { Request, Response, NextFunction } from 'express';
import { cacheService } from '../services/cacheService';

export const cacheMiddleware = (duration: number = 3600) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Only cache GET requests
        if (req.method !== 'GET') return next();

        const key = `__express__${req.originalUrl || req.url}`;
        const cachedResponse = cacheService.get(key);

        if (cachedResponse) {
            // Send cached response
            return res.send(cachedResponse);
        }

        // Store original send method
        const originalSend = res.send;
        
        // Override send method to cache responses
        res.send = function(body) {
            // Cache the response
            cacheService.set(key, body, duration);
            
            // Restore original send method
            res.send = originalSend;
            
            // Call original send
            return originalSend.call(this, body);
        };
        
        next();
    };
};
