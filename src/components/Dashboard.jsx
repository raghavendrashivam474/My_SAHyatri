import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer_80 from "./Footer_80";

function Dashboard() {
  const [activeTourists, setActiveTourists] = useState(1247);
  const [issuedIDs, setIssuedIDs] = useState(8934);
  const [currentIncidents, setCurrentIncidents] = useState(12);
  const [openSOS, setOpenSOS] = useState(3);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTourists((prev) => prev + Math.floor(Math.random() * 3) - 1);
      setIssuedIDs((prev) => prev + Math.floor(Math.random() * 2));
      setCurrentIncidents((prev) =>
        Math.max(0, prev + Math.floor(Math.random() * 3) - 1)
      );
      setOpenSOS((prev) =>
        Math.max(0, prev + Math.floor(Math.random() * 2) - 1)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.pageBackground}>
      {/* <Header /> */}

      {/* This new container will hold both the dashboard and footer */}
      <div style={styles.mainAreaContainer}>
        <div style={styles.mainContentWrapper}>
          {/* Statistics Cards */}
          <div style={styles.statisticsContainer}>
            <div style={styles.statCard}>
              <div style={styles.statContent}>
                <div>
                  <p style={styles.statLabel}>Active Tourists</p>
                  <p style={styles.statValue}>
                    {activeTourists.toLocaleString()}
                  </p>
                  <p style={{ ...styles.statChange, color: '#28a745' }}>
                    +2.5% from yesterday
                  </p>
                </div>
                <div style={styles.statIconBlue}>
                  <svg
                    style={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    <path d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statContent}>
                <div>
                  <p style={styles.statLabel}>Issued IDs</p>
                  <p style={{ ...styles.statValue, color: '#218838' }}> {/* Green value */}
                    {issuedIDs.toLocaleString()}
                  </p>
                  <p style={{ ...styles.statChange, color: '#28a745' }}>
                    +12% from last week
                  </p>
                </div>
                <div style={styles.statIconGreen}>
                  <svg
                    style={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                </div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statContent}>
                <div>
                  <p style={styles.statLabel}>Current Incidents</p>
                  <p style={{ ...styles.statValue, color: '#e0a800' }}> {/* Orange value */}
                    {currentIncidents}
                  </p>
                  <p style={{ ...styles.statChange, color: '#fd7e14' }}>
                    3 resolved today
                  </p>
                </div>
                <div style={styles.statIconOrange}>
                  <svg
                    style={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statContent}>
                <div>
                  <p style={styles.statLabel}>Open SOS</p>
                  <p style={{ ...styles.statValue, color: '#dc3545' }}> {/* Red value */}
                    {openSOS}
                  </p>
                  <p style={{ ...styles.statChange, color: '#dc3545' }}>
                    Requires immediate attention
                  </p>
                </div>
                <div style={styles.statIconRed}>
                  <svg
                    style={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div style={styles.mainContentGrid}>
            {/* Interactive Map */}
            <div style={styles.mapCard}>
              <div style={styles.mapHeader}>
                <h3 style={styles.cardTitle}>Live Tourist Tracking Map</h3>
                <div style={styles.mapHeaderRight}>
                  <span style={styles.mapLastUpdated}>
                    Last updated: {new Date().toLocaleTimeString()}
                  </span>
                  <button style={styles.mapRefreshButton}>
                    <svg
                      style={styles.mapRefreshIcon}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Map Placeholder */}
              <div style={styles.mapPlaceholder}>
                <div style={styles.mapPlaceholderContent}>
                  <svg
                    style={styles.mapPlaceholderIcon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p style={styles.mapPlaceholderText}>Interactive Map</p>
                  <p style={styles.mapPlaceholderSubText}>
                    Live tourist locations, zones, and geo-fences
                  </p>
                </div>
              </div>

              {/* Map Legend */}
              <div style={styles.mapLegend}>
                <div style={styles.mapLegendItem}>
                  <div style={{ ...styles.mapLegendColor, backgroundColor: '#007bff' }}></div>
                  <span>Active Tourists</span>
                </div>
                <div style={styles.mapLegendItem}>
                  <div style={{ ...styles.mapLegendColor, backgroundColor: '#28a745' }}></div>
                  <span>Safe Zones</span>
                </div>
                <div style={styles.mapLegendItem}>
                  <div style={{ ...styles.mapLegendColor, backgroundColor: '#ffc107' }}></div>
                  <span>Restricted Areas</span>
                </div>
                <div style={styles.mapLegendItem}>
                  <div style={{ ...styles.mapLegendColor, backgroundColor: '#dc3545' }}></div>
                  <span>Incident Locations</span>
                </div>
              </div>
            </div>

            {/* Real-time Feed */}
            <div style={styles.realtimeFeedContainer}>
              <div style={styles.realtimeFeedCard}>
                <h3 style={styles.cardTitle}>Real-time Feed</h3>
                <div style={styles.realtimeFeedItems}>
                  <div style={styles.realtimeFeedItem}>
                    <div style={{...styles.feedItemIconContainer, backgroundColor: '#e0f2ff'}}>
                      <svg
                        style={{...styles.feedItemIcon, color: '#007bff'}}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div style={styles.feedItemText}>
                      <p style={styles.feedItemTitle}>New tourist registered</p>
                      <p style={styles.feedItemTimestamp}>2 minutes ago</p>
                    </div>
                  </div>

                  <div style={styles.realtimeFeedItem}>
                    <div style={{...styles.feedItemIconContainer, backgroundColor: '#e6ffed'}}>
                      <svg
                        style={{...styles.feedItemIcon, color: '#28a745'}}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div style={styles.feedItemText}>
                      <p style={styles.feedItemTitle}>SOS alert resolved</p>
                      <p style={styles.feedItemTimestamp}>5 minutes ago</p>
                    </div>
                  </div>

                  <div style={styles.realtimeFeedItem}>
                    <div style={{...styles.feedItemIconContainer, backgroundColor: '#fffbe6'}}>
                      <svg
                        style={{...styles.feedItemIcon, color: '#ffc107'}}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div style={styles.feedItemText}>
                      <p style={styles.feedItemTitle}>Weather alert issued</p>
                      <p style={styles.feedItemTimestamp}>12 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={styles.quickActionsCard}>
                <h3 style={styles.cardTitle}>Quick Actions</h3>
                <div style={styles.quickActionsGrid}>
                  <button
                    onClick={() => console.log("Issue ID clicked")}
                    style={{...styles.quickActionButton, backgroundColor: '#e0f2ff'}}
                  >
                    <svg
                      style={{...styles.quickActionButtonIcon, color: '#007bff'}}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                    </svg>
                    <span style={{...styles.quickActionButtonText, color: '#003366'}}>
                      Issue ID
                    </span>
                  </button>

                  <button
                    onClick={() => console.log("Report Incident clicked")}
                    style={{...styles.quickActionButton, backgroundColor: '#fffbe6'}}
                  >
                    <svg
                      style={{...styles.quickActionButtonIcon, color: '#ffc107'}}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span style={{...styles.quickActionButtonText, color: '#e0a800'}}>
                      Report Incident
                    </span>
                  </button>

                  <button
                    onClick={() => console.log("Emergency Alert clicked")}
                    style={{...styles.quickActionButton, backgroundColor: '#ffebe6'}}
                  >
                    <svg
                      style={{...styles.quickActionButtonIcon, color: '#dc3545'}}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span style={{...styles.quickActionButtonText, color: '#dc3545'}}>
                      Emergency Alert
                    </span>
                  </button>

                  <button
                    onClick={() => console.log("e-FIR Generation clicked")}
                    style={{...styles.quickActionButton, backgroundColor: '#f3e8ff'}}
                  >
                    <svg
                      style={{...styles.quickActionButtonIcon, color: '#6f42c1'}}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span style={{...styles.quickActionButtonText, color: '#6f42c1'}}>
                      e-FIR Generation
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* NEW Footer element */}
        {/* <footer style={styles.footer}>
            <p>© 2024 Tourist Safety Department. All Rights Reserved.</p>
        </footer> */}
        {/* <Footer_80/> */}
      </div>
    </div>
  );
}

