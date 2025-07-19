import Joi from 'joi';

export const envSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    PORT: Joi.number().default(3000),
    API_RATE_LIMIT: Joi.number().default(100),
    RATE_LIMIT_WINDOW_MS: Joi.number().default(15 * 60 * 1000), // 15 minutes
    CACHE_DURATION: Joi.number().default(3600), // 1 hour in seconds
    NASA_API_KEY: Joi.string().required(),
    NASA_API_URL: Joi.string().uri().required(),
    BOT_API_KEY: Joi.string().required(),
    BOT_API_URL: Joi.string().uri().required(),
}).unknown();
