import {NextFunction, Request, Response} from 'express';
import { ApiResponse, Rover } from '../types';
import {RoverService} from "../services/roverService";

export class RoverController {

    static async getAllRovers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const rovers: Rover[] = await RoverService.findAll();
            const response: ApiResponse<Rover[]> = {
                success: true,
                results: rovers,
                message: 'Rovers retrieved successfully'
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    static async getRoverByName(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const name = req.params.rover;
            const rover = await RoverService.findByName(name);

            const response: ApiResponse<Rover> = {
                success: true,
                results: rover,
                message: 'Rover retrieved successfully'
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

}
