export interface Rover {
    id: number;
    name: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message: string;
    error?: string;
}
