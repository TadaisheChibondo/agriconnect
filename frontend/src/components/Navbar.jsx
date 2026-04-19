import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sprout,
  Bell,
  LogOut,
  Info,
  UserPlus,
  Home,
  LayoutDashboard,
  User,
  Search, // <--- NEW ICON IMPORT
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm font-sans">
      {/* 1. Logo Section */}
      <Link
        to={isLoggedIn ? "/dashboard" : "/"}
        className="flex items-center gap-3 group mr-4"
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors bg-emerald-100 text-emerald-600">
          <Sprout size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-stone-900 leading-none group-hover:text-emerald-700 transition-colors">
            Yield-Trade
          </h1>
          <p className="text-xs text-stone-500 font-medium">
            Agricultural Marketplace
          </p>
        </div>
      </Link>

      {/* 2. Right Actions & Links */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Main Navigation Links */}
        <div className="hidden md:flex items-center gap-4 mr-2">
          <Link
            to="/"
            className="text-sm font-medium text-stone-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
          >
            <Home size={16} /> Home
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-stone-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                <LayoutDashboard size={16} /> Dashboard
              </Link>

              {/* NEW BROWSE LINK */}
              <Link
                to="/marketplace"
                className="text-sm font-medium text-stone-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                <Search size={16} /> Browse
              </Link>
            </>
          )}

          <Link
            to="/about"
            className="text-sm font-medium text-stone-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
          >
            <Info size={16} /> About
          </Link>
        </div>

        <div className="h-6 w-[1px] bg-stone-200 hidden md:block"></div>

        {isLoggedIn ? (
          <div className="flex items-center gap-3 md:gap-4">
            <button className="relative p-2 text-stone-400 hover:text-stone-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {/* Profile Button */}
            <Link
              to="/profile"
              className="p-2 text-stone-400 hover:text-emerald-600 transition-colors bg-stone-50 rounded-full border border-stone-200"
            >
              <User size={20} />
            </Link>

            <div className="h-8 w-[1px] bg-stone-200 hidden md:block"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />{" "}
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-stone-600 font-bold text-sm hover:text-stone-900 px-2 py-2 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-950 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-green-900/20 flex items-center gap-2"
            >
              Get Started <UserPlus size={16} />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
