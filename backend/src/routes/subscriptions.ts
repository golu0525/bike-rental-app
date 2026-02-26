import { Router } from 'express';
import { createSubscription, getUserSubscriptions, cancelSubscription } from '../controllers/subscriptions.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use(authenticateToken);

router.post('/', createSubscription);
router.get('/user', getUserSubscriptions);
router.put('/cancel/:id', cancelSubscription);

export default router;
