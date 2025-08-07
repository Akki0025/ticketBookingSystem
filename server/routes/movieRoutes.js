import express from 'express';
import { createMovie, getMovie, bookSeat,getMovieSeats ,getMovieById} from '../controllers/movieController.js';
import { ProtectRoute, admin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', ProtectRoute, admin, createMovie);
router.get('/', getMovie);
router.get('/:id', getMovieById);
router.get('/:id/seats', getMovieSeats);
router.post('/:id/book', ProtectRoute, bookSeat);

export default router;
