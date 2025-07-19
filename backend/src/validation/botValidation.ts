import {body} from 'express-validator';

export const botValidationRules = {
    postBotPrompt: [
        body('prompt')
            .notEmpty().withMessage('Prompt is required')
            .isLength({ min: 10, max: 220 }).withMessage('Prompt must be between 10 and 220 characters')
            .trim()
    ]
};
