import React from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Building,
  Shield,
  Settings,
  Camera,
} from "lucide-react";

const Profile = () => {
  // For the presentation, we are using mock data here.
  // In a fully scaled app, you would fetch this from your Django API using the token.
  const userProfile = {
    username: "Farmer_John",
    email: "john@agrifarms.co.zw",
    role: "FARMER",
    phone: "+263 77 123 4567",
    location: "Harare, Zimbabwe",
    joinDate: "February 2026",
  };

  const isFarmer = userProfile.role === "FARMER";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          {/* Background decoration */}
          <div
            className={`absolute top-0 right-0 w-64 h-64 rounded-full -mr-20 -mt-20 opacity-10 blur-3xl pointer-events-none ${isFarmer ? "bg-emerald-500" : "bg-blue-500"}`}
          ></div>

          {/* Avatar */}
          <div className="relative group">
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl shadow-inner border-4 border-white ${isFarmer ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}
            >
              <User size={64} />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-transform active:scale-95">
              <Camera size={16} />
            </button>
          </div>

          {/* Basic Info */}
          <div className="text-center md:text-left flex-1 z-10">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">
                {userProfile.username}
              </h1>
              <span
                className={`px-3 py-1 text-[10px] uppercase tracking-wide font-bold rounded-full ${isFarmer ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}
              >
                Verified {userProfile.role}
              </span>
            </div>
            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
              <Mail size={16} /> {userProfile.email}
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Member since {userProfile.joinDate}
            </p>
          </div>

          {/* Edit Button */}
          <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors flex items-center gap-2 z-10">
            <Settings size={18} /> Edit Profile
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Contact Details */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Building size={20} className="text-slate-400" /> Account Details
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 font-medium">
                  <Phone size={18} className="text-slate-400" />{" "}
                  {userProfile.phone}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Primary Location
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 font-medium">
                  <MapPin size={18} className="text-slate-400" />{" "}
                  {userProfile.location}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-4">
                Security Settings
              </h3>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Password</p>
                    <p className="text-xs text-slate-500">
                      Last changed 30 days ago
                    </p>
                  </div>
                </div>
                <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* Stats / Actions Panel */}
          <div className="bg-slate-900 rounded-2xl p-8 shadow-sm text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-5 -mr-10 -mt-10 blur-2xl"></div>

            <div>
              <h2 className="text-lg font-bold text-white mb-6">
                Activity Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                  <span className="text-slate-400 text-sm">
                    Active Listings
                  </span>
                  <span className="font-bold text-xl text-white">4</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                  <span className="text-slate-400 text-sm">
                    Successful Matches
                  </span>
                  <span className="font-bold text-xl text-white">12</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs text-slate-500 mb-3 text-center">
                Need to close your account?
              </p>
              <button className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-lg transition-colors border border-red-500/20 text-sm">
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
