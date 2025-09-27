// Navbar.jsx
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';

const Navbar = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDashboardPreview, setShowDashboardPreview] = useState(false);
  const servicesButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const navbarRef = useRef(null); // Ref for the navbar element itself

  // Clear any existing timeout when component updates
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const handleServicesMouseEnter = () => {
    setShowDashboardPreview(true);
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const handleServicesMouseLeave = () => {
    // Delay hiding to allow mouse to reach dropdown
    hideTimeoutRef.current = setTimeout(() => {
      setShowDashboardPreview(false);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    setShowDashboardPreview(true);
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    // Delay hiding to allow mouse to reach Services button
    hideTimeoutRef.current = setTimeout(() => {
      setShowDashboardPreview(false);
    }, 150);
  };

  // Expose the navbar's height to parent components via the ref
  useImperativeHandle(ref, () => ({
    getHeight: () => {
      return navbarRef.current ? navbarRef.current.offsetHeight : 0;
    },
  }));


  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-800" ref={navbarRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 font-bold text-xl">
            SAHYatri GOVERNMENT PORTAL
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <div className="relative">
              <Link
                ref={servicesButtonRef}
                to="/services"
                className="relative hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium inline-block"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                Services
              </Link>
              {showDashboardPreview && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">SAHYatri Dashboard Preview</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-blue-50 p-2 rounded">
                        <div className="text-blue-900 font-semibold">Active Tourists</div>
                        <div className="text-gray-600">1,247</div>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <div className="text-green-900 font-semibold">Issued IDs</div>
                        <div className="text-gray-600">8,934</div>
                      </div>
                      <div className="bg-orange-50 p-2 rounded">
                        <div className="text-orange-900 font-semibold">Incidents</div>
                        <div className="text-gray-600">12</div>
                      </div>
                      <div className="bg-red-50 p-2 rounded">
                        <div className="text-red-900 font-semibold">Open SOS</div>
                        <div className="text-gray-600">3</div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <Link
                        to="/services"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
                        onClick={() => setShowDashboardPreview(false)}
                      >
                        View Full Dashboard →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link to="/about" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link to="/contact" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">Login</Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Home</Link>
            <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Services</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">About</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Contact</Link>
            <Link to="/login" className="block bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = "Navbar"; // Recommended for debugging
export default Navbar;