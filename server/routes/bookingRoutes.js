import express from 'express';
import { bookTicket, userBookings } from '../controllers/bookingController.js';
import { ProtectRoute } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', ProtectRoute, bookTicket);
router.get('/', ProtectRoute, userBookings);

export default router;
