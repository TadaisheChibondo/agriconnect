import React, { useState, useEffect } from "react";
import { getUserProfile } from "../services/api";
import {
  User,
  MapPin,
  Phone,
  Building,
  Shield,
  Settings,
  Camera,
  Loader2,
  Sprout,
  Factory,
} from "lucide-react";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUserProfile(data);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 size={40} className="animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-500 font-bold">Failed to load profile data.</p>
      </div>
    );
  }

  const isFarmer = userProfile.user_type === "FARMER";

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div
            className={`absolute top-0 right-0 w-64 h-64 rounded-full -mr-20 -mt-20 opacity-10 blur-3xl pointer-events-none ${isFarmer ? "bg-emerald-500" : "bg-amber-500"}`}
          ></div>

          {/* Avatar */}
          <div className="relative group z-10">
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl shadow-inner border-4 border-white ${isFarmer ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}
            >
              {isFarmer ? <Sprout size={50} /> : <Factory size={50} />}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-green-950 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-colors active:scale-95">
              <Camera size={16} />
            </button>
          </div>

          {/* Basic Info */}
          <div className="text-center md:text-left flex-1 z-10">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl font-bold text-stone-900 capitalize">
                {userProfile.username}
              </h1>
              <span
                className={`px-3 py-1 text-[10px] uppercase tracking-wide font-bold rounded-full ${isFarmer ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
              >
                Verified {userProfile.user_type}
              </span>
            </div>

            {/* Conditional Specialty / Company Name Display */}
            {isFarmer ? (
              <p className="text-stone-600 font-medium mt-1">
                Specialty:{" "}
                <span className="text-emerald-700">
                  {userProfile.specialty || "Mixed Farming"}
                </span>
              </p>
            ) : (
              <p className="text-stone-600 font-medium mt-1">
                Company:{" "}
                <span className="text-amber-700">
                  {userProfile.company_name || "Startup"}
                </span>
              </p>
            )}
          </div>

          {/* Edit Button */}
          <button className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg transition-colors flex items-center gap-2 z-10">
            <Settings size={18} /> Edit Profile
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Contact Details */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
            <h2 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
              <Building size={20} className="text-stone-400" /> Account Details
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-400 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-200 text-stone-700 font-medium">
                  <Phone size={18} className="text-stone-400" />{" "}
                  {userProfile.phone || "Not provided"}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-400 mb-1">
                  Primary Location
                </label>
                <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-200 text-stone-700 font-medium capitalize">
                  <MapPin size={18} className="text-stone-400" />{" "}
                  {userProfile.location || "Not provided"}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <h3 className="text-sm font-bold text-stone-800 mb-4">
                Security Settings
              </h3>
              <div className="flex items-center justify-between p-4 border border-stone-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-stone-100 text-stone-600 rounded-lg">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800">Password</p>
                    <p className="text-xs text-stone-500">
                      Manage your secure access
                    </p>
                  </div>
                </div>
                <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* Stats / Actions Panel */}
          <div className="bg-green-950 rounded-2xl p-8 shadow-sm text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full opacity-10 -mr-10 -mt-10 blur-2xl"></div>

            <div className="z-10">
              <h2 className="text-lg font-bold text-white mb-6">
                Activity Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-green-900">
                  <span className="text-stone-400 text-sm">
                    {isFarmer ? "Active Listings" : "Active Requirements"}
                  </span>
                  <span className="font-bold text-xl text-emerald-400">0</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-green-900">
                  <span className="text-stone-400 text-sm">
                    Pending Matches
                  </span>
                  <span className="font-bold text-xl text-emerald-400">0</span>
                </div>
              </div>
            </div>

            <div className="mt-8 z-10">
              <p className="text-xs text-stone-500 mb-3 text-center">
                Need to close your account?
              </p>
              <button className="w-full py-2.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 font-semibold rounded-lg transition-colors border border-red-900/30 text-sm">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
