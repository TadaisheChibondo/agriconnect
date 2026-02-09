import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StartupDashboard from './pages/StartupDashboard';
import Login from './pages/Login';
import About from './pages/About';
import Register from './pages/Register';

function Layout({ children }) {
    // We can manage the "View Mode" here for the prototype
    const [viewMode, setViewMode] = React.useState('farmer');
    
    // Check if we are on the About or Login page to hide the main Nav? 
    // Or just show it everywhere. Let's show it everywhere for simplicity.
    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
            <Navbar viewMode={viewMode} setViewMode={setViewMode} />
            <main>
                {/* PROTOTYPE TRICK: 
                   We pass 'viewMode' down. If we are on the Home path '/', 
                   we show either Farmer or Startup based on the toggle.
                */}
                {React.cloneElement(children, { viewMode })} 
            </main>
        </div>
    );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        
        {/* The Main Dashboard handles the switching */}
        <Route path="/" element={
            <Layout>
                 <MainSwitcher />
            </Layout>
        } />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

// Helper to switch between Farmer/Startup based on the Navbar toggle
const MainSwitcher = ({ viewMode }) => {
    return viewMode === 'farmer' ? <Home /> : <StartupDashboard />;
};

export default App;