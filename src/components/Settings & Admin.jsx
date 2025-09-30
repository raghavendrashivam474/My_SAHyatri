import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; // Import Link for navigation
// import Header from './Header';
// import Footer_80 from './Footer_80';

function SettingsAdmin() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', role: 'Administrator', status: 'Active' },
    { id: 2, name: 'Operator 1', role: 'Operator', status: 'Active' },
    { id: 3, name: 'Viewer 1', role: 'Viewer', status: 'Inactive' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', role: 'Viewer', status: 'Active' });
  const [editingUser, setEditingUser] = useState(null);
  const [language, setLanguage] = useState('en');
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: 'User Login', user: 'Admin User', timestamp: '2023-10-01 10:00:00' },
    { id: 2, action: 'Data Purge', user: 'Admin User', timestamp: '2023-10-01 09:30:00' },
    { id: 3, action: 'Role Change', user: 'Operator 1', timestamp: '2023-10-01 08:45:00' },
  ]);

  // Language options
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'mr', name: 'Marathi' },
    { code: 'gu', name: 'Gujarati' },
  ];

  const handleAddUser = () => {
    if (newUser.name.trim()) {
      const user = { ...newUser, id: users.length + 1 };
      setUsers([...users, user]);
      setNewUser({ name: '', role: 'Viewer', status: 'Active' });
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, role: user.role, status: user.status });
  };

  const handleUpdateUser = () => {
    if (editingUser && newUser.name.trim()) {
      const updatedUsers = users.map(u => u.id === editingUser.id ? { ...u, ...newUser } : u);
      setUsers(updatedUsers);
      setEditingUser(null);
      setNewUser({ name: '', role: 'Viewer', status: 'Active' });
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Simulate instant language toggle
    console.log(`Language changed to: ${lang}`);
  };

  const handleDataPurge = () => {
    // Mock data purge
    setAuditLogs([]);
    console.log('Data purged');
    alert('Data has been purged successfully.');
  };

  return (
    <div style={styles.pageBackground}>
      {/* Dashboard Header - Full Width (Standardized) */}
      {/* <Header /> */}

      <div style={styles.mainContentWrapper}>
        {/* Page-specific Header/Title */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitleText}>Settings & Admin</h1>
        </div>

        {/* User Management Section */}
        <div style={styles.sectionCard}> {/* Using sectionCard for consistency */}
          <h2 style={styles.cardSectionTitle}>User Management</h2>
          <div style={styles.userForm}>
            <input
              type="text"
              placeholder="User Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              style={styles.formInput} // Using standardized formInput
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              style={styles.formSelect} // Using standardized formSelect
            >
              <option value="Administrator">Administrator</option>
              <option value="Operator">Operator</option>
              <option value="Viewer">Viewer</option>
            </select>
            <select
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              style={styles.formSelect} // Using standardized formSelect
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              onClick={editingUser ? handleUpdateUser : handleAddUser}
              style={styles.primaryActionButton} // Standardized button
            >
              {editingUser ? 'Update User' : 'Add User'}
            </button>
          </div>
          <div style={styles.listContainer}> {/* Standardized list container */}
            {users.map((user) => (
              <div key={user.id} style={styles.listItem}> {/* Standardized list item */}
                <div style={styles.listItemContent}>
                  <span>{user.name}</span>
                  <span style={styles.listItemBadge}>{user.role}</span>
                  <span style={{
                    ...styles.statusBadgeSmall,
                    backgroundColor: user.status === 'Active' ? '#e6ffed' : '#f0f4f8',
                    color: user.status === 'Active' ? '#28a745' : '#495057'
                  }}>{user.status}</span>
                </div>
                <div style={styles.listItemActions}> {/* Standardized action buttons */}
                  <button onClick={() => handleEditUser(user)} style={styles.editActionButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} style={styles.deleteActionButton}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Preferences Section */}
        <div style={styles.sectionCard}>
          <h2 style={styles.cardSectionTitle}>Language Preferences</h2>
          <div style={styles.languageOptions}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                style={{
                  ...styles.languageButton,
                  backgroundColor: language === lang.code ? '#007bff' : '#f0f4f8', // Active blue, inactive light gray
                  color: language === lang.code ? 'white' : '#333',
                }}
              >
                {lang.name}
              </button>
            ))}
          </div>
          <p style={styles.languageNote}>Current Language: {languages.find(l => l.code === language)?.name}</p>
        </div>

        {/* Privacy & Security Section */}
        <div style={styles.sectionCard}>
          <h2 style={styles.cardSectionTitle}>Privacy & Security</h2>
          <div style={styles.securityOptions}>
            <button onClick={handleDataPurge} style={styles.dangerActionButton}> {/* Red button for dangerous action */}
              Purge All Data
            </button>
            <div style={styles.listContainer}> {/* Reusing list container for audit logs */}
              <h3 style={styles.subTitle}>Audit Logs</h3>
              {auditLogs.map((log) => (
                <div key={log.id} style={styles.logItem}>
                  <span style={styles.logAction}>{log.action}</span>
                  <span style={styles.logUser}>{log.user}</span>
                  <span style={styles.logTimestamp}>{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer_80/> */}
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
    subTitle: { // For sub-sections like Audit Logs (h3s)
        fontSize: '1.2em',
        fontWeight: '600',
        color: '#003366',
        marginBottom: '15px',
    },
    statusBadgeSmall: { // Smaller badge for lists/tables if needed
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        borderBottom: '2px solid #a3b1c6',
        paddingBottom: '15px',
        marginTop: '20px', // Space from top for the main content wrapper
    },
    pageTitleText: {
        fontSize: '2.2em',
        color: '#003366',
        fontWeight: '700',
        letterSpacing: '0.5px',
        margin: '0',
    },

    // --- Sections/Cards ---
    sectionCard: { // Renamed from 'section' for clarity and consistency
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid #dcdcdc',
        marginBottom: '30px',
    },

    // --- Forms/Inputs ---
    userForm: { // Specific layout for user input form
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        marginBottom: '20px',
        alignItems: 'center', // Align items in the row
    },
    formInput: { // Standardized input style
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #ced4da',
        fontSize: '1em',
        flex: '1', // Allow input to grow
        minWidth: '180px', // Ensure readability
        outline: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        // '&:focus': { borderColor: '#007bff', boxShadow: '0 0 0 2px rgba(0,123,255,0.25)' },
    },
    formSelect: { // Standardized select style
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #ced4da',
        fontSize: '1em',
        minWidth: '150px',
        backgroundColor: 'white',
        appearance: 'none', // Remove default arrow
        outline: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        // '&:focus': { borderColor: '#007bff', boxShadow: '0 0 0 2px rgba(0,123,255,0.25)' },
    },

    // --- Buttons ---
    primaryActionButton: { // For Add/Update User button
        backgroundColor: '#007bff', // Blue for primary action
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: '600',
        transition: 'background-color 0.2s ease',
        // '&:hover': { backgroundColor: '#0056b3' },
    },
    editActionButton: { // For Edit button
        backgroundColor: '#ffc107', // Yellow/Orange for edit
        color: '#212529',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.85em',
        fontWeight: '500',
        transition: 'background-color 0.2s ease',
        // '&:hover': { backgroundColor: '#e0a800' },
    },
    deleteActionButton: { // For Delete button
        backgroundColor: '#dc3545', // Red for delete
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.85em',
        fontWeight: '500',
        transition: 'background-color 0.2s ease',
        // '&:hover': { backgroundColor: '#c82333' },
    },
    dangerActionButton: { // For Purge Data button (more prominent danger)
        backgroundColor: '#dc3545', // Red for dangerous action
        color: 'white',
        border: 'none',
        padding: '12px 25px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.1em',
        fontWeight: '700',
        transition: 'background-color 0.2s ease',
        // '&:hover': { backgroundColor: '#c82333' },
        alignSelf: 'flex-start', // Align to left if in a flex container
    },
    languageButton: { // Style for language selection buttons
        padding: '10px 20px',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: '500',
        transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
        // '&:hover': { borderColor: '#007bff' },
    },

    // --- Lists & Items ---
    listContainer: { // General container for lists (users, audit logs)
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '15px',
    },
    listItem: { // General list item (user item)
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#fdfdfd',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
    },
    listItemContent: { // For user name, role, status
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap',
    },
    listItemBadge: { // For role badge
        padding: '4px 8px',
        borderRadius: '12px',
        backgroundColor: '#e9ecef',
        color: '#495057',
        fontSize: '0.8em',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    listItemActions: { // Container for edit/delete buttons
        display: 'flex',
        gap: '10px',
    },
    languageNote: {
        marginTop: '15px',
        fontSize: '0.95em',
        color: '#6c757d',
        fontStyle: 'italic',
    },
    securityOptions: { // Specific layout for security options
        display: 'flex',
        flexDirection: 'column',
        gap: '25px', // More space between purge button and audit logs
    },
    logItem: { // Specific style for audit log entries
        display: 'grid', // Use grid for better alignment
        gridTemplateColumns: '1fr 0.8fr 0.8fr', // Adjust column width as needed
        gap: '10px',
        padding: '12px 15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#fdfdfd',
        fontSize: '0.9em',
        color: '#343a40',
        alignItems: 'center',
    },
    logAction: { fontWeight: '500' },
    logUser: { color: '#6c757d' },
    logTimestamp: { color: '#6c757d', textAlign: 'right' },
};

export default SettingsAdmin;