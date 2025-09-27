
// Component to scroll to top on route change
// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

  // return null;// import React, { useEffect } from 'react';
// import Navbar from './components/Navbar.jsx';
// import Footer from './components/Footer.jsx';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Contact from './components/Contact.jsx';
// import About from './components/About.jsx';
// import Home from './components/Home.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import Login from './components/Login.jsx';
// import TouristsDirectory from './components/TouristsDirectory.jsx';
// import IncidentsAndAlerts from './components/Incidents & Alerts.jsx';
// import Reports from './components/Reports.jsx';
// import MapGeoFencing from './components/Map & Geo-fencing.jsx';
// import ReportsAnalytics from './components/Reports & Analytics.jsx';
// import SettingsAdmin from './components/Settings & Admin.jsx';
// import HelpSupport from './components/Help & Support.jsx';
// import Profile from './components/Profile.jsx';
// import layout from './components/layout.jsx';
// }

// function App() {
//   return (
//     <>
      {/* <Router>
      <ScrollToTop />
      <div className="App min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-grow z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Dashboard />} /> */}
      {/* {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tourists" element={<TouristsDirectory />} />
            <Route path="/incidents" element={<IncidentsAndAlerts />} /> */
            /* <Route path="/reports" element={<Reports />} /> */
            /* <Route path="/reports-analytics" element={<ReportsAnalytics />} />
            <Route path="/settings-admin" element={<SettingsAdmin />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/map-geo-fencing" element={<MapGeoFencing />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main> */}
      {/* <Footer /> */}
      {/* </div> */}
      {/* <Route path="/layout" element={<layout />} /> */}
      {/* </Router> */}
      {/* <layout/>
    </>
  );
}

export default App;

// App.jsx (your top-level application entry point)
// import React from 'react';
// import Layout from './components/layout.jsx'; // Import your Layout component

// function App() {
//   return (
//     // Your entire application is now wrapped by the Layout component,
//     // which contains BrowserRouter and all other structural elements.
//     <Layout />
//   );
// }

// export default App;*/ }
// App.jsx (your top-level application entry point)
import React from 'react';
import Layout from './components/layout.jsx'; // Import your Layout component

function App() {
  return (
    // Your entire application is now wrapped by the Layout component,
    // which contains BrowserRouter and all other structural elements.
    <Layout />
  );
}

export default App;