import {Rover} from "../types";

export class RoverModel {

    private static rovers: Rover[] = [
        { id: 1, name: 'Curiosity'},
        { id: 2, name: 'Opportunity'},
        { id: 3, name: 'Spirit' }
    ];

    static async findAll(): Promise<Rover[]> {
        // Simulate API delay of 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [...this.rovers];
    }

    static async findById(id: number): Promise<Rover | undefined> {
        // Simulate API delay of 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.rovers.find(rover => rover.id === id);
    }

}
