import { Router } from 'express';
import { RoverController } from '../controllers/roverController';

const router = Router();

// GET /api/rovers
router.get('/', RoverController.getAllRovers);
// GET /api/rovers/spirit
router.get('/:rover', RoverController.getRoverByName);

export default router;
