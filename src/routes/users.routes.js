import express from 'express';
import UserController from '../controllers/user.controller.js';
import { validateJWT } from '../middlewares/auth.middleware.js';
import { validateRole } from '../middlewares/role.middleware.js';

const router = express.Router();

router.get('/', validateJWT, validateRole('admin'), UserController.getAll);
router.get('/:id', validateJWT, validateRole('admin'), UserController.getById);
router.put('/:id', validateJWT, validateRole('admin'), UserController.update);
router.delete('/:id', validateJWT, validateRole('admin'), UserController.delete);

export default router;
