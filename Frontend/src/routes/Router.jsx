import { Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "../pages/Login";
import Register from "../pages/Register";

// Dashboards
import StudentDashboard from "../pages/StudentDashboard";
import OrgDashboard from "../pages/OrgMember";
import AdminDashboard from "../pages/AdminDashboard";

// Admin Components
import AttendanceOverview from "../components/admin/AttendanceOverview";
import ManualAttendance from "../components/admin/ManualAttendance";
import AttendanceFilter from "../components/admin/AttendanceFilter";
import LocationSet from "../components/admin/LocationSet";
import GPSMap from "../components/admin/GPSMap";

const AppRouter = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboards */}
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/orgmem-dashboard" element={<OrgDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* Admin Routes */}
      <Route path="/admin/attendance" element={<AttendanceOverview />} />
      <Route path="/admin/manual" element={<ManualAttendance />} />
      <Route path="/admin/filter" element={<AttendanceFilter />} />
      <Route path="/admin/location" element={<LocationSet />} />
      <Route path="/admin/map" element={<GPSMap />} />
      <Route path="/admin/reports" element={<div>Reports Page</div>} />
      <Route path="/admin/settings" element={<div>Settings Page</div>} />
    </Routes>
  );
};

export default AppRouter;
