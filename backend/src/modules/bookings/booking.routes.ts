import { Router } from 'express';
import { createBooking, getUserBookings, cancelBooking } from './booking.controller.js';
import { authenticateToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticateToken, createBooking);
router.get('/', authenticateToken, getUserBookings);
router.delete('/:id', authenticateToken, cancelBooking);

export default router;
