export class BaseError extends Error {
    statusCode: number;
    errorCode: string;
    timestamp: string;

    constructor(message: string, statusCode: number = 500, errorCode: string = 'INTERNAL_ERROR') {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.timestamp = new Date().toISOString();

        Error.captureStackTrace(this, this.constructor);
    }
}
