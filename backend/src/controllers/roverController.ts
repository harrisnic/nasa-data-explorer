import { Request, Response } from 'express';
import { RoverModel } from '../models/Rover.js';
import { ApiResponse, Rover } from '../types';

export class RoverController {

    static async getAllRovers(req: Request, res: Response): Promise<void> {
        try {
            const rovers: Rover[] = RoverModel.findAll();

            const response: ApiResponse<Rover[]> = {
                success: true,
                data: rovers,
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

    static async getRoverById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                const response: ApiResponse<never> = {
                    success: false,
                    message: 'Invalid rover ID'
                };
                res.status(400).json(response);
                return;
            }

            const rover = RoverModel.findById(id);

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
                data: rover,
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
