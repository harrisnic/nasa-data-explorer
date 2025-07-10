import { Router } from 'express';
import {PhotoController} from "../controllers/photoController";

const router = Router();

// GET /api/photos/rover/:id/date/:date
router.get('/rover/:id/date/:date', PhotoController.validate, PhotoController.getPhotosByRoverIdAndDate);

export default router;
