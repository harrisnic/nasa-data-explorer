import { Router } from 'express';
import {PhotoController} from "../controllers/photoController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Photo:
 *       type: object
 *       required:
 *         - id
 *         - img_src
 *         - earth_date
 *         - rover
 *         - camera
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the photo
 *         img_src:
 *           type: string
 *           description: The URL of the image
 *         earth_date:
 *           type: string
 *           format: date
 *           description: The Earth date when the photo was taken
 *         rover:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the rover
 *             status:
 *               type: string
 *               description: The status of the rover
 *         camera:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the camera
 *             full_name:
 *               type: string
 *               description: The full name of the camera
 *       example:
 *         id: 102693
 *         img_src: "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG"
 *         earth_date: "2015-05-30"
 *         rover:
 *           name: "Curiosity"
 *           status: "active"
 *         camera:
 *           name: "FHAZ"
 *           full_name: "Front Hazard Avoidance Camera"
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Photo'
 *         message:
 *           type: string
 *           description: Response message
 *       example:
 *         success: true
 *         results: []
 *         message: "Rover photos retrieved successfully"
 */

/**
 * @swagger
 * /api/photos:
 *   get:
 *     summary: Get photos by rover and date
 *     tags: [Photos]
 *     parameters:
 *       - in: query
 *         name: rover
 *         required: true
 *         schema:
 *           type: string
 *           enum: [curiosity, opportunity, spirit]
 *         description: The name of the Mars rover
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *         description: The Earth date (YYYY-MM-DD). If not provided, returns latest photos
 *     responses:
 *       200:
 *         description: List of photos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid parameters: rover must be one of [curiosity, opportunity, spirit]"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// GET /api/photos?rover=spirit&date=2025-1-1
router.get('/', PhotoController.validateRoverAndDate, PhotoController.getPhotosByRoverAndDate);

export default router;
