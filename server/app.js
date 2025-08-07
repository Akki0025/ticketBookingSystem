import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


import { connectDB } from './config/db.js';
// Import Routes
import authRoutes from './routes/authRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/wallet', walletRoutes);

// MongoDB Connection

// Server
app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});
