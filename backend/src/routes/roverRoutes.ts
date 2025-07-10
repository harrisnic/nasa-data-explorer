import { Router } from 'express';
import { RoverController } from '../controllers/roverController';

const router = Router();

router.get('/', RoverController.getAllRovers);
router.get('/:id', RoverController.getRoverById);

export default router;
