import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  Factory,
  ArrowRight,
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  Github,
  Mail,
} from "lucide-react";

const Landing = () => {
  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      // Reliable Farm/Crop Image
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
      title: "Empowering Local Farmers",
      subtitle: "Connecting your harvest directly to industrial buyers.",
    },
    {
      // Reliable Factory/Processing Image
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
      title: "Fueling Industrial Startups",
      subtitle: "Secure high-quality raw materials with AI-verified suppliers.",
    },
    {
      // Reliable Tech/Handshake Image
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200",
      title: "Seamless AI Contracts",
      subtitle: "Data-driven matching for volume, price, and logistics.",
    },
  ];

  // Auto-play the slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 flex flex-col">
      {/* 1. Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-32 px-6">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-emerald-300 mb-8 backdrop-blur-sm">
            <BrainCircuit size={16} /> AI-Powered Supply Chain
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Bridging the Gap in <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Agriculture
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Yield-Trade is a dual-sided marketplace that uses artificial
            intelligence to instantly match small-scale farmers with industrial
            processors and startups.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-900/50 flex items-center justify-center gap-2"
            >
              Get Started Free <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Feature Cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 w-full">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Farmer Card */}
          <div className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
              <Sprout size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              For Farmers
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Stop worrying about finding buyers. Post your harvest details and
              let our AI instantly connect you with verified industrial buyers
              looking for exactly what you grow.
            </p>
            <ul className="space-y-3 text-sm font-medium text-slate-700">
              <li className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" /> Secure
                Contracts
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-500" /> Better
                Pricing
              </li>
            </ul>
          </div>

          {/* Startup Card */}
          <div className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
              <Factory size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              For Startups
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Streamline your raw material procurement. Post your exact volume
              and price requirements, and review AI-scored matches from our
              network of local farmers.
            </p>
            <ul className="space-y-3 text-sm font-medium text-slate-700">
              <li className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-500" /> Verified
                Suppliers
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-500" /> Consistent
                Supply
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Auto-playing Slideshow Section */}
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">
            See the Marketplace in Action
          </h2>
          <p className="text-slate-500 mt-2">
            Connecting the supply chain from soil to shelf.
          </p>
        </div>

        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              {/* Image with an overlay to make text readable */}
              <div className="absolute inset-0 bg-slate-900/40 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform scale-105 transition-transform duration-[10000ms] ease-linear"
                style={{
                  transform: index === currentSlide ? "scale(1.1)" : "scale(1)",
                }}
              />

              {/* Slide Text */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 translate-y-0 drop-shadow-lg">
                  {slide.title}
                </h3>
                <p className="text-lg md:text-xl text-slate-200 drop-shadow-md max-w-2xl">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Slideshow Indicators */}
          <div className="absolute bottom-6 right-6 z-30 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                <Sprout size={20} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Yield-Trade
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Building a smarter, more efficient agricultural supply chain for
              Zimbabwe through artificial intelligence and direct marketplace
              connections.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/login"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Marketplace Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Team/Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">
              Project
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-emerald-400 transition-colors"
                >
                  About the Team
                </Link>
              </li>
              <li className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800">
                <Github size={16} />{" "}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} Yield-Trade. University AI Module
            Project.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="flex items-center gap-1">
              <Sprout size={14} /> Farmers
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1">
              <Factory size={14} /> Startups
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
