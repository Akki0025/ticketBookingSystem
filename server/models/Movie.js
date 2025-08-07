import mongoose from 'mongoose';

const FIXED_SHOWTIMES = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"];

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  showtimes: {
    type: [String],
    default: FIXED_SHOWTIMES, // Predefined slots
  },
  totalSeats: Number,

  // Seats per showtime: Map<showtime, Map<seatNumber, Boolean>>
  seats: { 
    type: Map,
    of: {
      type: Map,
      of: Boolean,
    },
    default: {}
  },

  price: Number,
});

// Pre-save hook to initialize seats for fixed showtimes
MovieSchema.pre('save', function (next) {
  // Only initialize seats when movie is new
  if (this.isNew && this.totalSeats) {
    for (let showtime of FIXED_SHOWTIMES) {
      const seatsForShowtime = new Map();
      for (let i = 1; i <= this.totalSeats; i++) {
        seatsForShowtime.set(i.toString(), false); // Initially vacant
      }
      this.seats.set(showtime, seatsForShowtime);
    }
  }
  next();
});

const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;
