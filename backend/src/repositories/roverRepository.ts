import {Rover} from "../types";
import api from "../config/api";

interface NasaRoversApiResponse {
    rovers: Rover[];
}

interface NasaRoverApiResponse {
    rover: Rover;
}

export class RoverRepository {

    static async findAll(): Promise<Rover[]> {
        const response = await api.get<NasaRoversApiResponse>('/rovers');
        return response.data.rovers;
    }

    static async findByName(name: string): Promise<Rover> {
        const response = await api.get<NasaRoverApiResponse>(`/rovers/${name.toLowerCase()}`);
        return response.data.rover;
    }

}
