import React, { useState } from 'react';
import { createListing } from '../services/api';
import { Upload, X, Loader2 } from 'lucide-react';

const CreateListingForm = ({ onClose, onListingCreated }) => {
    const [formData, setFormData] = useState({
        crop_name: '',
        quantity_kg: '',
        price_per_kg: '',
        harvest_date: '',
        image: null
    });
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('crop_name', formData.crop_name);
        data.append('quantity_kg', formData.quantity_kg);
        data.append('price_per_kg', formData.price_per_kg);
        data.append('harvest_date', formData.harvest_date);
        
        // IMPORTANT FIX: We do NOT append 'farmer' here anymore.
        // The backend will automatically attach your User Profile based on your Token.

        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await createListing(data);
            onListingCreated(); // Refresh the list
            onClose(); // Close the modal
        } catch (error) {
            console.error("Submission failed:", error);
            if (error.response && error.response.status === 401) {
                alert("Your session has expired. Please login again.");
                window.location.href = '/login';
            } else {
                alert("Error creating listing. Make sure you are logged in as a Farmer.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                <div className="flex justify-between items-center p-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">Post New Harvest</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Crop Name</label>
                        <input 
                            name="crop_name" 
                            type="text" 
                            placeholder="e.g. Red Onions" 
                            required
                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Quantity (kg)</label>
                            <input 
                                name="quantity_kg" 
                                type="number" 
                                placeholder="500" 
                                required
                                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                                onChange={handleChange} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Price ($/kg)</label>
                            <input 
                                name="price_per_kg" 
                                type="number" 
                                step="0.01" 
                                placeholder="1.20" 
                                required
                                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Harvest Date</label>
                        <input 
                            name="harvest_date" 
                            type="date" 
                            required
                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:bg-slate-50 hover:border-emerald-400 transition-all group">
                        <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleImageChange} />
                        <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                            {preview ? (
                                <img src={preview} alt="Preview" className="h-32 object-contain rounded mb-2" />
                            ) : (
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-emerald-100 transition-colors">
                                    <Upload className="text-slate-400 group-hover:text-emerald-600" size={24} />
                                </div>
                            )}
                            <span className="text-sm font-medium text-slate-600 group-hover:text-emerald-600">
                                {formData.image ? "Change Photo" : "Click to upload photo"}
                            </span>
                        </label>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all mt-2"
                    >
                        {loading ? <><Loader2 className="animate-spin" /> Posting...</> : 'Post Listing'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateListingForm;