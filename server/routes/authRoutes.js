import express from 'express';
import { signup, login, logout,check } from '../controllers/authController.js';
import { ProtectRoute } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check',ProtectRoute, check);


export default router;
