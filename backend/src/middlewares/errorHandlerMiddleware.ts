import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors';
import { ApiResponse } from '../types';

export const errorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    // Handle BaseError
    if (err instanceof BaseError) {
        const response: ApiResponse<never> = {
            success: false,
            message: err.message,
            error: {
                code: err.errorCode,
                statusCode: err.statusCode,
                timestamp: err.timestamp
            }
        };
        res.status(err.statusCode).json(response);
        return;
    }

    // Handle validation errors/Bad request
    if (err.name === 'ValidationError') {
        const response: ApiResponse<never> = {
            success: false,
            message: 'Validation failed',
            error: process.env.NODE_ENV === 'development' ? err.message : 'Invalid input data'
        };
        res.status(400).json(response);
        return;
    }

    // Handle network/connection errors
    if ('code' in err && (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND')) {
        const response: ApiResponse<never> = {
            success: false,
            message: 'Service unavailable',
            error: process.env.NODE_ENV === 'development' ? err.message : 'External service unavailable'
        };
        res.status(503).json(response);
        return;
    }

    // Handle timeout errors
    if (('code' in err && err.code === 'ETIMEDOUT') || err.name === 'TimeoutError') {
        const response: ApiResponse<never> = {
            success: false,
            message: 'Request timeout',
            error: 'The request took too long to complete'
        };
        res.status(408).json(response);
        return;
    }

    // Handle CORS errors
    if (err.message && err.message.includes('CORS')) {
        const response: ApiResponse<never> = {
            success: false,
            message: 'CORS error',
            error: 'Cross-origin request blocked'
        };
        res.status(403).json(response);
        return;
    }

    // Handle unknown errors
    const response: ApiResponse<never> = {
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? { message: err.message, stack: err.stack } : 'Something went wrong'
    };
    res.status(500).json(response);

};
