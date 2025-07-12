import { Request, Response } from 'express';
import { PhotoModel } from '../models/Photo';
import { validationResult } from 'express-validator';
import {photoValidationRules} from "../validation";
import {NotFoundError} from "../errors";

export class PhotoController {

    static validateRoverAndDate = photoValidationRules.getByRoverAndDate

    static async getPhotosByRoverAndDate(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                error: 'Invalid parameters: ' + errors.array()[0].msg
            });
            return;
        }

        try {
            const { rover, date }: {rover: string, date: string} = req.query;
            let photos;

            if (date) {
                photos = await PhotoModel.findByRoverAndDate(rover, date);
            } else {
                photos = await PhotoModel.findLatestByRoverName(rover)
            }

            res.status(200).json({
                success: true,
                results: photos,
                message: 'Rover photos retrieved successfully'
            });

        } catch (error: unknown) {
            if (error instanceof NotFoundError) {
                res.status(error.statusCode).json({
                    success: false,
                    error: error.message
                });
            } else if (error instanceof Error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    error: 'An unknown error occurred'
                });
            }
        }
    }

}
