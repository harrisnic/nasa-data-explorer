import {Manifest} from "../types";
import api from "../config/api";

interface NasaRoverApiResponse {
    photo_manifest: Manifest;
}

export class ManifestRepository {

    static async findByRoverName(roverName: string): Promise<Manifest> {
        const response = await api.get<NasaRoverApiResponse>(`/manifests/${roverName.toLowerCase()}`);
        return  response.data.photo_manifest;
    }

}
