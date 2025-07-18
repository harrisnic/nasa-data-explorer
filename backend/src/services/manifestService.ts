import {Manifest} from "../types";
import {ManifestRepository} from "../repositories/manifestRepository";
import {extractProperties} from "../utils";

export class ManifestService {

    static async findByRoverName(roverName: string): Promise<Manifest> {
        const manifest = await ManifestRepository.findByRoverName(roverName);
        return extractProperties(manifest, ['name', 'landing_date', 'launch_date', 'status', 'max_sol', 'max_date', 'total_photos']);
    }
}
