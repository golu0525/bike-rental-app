import { Router } from 'express';
import { getBikes, addBike, updateBike, deleteBike } from './bike.controller.js';
import { authenticateToken, isAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getBikes);

// Admin routes
router.post('/', authenticateToken, isAdmin, addBike);
router.put('/:id', authenticateToken, isAdmin, updateBike);
router.delete('/:id', authenticateToken, isAdmin, deleteBike);

export default router;
