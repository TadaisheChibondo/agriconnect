import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StartupDashboard from "./pages/StartupDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing"; // <--- IMPORT THE NEW PAGE

function Layout({ children }) {
  const [viewMode, setViewMode] = React.useState("farmer");
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Navbar viewMode={viewMode} setViewMode={setViewMode} />
      <main>{React.cloneElement(children, { viewMode })}</main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Make the Landing page the root '/' */}
        <Route
          path="/"
          element={
            <Layout>
              <Landing />
            </Layout>
          }
        />

        {/* Move the dashboards to '/dashboard' */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <MainSwitcher />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const MainSwitcher = ({ viewMode }) => {
  return viewMode === "farmer" ? <Home /> : <StartupDashboard />;
};

export default App;
