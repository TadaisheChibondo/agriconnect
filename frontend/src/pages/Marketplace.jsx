import React, { useState, useEffect } from "react";
import { getListings } from "../services/api";
import { Loader2, Search, Leaf, DollarSign, MapPin } from "lucide-react";

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Auto-switching URL logic for your images
  const BACKEND_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://127.0.0.1:8000"
      : "https://yield-trade-backend-1dh8.onrender.com";

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        // Assuming getListings fetches all active market listings
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch marketplace data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllListings();
  }, []);

  // Filter listings based on the search bar
  const filteredListings = listings.filter((listing) =>
    listing.crop_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-stone-50 pb-20 font-sans">
      {/* HERO SECTION */}
      <div className="bg-green-950 text-white py-16 px-8 mb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Global Marketplace
          </h1>
          <p className="text-stone-300 max-w-2xl mx-auto mb-8 text-lg">
            Browse active agricultural harvests from verified farmers across the
            network.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search
                className="text-stone-400 group-focus-within:text-emerald-500 transition-colors"
                size={20}
              />
            </div>
            <input
              type="text"
              placeholder="Search for maize, tomatoes, tobacco..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-stone-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 shadow-lg transition-all"
            />
          </div>
        </div>
      </div>

      {/* LISTINGS GRID */}
      <div className="max-w-6xl mx-auto px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-stone-400">
            <Loader2 size={40} className="animate-spin text-emerald-600 mb-4" />
            <p>Loading market data...</p>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300">
            <Leaf size={48} className="mx-auto text-stone-300 mb-4" />
            <h3 className="text-xl font-bold text-stone-600">
              No harvests found
            </h3>
            <p className="text-stone-400 mt-2">
              Try adjusting your search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* IMAGE */}
                <div className="h-48 bg-stone-100 relative overflow-hidden">
                  {listing.image ? (
                    <img
                      // OLD: src={`${BACKEND_URL}${listing.image}`}

                      // NEW: The Smart Check
                      src={
                        listing.image.startsWith("http")
                          ? listing.image
                          : `${BACKEND_URL}${listing.image}`
                      }
                      alt={listing.crop_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100">
                      <Leaf size={32} className="opacity-20" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-emerald-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    Active
                  </div>
                </div>

                {/* CARD DETAILS */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-stone-800 capitalize mb-3 group-hover:text-emerald-700 transition-colors">
                    {listing.crop_name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-1.5 text-stone-500">
                        <Leaf size={16} /> Available Vol:
                      </span>
                      <span className="font-bold text-stone-800">
                        {listing.quantity_kg} kg
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-1.5 text-stone-500">
                        <DollarSign size={16} /> Asking Price:
                      </span>
                      <span className="font-bold text-emerald-600">
                        ${listing.price_per_kg}/kg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
