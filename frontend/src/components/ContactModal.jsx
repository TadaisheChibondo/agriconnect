import React from 'react';
import { Phone, Mail, MapPin, CheckCircle, X } from 'lucide-react';

const ContactModal = ({ data, onClose, type }) => {
    // 'type' is either 'farmer' (Startup contacting Farmer) or 'buyer' (Farmer contacting Startup)
    const name = type === 'farmer' ? data.farmer_name : data.buyer_name;
    
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                <div className="bg-emerald-600 p-6 text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold">It's a Match!</h2>
                    <p className="text-emerald-100 text-sm">You are now connected with<br/> <span className="font-bold text-white text-lg">{name}</span></p>
                </div>
                
                <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <Phone size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">Phone Number</p>
                            <a href={`tel:${data.contact_phone}`} className="text-slate-800 font-semibold hover:text-blue-600">
                                {data.contact_phone || "N/A"}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">Email Address</p>
                            <a href={`mailto:${data.contact_email}`} className="text-slate-800 font-semibold hover:text-orange-600 truncate max-w-[200px] block">
                                {data.contact_email || "N/A"}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">Location</p>
                            <p className="text-slate-800 font-semibold">
                                {data.location || "Zimbabwe"}
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;