import {Photo} from "../types";
import {PhotoRepository} from "../repositories/photoRepository";
import {stripDateLeadingZeros} from "../utils";

export class PhotoService {

    static async findByRoverAndDate(rover: string, date: string): Promise<Photo[]> {
        const formattedDate: string = stripDateLeadingZeros(date);
        return await PhotoRepository.findByRoverAndDate(rover, formattedDate);
    }

    static async findLatestByRoverName(rover: string): Promise<Photo[]> {
        return await PhotoRepository.findLatestByRoverName(rover);
    }
}
