import {Rover} from "../types";
import {RoverRepository} from "../repositories/roverRepository";

export class RoverService {

    static async findAll(): Promise<Rover[]> {
        try {
            return await RoverRepository.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async findByName(name: string): Promise<Rover> {
        try {
            return await RoverRepository.findByName(name);
        } catch (error) {
            throw error;
        }
    }

}
