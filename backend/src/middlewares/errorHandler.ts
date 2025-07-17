import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors';
import { ApiResponse } from '../types';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', err);

    const statusCode = err instanceof BaseError ? err.statusCode : 500;
    const response: ApiResponse<never> = {
        success: false,
        message: err instanceof BaseError ? err.message : 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    };

    res.status(statusCode).json(response);
};
