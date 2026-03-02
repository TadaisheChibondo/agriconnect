import React, { useEffect, useState } from "react";
import { getListings, getMatches } from "../services/api";
import CreateListingForm from "../components/CreateListingForm";
import ContactModal from "../components/ContactModal";
import WeatherWidget from "./WeatherWidget";
import {
  Sprout,
  DollarSign,
  Building,
  CheckCircle,
  Leaf,
  AlertCircle,
  Plus,
  Search,
} from "lucide-react";

const FarmerDashboard = () => {
  const [listings, setListings] = useState([]);
  const [matches, setMatches] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState(null);

  const loadDashboard = async () => {
    setLoading(true);
    const fetchedListings = await getListings();
    setListings(fetchedListings);

    const matchData = {};
    for (const listing of fetchedListings) {
      matchData[listing.id] = await getMatches(listing.id);
    }
    setMatches(matchData);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 pb-20 font-sans">
      {/* 1. HERO SECTION */}
      <div className="bg-green-950 text-white py-12 px-8 mb-10 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full -mr-20 -mt-32 opacity-20 blur-3xl animate-pulse"></div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 text-emerald-400 font-bold uppercase tracking-wider text-xs">
              <Sprout size={16} /> Farmer Portal
            </div>
            <h1 className="text-4xl font-bold mb-2 font-display">
              Harvest Management
            </h1>
            <p className="text-stone-300 max-w-lg">
              Track your active listings and review verified industrial buyers.
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="hidden md:block w-64">
              <WeatherWidget />
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition active:scale-95"
            >
              <Plus size={20} /> Post Harvest
            </button>
          </div>
        </div>
      </div>

      {/* 2. LISTINGS FEED */}
      <div className="max-w-6xl mx-auto px-8 space-y-8">
        {loading ? (
          <div className="text-center py-20 text-stone-400 font-medium">
            Loading harvest data...
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300">
            <Leaf size={48} className="mx-auto text-stone-300 mb-4" />
            <h3 className="text-lg font-bold text-stone-600">
              No Active Harvests
            </h3>
            <button
              onClick={() => setShowForm(true)}
              className="text-emerald-600 font-bold hover:underline mt-2 transition-colors"
            >
              Post your first listing
            </button>
          </div>
        ) : (
          listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition"
            >
              {/* Header */}
              <div className="bg-stone-50 border-b border-stone-200 p-6 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2 capitalize">
                    {listing.crop_name}{" "}
                    <span className="text-xs font-bold text-stone-500 bg-white border border-stone-200 px-2 py-0.5 rounded uppercase">
                      Listed
                    </span>
                  </h2>
                  <div className="flex gap-4 mt-2 text-sm text-stone-600">
                    <span className="flex items-center gap-1">
                      <Leaf size={14} /> Vol:{" "}
                      <b className="text-stone-800">{listing.quantity_kg}kg</b>
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={14} /> Price:{" "}
                      <b className="text-stone-800">
                        ${listing.price_per_kg}/kg
                      </b>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${matches[listing.id]?.length > 0 ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-stone-100 text-stone-500 border-stone-200"}`}
                  >
                    <Search size={12} /> {matches[listing.id]?.length || 0}{" "}
                    Buyers Found
                  </span>
                </div>
              </div>

              {/* Matches Grid */}
              <div className="p-6 bg-stone-50/50">
                {matches[listing.id]?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matches[listing.id]?.map((match, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-stone-200 rounded-xl p-4 hover:border-emerald-400 hover:shadow-md transition group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 shadow-sm">
                          {match.match_score}% MATCH
                        </div>

                        <div className="flex items-center gap-3 mb-4 mt-2">
                          <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 shadow-sm border border-stone-200">
                            <Building size={18} />
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-800 text-sm capitalize">
                              {match.buyer_name}
                            </h4>
                            <span className="text-xs text-stone-500 flex items-center gap-1">
                              <CheckCircle
                                size={10}
                                className="text-emerald-500"
                              />{" "}
                              Verified Buyer
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm mb-3 bg-stone-50 p-2 rounded border border-stone-100">
                          <div className="text-center w-1/2 border-r border-stone-200">
                            <span className="block text-stone-400 text-[10px] uppercase font-bold">
                              Needs
                            </span>
                            <span className="font-bold text-stone-700">
                              {match.quantity_needed} kg
                            </span>
                          </div>
                          <div className="text-center w-1/2">
                            <span className="block text-stone-400 text-[10px] uppercase font-bold">
                              Offering
                            </span>
                            <span className="font-bold text-emerald-600">
                              ${match.price_offer}/kg
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4 h-12 overflow-hidden content-start">
                          {match.match_reasons.map((reason, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100 flex gap-1 items-center"
                            >
                              <CheckCircle size={10} /> {reason}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => setContactInfo(match)}
                          className="w-full bg-green-950 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-colors shadow-sm mt-auto"
                        >
                          Review Offer
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-stone-400 flex flex-col items-center">
                    <AlertCircle
                      size={32}
                      className="mb-2 opacity-30 text-emerald-500"
                    />
                    <p className="text-sm font-medium">
                      AI is scanning for industrial buyers...
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <CreateListingForm
          onClose={() => setShowForm(false)}
          onListingCreated={loadDashboard}
        />
      )}
      {contactInfo && (
        <ContactModal
          data={contactInfo}
          type="startup"
          onClose={() => setContactInfo(null)}
        />
      )}
    </div>
  );
};

export default FarmerDashboard;
