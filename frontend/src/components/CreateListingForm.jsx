import React, { useState } from 'react';
import { createListing } from '../services/api';
import { Upload, X } from 'lucide-react';

const CreateListingForm = ({ onClose, onListingCreated }) => {
    const [formData, setFormData] = useState({
        crop_name: '',
        quantity_kg: '',
        price_per_kg: '',
        harvest_date: '',
        image: null
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // We need FormData to send files to Django
        const data = new FormData();
        data.append('crop_name', formData.crop_name);
        data.append('quantity_kg', formData.quantity_kg);
        data.append('price_per_kg', formData.price_per_kg);
        data.append('harvest_date', formData.harvest_date);
        
        // Hardcoding a farmer ID for the prototype since we haven't built Login yet
        // Make sure you have a UserProfile with ID 1 in your database!
        data.append('farmer', 1); 

        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await createListing(data);
            onListingCreated(); // Refresh the list
            onClose(); // Close the form
        } catch (error) {
            alert('Error creating listing. Did you create a UserProfile in Django Admin first?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <X />
                </button>
                
                <h2 className="text-2xl font-bold mb-4">Post New Harvest</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Crop Name</label>
                        <input name="crop_name" type="text" placeholder="e.g. Red Onions" required
                            className="w-full p-2 border rounded-md" onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quantity (kg)</label>
                            <input name="quantity_kg" type="number" placeholder="500" required
                                className="w-full p-2 border rounded-md" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price ($/kg)</label>
                            <input name="price_per_kg" type="number" step="0.01" placeholder="1.20" required
                                className="w-full p-2 border rounded-md" onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Harvest Date</label>
                        <input name="harvest_date" type="date" required
                            className="w-full p-2 border rounded-md" onChange={handleChange} />
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                        <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleImageChange} />
                        <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                            <Upload className="text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">
                                {formData.image ? formData.image.name : "Click to upload crop photo"}
                            </span>
                        </label>
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400">
                        {loading ? 'Posting...' : 'Post Listing'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateListingForm;