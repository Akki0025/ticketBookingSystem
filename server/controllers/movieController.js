import Movie from '../models/Movie.js';


const FIXED_SHOWTIMES = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"];

export const createMovie = async (req, res) => {
  const { title, description, duration, price } = req.body;

  try {
    const newMovie = new Movie({
      title,
      description,
      duration,
      showtimes: FIXED_SHOWTIMES,  // Always using fixed slots
      totalSeats: 50,              // Fixed 50 seats
      price
    });

    console.log("New movie:", newMovie);
    await newMovie.save();

    console.log("Movie saved:", newMovie);
    res.status(201).json(newMovie);
    
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating movie', error });
  }
};




export const getMovie = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching movies' });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movies = await Movie.findById(req.params.id);
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching movies' });
  }
};


export const getMovieSeats = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.status(200).json({
      movieTitle: movie.title,
      seats: movie.seats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seats' });
  }
};


export const bookSeat= async (req, res) => {
  const { seatNumber } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie.seats.get(seatNumber)) return res.status(400).json({ message: 'Seat already booked' });
    movie.seats.set(seatNumber, true);
    await movie.save();
    res.json({ message: `Seat ${seatNumber} booked` });
  } catch (error) {
    res.status(400).json({ message: 'Error booking seat' });
  }
};
