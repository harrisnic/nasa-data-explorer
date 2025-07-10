import { Request, Response } from 'express';
import { PhotoModel } from '../models/Photo';
import { validationResult } from 'express-validator';
import {photoValidationRules} from "../validation";

export class PhotoController {

    static validate = photoValidationRules.getByRoverIdAndDate

    static async getPhotosByRoverIdAndDate(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                error: 'Invalid parameters: ' + errors.array()[0].msg
            });
            return;
        }

        try {
            const { id, date } = req.params;
            const photos = await PhotoModel.findByRoverIdAndDate(Number(id), date);

            res.status(200).json({
                success: true,
                results: photos,
                message: 'Rover photos retrieved successfully'
            });

        } catch (error) {
            const status = error.message.includes('not found') ? 404 : 500;
            res.status(status).json({
                success: false,
                error: error.message
            });
        }
    }

}
