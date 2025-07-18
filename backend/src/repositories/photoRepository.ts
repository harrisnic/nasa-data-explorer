import {Photo} from "../types";
import api from "../config/api";
import {ExternalServiceError} from "../errors";

interface NasaPhotosApiResponse {
    photos: Photo[];
}

interface NasaLatestPhotosApiResponse {
    latest_photos: Photo[];
}

export class PhotoRepository {

    static async findByRoverAndDate(rover: string, date: string): Promise<Photo[]> {
        try {
            const response = await api.get<NasaPhotosApiResponse>(`/rovers/${rover.toLowerCase()}/photos`, {
                params: {
                    earth_date: date
                }
            });
            return response.data.photos;
        } catch (error: any) {
            throw new ExternalServiceError('Failed to fetch rover by date from NASA API');
        }
    }

    static async findLatestByRoverName(rover: string): Promise<Photo[]> {
        try {
            const response = await api.get<NasaLatestPhotosApiResponse>(`/rovers/${rover.toLowerCase()}/latest_photos`);
            return response.data.latest_photos;
        } catch (error: any) {
            throw new ExternalServiceError('Failed to fetch rover from NASA API');
        }
    }

}
