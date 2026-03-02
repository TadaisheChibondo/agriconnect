import React, { useState, useEffect } from "react";
import { getUserProfile } from "../services/api";
import { Loader2 } from "lucide-react";
import StartupDashboard from "./StartupDashboard";
import FarmerDashboard from "./FarmerDashboard";

const Dashboard = () => {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const profile = await getUserProfile();
        setUserType(profile.user_type);
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 size={40} className="animate-spin text-emerald-600" />
      </div>
    );
  }

  // Serve the correct dashboard based on the database role
  if (userType === "STARTUP") {
    return <StartupDashboard />;
  }

  // Default to Farmer view
  return <FarmerDashboard />;
};

export default Dashboard;
//fixing error
