import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';
import User from '../models/User.js';

import mongoose from 'mongoose';

export const bookTicket = async (req, res) => {
  const { movieId, seatNumbers, price, selectedShowtime } = req.body;
  // seatNumbers should be an array like: [1,2,3]

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.findById(req.user.id).session(session);
    const movie = await Movie.findById(movieId).session(session);

    if (!movie || !movie.showtimes.includes(selectedShowtime)) {
      throw new Error("Invalid movie/showtime");
    }

    // Check if selectedShowtime exists in movie.seats
    const showtimeSeats = movie.seats.get(selectedShowtime);
    if (!showtimeSeats) {
      throw new Error("Seats for selected showtime not initialized");
    }

    // Check if any seat is already booked
    for (let seat of seatNumbers) {
      const seatStr = seat.toString();
      if (showtimeSeats.get(seatStr)) {
        throw new Error(`Seat ${seat} already booked`);
      }
    }

    // Check wallet balance
    const totalPrice = price * seatNumbers.length;
    if (user.walletBalance < totalPrice) {
      throw new Error("Insufficient balance");
    }

    // Mark all selected seats booked
    for (let seat of seatNumbers) {
      const seatStr = seat.toString();
      showtimeSeats.set(seatStr, true);
    }

    // Save updated movie seats
    movie.seats.set(selectedShowtime, showtimeSeats);
    movie.markModified('seats'); 
    await movie.save({ session });

    // Deduct wallet balance
    user.walletBalance -= totalPrice;
    await user.save({ session });

    // Create booking
    const booking = await Booking.create(
      [
        {
          user: req.user.id,
          movie:movieId,
          showtime: selectedShowtime,
          seats: seatNumbers,
          totalAmount: totalPrice,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    res.status(201).json(booking[0]);
  } catch (error) {
    console.error(error);

    // Rollback if active
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    res.status(400).json({ message: error.message || "Booking failed" });
  } finally {
    session.endSession();
  }
};



export const userBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('movie');
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching bookings' });
  }
};
