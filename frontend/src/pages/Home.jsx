import React, { useEffect, useState } from 'react';
import { getListings, getMatches } from '../services/api';
import CreateListingForm from '../components/CreateListingForm';
import ContactModal from '../components/ContactModal';
import { Plus, Handshake, Calendar, Scale, X, CheckCircle, ArrowRight } from 'lucide-react';

const Home = () => {
    const [listings, setListings] = useState([]);
    const [showForm, setShowForm] = useState(false);
    
    // State for Modals
    const [selectedMatches, setSelectedMatches] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);
    const [loadingMatches, setLoadingMatches] = useState(false);

    const fetchListings = async () => {
        const data = await getListings();
        setListings(data);
    };

    useEffect(() => { fetchListings(); }, []);

    const handleFindBuyers = async (listingId) => {
        setLoadingMatches(true);
        const matches = await getMatches(listingId);
        setLoadingMatches(false);
        if (matches.length > 0) setSelectedMatches(matches);
        else alert("No buyers found yet. Try adjusting your price.");
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* 1. HERO SECTION */}
            <div className="bg-emerald-900 text-white py-12 px-8 mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl"></div>
                <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 font-display">My Harvests</h1>
                        <p className="text-emerald-200 max-w-lg">Manage active listings and use AI to connect with industrial buyers.</p>
                    </div>
                    <button 
                        onClick={() => setShowForm(true)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transform active:scale-95 transition"
                    >
                        <Plus size={20} /> Post New Harvest
                    </button>
                </div>
            </div>

            {/* 2. LISTINGS GRID */}
            <div className="max-w-6xl mx-auto px-8">
                {listings.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">No active harvests. Post one to get started!</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing) => (
                            <div key={listing.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden group transition-all">
                                <div className="h-56 bg-slate-200 relative overflow-hidden">
                                    {listing.image ? (
                                        <img src={listing.image} alt={listing.crop_name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/95 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">Active</div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-800 capitalize">{listing.crop_name}</h2>
                                            <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                                                <Calendar size={14} /> <span>Harvest: {listing.harvest_date}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-400 font-bold uppercase">Price</p>
                                            <p className="text-xl font-bold text-emerald-600">${listing.price_per_kg}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100 mb-6">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Scale size={18} className="text-slate-400"/>
                                            <span className="font-semibold">{listing.quantity_kg} kg</span>
                                        </div>
                                        <span className="text-xs text-slate-400 font-bold">STOCK</span>
                                    </div>

                                    <button 
                                        onClick={() => handleFindBuyers(listing.id)}
                                        className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
                                    >
                                        {loadingMatches ? 'Scanning...' : <><Handshake size={18} /> Find AI Matches</>}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. MODALS */}
            {showForm && <CreateListingForm onClose={() => setShowForm(false)} onListingCreated={fetchListings} />}
            
            {/* AI Results Modal */}
            {selectedMatches && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                        <div className="bg-emerald-600 p-5 flex justify-between items-center text-white">
                            <h2 className="text-xl font-bold flex items-center gap-2"><Handshake size={24}/> AI Buyer Matches</h2>
                            <button onClick={() => setSelectedMatches(null)} className="hover:bg-emerald-700 p-2 rounded-lg"><X size={20}/></button>
                        </div>
                        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 bg-slate-50">
                            {selectedMatches.map((match, i) => (
                                <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-800">{match.buyer_name}</h3>
                                            <p className="text-sm text-slate-500">Needs <b>{match.quantity_needed}kg</b> @ <b>${match.price_offer}</b>/kg</p>
                                        </div>
                                        <div className="text-center bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                                            <span className="block text-2xl font-bold text-emerald-600">{match.match_score}%</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {match.match_reasons.map((r, idx) => (
                                            <span key={idx} className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 flex gap-1">
                                                <CheckCircle size={12}/> {r}
                                            </span>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => setContactInfo(match)}
                                        className="w-full py-2.5 rounded-lg border-2 border-emerald-600 text-emerald-700 font-bold hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center gap-2"
                                    >
                                        Send Offer <ArrowRight size={16}/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {contactInfo && <ContactModal data={contactInfo} type="buyer" onClose={() => setContactInfo(null)} />}
        </div>
    );
};

export default Home;