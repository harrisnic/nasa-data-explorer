import { BaseError } from './baseError';

export class InternalError extends BaseError {
    constructor(message: string) {
        super(message, 500, 'INTERNAL_ERROR');
    }
}
