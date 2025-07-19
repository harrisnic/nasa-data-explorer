import dotenv from 'dotenv';
import {envSchema} from "./envSchema";

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({path: envFile});

// Validate environment variables
const {error, value: envVars} = envSchema.validate(process.env, {
    abortEarly: false,
});

if (error) {
    throw new Error(
        `Environment validation error: ${error.details
            .map((detail) => detail.message)
            .join(', ')}`
    );
}

export const config = {
    env: envVars.NODE_ENV as string,
    isProduction: envVars.NODE_ENV === 'production',
    server: {
        port: envVars.PORT as number,
        rateLimit: {
            max: envVars.API_RATE_LIMIT as number,
            windowMs: envVars.RATE_LIMIT_WINDOW_MS as number,
        },
        cache: {
            duration: envVars.CACHE_DURATION as number,
        },
    },
    nasa: {
        apiKey: envVars.NASA_API_KEY as string,
        apiUrl: envVars.NASA_API_URL as string,
    },
    bot: {
        apiKey: envVars.BOT_API_KEY as string,
        apiUrl: envVars.BOT_API_URL as string,
    },
};
