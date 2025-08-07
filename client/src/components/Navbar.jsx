import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Projector, Settings, User, Wallet } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
      backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Projector className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Booky</h1>
            </Link>

            <nav className="flex gap-4">
              <Link to="/movies" className="hover:text-primary transition-colors">Movies</Link>

              {/* Show My Bookings only if logged in */}
              {authUser && (
                <Link to="/my-bookings" className="hover:text-primary transition-colors">My Bookings</Link>
              )}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Wallet Balance */}
            {authUser && (
              <div className="flex items-center gap-2 bg-base-200 px-3 py-1 rounded-lg" data-testid="navbar-wallet">
                <Wallet className="w-4 h-4 text-green-500" />
                <span>₹{authUser.walletBalance}</span>
              </div>
            )}

            {/* Admin Add Movie */}
            {authUser && authUser.role === "admin" && (
              <Link
                to="/admin/add-movie"
                className="btn btn-sm btn-secondary gap-2"
              >
                Add Movie
              </Link>
            )}

            {/* Recharge Button (only if logged in) */}
            {authUser && (
              <Link to={"/recharge"} className="btn btn-sm gap-2 transition-colors">
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Recharge</span>
              </Link>
            )}

            {/* Settings & Auth Links */}
            {authUser ? (
              <>
                <Link to={"/settings"} className={`btn btn-sm gap-2`}>
                  <Settings className="size-5" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link to={"/login"} className={`btn btn-sm gap-2`}>
                <User className="size-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
