import { BaseError } from './baseError';

export class ExternalServiceError extends BaseError {
    constructor(message: string) {
        super(message, 502, 'EXTERNAL_SERVICE_ERROR');
    }
}
