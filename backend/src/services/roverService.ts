import {Rover} from "../types";
import {RoverRepository} from "../repositories/roverRepository";

export class RoverService {

    static async findAll(): Promise<Rover[]> {
        return await RoverRepository.findAll();
    }

    static async findByName(name: string): Promise<Rover> {
        return await RoverRepository.findByName(name);
    }
}
