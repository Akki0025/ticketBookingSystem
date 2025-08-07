import express from 'express';
import { getWallet, rechargeWallet } from '../controllers/walletController.js';
import { ProtectRoute } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', ProtectRoute, getWallet);
router.post('/recharge', ProtectRoute, rechargeWallet);

export default router;
