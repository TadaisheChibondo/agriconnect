import React, { useState } from "react";
import { registerUser, loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import {
  Sprout,
  Factory,
  Eye,
  EyeOff,
  Loader2,
  CheckSquare,
} from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  // States for UX features
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Added for validation
    user_type: "FARMER",
    phone: "+263 ", // Default country code
    location: "",
    company_name: "",
    specialty: "", // New field for crops/animals/materials
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validations
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!formData.phone.startsWith("+263") || formData.phone.length < 5) {
      toast.error(
        "Please enter a valid Zimbabwean phone number starting with +263",
      );
      return;
    }
    if (!acceptedTerms) {
      toast.error("You must accept the Terms and Conditions.");
      return;
    }

    // 2. Start Loading State
    setIsLoading(true);

    // Remove confirmPassword from the data we send to the API
    const { confirmPassword, ...payload } = formData;

    try {
      await registerUser(payload);
      await loginUser(payload.username, payload.password);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed. Username or email might be taken.");
    } finally {
      // Stop loading state whether it succeeds or fails
      setIsLoading(false);
    }
  };

  const isFarmer = formData.user_type === "FARMER";

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4 font-sans py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-stone-200/50 w-full max-w-xl border border-stone-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-stone-900 tracking-tight">
          Create Account
        </h2>

        {/* Role Selector */}
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, user_type: "FARMER" })}
            className={`flex-1 py-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${isFarmer ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm" : "border-stone-100 text-stone-500 hover:bg-stone-50 hover:border-stone-200"}`}
          >
            <Sprout size={28} />{" "}
            <span className="font-bold text-sm">I am a Farmer</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, user_type: "STARTUP" })}
            className={`flex-1 py-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${!isFarmer ? "bg-amber-50 border-amber-500 text-amber-700 shadow-sm" : "border-stone-100 text-stone-500 hover:bg-stone-50 hover:border-stone-200"}`}
          >
            <Factory size={28} />{" "}
            <span className="font-bold text-sm">I am a Startup</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                onChange={handleChange}
                className={`w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:bg-white outline-none transition-all ${isFarmer ? "focus:ring-emerald-500" : "focus:ring-amber-500"}`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className={`w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:bg-white outline-none transition-all ${isFarmer ? "focus:ring-emerald-500" : "focus:ring-amber-500"}`}
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                onChange={handleChange}
                className={`w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:bg-white outline-none transition-all pr-10 ${isFarmer ? "focus:ring-emerald-500" : "focus:ring-amber-500"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[28px] text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="relative">
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                onChange={handleChange}
                className={`w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:bg-white outline-none transition-all pr-10 ${isFarmer ? "focus:ring-emerald-500" : "focus:ring-amber-500"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[28px] text-stone-400 hover:text-stone-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                required
                onChange={handleChange}
                className={`w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:bg-white outline-none transition-all ${isFarmer ? "focus:ring-emerald-500" : "focus:ring-amber-500"}`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">
                Location
              </label>
              <input
                name="location"
                type="text"
                placeholder="e.g. Harare"
                required
                onChange={handleChange}
                className={`w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:bg-white outline-none transition-all ${isFarmer ? "focus:ring-emerald-500" : "focus:ring-amber-500"}`}
              />
            </div>
          </div>

          {/* NEW: Specialty Field (Changes based on role) */}
          <div>
            <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">
              {isFarmer ? "Primary Crops / Livestock" : "Target Raw Materials"}
            </label>
            <input
              name="specialty"
              type="text"
              placeholder={
                isFarmer
                  ? "e.g. Maize, Poultry, Soybeans"
                  : "e.g. Wheat, Tomatoes, Cotton"
              }
              required
              onChange={handleChange}
              className={`w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:bg-white outline-none transition-all ${isFarmer ? "focus:ring-emerald-500" : "focus:ring-amber-500"}`}
            />
          </div>

          {/* Conditional Field for Startups */}
          {!isFarmer && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
              <label className="block text-xs font-bold uppercase text-amber-600 mb-1.5 flex items-center gap-1">
                <Factory size={12} /> Company Name
              </label>
              <input
                name="company_name"
                type="text"
                required
                placeholder="e.g. Green Foods Processing"
                onChange={handleChange}
                className="w-full p-2.5 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
            </div>
          )}

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500"
            />
            <label htmlFor="terms" className="text-sm text-stone-600">
              I agree to the{" "}
              <a href="#" className="text-emerald-600 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-emerald-600 hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* Submit Button with Loading State */}
          <button
            disabled={isLoading}
            className="w-full bg-green-950 text-white py-3.5 rounded-lg font-bold hover:bg-emerald-600 transition-colors shadow-md mt-6 flex items-center justify-center gap-2 disabled:bg-stone-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Creating
                Account...
              </>
            ) : (
              "Register Account"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-stone-500 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-bold hover:text-emerald-500 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
