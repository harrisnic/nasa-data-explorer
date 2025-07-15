import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    success: boolean;
    message: string;
    results: T[];
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
});

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (config: AxiosRequestConfig) => {
        return axiosInstance
            .get<FetchResponse<T>>(this.endpoint, config)
            .then(res => res.data);
    }
}

export default APIClient;
