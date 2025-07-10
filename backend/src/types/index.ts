export interface Rover {
    id: number;
    name: string;
}

interface Camera {
    name: string;
    full_name: string;
}

export interface Photo {
    id: number;
    sol: number;
    camera: Camera
    img_src: string;
    earth_date: string;
    rover: Rover;
}

export interface ApiResponse<T> {
    success: boolean;
    results?: T;
    message: string;
    error?: string;
}
