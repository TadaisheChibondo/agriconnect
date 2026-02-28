import React, { useEffect, useState } from "react";
import { getRequirements, getStartupMatches } from "../services/api";
import CreateRequirementForm from "../components/CreateRequirementForm";
import ContactModal from "../components/ContactModal";
import {
  Factory,
  TrendingUp,
  User,
  CheckCircle,
  Package,
  AlertCircle,
  Plus,
  Search,
} from "lucide-react";

const StartupDashboard = () => {
  const [requirements, setRequirements] = useState([]);
  const [matches, setMatches] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState(null);

  // Your live backend URL for loading images
  const BACKEND_URL = "https://yield-trade-backend-1dh8.onrender.com";

  const loadDashboard = async () => {
    setLoading(true);
    const reqs = await getRequirements();
    setRequirements(reqs);

    const matchData = {};
    for (const req of reqs) {
      matchData[req.id] = await getStartupMatches(req.id);
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
        {/* Changed the glow from blue to the Startup Amber color */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full -mr-20 -mt-32 opacity-20 blur-3xl animate-pulse"></div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 text-amber-400 font-bold uppercase tracking-wider text-xs">
              <Factory size={16} /> Procurement Portal
            </div>
            <h1 className="text-4xl font-bold mb-2 font-display">
              Sourcing Dashboard
            </h1>
            <p className="text-stone-300 max-w-lg">
              Monitor raw material needs and review AI-verified matches.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition active:scale-95"
          >
            <Plus size={20} /> Post Requirement
          </button>
        </div>
      </div>

      {/* 2. REQUIREMENTS LIST */}
      <div className="max-w-6xl mx-auto px-8 space-y-8">
        {loading ? (
          <div className="text-center py-20 text-stone-400 font-medium">
            Loading procurement data...
          </div>
        ) : requirements.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300">
            <Package size={48} className="mx-auto text-stone-300 mb-4" />
            <h3 className="text-lg font-bold text-stone-600">
              No Requirements Active
            </h3>
            <button
              onClick={() => setShowForm(true)}
              className="text-amber-600 font-bold hover:underline mt-2 transition-colors"
            >
              Create First Request
            </button>
          </div>
        ) : (
          requirements.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition"
            >
              {/* Header */}
              <div className="bg-stone-50 border-b border-stone-200 p-6 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2 capitalize">
                    {req.crop_needed}{" "}
                    <span className="text-xs font-bold text-stone-500 bg-white border border-stone-200 px-2 py-0.5 rounded uppercase">
                      Target
                    </span>
                  </h2>
                  <div className="flex gap-4 mt-2 text-sm text-stone-600">
                    <span className="flex items-center gap-1">
                      <Package size={14} /> Vol:{" "}
                      <b className="text-stone-800">
                        {req.quantity_needed_kg}kg
                      </b>
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp size={14} /> Max:{" "}
                      <b className="text-stone-800">${req.max_price_per_kg}</b>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${matches[req.id]?.length > 0 ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-stone-100 text-stone-500 border-stone-200"}`}
                  >
                    <Search size={12} /> {matches[req.id]?.length || 0} Found
                  </span>
                </div>
              </div>

              {/* Matches Grid */}
              <div className="p-6 bg-stone-50/50">
                {matches[req.id]?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matches[req.id]?.map((match, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-stone-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 shadow-sm">
                          {match.match_score}% MATCH
                        </div>

                        <div className="flex items-center gap-3 mb-3 mt-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-sm">
                            <User size={18} />
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-800 text-sm capitalize">
                              {match.farmer_name}
                            </h4>
                            <span className="text-xs text-stone-500 flex items-center gap-1">
                              <CheckCircle
                                size={10}
                                className="text-emerald-500"
                              />{" "}
                              Verified
                            </span>
                          </div>
                        </div>

                        <div className="h-32 bg-stone-100 rounded-lg mb-3 overflow-hidden border border-stone-100">
                          {match.image ? (
                            // FIXED: Now uses your live Render URL instead of Localhost!
                            <img
                              src={`${BACKEND_URL}${match.image}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                              alt="Crop"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs font-medium">
                              No Image Provided
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between text-sm mb-3 bg-stone-50 p-2 rounded border border-stone-100">
                          <div className="text-center w-1/2 border-r border-stone-200">
                            <span className="block text-stone-400 text-[10px] uppercase font-bold">
                              Available
                            </span>
                            <span className="font-bold text-stone-700">
                              {match.quantity} kg
                            </span>
                          </div>
                          <div className="text-center w-1/2">
                            <span className="block text-stone-400 text-[10px] uppercase font-bold">
                              Ask Price
                            </span>
                            <span className="font-bold text-emerald-600">
                              ${match.price}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4 h-12 overflow-hidden content-start">
                          {match.match_reasons.map((reason, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100 flex gap-1 items-center"
                            >
                              <CheckCircle size={10} /> {reason}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => setContactInfo(match)}
                          className="w-full bg-green-950 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-amber-600 transition-colors shadow-sm mt-auto"
                        >
                          Request Contract
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-stone-400 flex flex-col items-center">
                    <AlertCircle
                      size={32}
                      className="mb-2 opacity-30 text-amber-500"
                    />
                    <p className="text-sm font-medium">
                      AI is scanning for farmers...
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 3. MODALS */}
      {showForm && (
        <CreateRequirementForm
          onClose={() => setShowForm(false)}
          onRequirementCreated={loadDashboard}
        />
      )}
      {contactInfo && (
        <ContactModal
          data={contactInfo}
          type="farmer"
          onClose={() => setContactInfo(null)}
        />
      )}
    </div>
  );
};

export default StartupDashboard;
