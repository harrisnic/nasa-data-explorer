import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    success: boolean;
    message: string;
    results: T[];
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (config: AxiosRequestConfig) => {
        return axiosInstance
            .get<FetchResponse<T>>(this.endpoint, config)
            .then(res => res.data)
            .catch(error => {
                console.error(`Error fetching from ${this.endpoint}:`, error);
                throw error;
            });
    }

    // Record<string, any>: utility type that represents an object with keys and value types
    post = (data: Record<string, string | number | boolean>) => {
        return axiosInstance
            .post<FetchResponse<T>>(this.endpoint, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.data)
            .catch(error => {
                console.error(`Error posting to ${this.endpoint}:`, error);
                throw error;
            });
    }
}

export default APIClient;
