import {Rover} from "../types";

export class RoverModel {

    private static rovers: Rover[] = [
        { id: 1, name: 'Curiosity'},
        { id: 2, name: 'Opportunity'},
        { id: 3, name: 'Spirit' }
    ];

    static  findAll(): Rover[] {
        return [...this.rovers];
    }

    static  findById(id: number): Rover | undefined {
        return this.rovers.find(rover => rover.id === id);
    }

}
