import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import SignUpPage from './pages/SignupPage';
import SettingsPage from './pages/settingsPage';
import AdminAddMovie from './pages/AdminAddMovie';
import MovieDetail from './pages/MoviesDetails';
import SeatSelection from './pages/SeatSelection';
import RechargeWallet from './pages/RechargeWallet';
import ConfirmBooking from './pages/ConfirmBooking';
import MyBookings from './pages/MyBookings';
import Movies from './pages/Movies';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <Router>
      <div data-theme={theme} className="w-full min-h-screen bg-base-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />  
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={authUser ? <MovieDetail /> : <Navigate to="/login" />} />

          {/* Protect Admin Add Movie */}
          <Route
            path="/admin/add-movie"
            element={authUser && authUser.role === "admin" ? <AdminAddMovie /> : <Navigate to="/login" />}
          />

          <Route path="/seatSelection/:id" element={authUser ? <SeatSelection /> : <Navigate to="/login" />} />
          <Route path="/confirmBooking/:id" element={authUser ? <ConfirmBooking /> : <Navigate to="/login" />} />

          {/* Protect My Bookings */}
          <Route path="/my-bookings" element={authUser ? <MyBookings /> : <Navigate to="/login" />} />

          {/* Protect Recharge */}
          <Route path="/recharge" element={authUser ? <RechargeWallet /> : <Navigate to="/login" />} />
        </Routes>

        <Toaster />
      </div>
    </Router>
  );
};

export default App;
