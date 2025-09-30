// components/layout.jsx
import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  return (
    // Wrap everything that needs routing context inside the Router
    <div className="flex gap-[2%] flex-wrap content-start flex-row">
      <ScrollToTop />
      <div className="w-full h-[5%] sticky top-0 ">
        <Navbar />
        <div className="flex height-[100%]">
          <div className="w-1/4">
            <Header />
          </div>
            <Outlet/>
        </div>
        <div className="w-full h-[5%]">
          <Footer />
        </div>
        {/* Move Footer inside the Router, but outside the Routes */}
      </div>
    </div>
  );
}

export default MainLayout;
