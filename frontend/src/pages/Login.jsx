import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(username, password);
            // In a real app, we'd fetch the user profile to know if they are Farmer/Startup
            // For now, let's just send them to the Home page
            window.location.href = '/'; 
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-200">
                <div className="flex justify-center mb-6 text-emerald-600">
                    <Sprout size={48} />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Welcome Back</h2>
                
                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Username</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Password</label>
                        <input 
                            type="password" 
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700">
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-slate-500">
                    Don't have an account? Ask the admin.
                </p>
            </div>
        </div>
    );
};

export default Login;