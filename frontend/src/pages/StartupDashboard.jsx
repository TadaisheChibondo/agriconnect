import React, { useEffect, useState } from 'react';
import { getRequirements, getStartupMatches } from '../services/api';
import CreateRequirementForm from '../components/CreateRequirementForm';
import ContactModal from '../components/ContactModal';
import { Factory, TrendingUp, User, CheckCircle, Package, AlertCircle, Plus, Search } from 'lucide-react';

const StartupDashboard = () => {
    const [requirements, setRequirements] = useState([]);
    const [matches, setMatches] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [contactInfo, setContactInfo] = useState(null); // Contact Modal State

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

    useEffect(() => { loadDashboard(); }, []);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* 1. HERO SECTION */}
            <div className="bg-slate-900 text-white py-12 px-8 mb-10 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full -mr-20 -mt-32 opacity-20 blur-3xl animate-pulse"></div>
                
                <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4 text-blue-400 font-bold uppercase tracking-wider text-xs">
                            <Factory size={16} /> Procurement Portal
                        </div>
                        <h1 className="text-4xl font-bold mb-2 font-display">Sourcing Dashboard</h1>
                        <p className="text-slate-400 max-w-lg">Monitor raw material needs and review AI-verified matches.</p>
                    </div>

                    <button 
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition active:scale-95"
                    >
                        <Plus size={20} /> Post Requirement
                    </button>
                </div>
            </div>

            {/* 2. REQUIREMENTS LIST */}
            <div className="max-w-6xl mx-auto px-8 space-y-8">
                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading procurement data...</div>
                ) : requirements.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                        <Package size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-600">No Requirements Active</h3>
                        <button onClick={() => setShowForm(true)} className="text-blue-600 font-bold hover:underline mt-2">
                            Create First Request
                        </button>
                    </div>
                ) : (
                    requirements.map((req) => (
                        <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                            {/* Header */}
                            <div className="bg-slate-50 border-b border-slate-200 p-6 flex flex-wrap justify-between items-center gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 capitalize">
                                        {req.crop_needed} <span className="text-xs font-normal text-slate-500 bg-white border px-2 py-0.5 rounded uppercase">Target</span>
                                    </h2>
                                    <div className="flex gap-4 mt-2 text-sm text-slate-600">
                                        <span className="flex items-center gap-1"><Package size={14}/> Vol: <b>{req.quantity_needed_kg}kg</b></span>
                                        <span className="flex items-center gap-1"><TrendingUp size={14}/> Max: <b>${req.max_price_per_kg}</b></span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${matches[req.id]?.length > 0 ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                        <Search size={12} /> {matches[req.id]?.length || 0} Found
                                    </span>
                                </div>
                            </div>

                            {/* Matches Grid */}
                            <div className="p-6 bg-slate-50/50">
                                {matches[req.id]?.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {matches[req.id]?.map((match, idx) => (
                                            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition group relative overflow-hidden">
                                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                                                    {match.match_score}% MATCH
                                                </div>

                                                <div className="flex items-center gap-3 mb-3 mt-2">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-sm">
                                                        <User size={18} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-800 text-sm">{match.farmer_name}</h4>
                                                        <span className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle size={10} className="text-blue-500"/> Verified</span>
                                                    </div>
                                                </div>

                                                <div className="h-32 bg-slate-100 rounded-lg mb-3 overflow-hidden border border-slate-100">
                                                    {match.image ? (
                                                        <img src={`http://127.0.0.1:8000${match.image}`} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">No Image</div>
                                                    )}
                                                </div>

                                                <div className="flex justify-between text-sm mb-3 bg-slate-50 p-2 rounded border border-slate-100">
                                                    <div className="text-center w-1/2 border-r border-slate-200">
                                                        <span className="block text-slate-400 text-[10px] uppercase font-bold">Available</span>
                                                        <span className="font-semibold text-slate-700">{match.quantity} kg</span>
                                                    </div>
                                                    <div className="text-center w-1/2">
                                                        <span className="block text-slate-400 text-[10px] uppercase font-bold">Ask Price</span>
                                                        <span className="font-semibold text-green-600">${match.price}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-1.5 mb-4 h-12 overflow-hidden content-start">
                                                    {match.match_reasons.map((reason, i) => (
                                                        <span key={i} className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100 flex gap-1">
                                                            <CheckCircle size={10} /> {reason}
                                                        </span>
                                                    ))}
                                                </div>

                                                <button 
                                                    onClick={() => setContactInfo(match)}
                                                    className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm mt-auto"
                                                >
                                                    Request Contract
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-slate-400 flex flex-col items-center">
                                        <AlertCircle size={32} className="mb-2 opacity-30"/>
                                        <p className="text-sm">AI is scanning for farmers...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 3. MODALS */}
            {showForm && <CreateRequirementForm onClose={() => setShowForm(false)} onRequirementCreated={loadDashboard} />}
            {contactInfo && <ContactModal data={contactInfo} type="farmer" onClose={() => setContactInfo(null)} />}
        </div>
    );
};

export default StartupDashboard;