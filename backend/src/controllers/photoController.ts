import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {photoValidationRules} from "../validation";
import {NotFoundError} from "../errors";
import {Photo} from "../types";
import {PhotoService} from "../services/photoService";

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
            const { rover, date }: {rover: string, date: string | null} = req.query;
            let photos: Photo[] | [];

            if (date) {
                photos = await PhotoService.findByRoverAndDate(rover, date);
            } else {
                photos = await PhotoService.findLatestByRoverName(rover)
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
