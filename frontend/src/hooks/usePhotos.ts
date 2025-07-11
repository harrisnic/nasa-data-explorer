import useData from "@/hooks/useData.ts";

export interface Rover {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
}

interface Camera {
    id: number;
    name: string;
    rover_id: number;
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

const usePhotos = () => useData<Photo>('/photos/rover/1/date/2025-2-2')

export default usePhotos
