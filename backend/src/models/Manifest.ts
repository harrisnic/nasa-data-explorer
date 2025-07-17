import {Manifest} from "../types";
import api from "../config/api";

interface NasaRoverApiResponse {
    photo_manifest: Manifest;
}

export class ManifestModel {

    static async findByRoverName(roverName: string): Promise<Manifest | undefined> {
        const response = await api.get<NasaRoverApiResponse>(`/manifests/${roverName.toLowerCase()}`);
        const manifest = response.data.photo_manifest;
        // Only extract the necessary properties from the response
        const { name, landing_date, launch_date, status, max_sol, max_date, total_photos } = manifest;
        return { name, landing_date, launch_date, status, max_sol, max_date, total_photos };
    }

}
