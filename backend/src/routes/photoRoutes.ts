import { Router } from 'express';
import {PhotoController} from "../controllers/photoController";

const router = Router();

// GET /api/photos
// GET /api/photos?rover=Curiosity&date=2025-07-10
router.get('/', PhotoController.validateRoverAndDate, PhotoController.getPhotosByRoverAndDate);

export default router;
