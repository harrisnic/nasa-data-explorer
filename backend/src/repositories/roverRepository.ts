import {Rover} from "../types";
import api from "../config/api";
import {ExternalServiceError} from "../errors";

interface NasaRoversApiResponse {
    rovers: Rover[];
}

interface NasaRoverApiResponse {
    rover: Rover;
}

export class RoverRepository {

    static async findAll(): Promise<Rover[]> {
        try {
            const response = await api.get<NasaRoversApiResponse>('/rovers');
            return response.data.rovers;
        } catch (error: any) {
            throw new ExternalServiceError('Failed to fetch rovers from NASA API');
        }

    }

    static async findByName(name: string): Promise<Rover> {
        try {
            const response = await api.get<NasaRoverApiResponse>(`/rovers/${name.toLowerCase()}`);
            return response.data.rover;
        } catch (error: any) {
            throw new ExternalServiceError('Failed to fetch rover from NASA API');
        }
    }

}
