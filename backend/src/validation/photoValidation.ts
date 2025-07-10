import { param } from 'express-validator';

export const photoValidationRules = {
    getByRoverIdAndDate: [
        param('id').isInt().withMessage('Rover ID must be an integer'),
        param('date').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be in YYYY-MM-DD format')
    ],
};
