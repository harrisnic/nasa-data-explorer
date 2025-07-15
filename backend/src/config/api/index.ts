import axios, {InternalAxiosRequestConfig, AxiosError} from 'axios';
import {config as configVar} from "../config";

// Create axios instance
const api = axios.create({
    baseURL: configVar.nasa.apiUrl,
    timeout: 30000, // 30 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
    // Add keep-alive to reuse connections
    httpAgent: new (require('http').Agent)({ keepAlive: true }),
    httpsAgent: new (require('https').Agent)({ keepAlive: true })
});

// Request interceptor to handle configurations
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.params = {
        ...config.params,
        api_key: configVar.nasa.apiKey
    };
    return config;
});

// Response interceptor with retry logic for ETIMEDOUT
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const config = error.config as InternalAxiosRequestConfig & { retryCount?: number };
        
        // Initialize retry count
        config.retryCount = config.retryCount || 0;
        
        // Check if we should retry (specifically for ETIMEDOUT)
        const shouldRetry = (
            config.retryCount < 3 && // Max 3 retries
            (
                error.code === 'ETIMEDOUT' ||   // Timeout
                error.code === 'ECONNABORTED' || // Request timeout
                error.code === 'ECONNRESET' ||  // Connection reset
                error.code === 'ENOTFOUND' ||   // DNS issues
                (error.response?.status && error.response.status >= 500) // Server errors
            )
        );
        
        if (shouldRetry) {
            config.retryCount++;
            console.log(`Request timed out, retrying (attempt ${config.retryCount}/3)...`);
            
            // Exponential backoff: wait longer between retries
            const delay = Math.min(1000 * Math.pow(2, config.retryCount - 1), 10000);
            await new Promise(resolve => setTimeout(resolve, delay));
            
            return api(config);
        }
        
        // Log specific error details
        if (error.code === 'ETIMEDOUT') {
            console.error('Request timed out after 30 seconds');
        } else if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Network Error:', error.code, error.message);
        } else {
            console.error('Error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default api;