// --- Professional Government Website Styles ---
const styles = {
    pageBackground: {
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: '#e9eff6', // Light grayish-blue for a government feel
        minHeight: '100vh',
        color: '#2c3e50',
        lineHeight: '1.6',
    },
    // ... (all other styles from dashboardHeader to userButtonLogout remain the same)
    dashboardHeader: {
        backgroundColor: '#003366', // Deep blue
        color: 'white',
        padding: '15px 0',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    },
    headerContent: {
        maxWidth: '1400px',
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
    },
    navLinkActive: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1em',
        fontWeight: '600',
        backgroundColor: '#007bff',
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
    },
    
    // --- NEW Container for Main Area (Dashboard + Footer) ---
    mainAreaContainer: {
        width: '80vw',
        float: 'right',
    },

    // --- Main Content Wrapper (Now for padding only) ---
    mainContentWrapper: {
        padding: '30px 20px 20px 20px', 
    },

     footer: {
        padding: '20px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #dee2e6',
        textAlign: 'center',
        color: '#6c757d',
        fontSize: '0.9em',
        boxSizing: 'border-box', // Ensures padding is included in the width
    }, // --- NEW Footer Styles ---
  

    // --- Statistics Cards ---
    statisticsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
    },
    statCard: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid #dcdcdc',
        transition: 'transform 0.2s ease-in-out',
    },
    statContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: '0.9em',
        color: '#6c757d',
        margin: '0 0 5px 0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    statValue: {
        fontSize: '2.2em',
        fontWeight: 'bold',
        color: '#003366', 
        margin: '0',
    },
    statChange: {
        fontSize: '0.85em',
        color: '#6c757d', 
        margin: '5px 0 0 0',
    },
    statIconBlue: {
        backgroundColor: '#e0f2ff', 
        borderRadius: '50%',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#007bff', 
    },
    statIconGreen: {
        backgroundColor: '#e6ffed', 
        borderRadius: '50%',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#28a745', 
    },
    statIconOrange: {
        backgroundColor: '#fffbe6', 
        borderRadius: '50%',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffc107', 
    },
    statIconRed: {
        backgroundColor: '#ffebe6', 
        borderRadius: '50%',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#dc3545', 
    },
    icon: {
        width: '28px',
        height: '28px',
    },

    // --- Main Content Grid for Map & Feed ---
    mainContentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px',
        '@media (min-width: 1024px)': { 
            gridTemplateColumns: '2fr 1fr', 
        },
    },

    // ... (rest of the styles from mapCard to cardTitle remain the same)
    mapCard: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid #dcdcdc',
        padding: '25px',
    },
    mapHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    mapHeaderRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    mapLastUpdated: {
        fontSize: '0.9em',
        color: '#6c757d',
    },
    mapRefreshButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
        borderRadius: '5px',
        transition: 'background-color 0.2s ease',
    },
    mapRefreshIcon: {
        width: '18px',
        height: '18px',
        color: '#007bff',
    },
    mapPlaceholder: {
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        height: '384px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #ced4da',
        marginBottom: '20px',
    },
    mapPlaceholderContent: {
        textAlign: 'center',
    },
    mapPlaceholderIcon: {
        width: '64px',
        height: '64px',
        color: '#adb5bd',
        margin: '0 auto 16px auto',
    },
    mapPlaceholderText: {
        color: '#495057',
        fontWeight: '500',
        margin: '0',
    },
    mapPlaceholderSubText: {
        fontSize: '0.875em',
        color: '#6c757d',
        margin: '5px 0 0 0',
    },
    mapLegend: {
        marginTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        fontSize: '0.9em',
        color: '#495057',
    },
    mapLegendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    mapLegendColor: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        marginRight: '8px',
    },
    realtimeFeedContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    realtimeFeedCard: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid #dcdcdc',
        padding: '25px',
    },
    realtimeFeedItems: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    realtimeFeedItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
    },
    feedItemIconContainer: {
        padding: '8px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    feedItemIcon: {
        width: '16px',
        height: '16px',
    },
    feedItemText: {
        flexGrow: 1,
    },
    feedItemTitle: {
        fontSize: '0.875em',
        fontWeight: '500',
        color: '#212529',
        margin: '0',
    },
    feedItemTimestamp: {
        fontSize: '0.75em',
        color: '#6c757d',
        margin: '2px 0 0 0',
    },
    quickActionsCard: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid #dcdcdc',
        padding: '25px',
    },
    quickActionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
    },
    quickActionButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        borderRadius: '8px',
        transition: 'background-color 0.2s ease',
        border: 'none',
        cursor: 'pointer',
    },
    quickActionButtonIcon: {
        width: '24px',
        height: '24px',
        marginBottom: '8px',
    },
    quickActionButtonText: {
        fontSize: '0.875em',
        fontWeight: '500',
        margin: '0',
    },
    cardTitle: {
        fontSize: '1.5em',
        color: '#003366',
        marginBottom: '20px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
    },
};

export default Dashboard;