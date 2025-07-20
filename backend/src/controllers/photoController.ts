import {NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';
import {photoValidationRules} from "../validation";
import {BadRequestError} from "../errors";
import {ApiResponse, Photo} from "../types";
import {PhotoService} from "../services/photoService";

export class PhotoController {

    static validateRoverAndDate = photoValidationRules.getByRoverAndDate

    static async getPhotosByRoverAndDate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new BadRequestError(`Invalid parameters: ${errors.array()[0].msg}`);
            }

            const { rover, date } = req.query as { rover: string; date?: string | null; };

            let photos: Photo[];

            if (date) {
                photos = await PhotoService.findByRoverAndDate(rover, date);
            } else {
                photos = await PhotoService.findLatestByRoverName(rover)
            }

            const response: ApiResponse<Photo[]> = {
                success: true,
                results: photos,
                message: 'Rover photos retrieved successfully'
            };
            res.status(200).json(response);

        } catch (error: unknown) {
            next(error);
        }
    }

}
