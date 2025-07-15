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
        const formattedDate = this.removeDateLeadingZeros(date);
        const response = await api.get<NasaPhotosApiResponse>(`/rovers/${rover.toLowerCase()}/photos`, {
            params: {
                earth_date: formattedDate
            }
        });

        return response.data.photos;
    }

    static async findLatestByRoverName(rover: string): Promise<Photo[]> {
        const response = await api.get<NasaLatestPhotosApiResponse>(`/rovers/${rover.toLowerCase()}/latest_photos`);
        return response.data.latest_photos;
    }

    private static removeDateLeadingZeros(date: string): string {
        // Match YYYY-MM-DD format and capture each part
        const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) return date;

        const year = match[1];
        const month = parseInt(match[2], 10);
        const day = parseInt(match[3], 10);
        
        return `${year}-${month}-${day}`;
    }

}
