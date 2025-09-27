// components/layout.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Contact from "./Contact.jsx";
import About from "./About.jsx";
import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import Tourists from "./TouristsDirectory.jsx";
import Incidents from "./Incidents & Alerts.jsx";
import MapGeoFencing from "./Map & Geo-fencing.jsx";
import ReportsAnalytics from "./Reports & Analytics.jsx";
import SettingsAdmin from "./Settings & Admin.jsx";
import HelpSupport from "./Help & Support.jsx";
import Profile from "./Profile.jsx";
// import Header from "./Header.jsx"; // Assuming you have a Sidebar component

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-layout">
        <Navbar />
        {/* <Header /> */}
        

        {/* Main App Content: Contains Routes and Footer */}
        <div className="main-app-content">
        <Header/>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Dashboard />} />
            <Route path="/tourists" element={<Tourists />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/reports-analytics" element={<ReportsAnalytics />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/map-geo-fencing" element={<MapGeoFencing />} />
            <Route path="/settings-admin" element={<SettingsAdmin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default Layout;