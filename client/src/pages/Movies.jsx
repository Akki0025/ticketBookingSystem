// src/pages/Movies.jsx
import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api/movieApi";
import { Link } from "react-router-dom";
import { Loader2, Film } from "lucide-react";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Film className="w-6 h-6" />
        Available Movies
      </h1>

      {movies.length === 0 ? (
        <p>No movies available!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie._id} className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition-all">
              <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
              <p className="text-sm mb-2 text-gray-600">{movie.description}</p>
              <p className="text-sm mb-2">Duration: {movie.duration}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.showtimes.map((time, idx) => (
                  <span key={idx} className="badge badge-primary">{time}</span>
                ))}
              </div>
              <Link
                to={`/movies/${movie._id}`}
                className="btn btn-sm btn-primary"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
