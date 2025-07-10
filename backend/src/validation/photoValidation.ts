import { param } from 'express-validator';

export const photoValidationRules = {
    getByRoverIdAndDate: [
        param('id').isInt().withMessage('Rover ID must be an integer'),
        param('date')
            .matches(/^\d{4}-([1-9]|1[0-2])-([1-9]|[12]\d|3[01])$/)
            .withMessage('Date must be in YYYY-M-D format (no leading zeros)')
    ],
};
