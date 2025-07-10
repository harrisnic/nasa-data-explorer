import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', err);

    const response: ApiResponse<never> = {
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    };

    res.status(500).json(response);
};

export const notFoundHandler = (req: Request, res: Response): void => {
    const response: ApiResponse<never> = {
        success: false,
        message: `Route ${req.originalUrl} not found`
    };
    res.status(404).json(response);
};
