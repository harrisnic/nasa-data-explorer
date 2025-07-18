import {Manifest} from "../types";
import api from "../config/api";
import {ExternalServiceError, NotFoundError} from "../errors";

interface NasaRoverApiResponse {
    photo_manifest: Manifest;
}

export class ManifestRepository {

    static async findByRoverName(roverName: string): Promise<Manifest> {
        try {
            const response = await api.get<NasaRoverApiResponse>(`/manifests/${roverName.toLowerCase()}`);
            return response.data.photo_manifest;
        } catch (error: any) {
            throw new ExternalServiceError('Failed to fetch rover manifest from NASA API');
        }
    }

}
