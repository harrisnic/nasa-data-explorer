import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import {manifestValidationRules} from "../validation";
import {BadRequestError} from "../errors";
import {ApiResponse, Manifest} from "../types";
import {ManifestService} from "../services/manifestService";

export class ManifestController {

    static validateRoverManifest = manifestValidationRules.getRoverManifest

    static async getRoverManifest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new BadRequestError(`Invalid parameters: ${errors.array()[0].msg}`);
            }

            const rover = req.query.rover as string;

            const manifest: Manifest = await ManifestService.findByRoverName(rover);

            const response: ApiResponse<Manifest> = {
                success: true,
                results: manifest,
                message: 'Rover manifest retrieved successfully'
            };

            res.status(200).json(response);

        } catch (error: unknown) {
            next(error);
        }
    }

}
