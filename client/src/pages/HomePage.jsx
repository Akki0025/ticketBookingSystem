import React from "react";
import { Link } from "react-router-dom";
import { Ticket, Wallet, Film, UserCheck } from "lucide-react";

const HomePage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Booky - Your Ultimate Movie Ticket Booking Platform</h1>
          <p className="text-lg mb-8">Seamlessly book your favorite movies, manage your wallet, and view bookings in one place.</p>
          <Link
            to="/movies"
            className="bg-white text-purple-700 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Browse Movies
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white shadow-lg p-6 rounded-xl text-center">
            <Ticket className="mx-auto w-12 h-12 text-purple-600 mb-4" />
            <h3 className="font-bold mb-2">Seat Selection</h3>
            <p>Choose your preferred seats in real-time and avoid double bookings.</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl text-center">
            <Wallet className="mx-auto w-12 h-12 text-purple-600 mb-4" />
            <h3 className="font-bold mb-2">Wallet Integration</h3>
            <p>Recharge your wallet, and make instant payments without hassle.</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl text-center">
            <UserCheck className="mx-auto w-12 h-12 text-purple-600 mb-4" />
            <h3 className="font-bold mb-2">Admin Panel</h3>
            <p>Admins can easily add, update, or manage movies and showtimes.</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl text-center">
            <Film className="mx-auto w-12 h-12 text-purple-600 mb-4" />
            <h3 className="font-bold mb-2">My Bookings</h3>
            <p>View your past & current bookings anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="font-semibold mb-2">1️⃣ Sign Up / Log In</h3>
              <p>Create an account or log in to start booking your favorite movies.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="font-semibold mb-2">2️⃣ Browse & Select</h3>
              <p>View available movies, select showtime & seats of your choice.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="font-semibold mb-2">3️⃣ Pay & Confirm</h3>
              <p>Recharge wallet, confirm booking, and receive instant ticket confirmation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Booky. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
