import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Volume2, VolumeX } from "lucide-react";
import Trailer from "../assets/trailer.mp4";

const MovieDetail = () => {
    const { id } = useParams(); // movie ID from URL
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedShowtime, setSelectedShowtime] = useState("");
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
                setMovie(res.data);
            } catch (err) {
                console.error("Failed to fetch movie:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
        }
    };

    const handleBooking = () => {
        navigate(`/seatSelection/${id}?showtime=${selectedShowtime}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin w-8 h-8" />
            </div>
        );
    }

    if (!movie) {
        return <div className="text-center mt-10">Movie not found.</div>;
    }

    return (
        <div className="min-h-screen container mx-auto px-4 pt-20 max-w-5xl">
            {/* Trailer Rectangle */}
            <div className="relative w-full mb-6 rounded-lg overflow-hidden">
                <video
                    ref={videoRef}
                    className="w-full h-[400px] sm:h-[600px] object-cover"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                >
                    <source src={Trailer} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button
                    className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white"
                    onClick={toggleMute}
                >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <p className="text-gray-600 mb-4">{movie.description}</p>
            <div className="mb-4">
                <strong>Duration:</strong> {movie.duration} mins
            </div>
            <div className="mb-4">
                <strong>Price:</strong> ₹{movie.price}
            </div>

            {/* Showtime Selection */}
            <div className="mb-4">
                <strong>Select Showtime:</strong>
                <div className="flex flex-wrap gap-3 mt-2">
                    {movie.showtimes.map((time, index) => {
                        // Calculate available seats
                        const seatsForShowtime = movie.seats[time];
                        const availableSeats = seatsForShowtime
                            ? Object.values(seatsForShowtime).filter((status) => !status).length
                            : 0;

                        return (
                            <button
                                key={index}
                                className={`flex flex-col items-center px-4 py-2 rounded border ${selectedShowtime === time
                                        ? "bg-blue-600 text-white"
                                        : "bg-white border-gray-300"
                                    } hover:bg-blue-100`}
                                onClick={() => setSelectedShowtime(time)}
                            >
                                <span className="font-semibold">{time}</span>
                                <span className="text-sm text-gray-600">
                                    {availableSeats} / {movie.totalSeats} seats
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>


            {/* Book Now Button */}
            <button
                disabled={!selectedShowtime}
                onClick={handleBooking}
                className={`w-full py-3 rounded-lg text-white text-lg transition ${selectedShowtime
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                {selectedShowtime ? "Book Now" : "Select Showtime to Book"}
            </button>
        </div>
    );
};

export default MovieDetail;
