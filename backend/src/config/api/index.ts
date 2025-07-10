import axios, {InternalAxiosRequestConfig} from 'axios';
import {config as configVar} from "../config";

// Create axios instance
const api = axios.create({
    baseURL: configVar.nasa.apiUrl,
    timeout: 10000, // 10 secs
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor to handle configurations
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.params = {
        ...config.params,
        api_key: configVar.nasa.apiKey
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
