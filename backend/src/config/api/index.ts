import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Create axios instance
const api = axios.create({
    baseURL: 'https://api.nasa.gov/mars-photos/api/v1',
    timeout: 10000, // 10 secs
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor to handle configurations
api.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        api_key: process.env.NASA_API_KEY || 'DEMO_KEY'
    };
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Network Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
