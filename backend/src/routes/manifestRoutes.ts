import { Router } from 'express';
import {ManifestController} from "../controllers/manifestController";

const router = Router();

// GET /api/manifests?rover=spirit
router.get('/', ManifestController.validateRoverManifest, ManifestController.getRoverManifest);

export default router;
