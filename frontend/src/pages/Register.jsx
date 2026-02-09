import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { Sprout, Factory } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '', password: '', email: '',
        user_type: 'FARMER', // Default
        phone: '', location: '',
        company_name: '' // Only for Startups
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (error) {
            alert("Registration failed. Try a different username.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-slate-200">
                <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Create Account</h2>

                {/* Role Selector */}
                <div className="flex gap-4 mb-6">
                    <button 
                        type="button"
                        onClick={() => setFormData({...formData, user_type: 'FARMER'})}
                        className={`flex-1 py-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${formData.user_type === 'FARMER' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-1 ring-emerald-500' : 'border-slate-200 hover:bg-slate-50'}`}
                    >
                        <Sprout /> <span className="font-bold">I am a Farmer</span>
                    </button>
                    <button 
                        type="button"
                        onClick={() => setFormData({...formData, user_type: 'STARTUP'})}
                        className={`flex-1 py-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${formData.user_type === 'STARTUP' ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'border-slate-200 hover:bg-slate-50'}`}
                    >
                        <Factory /> <span className="font-bold">I am a Startup</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Username</label>
                            <input name="username" type="text" required onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email</label>
                            <input name="email" type="email" required onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 ring-emerald-500 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
                        <input name="password" type="password" required onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 ring-emerald-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone</label>
                            <input name="phone" type="text" required onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Location</label>
                            <input name="location" type="text" required onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 ring-emerald-500 outline-none" />
                        </div>
                    </div>

                    {/* Conditional Field for Startups */}
                    {formData.user_type === 'STARTUP' && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                            <label className="block text-xs font-bold uppercase text-blue-500 mb-1">Company Name</label>
                            <input name="company_name" type="text" required placeholder="e.g. Green Foods Processing" onChange={handleChange} className="w-full p-2 border border-blue-200 bg-blue-50 rounded-md focus:ring-2 ring-blue-500 outline-none" />
                        </div>
                    )}

                    <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-black mt-4">
                        Register Now
                    </button>
                </form>

                <p className="text-center mt-4 text-sm text-slate-500">
                    Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;