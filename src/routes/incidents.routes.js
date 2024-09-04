import express from 'express';
import IncidentController from '../controllers/incident.controller.js';
import { validateJWT } from '../middlewares/auth.middleware.js';
import { validateRole } from '../middlewares/role.middleware.js';
import { imagesUpload } from '../config/multer.js';

const router = express.Router();


router.post('/', validateJWT, validateRole('resident'), imagesUpload.array('images', 5), IncidentController.create);
router.get('/', validateJWT, IncidentController.getAll);
router.get('/:id', validateJWT, IncidentController.getById);
router.put('/:id', validateJWT, validateRole('resident'), imagesUpload.array('images', 5), IncidentController.update);
router.delete('/:id', validateJWT, validateRole('resident'), IncidentController.delete);

export default router;
