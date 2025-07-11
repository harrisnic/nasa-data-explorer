import { Request, Response } from 'express';
import { ApiResponse, Rover } from '../types';
import {RoverModel} from "../models/Rover";

export class RoverController {

    static async getAllRovers(req: Request, res: Response): Promise<void> {
        try {
            const rovers: Rover[] = await RoverModel.findAll();

            const response: ApiResponse<Rover[]> = {
                success: true,
                results: rovers,
                message: 'Rovers retrieved successfully'
            };
            res.json(response);
        } catch (error) {
            const response: ApiResponse<never> = {
                success: false,
                message: 'Error retrieving rovers',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }

    static async getRoverByName(req: Request, res: Response): Promise<void> {
        try {
            const name = req.params.name;
            const rover = await RoverModel.findByName(name);

            if (!rover) {
                const response: ApiResponse<never> = {
                    success: false,
                    message: 'Rover not found'
                };
                res.status(404).json(response);
                return;
            }

            const response: ApiResponse<Rover> = {
                success: true,
                results: rover,
                message: 'Rover retrieved successfully'
            };
            res.json(response);
        } catch (error) {
            const response: ApiResponse<never> = {
                success: false,
                message: 'Error retrieving rover',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }

}
