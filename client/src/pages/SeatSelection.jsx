import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SeatSelection = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const selectedShowtime = searchParams.get("showtime");

  const [seats, setSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setSeats(Array.from({ length: res.data.totalSeats }, (_, i) => i + 1));

        // ✅ Access seats for selectedShowtime
        const showtimeSeats = res.data.seats[selectedShowtime];

        if (showtimeSeats) {
          const booked = Object.keys(showtimeSeats)
            .filter((seatNum) => showtimeSeats[seatNum]) // true = booked
            .map(Number);
          setBookedSeats(booked);
        }
      } catch (error) {
        console.error("Error fetching seats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [id, selectedShowtime]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = () => {
    navigate(`/confirmBooking/${id}?seats=${selectedSeats.join(",")}&showtime=${selectedShowtime}`);
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <h1 className="text-2xl mb-4 font-bold">Select Your Seats</h1>

      {/* Legend */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-blue-500 rounded" /> Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-400 rounded" /> Booked
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-500 rounded" /> Selected
        </div>
      </div>

      <div className="grid grid-cols-10 gap-4 max-w-4xl mx-auto mb-10">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            className={`w-10 h-10 rounded ${bookedSeats.includes(seat)
                ? "bg-gray-400 cursor-not-allowed"
                : selectedSeats.includes(seat)
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
            disabled={bookedSeats.includes(seat)}
          >
            {seat}
          </button>
        ))}
      </div>

      <div className="text-center mb-4">
        <p className="mb-2">
          <strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}
        </p>
        <button
          onClick={handleBooking}
          className={`px-6 py-2 rounded bg-purple-600 text-white ${selectedSeats.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={selectedSeats.length === 0}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
