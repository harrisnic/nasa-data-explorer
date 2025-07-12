import {Photo} from "../types";
import api from "../config/api";

interface NasaPhotosApiResponse {
    photos: Photo[];
}

interface NasaLatestPhotosApiResponse {
    latest_photos: Photo[];
}

export class PhotoModel {

    static async findByRoverAndDate(rover: string, date: string): Promise<Photo[]> {
        const response = await api.get<NasaPhotosApiResponse>(`/rovers/${rover.toLowerCase()}/photos`, {
            params: {
                earth_date: date
            }
        });

        return response.data.photos;
    }

    static async findLatestByRoverName(rover: string): Promise<Photo[]> {
        const response = await api.get<NasaLatestPhotosApiResponse>(`/rovers/${rover.toLowerCase()}/latest_photos`);
        return response.data.latest_photos;
    }

}



