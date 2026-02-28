import React, { useState } from "react";
import { createListing, predictYield } from "../services/api";
import { Upload, X, Loader2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const CreateListingForm = ({ onClose, onListingCreated }) => {
  const [formData, setFormData] = useState({
    crop_name: "",
    quantity_kg: "",
    price_per_kg: "",
    harvest_date: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // AI Prediction States
  const [isPredicting, setIsPredicting] = useState(false);
  const [landSize, setLandSize] = useState("");
  const [region, setRegion] = useState("bulawayo");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // AI Yield Predictor Function
  const handlePredictYield = async () => {
    if (!formData.crop_name || !landSize) {
      toast.error("Please enter a Crop Name and Hectares first.");
      return;
    }
    setIsPredicting(true);
    try {
      const data = await predictYield({
        crop_type: formData.crop_name,
        area_hectares: landSize,
        region: region,
      });
      // Auto-fill the quantity box with the AI prediction
      setFormData((prev) => ({
        ...prev,
        quantity_kg: data.estimated_yield_kg,
      }));
      toast.success(`AI Predicted: ${data.estimated_yield_kg} kg!`);
    } catch (error) {
      toast.error("Failed to predict yield. Please try again.");
    } finally {
      setIsPredicting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("crop_name", formData.crop_name);
    data.append("quantity_kg", formData.quantity_kg);
    data.append("price_per_kg", formData.price_per_kg);
    data.append("harvest_date", formData.harvest_date);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await createListing(data);
      toast.success("Harvest posted successfully!");
      onListingCreated(); // Refresh the list on the dashboard
      onClose(); // Close the modal
    } catch (error) {
      console.error("Submission failed:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = "/login";
      } else {
        toast.error("Error creating listing. Make sure you are logged in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-sans">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in duration-200 max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center p-5 border-b border-stone-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-stone-800">Post New Harvest</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Crop Name */}
          <div>
            <label className="block text-xs font-bold uppercase text-stone-500 mb-1">
              Crop Name
            </label>
            <input
              name="crop_name"
              type="text"
              placeholder="e.g. Red Onions"
              required
              value={formData.crop_name}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          {/* ✨ AI Yield Predictor Compact Widget */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 relative overflow-hidden">
            <h3 className="text-xs font-bold uppercase text-emerald-800 mb-3 flex items-center gap-1">
              <Sparkles size={14} className="text-emerald-600" /> AI Yield
              Estimator
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-emerald-700 mb-1">
                  Land Size (Hectares)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 2.5"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)}
                  className="w-full p-2 text-sm bg-white border border-emerald-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-emerald-700 mb-1">
                  Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full p-2 text-sm bg-white border border-emerald-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none text-stone-700"
                >
                  <option value="bulawayo">Bulawayo</option>
                  <option value="harare">Harare</option>
                  <option value="manicaland">Manicaland</option>
                  <option value="mashonaland">Mashonaland</option>
                  <option value="matabeleland">Matabeleland</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePredictYield}
              disabled={isPredicting || !formData.crop_name || !landSize}
              className="w-full bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600 hover:text-white py-2 rounded-md text-xs font-bold transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {isPredicting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                "Auto-Fill Quantity"
              )}
            </button>
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1">
                Quantity (kg)
              </label>
              <input
                name="quantity_kg"
                type="number"
                placeholder="500"
                required
                value={formData.quantity_kg}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1">
                Price ($/kg)
              </label>
              <input
                name="price_per_kg"
                type="number"
                step="0.01"
                placeholder="1.20"
                required
                value={formData.price_per_kg}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Harvest Date */}
          <div>
            <label className="block text-xs font-bold uppercase text-stone-500 mb-1">
              Harvest Date
            </label>
            <input
              name="harvest_date"
              type="date"
              required
              value={formData.harvest_date}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-stone-700"
              onChange={handleChange}
            />
          </div>

          {/* Image Upload */}
          <div className="border-2 border-dashed border-stone-300 rounded-xl p-5 text-center cursor-pointer hover:bg-stone-50 hover:border-emerald-400 transition-all group">
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 object-cover rounded-lg mb-2 shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-emerald-100 transition-colors">
                  <Upload
                    className="text-stone-400 group-hover:text-emerald-600"
                    size={24}
                  />
                </div>
              )}
              <span className="text-sm font-bold text-stone-500 group-hover:text-emerald-600">
                {formData.image
                  ? "Change Photo"
                  : "Click to upload harvest photo"}
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-950 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-600 disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all mt-2 shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Publishing...
              </>
            ) : (
              "Publish Listing"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListingForm;
