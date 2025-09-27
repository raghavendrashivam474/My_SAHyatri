import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom"; // Import Link for navigation
import Header from './Header';
import Footer_80 from './Footer_80';

function MapGeoFencing() {
  const [mapMode, setMapMode] = useState('view'); // 'view', 'polygon', 'circle'
  const [geoFences, setGeoFences] = useState([]);
  const [tourists, setTourists] = useState([]);
  const [riskLevels, setRiskLevels] = useState({});
  const mapRef = useRef(null);

  // Sample data for demonstration
  useEffect(() => {
    // Initialize sample tourists and risk levels
    setTourists([
      { id: 1, name: 'Tourist A', lat: 28.6139, lng: 77.2090, deviceId: 'DEV001' },
      { id: 2, name: 'Tourist B', lat: 28.6140, lng: 77.2091, deviceId: 'DEV002' },
    ]);
    setRiskLevels({
      'zone1': 'Low',
      'zone2': 'Medium',
      'zone3': 'High',
    });
  }, []);

  const handleModeChange = (mode) => {
    setMapMode(mode);
  };

  const addGeoFence = (type, points) => {
    const newFence = {
      id: Date.now(),
      type,
      points,
      riskLevel: 'Medium', // Default
    };
    setGeoFences([...geoFences, newFence]);
  };

  const updateRiskLevel = (fenceId, level) => {
    setGeoFences(geoFences.map(fence =>
      fence.id === fenceId ? { ...fence, riskLevel: level } : fence
    ));
  };

  return (
    <div style={styles.pageBackground}>
      {/* Dashboard Header - Full Width (Standardized) */}
      <Header />

      {/* Main content wrapper - Centered below header */}
      <div style={styles.mainContentWrapper}>
        {/* Page-specific Header/Title (Standardized) */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitleText}>Map & Geo-fencing</h1>
          <p style={styles.pageSubtitleText}>Interactive map for tourist tracking and geo-fencing management.</p>
        </div>

        <div style={styles.mapPageLayout}>
          <div style={styles.mapArea}>
            <div style={styles.mapControls}>
              <button
                style={mapMode === 'view' ? styles.activeButton : styles.button}
                onClick={() => handleModeChange('view')}
              >
                View Mode
              </button>
              <button
                style={mapMode === 'polygon' ? styles.activeButton : styles.button}
                onClick={() => handleModeChange('polygon')}
              >
                Draw Polygon
              </button>
              <button
                style={mapMode === 'circle' ? styles.activeButton : styles.button}
                onClick={() => handleModeChange('circle')}
              >
                Draw Circle
              </button>
            </div>

            <div style={styles.mapVisualContainer}>
              <div ref={mapRef} style={styles.mapPlaceholder}>
                <div style={styles.mapContent}>
                  <h3 style={styles.mapTitle}>Interactive Map</h3>
                  <p style={styles.mapDescription}>
                    {mapMode === 'view' && 'View tourists, clusters, and geo-fenced areas.'}
                    {mapMode === 'polygon' && 'Click to draw polygon geo-fences.'}
                    {mapMode === 'circle' && 'Click to draw circular geo-fences.'}
                  </p>

                  {/* Display tourists (static for demonstration) */}
                  {tourists.map(tourist => (
                    <div key={tourist.id} style={styles.touristMarker}>
                      <span style={styles.touristIcon}>📍</span>
                      <span style={styles.touristInfo}>{tourist.name} ({tourist.deviceId})</span>
                    </div>
                  ))}

                  {/* Display geo-fences (static for demonstration) */}
                  {geoFences.map(fence => (
                    <div key={fence.id} style={styles.geoFence}>
                      <span style={styles.fenceIcon}>{fence.type === 'polygon' ? '⬟' : '⭕'}</span>
                      <span style={styles.fenceInfo}>{fence.type} Fence - Risk: {fence.riskLevel}</span>
                      <select
                        value={fence.riskLevel}
                        onChange={(e) => updateRiskLevel(fence.id, e.target.value)}
                        style={styles.riskSelect}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={styles.mapSidebar}>
            <h3 style={styles.sidebarTitle}>Geo-fencing Tools</h3>
            <ul style={styles.toolList}>
              <li style={styles.toolItem}>Polygon Tool: Draw custom shapes for restricted areas.</li>
              <li style={styles.toolItem}>Circle Tool: Create circular zones for safe or danger areas.</li>
              <li style={styles.toolItem}>Risk Assessment: Assign and view risk levels per zone.</li>
              <li style={styles.toolItem}>Tourist Locator: Track devices and tourists in real-time.</li>
            </ul>

            <h3 style={styles.sidebarTitle}>Current Geo-fences</h3>
            {geoFences.length === 0 ? (
              <p style={styles.noFences}>No geo-fences created yet.</p>
            ) : (
              <ul style={styles.fenceList}>
                {geoFences.map(fence => (
                  <li key={fence.id} style={styles.fenceItem}>
                    {fence.type} - Risk: {fence.riskLevel}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer_80/>
    </div>
  );
}

// --- Professional Government Website Styles (Standardized across components) ---
const styles = {
  // --- Shared Base Styles ---
  pageBackground: {
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: '#e9eff6', // Light grayish-blue for a government feel
    minHeight: '100vh',
    color: '#2c3e50',
    lineHeight: '1.6',
    // MODIFIED: Set the width and align the component to the right
    width: '80vw',
    marginLeft: 'auto',
  },
  mainContentWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '30px 20px', // Top and bottom padding, horizontal padding
  },
  cardSectionTitle: { // Consistent across components for main section titles (h2s)
    fontSize: '1.5em',
    fontWeight: '700',
    color: '#003366',
    marginBottom: '20px',
    borderBottom: '1px solid #e9ecef',
    paddingBottom: '10px',
  },
  subTitle: { // For sub-sections (h3s)
    fontSize: '1.2em',
    fontWeight: '600',
    color: '#003366',
    marginBottom: '15px',
  },
  statusBadgeSmall: { // Smaller badge for lists/tables if needed (not directly used here but for global consistency)
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.75em',
    fontWeight: 'bold',
    display: 'inline-block',
    minWidth: '70px',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: '1',
  },

  // --- Header Styles (Copied directly from Dashboard.jsx / TouristsDirectory.jsx) ---
  dashboardHeader: {
    backgroundColor: '#003366', // Deep blue
    color: 'white',
    padding: '15px 0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  headerContent: {
    maxWidth: '1400px', // Matches mainContentWrapper width
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    backgroundColor: '#007bff',
    borderRadius: '50%',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
  },
  logoIcon: {
    width: '24px',
    height: '24px',
    color: 'white',
  },
  logoText: {
    fontSize: '1.5em',
    fontWeight: '700',
    color: 'white',
    letterSpacing: '0.5px',
  },
  navigation: {
    display: 'flex',
    flexWrap: 'wrap', // Added flex-wrap for responsiveness if many links
    gap: '20px',
  },
  navLink: {
    color: '#e9ecef',
    textDecoration: 'none',
    fontSize: '1em',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    // Note: For actual :hover, use a CSS file or CSS-in-JS library.
    // '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' },
  },
  navLinkActive: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1em',
    fontWeight: '600',
    backgroundColor: '#007bff', // Blue for the active link
    padding: '8px 12px',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  userButton: {
    backgroundColor: 'transparent',
    border: '1px solid #e9ecef',
    color: '#e9ecef',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
    // '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'white' },
  },
  userIcon: {
    width: '18px',
    height: '18px',
  },
  userButtonLogout: {
    backgroundColor: '#dc3545', // Red for logout
    border: 'none',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.3s ease',
    // '&:hover': { backgroundColor: '#c82333' },
  },

  // --- Page-specific Header/Title (Standardized) ---
  pageHeader: {
    display: 'flex',
    flexDirection: 'column', // Allow title and subtitle to stack
    justifyContent: 'flex-start', // Align to start
    alignItems: 'flex-start', // Align children to the start
    marginBottom: '25px',
    borderBottom: '2px solid #a3b1c6',
    paddingBottom: '15px',
    marginTop: '20px', // Space from top for the main content wrapper
    textAlign: 'left', // Ensure text aligns left
  },
  pageTitleText: {
    fontSize: '2.2em',
    color: '#003366',
    fontWeight: '700',
    letterSpacing: '0.5px',
    margin: '0',
  },
  pageSubtitleText: {
    fontSize: '1.1em',
    color: '#495057',
    margin: '10px 0 0 0',
  },

  // --- Map & Geo-fencing Layout ---
  mapPageLayout: {
    display: 'flex',
    flexDirection: 'column', // Default to column for smaller screens
    gap: '30px',
    '@media (min-width: 1024px)': { // For larger screens, side-by-side
        flexDirection: 'row',
    },
  },
  mapArea: {
    flex: '3', // Takes more space than sidebar
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  mapSidebar: {
    flex: '1',
    minWidth: '280px', // Prevent sidebar from becoming too narrow
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    border: '1px solid #dcdcdc',
    padding: '25px',
  },

  // --- Map Controls ---
  mapControls: {
    display: 'flex',
    flexWrap: 'wrap', // Allow buttons to wrap
    justifyContent: 'flex-start', // Align to start
    gap: '10px',
    padding: '15px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    border: '1px solid #dcdcdc',
    marginBottom: '0', // Controls are within mapArea
  },
  button: { // Default map button
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95em',
    fontWeight: '600',
    transition: 'background-color 0.2s ease',
    // '&:hover': { backgroundColor: '#0056b3' },
  },
  activeButton: { // Active map button
    backgroundColor: '#003366', // Darker blue for active state
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95em',
    fontWeight: '700',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)', // Inner shadow for active
  },

  // --- Map Visual Container ---
  mapVisualContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    border: '1px solid #dcdcdc',
    padding: '25px',
    height: '600px', // Larger map area
    display: 'flex',
    flexDirection: 'column',
  },
  mapPlaceholder: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    flexGrow: 1, // Takes all available height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed #ced4da',
    position: 'relative', // For absolute positioned markers
    overflow: 'hidden', // Ensure markers stay within bounds if static positions are outside
  },
  mapContent: {
    textAlign: 'center',
    width: '100%', // Ensure content is centered horizontally
  },
  mapTitle: {
    fontSize: '1.8em',
    color: '#003366',
    marginBottom: '10px',
    fontWeight: '700',
  },
  mapDescription: {
    fontSize: '1em',
    color: '#6c757d',
    marginBottom: '20px',
    maxWidth: '80%', // Constrain text width
    margin: '0 auto 20px auto',
  },

  // --- Static Markers & Fences (for demonstration purposes only) ---
  touristMarker: {
    position: 'absolute',
    // Adjust top/left for demonstration within the placeholder
    top: '15%',
    left: '25%',
    backgroundColor: '#28a745', // Green
    color: 'white',
    padding: '8px 12px',
    borderRadius: '20px',
    fontSize: '0.85em',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  touristIcon: {
    marginRight: '8px',
  },
  touristInfo: {
    fontWeight: '500',
  },
  geoFence: {
    position: 'absolute',
    // Adjust top/left for demonstration within the placeholder
    top: '40%',
    left: '60%',
    backgroundColor: '#ffc107', // Orange
    color: '#212529', // Dark text for contrast
    padding: '8px 12px',
    borderRadius: '20px',
    fontSize: '0.85em',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  fenceIcon: {
    marginRight: '8px',
  },
  fenceInfo: {
    fontWeight: '500',
    marginRight: '10px',
  },
  riskSelect: {
    fontSize: '0.85em',
    padding: '4px 8px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    backgroundColor: 'white',
    color: '#343a40',
  },

  // --- Sidebar Styles ---
  sidebarTitle: {
    fontSize: '1.5em',
    color: '#003366',
    marginBottom: '15px',
    fontWeight: '700',
    borderBottom: '1px solid #e9ecef',
    paddingBottom: '10px',
  },
  toolList: {
    listStyleType: 'disc', // Bullet points
    paddingLeft: '20px',
    marginBottom: '25px',
  },
  toolItem: {
    padding: '5px 0',
    fontSize: '0.95em',
    color: '#495057',
  },
  fenceList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
  },
  fenceItem: {
    padding: '5px 0',
    fontSize: '0.95em',
    color: '#495057',
  },
  noFences: {
    fontSize: '0.95em',
    color: '#6c757d',
    fontStyle: 'italic',
  },
};

export default MapGeoFencing;