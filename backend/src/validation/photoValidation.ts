import {param, query} from 'express-validator';

export const photoValidationRules = {
    getByRoverAndDate: [
        query('rover').isString().withMessage('Rover name required'),
        query('date')
            .optional()
            .matches(/^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/)
            .withMessage('Date must be in YYYY-MM-DD format')
    ],
    getByLatestDate: [
        param('rover').isString().withMessage('Rover name is required'),
    ]
};
