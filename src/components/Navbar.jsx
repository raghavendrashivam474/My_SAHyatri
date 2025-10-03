// Navbar.jsx
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home.jsx';
import logo from '../images/logo-removebg-preview.png';

const LogoutIcon = ({ style }) => (
  <svg style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const Navbar = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDashboardPreview, setShowDashboardPreview] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
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
    if (servicesButtonRef.current) {
      const rect = servicesButtonRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom + 5, left: rect.left });
    }
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
    }, 500);
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
    }, 300);
  };

  // Expose the navbar's height to parent components via the ref
  useImperativeHandle(ref, () => ({
    getHeight: () => {
      return navbarRef.current ? navbarRef.current.offsetHeight : 0;
    },
  }));


  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 relative overflow-visible z-50"  ref={navbarRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src={logo} alt="SAHYatri Logo" className="h-20 w-auto" />
            <span className="font-bold text-xl">SAHYatri GOVERNMENT PORTAL</span>
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
                  style={{ position: 'fixed', top: dropdownPosition.top, left: dropdownPosition.left, zIndex: 999999, width: '384px', backgroundColor: 'white', color: 'black', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>SAHYatri Dashboard Preview</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.875rem' }}>
                    <div style={{ backgroundColor: '#e0f2fe', padding: '8px', borderRadius: '4px' }}>
                      <div style={{ color: '#1e40af', fontWeight: '600' }}>Active Tourists</div>
                      <div style={{ color: '#4b5563' }}>1,247</div>
                    </div>
                    <div style={{ backgroundColor: '#f0fdf4', padding: '8px', borderRadius: '4px' }}>
                      <div style={{ color: '#166534', fontWeight: '600' }}>Issued IDs</div>
                      <div style={{ color: '#4b5563' }}>8,934</div>
                    </div>
                    <div style={{ backgroundColor: '#fff7ed', padding: '8px', borderRadius: '4px' }}>
                      <div style={{ color: '#9a3412', fontWeight: '600' }}>Incidents</div>
                      <div style={{ color: '#4b5563' }}>12</div>
                    </div>
                    <div style={{ backgroundColor: '#fef2f2', padding: '8px', borderRadius: '4px' }}>
                      <div style={{ color: '#dc2626', fontWeight: '600' }}>Open SOS</div>
                      <div style={{ color: '#4b5563' }}>3</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '12px', textAlign: 'center' }}>
                    <Link
                      to="/Dashboard"
                      style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '4px', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none', display: 'inline-block' }}
                      onClick={() => setShowDashboardPreview(false)}
                    >
                      View Full Dashboard →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/about" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link to="/contact" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">Login</Link>
            <Link to="/profile" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
            <Link to="/login" className="flex items-center gap-3 text-red-300 hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium">
              <LogoutIcon style={{ width: '20px', height: '20px' }} />
              Logout
            </Link>
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
            <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Profile</Link>
            <Link to="/login" className="flex items-center gap-3 text-red-300 hover:bg-red-900 px-3 py-2 rounded-md text-base font-medium">
              <LogoutIcon style={{ width: '20px', height: '20px' }} />
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = "Navbar"; // Recommended for debugging
export default Navbar;
