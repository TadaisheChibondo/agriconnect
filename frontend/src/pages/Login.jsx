import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Sprout } from "lucide-react";
import toast from "react-hot-toast"; // Assuming you installed this earlier!

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-stone-200/50 w-full max-w-md border border-stone-100">
        <div className="flex justify-center mb-6 text-emerald-600">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <Sprout size={40} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-stone-900 tracking-tight">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-stone-600 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-stone-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-green-950 text-white py-3.5 rounded-lg font-bold hover:bg-emerald-600 transition-colors shadow-md mt-2">
            Sign In
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-stone-500 font-medium">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-amber-600 font-bold hover:text-amber-500 transition-colors"
          >
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
