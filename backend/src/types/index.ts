export interface Rover {
    id: number;
    name: string;
}

export interface ApiResponse<T> {
    success: boolean;
    results?: T;
    message: string;
    error?: string;
}
