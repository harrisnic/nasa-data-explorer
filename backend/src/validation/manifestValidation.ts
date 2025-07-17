import {query} from 'express-validator';

export const manifestValidationRules = {
    getRoverManifest: [
        query('rover').isString().withMessage('Rover name is required'),
    ]
};
