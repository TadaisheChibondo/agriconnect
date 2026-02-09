import React, { useState } from 'react';
import { createRequirement } from '../services/api';
import { X, Factory } from 'lucide-react';

const CreateRequirementForm = ({ onClose, onRequirementCreated }) => {
    const [formData, setFormData] = useState({
        crop_needed: '',
        quantity_needed_kg: '',
        max_price_per_kg: '',
        required_by_date: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRequirement(formData);
            onRequirementCreated();
            onClose();
        } catch (error) {
            alert('Error creating requirement. Are you logged in as a Startup?');
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
                    <h2 className="font-bold flex items-center gap-2"><Factory size={20}/> New Sourcing Request</h2>
                    <button onClick={onClose}><X size={20}/></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Target Crop</label>
                        <input name="crop_needed" type="text" placeholder="e.g. Soybeans" required onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 ring-blue-500 outline-none"/>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Volume Needed (kg)</label>
                            <input name="quantity_needed_kg" type="number" placeholder="1000" required onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 ring-blue-500 outline-none"/>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Max Price ($/kg)</label>
                            <input name="max_price_per_kg" type="number" step="0.01" placeholder="0.50" required onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 ring-blue-500 outline-none"/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Needed By</label>
                        <input name="required_by_date" type="date" required onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 ring-blue-500 outline-none"/>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                        Publish Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRequirementForm;