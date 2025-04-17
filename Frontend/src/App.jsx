import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import OrgDashboard from "./pages/OrgMember";
import AdminDashboard from './components/admin/AdminDashboard';
import AttendanceOverview from './components/admin/AttendanceOverview';
import ManualAttendance from './components/admin/ManualAttendance';
import AttendanceFilter from './components/admin/AttendanceFilter';
import LocationSet from './pages/admin/LocationSet';
import GPSMap from './components/admin/GPSMap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboa rd" element={<StudentDashboard />} />
        <Route path="/orgmem-dashboard" element={<OrgDashboard/>} />
         
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/attendance" element={<AttendanceOverview />} />
        <Route path="/admin/manual" element={<ManualAttendance />} />
        <Route path="/admin/filter" element={<AttendanceFilter />} />
        <Route path="/admin/location" element={<LocationSet />} />
        <Route path="/admin/map" element={<GPSMap />} />
        <Route path="/admin/reports" element={<div>Reports Page</div>} />
        <Route path="/admin/settings" element={<div>Settings Page</div>} />
      </Routes>
    </Router>
  );
}