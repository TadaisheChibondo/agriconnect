import React, { useState, useEffect } from "react";
import { getUserProfile } from "../services/api";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom"; // <--- Added this to handle redirects
import StartupDashboard from "./StartupDashboard";
import FarmerDashboard from "./FarmerDashboard";

const Dashboard = () => {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // <--- Added error tracking

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const profile = await getUserProfile();
        setUserType(profile.user_type);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setError(true); // <--- Trigger the error if the token is missing/invalid
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 font-sans">
        <Loader2 size={40} className="animate-spin text-emerald-600" />
      </div>
    );
  }

  // NEW: If there was an error fetching the profile (e.g. not logged in), boot them to the login page!
  if (error || !userType) {
    return <Navigate to="/login" replace />;
  }

  // Serve the correct dashboard based on the verified database role
  if (userType === "STARTUP") {
    return <StartupDashboard />;
  }

  // Only serve Farmer if they are genuinely authenticated
  return <FarmerDashboard />;
};

export default Dashboard;
