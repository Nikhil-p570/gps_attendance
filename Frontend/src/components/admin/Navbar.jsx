// frontend/src/components/admin/Navbar.jsx

import React from "react";
import "../admin/adminDashboard.css";
import gpsLogo from "../../../logo/gpslogo.png"; // adjust path if logo is elsewhere

const Navbar = () => {
  return (
    <div className="admin-navbar">
      <div className="admin-logo-section">
        <img src={gpsLogo} alt="GPS Logo" className="admin-logo" />
        <h2 className="admin-dashboard-title">Admin Dashboard</h2>
      </div>

      <div className="admin-profile-section">
        <span className="admin-name">Hello, Admin 👋</span>
        {/* Add more like notifications, dark mode, etc. here */}
      </div>
    </div>
  );
};

export default Navbar;
