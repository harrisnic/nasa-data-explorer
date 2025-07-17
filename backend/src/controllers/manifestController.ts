import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {manifestValidationRules} from "../validation";
import {NotFoundError} from "../errors";
import {Manifest} from "../types";
import {ManifestModel} from "../models/Manifest";

export class ManifestController {

    static validateRoverManifest = manifestValidationRules.getRoverManifest

    static async getRoverManifest(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                error: 'Invalid parameters: ' + errors.array()[0].msg
            });
            return;
        }

        try {
            const { rover }: { rover: string } = req.query;

            const manifest: Manifest | undefined = await ManifestModel.findByRoverName(rover);

            res.status(200).json({
                success: true,
                results: manifest,
                message: 'Rover manifest retrieved successfully'
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
