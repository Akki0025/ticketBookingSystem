import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const MyBookings = () => {
  const { authUser, myBookings, isLoadingBookings, fetchBookings } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      fetchBookings();
    }
  }, [authUser, fetchBookings]);

  if (isLoadingBookings) {
    return <div className="text-center mt-10">Loading your bookings...</div>;
  }

  if (!myBookings.length) {
    return <div className="text-center mt-10">No bookings found.</div>;
  }

  return (
    <div className="container mx-auto mt-16 px-4">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <ul className="space-y-4">
        {myBookings.map((booking) => (
          <li key={booking._id} className="border p-4 rounded-lg bg-base-200">
            <h2 className="font-semibold text-lg mb-2">{booking.movie?.title}</h2>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
