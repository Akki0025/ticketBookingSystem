import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";

const ConfirmBooking = () => {
    const { id } = useParams(); // Movie ID
    const [searchParams] = useSearchParams();
    const { logout, authUser } = useAuthStore();
    const navigate = useNavigate();

    const seatsParam = searchParams.get("seats");
    
    const selectedShowtime = searchParams.get("showtime");

    const [seats, setSeats] = useState([]);
    const [movie, setMovie] = useState(null);
    const [confirming, setConfirming] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!seatsParam || !selectedShowtime) {
            setError("Invalid booking request. Missing seats or showtime.");
            setLoading(false);
            return;
        }

        setSeats(seatsParam.split(",").map(Number));

        const fetchMovieDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
                setMovie(res.data);
            } catch (err) {
                console.error("Failed to fetch movie:", err);
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id, seatsParam, selectedShowtime]);

    const handleConfirmBooking = async () => {
        setConfirming(true);
        if(authUser.walletBalance < movie.price * seats.length) {
            alert("Insufficient balance. Please recharge your wallet.");
            setConfirming(false);
            return;
        }
        try {
            await axios.post(
                "http://localhost:5000/api/bookings",
                {
                    movieId: id,
                    seatNumbers: seats,
                    price: movie.price,
                    selectedShowtime: selectedShowtime,
                },
                { withCredentials: true }
            );
            if(res.status === 400) {
                alert("Seat already booked. Please try again.");
                return;}

            alert("Booking Successful!");
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Booking failed");
        } finally {
            setConfirming(false);
        }
    };


    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen container mx-auto px-4 pt-20 max-w-5xl">
            <h1 className="text-2xl mb-4 font-bold">Confirm Booking</h1>
            <div className="mb-6">
                <strong>Movie:</strong> {movie.title}
            </div>
            <div className="mb-6" >
                <strong>Showtime:</strong> 
                <span data-testid="showtime-info">{selectedShowtime}</span>
            </div>
            <div className="mb-6">
                <strong>Selected Seats:</strong> {seats.join(", ")}
            </div>
            <div className="mb-6">
                <strong>Total Price:</strong> ₹{movie.price * seats.length}
            </div>
            <button
                onClick={handleConfirmBooking}
                disabled={confirming}
                className={`px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg ${confirming ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {confirming ? "Confirming..." : "Confirm Booking"}
            </button>

            {error && <div className="mt-4 text-red-500">{error}</div>}
        </div>
    );
};

export default ConfirmBooking;
