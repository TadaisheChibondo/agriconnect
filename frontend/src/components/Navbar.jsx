import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, Factory, Bell, LogOut, Info, UserPlus, LogIn } from 'lucide-react';

const Navbar = ({ viewMode, setViewMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('token');
  
  // Only show the Farmer/Startup toggle if we are on the Home Page ('/')
  const isDashboard = location.pathname === '/';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
      
      {/* 1. Logo Section */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${viewMode === 'farmer' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
          {viewMode === 'farmer' ? <Sprout size={24} /> : <Factory size={24} />}
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none group-hover:text-emerald-700 transition-colors">Yield-Trade</h1>
          <p className="text-xs text-slate-500 font-medium">
            {viewMode === 'farmer' ? 'Farmer Marketplace' : 'Startup Procurement'}
          </p>
        </div>
      </Link>

      {/* 2. Center Toggle (Only visible on Dashboard) */}
      {isDashboard && (
        <div className="hidden md:flex bg-slate-100 p-1 rounded-lg items-center gap-1">
          <button 
            onClick={() => setViewMode('farmer')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 ${viewMode === 'farmer' ? 'bg-white shadow text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Farmer View
          </button>
          <button 
            onClick={() => setViewMode('startup')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 ${viewMode === 'startup' ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Startup View
          </button>
        </div>
      )}

      {/* 3. Right Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        <Link to="/about" className="hidden md:flex text-sm font-medium text-slate-500 hover:text-emerald-600 items-center gap-1">
            <Info size={16} /> About Us
        </Link>
        
        {isLoggedIn ? (
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-slate-600">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                
                <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>

                <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-red-600 transition-colors"
                >
                    <LogOut size={16} /> <span className="hidden md:inline">Logout</span>
                </button>
            </div>
        ) : (
            <div className="flex items-center gap-3">
                <Link 
                    to="/login" 
                    className="text-slate-600 font-bold text-sm hover:text-slate-900 px-2 py-2"
                >
                    Login
                </Link>
                <Link 
                    to="/register" 
                    className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-slate-900/20 flex items-center gap-2"
                >
                    Get Started <UserPlus size={16}/>
                </Link>
            </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;