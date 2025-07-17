import {Photo} from "../types";
import {PhotoRepository} from "../repositories/photoRepository";
import {stripDateLeadingZeros} from "../utils";

export class PhotoService {

    static async findByRoverAndDate(rover: string, date: string): Promise<Photo[]> {
        try {
            const formattedDate: string = stripDateLeadingZeros(date)
            return await PhotoRepository.findByRoverAndDate(rover, formattedDate);
        } catch (error) {
            throw error;
        }
    }

    static async findLatestByRoverName(rover: string): Promise<Photo[]> {
        try {
            return await PhotoRepository.findLatestByRoverName(rover);
        } catch (error) {
            throw error;
        }
    }

}
