import {Photo} from "../types";
import api from "../config/api";
import {RoverModel} from "./Rover";
import {NotFoundError} from "../errors";

export class PhotoModel {

    static async findByRoverIdAndDate(id: number, date: string): Promise<Photo[]> {

        // Check if the rover exists
        const rover = await RoverModel.findById(id);
        if (!rover) {
            throw new NotFoundError(`Rover with id ${id} not found`);
        }

        const response = await api.get(`/rovers/${rover.name.toLowerCase()}/photos`, {
            params: {
                earth_date: date
            }
        });

        return response.data.photos;
    }

}



