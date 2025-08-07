import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showtime: { type: String, required: true },
  seats: [{ type: String, required: true }], // Seat numbers stored as strings, matching MovieSchema
  totalAmount: { type: Number, required: true },
  bookingTime: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
